'use client'
import { Component } from 'react';
import { Container, Row, Col, Stack, Card, Spinner, Breadcrumb } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { SectionContent } from '@/components/SectionContent';
import { ISection } from '@/components/models';
import { fetchAPI } from '@/components/API/fetchAPI';
import { addBasePath } from 'next/dist/client/add-base-path';

interface ISectionsState {
  sections: ISection[]
  loading: boolean
  saved: boolean
}

export default class Home extends Component<ISectionsState> {
  state = {
    sections: [] as ISection[],
    loading: true,
    saved: true
  }
  
  load = async () => {
    const data = await fetchAPI('GET', `/sections`)
    const sections = await data.json()

    if (sections) {
      this.setState({ sections: sections, loading: false})
    }
  }

  public componentDidMount() {
    this.load()
  }

  public render() {
    return (
      <>
        <BookReadNavbar page={ NavigationPage.sections } />

        <Container className="px-0 mb-2" >
          <Row>
            <Col className="pt-1 mx-0" >
              <Card >
                <Card.Header>
                  <Breadcrumb className='mt-3'>
                    <Breadcrumb.Item active>Разделы</Breadcrumb.Item>
                  </Breadcrumb>
                </Card.Header>
                <SectionContent sections={ this.state.sections } />
                <Card.Footer className="p-2 text-muted">
                  <Stack direction="horizontal" gap={2}>
                    { this.state.loading && (<Spinner animation="border" />)}
                    <a className="btn btn-primary ms-auto" href={ addBasePath('/sections/root/new') }>Новый раздел</a>
                  </Stack>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>      
      </>
    )
  }
}