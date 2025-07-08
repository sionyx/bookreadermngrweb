'use client'
import { Component } from 'react';
import { ListGroup, Stack, Form, Modal, Spinner, Row, InputGroup } from 'react-bootstrap';
import { IAuthor } from '@/components/models';
import { fetchAPI } from '@/components/API/fetchAPI';

export interface IAuthorSearchProps {
  show: boolean
  onSelect: (author: IAuthor) => void
  onClose: () => void
}

export interface IAuthorSearchState {
  query: string
  loading: boolean
  authors: IAuthor[]
}

export class AuthorSearch extends Component<IAuthorSearchProps, IAuthorSearchState> {
  state = {
    query: '',
    loading: false,
    authors: [] as IAuthor[],
  }

  search = async (query: string) => {
    if (query.length > 0) {
      this.setState({ query: query, loading: true })

      const data = await fetchAPI('GET', `/authors/search?name=${ query }`)
      const authors = await data.json()

      if (authors) {
        this.setState({ authors: authors, loading: false})
      }
    }
    else {
      this.setState({ query: query, authors: [] })
    }
  }
  
  public render() {
    return (
      <Modal show={ this.props.show } onHide={ this.props.onClose }>
        <Modal.Header closeButton>
          <Modal.Title>Авторы</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-1" >
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Поиск</InputGroup.Text>
              <Form.Control 
                type="text" 
                placeholder="по авторам" 
                value={ this.state.query } 
                onChange={ (e) => { this.search(e.target.value) } } />
            </InputGroup>
          </Form.Group>

          { this.state.loading && (<Spinner animation="border" />)}
          <ListGroup >
            { !this.state.loading && this.state.authors.map((author) => (
              <ListGroup.Item key={ "sectionitem"+author.id } action onClick={ () => this.props.onSelect(author) }>
                <Stack direction="horizontal" gap={2}>
                  { author.firstName } { author.lastName }
                </Stack>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>        
    )
  }
}
