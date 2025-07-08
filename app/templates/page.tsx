'use client'
import { Component } from 'react';
import { Container, Row, Col, Stack, Card, Spinner, ListGroup, Modal, Button, Form, Alert } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { fetchAPI, postTextAPI } from '@/components/API/fetchAPI';
import { addBasePath } from 'next/dist/client/add-base-path';
import { IError } from '@/components/models'
import { useRouter } from 'next/navigation'

interface IView {
  filename: string
}

interface IViewsState {
  views: IView[]
  loading: boolean
  saving: boolean
  show_new: boolean
  new_name: string
  error?: IError
}

interface IViewsProps {
  navigeteTo: (url: string) => void
}

class Views extends Component<IViewsProps, IViewsState> {
  state = {
    views: [] as IView[],
    loading: true,
    saving: false,
    show_new: false,
    new_name: "",
    error: undefined as (IError | undefined)
  }
  
  load = async () => {
    const data = await fetchAPI('GET', `/views`)
    const views = await data.json() as IView[]

    if (views) {
      this.setState({ 
        views: views.sort((one, two) => (one.filename < two.filename ? -1 : 1)), 
        loading: false
      })
    }
  }

  create = async(name: string) => {
    this.setState({ saving: true })
    const response = await postTextAPI('POST', `/views/${name}`, '{}');
    
    if (response.ok) {
      this.setState({ saving: false, error: undefined, show_new: false, new_name: '' })
      this.props.navigeteTo(`/templates/${name}`)
    }
    else {
      const error = await response.json() as IError
      this.setState({ saving: false, error: error })
    }    
  }

  public componentDidMount() {
    this.load()
  }

  public render() {
    return (
      <>
        <BookReadNavbar page={ NavigationPage.templates } />

        <Container className="px-0 mb-2" >
          <Row>
            <Col className="pt-1 mx-0" >
              <Card >
                <ListGroup variant="flush">
                { this.state.views && this.state.views.map((view) => (
                  <ListGroup.Item key={ "viewitem"+view.filename } action href={ addBasePath(`/templates/${ view.filename }`) }>
                      { view.filename }
                  </ListGroup.Item>
                ))}
                </ListGroup>                
                
                <Card.Footer className="p-2 text-muted">
                  <Stack direction="horizontal" gap={2}>
                    { this.state.loading && (<Spinner animation="border" />)}
                    <Button variant="primary" onClick={() => this.setState({ show_new: true })}>
                      Новый шаблон
                    </Button>
                  </Stack>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal show={ this.state.show_new } onHide={ () => this.setState({ show_new: false, new_name: '' })}>
          <Modal.Header closeButton>
            <Modal.Title>Новый шаблон</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control 
                type="text" 
                placeholder="Название шаблона" 
                value={ this.state.new_name }
                onChange={ (e) => { this.setState({ new_name: e.target.value }) } }  />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            { this.state.saving && ( <Spinner animation="border" /> )}
            { this.state.error && ( 
              <Alert className='m-0 p-2' variant='danger'>
                Ошибка: { this.state.error.reason }
              </Alert>
            )}
            <Button variant="secondary" onClick={ () => this.setState({ show_new: false, new_name: '' }) }>
              Закрыть
            </Button>
            <Button variant="primary" onClick={ () => { this.create(this.state.new_name)}}>
              Создать
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default function Page() {
  const router = useRouter()
  return <Views navigeteTo={ (url) => router.push(url) } />
}