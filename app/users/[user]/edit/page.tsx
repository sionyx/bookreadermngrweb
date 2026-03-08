'use client'
import { Component } from 'react';
import { Container, Row, Col, Card, Spinner, Stack } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { IUser } from '@/components/models';
import { Buttons } from '@/components/Buttons'
import { UserForm } from '@/components/UserForm';
import { fetchAPI } from '@/components/API/fetchAPI';
import { useParams } from 'next/navigation'
import { SaveHook } from '@/components/SaveHook';


interface IEditUserState {
  user: IUser
  saved: boolean
  loading: boolean
  saving: boolean
}

// interface WithRouterProps {
//   router: NextRouter
// }

interface IEditUserProps {
  userId: string
}

//export default 
class EditUser extends Component<IEditUserProps, IEditUserState> {
  state = {
    user: {} as IUser,
    saved: true,
    loading: true,
    saving: false
  }

  load = async () => {
    const data = await fetchAPI('GET', `/users/${this.props.userId}`)
    const user = await data.json() as IUser

    if (user) {
      this.setState({ user: user, loading: false })
    }
  }

  save = async () => {
    this.setState({ saving: true })
    const response = await fetchAPI('PUT', `/users/${this.state.user.id}`, this.state.user);
    
    if (response.ok) {
      const user = await response.json() as IUser
      this.setState({ saving: false, saved: true, user: user })
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

        <SaveHook onSave={this.save} />
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
  const params = useParams<{ user: string }>()
   return <EditUser userId={ params.user } />;
}