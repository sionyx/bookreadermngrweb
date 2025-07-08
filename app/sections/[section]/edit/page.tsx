'use client'
import { Component } from 'react';
import { Container, Row, Col, Card, Spinner, Stack } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { ISection, ISectionContent } from '@/components/models';
import { Buttons } from '@/components/Buttons'
import { SectionForm } from '@/components/SectionForm';
import { fetchAPI } from '@/components/API/fetchAPI';

interface IEditSectionState {
  section: ISection
  saved: boolean
  loading: boolean
  saving: boolean
}

interface IEditSectionProps {
  section: string
}

class EditSection extends Component<IEditSectionProps, IEditSectionState> {
  state = {
    section: {} as ISection,
    saved: true,
    loading: true,
    saving: false
  }

  load = async () => {
    const data = await fetchAPI('GET', `/sections/${this.props.section}`)
    const content = await data.json() as ISectionContent

    if (content) {
      this.setState({ section: content.section, loading: false })
    }
  }

  save = async () => {
    this.setState({ saving: true })
    const response = await fetchAPI('PUT', `/sections/${this.state.section.id}`, this.state.section);
    
    if (response.ok) {
      const section = await response.json() as ISection
      this.setState({ saving: false, saved: true, section: section })
    }
    else {
      this.setState({ saving: false, saved: false })
    }
  }

  delete = async () => {
    
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
                <Card.Header>{ this.state.section.title }</Card.Header>
                <Card.Body>
                  <SectionForm parentEditable={ this.state.section.parentId != undefined } section={ this.state.section } onChange={ (s) => { this.setState({ saved: false, section: s }) } } />
               </Card.Body>
                <Card.Footer className="p-2 text-muted">
                  <Stack direction="horizontal" gap={2}>
                    { this.state.loading && ( <Spinner animation="border" /> )}
                    <Buttons className="ms-auto"
                      saving={ this.state.saving } 
                      saved={ this.state.saved } 
                      onSave={ this.save }
                      onDelete={ this.delete } />
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
  return <EditSection section={ section } />
}