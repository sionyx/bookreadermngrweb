'use client'
import { Component } from 'react';
import { ListGroup, Stack, Form, Modal, Spinner, Row, InputGroup } from 'react-bootstrap';
import { IUser, IPage } from '@/components/models';
import { fetchAPI } from '@/components/API/fetchAPI';

export interface IUserSearchProps {
  show: boolean
  onSelect: (user: IUser) => void
  onClose: () => void
}

export interface IUserSearchState {
  query: string
  loading: boolean
  users: IUser[]
}

const pagesize = 10

export class UserSearch extends Component<IUserSearchProps, IUserSearchState> {
  state = {
    query: '',
    loading: false,
    users: [] as IUser[],
  }

  search = async (query: string) => {
    this.setState({ query: query, loading: true })

    const result = await fetchAPI('GET', `/users/search?name=${ query }&page=1&per=${ pagesize }`)
    const page = await result.json() as IPage<IUser>

    if (page) {
      this.setState({ users: page.items, loading: false})
    }
  }
  
  public componentDidMount() {
    this.search('')
  }

  public render() {
    return (
      <Modal show={ this.props.show } onHide={ this.props.onClose }>
        <Modal.Header closeButton>
          <Modal.Title>Пользователи</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-1" >
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Поиск</InputGroup.Text>
              <Form.Control 
                type="text" 
                placeholder="по пользователям" 
                value={ this.state.query } 
                onChange={ (e) => { this.search(e.target.value) } } />
            </InputGroup>
          </Form.Group>

          { this.state.loading && (<Spinner animation="border" />)}
          <ListGroup >
            { !this.state.loading && this.state.users.map((user) => (
              <ListGroup.Item key={ "sectionitem"+user.id } action onClick={ () => this.props.onSelect(user) }>
                <Stack direction="horizontal" gap={2}>
                  { user.login }
                </Stack>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>        
    )
  }
}
