'use client'
import { Component } from 'react';
import { Container, Row, Col, Card, Stack } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { ISection } from '@/components/models';
import { Buttons } from '@/components/Buttons'
import { SectionForm } from '@/components/SectionForm';
import { fetchAPI } from '@/components/API/fetchAPI';
import { useRouter } from 'next/navigation';
import { SaveHook } from '@/components/SaveHook';

interface IEditSectionState {
  section: ISection
  saved: boolean
  saving: boolean
}

interface IEditSectionProps {
  parent?: string
  navigeteTo: (url: string) => void
}

class EditSection extends Component<IEditSectionProps, IEditSectionState> {
  state = {
    section: {
      parentId: this.props.parent,
      name: '',
      title: '',
      description: '',
      template: '',
      bookTemplate: '',
      textLink: '',
      coverUrl: ''
    } as ISection,
    saved: false,
    saving: false
  }

  save = async () => {
    this.setState({ saving: true })

    const response = await fetchAPI('POST', `/sections`, this.state.section);
    
    if (response.ok) {
      const section = await response.json() as ISection
      this.setState({ saving: false, saved: true, section: section })
      this.props.navigeteTo(`/sections/${section.id}/edit`)
    }
    else {
      this.setState({ saving: false, saved: false })
    }
  }

  delete = async () => {
    
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
                  <SectionForm parentEditable={ false } section={ this.state.section } onChange={ (s) => { this.setState({ saved: false, section: s }) } } />
               </Card.Body>
                <Card.Footer className="p-2 text-muted">
                  <Stack direction="horizontal" gap={2}>
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

        <SaveHook onSave={this.save} />
      </>
    )
  }
}

interface IEditSectionWithRouterProps {
  parent?: string
}

const EditSectionWithRouter = (props: IEditSectionWithRouterProps) => {
  const router = useRouter()
  return <EditSection parent={ props.parent } navigeteTo={ (url) => { router.push(url) } } />
}

export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const section = (await params).section
  return <EditSectionWithRouter parent={ section == 'root' ? undefined : section } />
}
