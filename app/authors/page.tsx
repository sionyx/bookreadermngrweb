'use client'
import { Component } from 'react';
import { Container, Row, Col, Form, Stack, Card, Spinner, InputGroup } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { IAuthor } from '@/components/models';
import { AuthorsContent } from '@/components/AuthorsContent';
import { fetchAPI } from '@/components/API/fetchAPI';
import { addBasePath } from 'next/dist/client/add-base-path';



interface IAuthorsState {
  authors: IAuthor[]
  search: string
  loading: boolean
  saved: boolean
}

export default class Home extends Component<IAuthorsState> {
  state = {
    authors: [] as IAuthor[],
    search: '',
    loading: true,
    saved: true
  }
  
  load = async () => {
    const data = await fetchAPI('GET', `/authors`)
    const authors = await data.json()

    if (authors) {
      this.setState({ authors: authors, loading: false})
    }
  }

  search = async (search: string) => {
    this.setState({ search: search, loading: true })

    const data = await fetchAPI('GET', `/authors/search?name=${ search }`)
    const authors = await data.json()

    if (authors) {
      this.setState({ authors: authors, loading: false})
    }
  }

  public componentDidMount() {
    this.load()
  }

  public render() {
    return (
      <>
        <BookReadNavbar page={ NavigationPage.authors } />

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
                  placeholder="по авторам" 
                  value={ this.state.search } 
                  onChange={ (e) => { this.search(e.target.value) } } />
                  </InputGroup>
              </Form.Group>
              </Card.Header>
                <AuthorsContent authors={ this.state.authors } />
                <Card.Footer className="p-2 text-muted">
                  <Stack direction="horizontal" gap={2}>
                    { this.state.loading && (<Spinner animation="border" />)}
                    <a className="btn btn-primary ms-auto" href={ addBasePath('/authors/new') }>Новый автор</a>
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