'use client'
import { Component } from 'react';
import { Container, Row, Col, Form, Stack, Card, Spinner, InputGroup, Pagination } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { IUser, IPage, IPageMetadata } from '@/components/models';
import { UsersContent } from '@/components/UsersContent';
import { fetchAPI } from '@/components/API/fetchAPI';
import { addBasePath } from 'next/dist/client/add-base-path';



interface IUsersState {
  users: IUser[]
  search: string
  page?: IPageMetadata
  loading: boolean
  saved: boolean
}

const pagesize = 25

export default class Home extends Component<IUsersState> {
  state = {
    users: [] as IUser[],
    search: '',
    page: undefined as IPageMetadata | undefined,
    loading: true,
    saved: true
  }
  
  load = async (index: number = 1) => {
    this.setState({ loading: true })
    const result = await fetchAPI('GET', `/users?page=${ index }&per=${ pagesize }`)
    const page = await result.json() as IPage<IUser>

    if (page) {
      this.setState({ users: page.items, page: page.metadata, loading: false})
    }
  }

  search = async (search: string, index: number = 1) => {
    this.setState({ search: search, loading: true })

    const result = await fetchAPI('GET', `/users/search?name=${ search }&page=${ index }&per=${ pagesize }`)
    const page = await result.json() as IPage<IUser>

    if (page) {
      this.setState({ users: page.items, page: page.metadata, loading: false})
    }
  }

  goToPage = (index: number) => {
    if (this.state.search.length > 0) {
      this.search(this.state.search, index)
    }
    else {
      this.load(index)
    }
  }

  public componentDidMount() {
    this.load()
  }

  public render() {
    return (
      <>
        <BookReadNavbar page={ NavigationPage.users } />

        <Container className="px-0 mb-2" >
          <Row>
            <Col className="pt-1 mx-0" >
              <Card >
              <Card.Header>
              <Form.Group as={Row}  >
                <InputGroup>
                  <InputGroup.Text id="basic-addon1">Поиск</InputGroup.Text>
                <Form.Control 
                  type="text" 
                  placeholder="по пользователям" 
                  value={ this.state.search } 
                  onChange={ (e) => { this.search(e.target.value) } } />
                  </InputGroup>
              </Form.Group>
              </Card.Header>
                <UsersContent users={ this.state.users } />
                <Card.Footer className="p-2 text-muted">
                  <Stack direction="horizontal" gap={2}>
                    <Pagination>
                      { this.state.page && Array.from({ length: (this.state.page.total - 1) / this.state.page.per + 1 }).map((_, index) => (
                        <Pagination.Item 
                          key={ "page_" + index} 
                          active={index + 1 === this.state.page?.page}
                          onClick={ () => this.goToPage(index + 1) }>
                          {index + 1}
                        </Pagination.Item> 
                      ))}
                    </Pagination>
                    { this.state.loading && (<Spinner animation="border" />)}
                    <a className="btn btn-primary ms-auto" href={ addBasePath('/users/new') }>Новый пользователь</a>
                  </Stack>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>      
      </>
    )
  }
}