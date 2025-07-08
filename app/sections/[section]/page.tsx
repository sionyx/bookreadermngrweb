'use client'
import { Component } from 'react';
import { Container, Row, Col, Button, Card, Spinner, Stack, Breadcrumb } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { IShortBook, ISection, ISectionContent } from '@/components/models';
import { SectionContent } from '@/components/SectionContent';
import { fetchAPI } from '@/components/API/fetchAPI';
import { addBasePath } from 'next/dist/client/add-base-path';


interface ISectionState {
  section: ISection
  path: ISection[]
  sections: ISection[]
  books: IShortBook[]
  loading: boolean
  saved: boolean  
}

interface ISectionProps {
  section: string
}

class Section extends Component<ISectionProps, ISectionState> {
  state = {
    section: {} as ISection,
    path: [] as ISection[],
    sections: [] as ISection[],
    books: [] as IShortBook[],
    loading: true,
    saved: true
  }
  
  load = async () => {
    const data = await fetchAPI('GET', `/sections/${this.props.section}`)
    const content = await data.json() as ISectionContent

    if (content) {
      this.setState({ section: content.section, sections: content.sections, books: content.books, loading: false })
      if (content.section.parentId) {
        this.loadPath(content.section.parentId)
      }
    }
  }

  loadPath = async (sectionId: string) => {
    const data = await fetchAPI('GET', `/sections/path/${sectionId}`)
    const path = await data.json() as ISection[]
    console.log(path)
    this.setState({ path: path })
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
                    <Breadcrumb.Item href="/sections">Разделы</Breadcrumb.Item>
                    { this.state.path.map((section) => (
                      <Breadcrumb.Item key={ "sections_"+section.id } href={ "/sections/"+section.id }>{ section.title }</Breadcrumb.Item>
                    ))}
                    { this.state.section.title && <Breadcrumb.Item active>{ this.state.section.title }</Breadcrumb.Item> }
                  </Breadcrumb>
                </Card.Header>
                <SectionContent sections={ this.state.sections } books={ this.state.books } />
                <Card.Footer className="p-2 text-muted">
                  <Stack direction="horizontal" gap={2}>
                    { this.state.loading && (<Spinner animation="border" />)}
                    <a className="btn btn-primary ms-auto" href={ addBasePath(`/sections/${this.props.section}/new`) }>Новый раздел</a>
                    <Button variant="primary" href={  addBasePath(`/books/new/${this.props.section}`) }>Новая книга</Button>
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

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const section = (await params).section
  return <Section section={ section } />
}