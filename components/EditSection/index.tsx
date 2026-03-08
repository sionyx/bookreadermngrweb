'use client'
import { Component } from 'react';
import { Container, Row, Col, Card, Spinner, Stack, Breadcrumb, Alert, Modal, Button } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { ISection, ISectionContent, IError } from '@/components/models';
import { Buttons } from '@/components/Buttons'
import { SectionForm } from '@/components/SectionForm';
import { fetchAPI } from '@/components/API/fetchAPI';
import { SaveHook } from '@/components/SaveHook';
import { useRouter } from 'next/navigation';

interface ISectionState {
  section: ISection
  path: ISection[]
  saved: boolean
  loading: boolean
  saving: boolean
  error?: IError
  show_delete: boolean
  deleting: boolean
  delete_error?: IError
}

interface ISectionProps {
  section?: string
  parent?: string
  navigeteTo: (url: string) => void
}

class Section extends Component<ISectionProps, ISectionState> {
  state = {
    section: {} as ISection,
    path: [] as ISection[],
    saved: true,
    loading: true,
    saving: false,
    error: undefined as (IError | undefined),
    show_delete: false,
    deleting: false,
    delete_error: undefined as (IError | undefined)
  }

  load = async () => {
    if (this.props.section == undefined) {
      this.setState({ section: { parentId: this.props.parent, template: '', bookTemplate: '' } as ISection, loading: false })

      return
    }


    const data = await fetchAPI('GET', `/sections/${this.props.section}`)
    const content = await data.json() as ISectionContent

    if (content) {
      this.setState({ section: content.section, loading: false })
      this.loadPath(content.section.parentId)
    }
  }

  loadPath = async (sectionId: string) => {
    const data = await fetchAPI('GET', `/sections/path/${sectionId}`)
    const path = await data.json() as ISection[]
    console.log(path)
    this.setState({ path: path })
  }

  save = async () => {
    this.setState({ saving: true })

    const isNew = this.state.section.id == undefined
    const response = isNew 
      ? await fetchAPI('POST', `/sections`, this.state.section)
      : await fetchAPI('PUT', `/sections/${this.state.section.id}`, this.state.section)
    
    if (response.ok) {
      const section = await response.json() as ISection
      this.setState({ saving: false, saved: true, section: section, error: undefined })
      if (isNew) {
        this.props.navigeteTo(`/sections/${section.id}/edit`)
      }
    }
    else {
      const error = await response.json() as IError
      this.setState({ saving: false, saved: false, error: error })
    }
  }

  delete = async () => {
    this.setState({ deleting: true })

    const response = await fetchAPI('DELETE', `/sections/${this.state.section.id}`);
    if (response.ok) {
      this.setState({ deleting: false, delete_error: undefined, show_delete: false })
      this.props.navigeteTo(`/sections/${ this.state.section.parentId }`)
    }
    else {
      const error = await response.json() as IError
      this.setState({ deleting: false, delete_error: error })
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
                    <Breadcrumb.Item href="/sections">Разделы</Breadcrumb.Item>
                    { this.state.path.map((section) => (
                      <Breadcrumb.Item key={ "sections_"+section.id } href={ "/sections/"+section.id }>{ section.title }</Breadcrumb.Item>
                    ))}
                    { this.state.section.title && <Breadcrumb.Item active>{ this.state.section.title }</Breadcrumb.Item> }
                  </Breadcrumb>
                </Card.Header>
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
                      onDelete={ this.state.section.id != undefined ? () => this.setState({ show_delete: true }) : undefined } />
                  </Stack>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>      

        <Modal show={ this.state.show_delete } onHide={ () => this.setState({ show_delete: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Удаление раздела</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Вы уверены, что хотите удалить раздел &quot;{ this.state.section.title }&quot;?
          </Modal.Body>
          <Modal.Footer>
            { this.state.deleting && ( <Spinner animation="border" /> )}
            { this.state.delete_error && ( 
              <Alert className='m-0 p-2' variant='danger'>
                Ошибка: { this.state.delete_error.reason }
              </Alert>
            )}
            <Button variant="secondary" onClick={ () => this.setState({ show_delete: false }) }>
              Закрыть
            </Button>
            <Button variant="danger" onClick={ () => { this.delete()}}>
              Удалить
            </Button>
          </Modal.Footer>
        </Modal>

        <SaveHook onSave={this.save} />
      </>
    )
  }
}

interface IEditSectionProps {
  section?: string
  parent?: string
}

export function EditSection(props: IEditSectionProps) {
  const router = useRouter()
  return <Section section={ props.section } parent={ props.parent } navigeteTo={ (url) => { router.push(url) } } />
}