'use client'
import { Component } from 'react';
import { Container, Row, Col, Card, Spinner, Stack } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { IAuthor } from '@/components/models';
import { Buttons } from '@/components/Buttons'
import { AuthorForm } from '@/components/AuthorForm';
import { fetchAPI } from '@/components/API/fetchAPI';
//import { withRouter, NextRouter } from 'next/router'
import { useParams } from 'next/navigation'


interface IEditAuthorState {
  author: IAuthor
  saved: boolean
  loading: boolean
  saving: boolean
}

// interface WithRouterProps {
//   router: NextRouter
// }

interface IEditAuthorProps {
  authorId: string
}

//export default 
class EditAuthor extends Component<IEditAuthorProps, IEditAuthorState> {
  state = {
    author: {} as IAuthor,
    saved: true,
    loading: true,
    saving: false
  }

  load = async () => {
    const data = await fetchAPI('GET', `/authors/${this.props.authorId}`)
    const author = await data.json() as IAuthor

    if (author) {
      this.setState({ author: author, loading: false })
    }
  }

  save = async () => {
    this.setState({ saving: true })
    const response = await fetchAPI('PUT', `/authors/${this.state.author.id}`, this.state.author);
    
    if (response.ok) {
      const author = await response.json() as IAuthor
      this.setState({ saving: false, saved: true, author: author })
    }
    else {
      this.setState({ saving: false, saved: false })
    }
  }

  delete = async () => {
    
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
                <Card.Header>{ this.state.author.firstName } { this.state.author.lastName }</Card.Header>
                <Card.Body>
                  <AuthorForm author={ this.state.author } onChange={ (a) => { this.setState({ saved: false, author: a }) } } />
                </Card.Body>
                <Card.Footer className="p-2 text-muted">
                  <Stack direction="horizontal" gap={2}>
                    { this.state.loading && ( <Spinner animation="border" /> )}
                    <Buttons className="ms-auto"
                      saving={ this.state.saving } 
                      saved={ this.state.saved } 
                      onSave={ this.save }
                      onDelete={ this.delete } />
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

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ author: string }>
// }) {
//   const authorId = (await params).author
//   return <EditAuthor authorId={ authorId } />
// }

//export default withRouter(EditAuthor)

// export default function Page({ 
//   params 
// }: { 
//   params: { author: string } 
// }) {
//   const { author } = params;

//   return <EditAuthor authorId={ author } />;
// }

 
export default function ExampleClientComponent() {
  const params = useParams<{ author: string }>()
 
  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  // console.log(params)
 
  return <EditAuthor authorId={ params.author } />;
}