'use client'
import { Component } from 'react';
import { Container, Row, Col, Card, Stack } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { IAuthor } from '@/components/models';
import { Buttons } from '@/components/Buttons'
import { AuthorForm } from '@/components/AuthorForm';
import { useRouter } from 'next/navigation'
import { fetchAPI } from '@/components/API/fetchAPI';

interface IEditAuthorState {
  author: IAuthor
  saved: boolean
  saving: boolean
}

interface IEditAuthorProps {
  navigeteTo: (url: string) => void
}

class NewAuthor extends Component<IEditAuthorProps, IEditAuthorState> {
  state = {
    author: { 
      firstName: '',
      lastName: '',
      photoUrl: '',
      link: '',
      description: ''
    } as IAuthor,
    saved: true,
    saving: false
  }

  save = async () => {
    this.setState({ saving: true })
    const response = await fetchAPI('POST', `/authors`, this.state.author);
  
    if (response.ok) {
      const author = await response.json() as IAuthor
      this.setState({ saving: false, saved: true, author: author })
      this.props.navigeteTo(`/authors/${author.id}/edit`)
    }
    else {
      this.setState({ saving: false, saved: false })
    }
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
                    <Buttons className="ms-auto"
                      saving={ this.state.saving } 
                      saved={ this.state.saved } 
                      onSave={ this.save } />
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

export default function Page() {
  const router = useRouter()
  return <NewAuthor navigeteTo={ (url) => router.push(url) } />
}