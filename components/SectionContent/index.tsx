'use client'
import { Component } from 'react';
import { ListGroup, Stack } from 'react-bootstrap';
import { IShortBook, ISection } from '@/components/models';
import { addBasePath } from 'next/dist/client/add-base-path';

export interface ISectionContentProps {
  sections?: ISection[]
  books?: IShortBook[]
}

export class SectionContent extends Component<ISectionContentProps, object> {
  public render() {
    return (
      <ListGroup variant="flush">
        { this.props.sections && this.props.sections.map((section) => (
          <ListGroup.Item key={ "sectionitem"+section.id } action href={ addBasePath(`/sections/${ section.id }`) }>
            <Stack direction="horizontal" gap={2}>
              { section.title }
              <a className="btn btn-primary ms-auto" href={ addBasePath(`/sections/${ section.id }/edit`) }>Изменить</a>
            </Stack>
          </ListGroup.Item>
        ))}
        { this.props.books && this.props.books.map((book) => (
          <ListGroup.Item key={ "bookitem"+book.id } action href={ addBasePath(`/books/${ book.id }`) }>
            { book.title } ({ book.author } )
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  }
}
