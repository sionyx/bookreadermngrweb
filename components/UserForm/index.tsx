'use client'
import { Component } from 'react';
import { Row, Col, Form, Image } from 'react-bootstrap';
import { IUser } from '@/components/models';


export interface IUserFormProps {
  user: IUser
  onChange: (user: IUser) => void
}

export class UserForm extends Component<IUserFormProps, object> {
  public render() {
    return (
      <>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Id</Form.Label>
          <Col sm={10}>
          <Form.Control 
            readOnly
            type="text" 
            placeholder="id пользователя" 
            value={ this.props.user.id } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Логин</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Логин пользователя" 
            value={ this.props.user.login } 
            onChange={ (e) => { this.props.onChange({ ...this.props.user, login: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Пароль</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Пароль" 
            value={ this.props.user.pass } 
            onChange={ (e) => { this.props.onChange({ ...this.props.user, pass: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Описание</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Описание пользователя" 
            value={ this.props.user.description } 
            onChange={ (e) => { this.props.onChange({ ...this.props.user, description: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Ссылка</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Ссылка на профиль" 
            value={ this.props.user.link } 
            onChange={ (e) => { this.props.onChange({ ...this.props.user, link: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Фото</Form.Label>
          <Col sm={9}>
          <Form.Control 
            type="text" 
            placeholder="Ссылка на изображение" 
            value={ this.props.user.photoUrl } 
            onChange={ (e) => { this.props.onChange({ ...this.props.user, photoUrl: e.target.value }) } } />
          </Col>
          <Col sm={1} className='ps-0'>
          <Image src={ this.props.user.photoUrl } thumbnail alt='author photo' />
          </Col>
        </Form.Group>
      </>
    )
  }
}
