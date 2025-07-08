'use client'
import { Component } from 'react';
import { Container, Row, Col, Stack, Card, Spinner, Alert, Modal, Button } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { fetchAPI, postTextAPI } from '@/components/API/fetchAPI';
import { Buttons } from '@/components/Buttons'
import { useParams } from 'next/navigation'
import VanillaJSONEditor from '@/components/VanillaJSONEditor'
import { type Content, Mode, JSONEditorSelection } from 'vanilla-jsoneditor';
import { DivKitPreview } from '@/components/DivKitPreview'
import { IError } from '@/components/models'
import { onRenderValue } from './RenderValueHelper';
import { LeafJSONParser, purifyJson } from './LeafJSONParser';
import { validateDivKit } from './DivKitValidator';
import { useRouter } from 'next/navigation';


interface ITemplateEditState {
  content: Content
  loading: boolean
  saving: boolean
  saved: boolean
  error?: IError
  show_delete: boolean
  deleting: boolean
  delete_error?: IError

}

interface ITemplateEditProps {
  template: string
  navigeteTo: (url: string) => void
}

// https://github.com/josdejong/svelte-jsoneditor/blob/main/src/routes/examples/json_schema_validation/%2Bpage.svelte


class TemplateEdit extends Component<ITemplateEditProps, ITemplateEditState> {
  state = {
    content: { text: ""},
    loading: true,
    saving: false,
    saved: true,
    error: undefined as (IError | undefined),
    show_delete: false,
    deleting: false,
    delete_error: undefined as (IError | undefined)
  }

  parser = new LeafJSONParser()
  
  load = async () => {
    const data = await fetchAPI('GET', `/views/${this.props.template}`)
    const templateJson = await data.text()

    if (templateJson) {
      this.setState({ content: { text: templateJson }, loading: false})
    }
  }

  save = async () => {
    this.setState({ saving: true })
    const response = await postTextAPI('POST', `/views/${this.props.template}`, this.state.content.text);
    
    if (response.ok) {
      this.setState({ saving: false, saved: true, error: undefined })
    }
    else {
      const error = await response.json() as IError
      this.setState({ saving: false, saved: false, error: error })
    }
  }

  delete = async (name: string) => {

    this.setState({ deleting: true })
    const response = await fetchAPI('DELETE', `/views/${name}`);
    
    if (response.ok) {
      this.setState({ deleting: false, delete_error: undefined, show_delete: false })
      this.props.navigeteTo(`/templates/`)
    }
    else {
      const error = await response.json() as IError
      this.setState({ deleting: false, delete_error: error })
    }    
    

  }

  showUrl = (url: string) => {
    console.log(url)
  }


  getDivJson = (str: string) => {
    let div_json;
    try {
      div_json = JSON.parse(purifyJson(str))
    } catch (e) {
      console.log(e)
      return {} 
    }  
    return div_json;
  }

  public componentDidMount() {
    this.load()
  }

  onSelect = (selection: JSONEditorSelection | undefined) => {
    console.log(selection)
  }


  public render() {
    return (
      <>
        <BookReadNavbar page={ NavigationPage.templates } />

        <Container className="px-0 mb-2" >
          <Row>
            <Col className="pt-1 mx-0" >
              <Card >
                <Card.Header>{ this.props.template }{ this.state.saved ? '' : '*' }</Card.Header>
                <Card.Body className="p-0" >
                  <VanillaJSONEditor  
                    content={ this.state.content }
                    mode={ Mode.text }
                    indentation={ 4 }
                    parser={ this.parser }
                    validationParser={ this.parser }
                    validator={ validateDivKit }
                    onSelect={ this.onSelect }
                    onRenderValue={ onRenderValue }
                    onChange={(c) => { this.setState({ content: c, saved: false}) } }
                  />
                </Card.Body>
                <Card.Footer className="p-2 text-muted">
                  <Stack direction="horizontal" gap={2}>
                    { this.state.loading && ( <Spinner animation="border" /> )}
                    { this.state.error && ( 
                      <Alert className='m-0 p-2' variant='danger'>
                        Ошибка: { this.state.error.reason }
                      </Alert>
                    )}
                    <Buttons className="ms-auto"
                      saving={ this.state.saving } 
                      saved={ this.state.saved } 
                      onSave={ this.save }
                      onDelete={ () => this.setState({ show_delete: true }) } />
                  </Stack>
                </Card.Footer>
              </Card>
            </Col>
            <Col md="auto" className="pt-1" >
              <DivKitPreview
                div_json={ this.getDivJson(this.state.content.text) }
                full_screen={ true }
                onUrlClick={ this.showUrl } />
            </Col>
          </Row>
        </Container>      

        <Modal show={ this.state.show_delete } onHide={ () => this.setState({ show_delete: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Удаление шаблона</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Вы уверены, что хотите удалить шаблон &quot;{ this.props.template }&quot;?
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
            <Button variant="danger" onClick={ () => { this.delete(this.props.template )}}>
              Удалить
            </Button>
          </Modal.Footer>
        </Modal>
        
      </>
    )
  }
}


interface ITemplateEditWithRouterProps {
  template: string
}

const TemplateEditWithRouter = (props: ITemplateEditWithRouterProps) => {
  const router = useRouter()
  return <TemplateEdit template={ props.template } navigeteTo={ (url) => { router.push(url) } } />
}

export default function TemplateEditComponent() {
  const params = useParams<{ template: string }>()
  return <TemplateEditWithRouter template={ params.template } />;
}