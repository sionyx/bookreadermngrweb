'use client'
import { Component } from 'react';
import { Row, Col, Form, Image, InputGroup, Button } from 'react-bootstrap';
import { ISection, ISectionContent } from '@/components/models';
import { SectionSearch } from '@/components/SectionSearch';
import { fetchAPI } from '@/components/API/fetchAPI';


export interface ISectionFormProps {
  section: ISection
  parentEditable: boolean
  onChange: (book: ISection) => void
}

interface ISectionFormState {
  parent?: ISection
  selectParent: boolean
}


export class SectionForm extends Component<ISectionFormProps, ISectionFormState> {
  state = {
    parent: {} as ISection,
    selectParent: false
  }

  loadParent = async () => {
    if (this.props.section.parentId) {
      const data = await fetchAPI('GET', `/sections/${this.props.section.parentId}`)
      const content = await data.json() as ISectionContent

      if (content) {
        this.setState({ parent: content.section })
      }
    }
  }

  selectParent = (section: ISection) => {
    if (section.id && section.id != this.props.section.id) {
      this.props.onChange({ ...this.props.section, parentId: section.id })
    }
    this.setState({ selectParent: false })
  }  

  componentDidUpdate(prevProps: ISectionFormProps) {
    if (this.props.section.parentId !== prevProps.section.parentId) {
      this.loadParent()
    }
  }

  public componentDidMount() {
    this.loadParent()
  }

  public render() {
    return (
      <>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Id</Form.Label>
          <Col sm={10}>
          <Form.Control 
            readOnly
            type="text" 
            placeholder="id раздела" 
            value={ this.props.section.id } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Раздел</Form.Label>
          <Col sm={10}>
          <InputGroup>
            <Form.Control 
              readOnly
              type="text" 
              placeholder="Родительский раздел" 
              value={ this.state.parent ? this.state.parent.title : "" } />
              { this.props.parentEditable && (
                <Button variant="outline-primary" onClick={ () => this.setState({ selectParent: true }) } >Выбрать</Button>
              )}
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Короткое Название</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Короткое название раздела" 
            value={ this.props.section.name } 
            onChange={ (e) => { this.props.onChange({ ...this.props.section, name: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Название</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Название раздела" 
            value={ this.props.section.title } 
            onChange={ (e) => { this.props.onChange({ ...this.props.section, title: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Описание</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Описание раздела" 
            value={ this.props.section.description } 
            onChange={ (e) => { this.props.onChange({ ...this.props.section, description: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Шаблон раздела</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Шаблон раздела" 
            value={ this.props.section.template } 
            onChange={ (e) => { this.props.onChange({ ...this.props.section, template: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Шаблон книг</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Шаблон книг в разделе" 
            value={ this.props.section.bookTemplate } 
            onChange={ (e) => { this.props.onChange({ ...this.props.section, bookTemplate: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Ссылка</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Ссылка на источник" 
            value={ this.props.section.textLink } 
            onChange={ (e) => { this.props.onChange({ ...this.props.section, textLink: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Обложка</Form.Label>
          <Col sm={9}>
          <Form.Control 
            type="text" 
            placeholder="Ссылка на изображение" 
            value={ this.props.section.coverUrl } 
            onChange={ (e) => { this.props.onChange({ ...this.props.section, coverUrl: e.target.value }) } } />
          </Col>
          <Col sm={1} className='ps-0'>
          <Image src={ this.props.section.coverUrl } thumbnail alt='section cover' />
          </Col>
        </Form.Group>

        <SectionSearch 
          show={ this.state.selectParent } 
          exclude={ this.props.section.id }
          onClose={ () => this.setState({ selectParent: false }) }
          onSelect={ (section) => this.selectParent(section) } />

      </>
    )
  }
}
