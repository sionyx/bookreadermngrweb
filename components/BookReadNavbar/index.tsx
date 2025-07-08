'use client'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Component } from 'react';
import { addBasePath } from 'next/dist/client/add-base-path';


export enum NavigationPage {
  sections = '/sections',
  authors = '/authors',
  templates = '/templates',
}

export function NavigationPageDescr(type: NavigationPage): string {
  switch(type) {
    case NavigationPage.sections: return 'Разделы';
    case NavigationPage.authors: return 'Авторы';
    case NavigationPage.templates: return 'Шаблоны';
  }
}

interface IProps {
  page: NavigationPage;
}
  
export class BookReadNavbar extends Component<IProps, object> {

  public render() {
    return (
      <>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href={ addBasePath(this.props.page) }>BookReader</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" variant="underline" defaultActiveKey={ this.props.page } >
            {Object.values(NavigationPage).map((page) => (
              <Nav.Item key={ page }>
                <Nav.Link href={ addBasePath(page) }>{ NavigationPageDescr(page) }</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>          
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </>
    );
  }
}