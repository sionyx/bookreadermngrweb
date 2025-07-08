'use client'
import { Component } from 'react';
import { Button, Spinner } from 'react-bootstrap';

export interface IButtonsProps {
  className?: string
  saved: boolean
  saving: boolean
  onSave?: () => void
  onDelete?: () => void
}

export class Buttons extends Component<IButtonsProps, object> {
  public render() {
    return (
      <span className={ this.props.className }>
          { this.props.onSave && (
            <Button variant="primary" disabled={ this.props.saved } onClick={ this.props.onSave }>
              { this.props.saving && (         
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Сохранить
            </Button>
          ) }
          { this.props.onDelete && (
            <>
              <div className="vr" />
              <Button variant="outline-danger" onClick={ this.props.onDelete } >Удалить</Button>
            </>
          ) }
          </span>
    )
  }
}