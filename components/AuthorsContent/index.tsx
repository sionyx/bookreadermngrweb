'use client'
import { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { IAuthor } from '@/components/models';
import { addBasePath } from 'next/dist/client/add-base-path';

export interface IAuthorsContentProps {
  authors?: IAuthor[]
}

export class AuthorsContent extends Component<IAuthorsContentProps, object> {
  public render() {
    return (
      <ListGroup variant="flush">
        { this.props.authors && this.props.authors.map((author) => (
          <ListGroup.Item key={ "sectionitem"+author.id } action href={ addBasePath(`/authors/${ author.id }/edit`) }>
            { author.firstName } { author.lastName }
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }
}
