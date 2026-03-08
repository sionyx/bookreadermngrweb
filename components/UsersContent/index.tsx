'use client'
import { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { IUser } from '@/components/models';
import { addBasePath } from 'next/dist/client/add-base-path';

export interface IUsersContentProps {
  users?: IUser[]
}

export class UsersContent extends Component<IUsersContentProps, object> {
  public render() {
    return (
      <ListGroup variant="flush">
        { this.props.users && this.props.users.map((user) => (
          <ListGroup.Item key={ "sectionitem"+user.id } action href={ addBasePath(`/users/${ user.id }/edit`) }>
            { user.login }
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }
}
