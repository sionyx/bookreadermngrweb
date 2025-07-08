'use client'
import { Component } from 'react';
import { ListGroup, Form, Modal, Spinner, Row, InputGroup } from 'react-bootstrap';
import { ISection } from '@/components/models';
import { fetchAPI } from '@/components/API/fetchAPI';

export interface ISectionSearchProps {
  show: boolean
  exclude?: string
  onSelect: (author: ISection) => void
  onClose: () => void
}

export interface ISectionSearchState {
  query: string
  loading: boolean
  sections: ISection[]
}

export class SectionSearch extends Component<ISectionSearchProps, ISectionSearchState> {
  state = {
    query: '',
    loading: false,
    sections: [] as ISection[],
  }

  search = async (query: string) => {
    if (query.length > 0) {
      this.setState({ query: query, loading: true })

      const data = await fetchAPI('GET', `/sections/search?title=${ query }`)
      const authors = await data.json()

      if (authors) {
        this.setState({ sections: authors, loading: false})
      }
    }
    else {
      this.setState({ query: query, sections: [] })
    }
  }
  
  public render() {
    return (
      <Modal show={ this.props.show } onHide={ this.props.onClose }>
        <Modal.Header closeButton>
          <Modal.Title>Разделы</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-1" >
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Поиск</InputGroup.Text>
              <Form.Control 
                type="text" 
                placeholder="по разделам" 
                value={ this.state.query } 
                onChange={ (e) => { this.search(e.target.value) } } />
            </InputGroup>
          </Form.Group>

          { this.state.loading && (<Spinner animation="border" />)}
          <ListGroup >
            { !this.state.loading && this.state.sections.map((section) => (
              <ListGroup.Item 
                key={ "sectionitem"+section.id } 
                action={ section.id != this.props.exclude } 
                disabled={ section.id == this.props.exclude } 
                onClick={ () => this.props.onSelect(section) }>
                { section.title }
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>        
    )
  }
}
