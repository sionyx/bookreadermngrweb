'use client'
import { Component } from 'react';
import { Row, Col, Form, Image } from 'react-bootstrap';
import { IAuthor } from '@/components/models';


export interface ISectionFormProps {
  author: IAuthor
  onChange: (book: IAuthor) => void
}

export class AuthorForm extends Component<ISectionFormProps, object> {
  public render() {
    return (
      <>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Id</Form.Label>
          <Col sm={10}>
          <Form.Control 
            readOnly
            type="text" 
            placeholder="id автора" 
            value={ this.props.author.id } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Имя</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Имя автора" 
            value={ this.props.author.firstName } 
            onChange={ (e) => { this.props.onChange({ ...this.props.author, firstName: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Фамилия</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Фамилия автора" 
            value={ this.props.author.lastName } 
            onChange={ (e) => { this.props.onChange({ ...this.props.author, lastName: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Описание</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Описание автора" 
            value={ this.props.author.description } 
            onChange={ (e) => { this.props.onChange({ ...this.props.author, description: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Ссылка</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Ссылка на профиль" 
            value={ this.props.author.link } 
            onChange={ (e) => { this.props.onChange({ ...this.props.author, link: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Фото</Form.Label>
          <Col sm={9}>
          <Form.Control 
            type="text" 
            placeholder="Ссылка на изображение" 
            value={ this.props.author.photoUrl } 
            onChange={ (e) => { this.props.onChange({ ...this.props.author, photoUrl: e.target.value }) } } />
          </Col>
          <Col sm={1} className='ps-0'>
          <Image src={ this.props.author.photoUrl } thumbnail alt='author photo' />
          </Col>
        </Form.Group>
      </>
    )
  }
}
