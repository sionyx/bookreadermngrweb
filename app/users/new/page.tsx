'use client'
import { Component } from 'react';
import { Container, Row, Col, Card, Stack } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { IUser } from '@/components/models';
import { Buttons } from '@/components/Buttons'
import { UserForm } from '@/components/UserForm';
import { useRouter } from 'next/navigation'
import { fetchAPI } from '@/components/API/fetchAPI';
import { SaveHook } from '@/components/SaveHook';

interface IEditAuthorState {
  user: IUser
  saved: boolean
  saving: boolean
}

interface IEditAuthorProps {
  navigeteTo: (url: string) => void
}

class NewAuthor extends Component<IEditAuthorProps, IEditAuthorState> {
  state = {
    user: { 
      login: '',
      pass: '',
      photoUrl: '',
      link: '',
      description: ''
    } as IUser,
    saved: true,
    saving: false
  }

  save = async () => {
    this.setState({ saving: true })
    const response = await fetchAPI('POST', `/users`, this.state.user);
  
    if (response.ok) {
      const user = await response.json() as IUser
      this.setState({ saving: false, saved: true, user: user })
      this.props.navigeteTo(`/users/${user.id}/edit`)
    }
    else {
      this.setState({ saving: false, saved: false })
    }
  }

  public render() {
    return (
      <>
        <BookReadNavbar page={ NavigationPage.users } />

        <Container className="px-0 mb-2" >
          <Row>
            <Col className="pt-1 mx-0" >
              <Card >
                <Card.Header>{ this.state.user.login }</Card.Header>
                <Card.Body>
                  <UserForm user={ this.state.user } onChange={ (a) => { this.setState({ saved: false, user: a }) } } />
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

        <SaveHook onSave={this.save} />
      </>
    )
  }
}

export default function Page() {
  const router = useRouter()
  return <NewAuthor navigeteTo={ (url) => router.push(url) } />
}