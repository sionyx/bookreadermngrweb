'use client'
import { Component } from 'react';
import { Row, Col, Form, Image, Button, InputGroup } from 'react-bootstrap';
import { IAuthor, IBook, ISection, ISectionContent } from '@/components/models';
import { fetchAPI } from '@/components/API/fetchAPI';
import { AuthorSearch } from '@/components/AuthorSearch';
import { SectionSearch } from '@/components/SectionSearch';


export interface IBookFormProps {
  book: IBook
  onChange: (book: IBook) => void
}

interface IBookFormState {
  section?: ISection
  author?: IAuthor
  selectSection: boolean
  selectAuthor: boolean
}

export class BookForm extends Component<IBookFormProps, IBookFormState> {
  state = {
    section: {} as ISection,
    author: {} as IAuthor,
    selectSection: false,
    selectAuthor: false,
  }

  loadSection = async () => {
    if (this.props.book.sectionId) {
      const data = await fetchAPI('GET', `/sections/${this.props.book.sectionId}`)
      const content = await data.json() as ISectionContent

      if (content) {
        this.setState({ section: content.section })
      }
    }
  }

  loadAuthor = async () => {
    if (this.props.book.authorId) {
      const data = await fetchAPI('GET', `/authors/${this.props.book.authorId}`)
      const author = await data.json() as IAuthor

      if (author) {
        this.setState({ author: author })
      }
    }
  }

  selectAuthor = (author: IAuthor) => {
    if (author.id) {
      this.props.onChange({ ...this.props.book, authorId: author.id })
    }
    this.setState({ selectAuthor: false })
  }

  selectSection = (section: ISection) => {
    if (section.id) {
      this.props.onChange({ ...this.props.book, sectionId: section.id })
    }
    this.setState({ selectSection: false })
  }  

  componentDidUpdate(prevProps: IBookFormProps) {
    if (this.props.book.sectionId !== prevProps.book.sectionId) {
      this.loadSection()
    }
    if (this.props.book.authorId !== prevProps.book.authorId) {
      this.loadAuthor()
    }
  }

  componentDidMount() {
    this.loadSection()
    this.loadAuthor()    
  }

  public render() {
    return (
      <Form>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Id</Form.Label>
          <Col sm={10}>
          <Form.Control 
            readOnly
            type="text" 
            placeholder="id книги" 
            value={ this.props.book.id } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Раздел</Form.Label>
          <Col sm={10}>
            <InputGroup>
              <Form.Control 
                readOnly
                type="text" 
                placeholder="Раздел" 
                value={ this.state.section.title } />
              <Button variant="outline-primary" onClick={ () => this.setState({ selectSection: true }) } >Выбрать</Button>
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Автор</Form.Label>
          <Col sm={10}>
            <InputGroup>
              <Form.Control 
                readOnly
                type="text" 
                placeholder="Автор" 
                value={ 
                  this.state.author && this.state.author.firstName && this.state.author.lastName 
                    ? this.state.author.firstName + " " + this.state.author.lastName : "" 
                } />
              <Button variant="outline-primary" onClick={ () => this.setState({ selectAuthor: true }) } >Выбрать</Button>
            </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Название</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Название книги" 
            value={ this.props.book.title } 
            onChange={ (e) => { this.props.onChange({ ...this.props.book, title: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Описание</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Описание книги" 
            value={ this.props.book.description } 
            onChange={ (e) => { this.props.onChange({ ...this.props.book, description: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Шаблон</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Шаблон страницы" 
            value={ this.props.book.template } 
            onChange={ (e) => { this.props.onChange({ ...this.props.book, template: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Ссылка</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Ссылка на источник" 
            value={ this.props.book.textLink } 
            onChange={ (e) => { this.props.onChange({ ...this.props.book, textLink: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Медиа</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Ссылка на аудиотрек" 
            value={ this.props.book.mediaUrl } 
            onChange={ (e) => { this.props.onChange({ ...this.props.book, mediaUrl: e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Длительность</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Длительность трека" 
            value={ this.props.book.duration } 
            onChange={ (e) => { this.props.onChange({ ...this.props.book, duration: +e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Дата публикации</Form.Label>
          <Col sm={10}>
          <Form.Control 
            type="text" 
            placeholder="Дата публикации" 
            value={ this.props.book.publishDate } 
            onChange={ (e) => { this.props.onChange({ ...this.props.book, publishDate: +e.target.value }) } } />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Превью</Form.Label>
          <Col sm={8}>
          <Form.Control 
            type="text" 
            placeholder="Ссылка на изображение" 
            value={ this.props.book.previewUrl } 
            onChange={ (e) => { this.props.onChange({ ...this.props.book, previewUrl: e.target.value }) } } />
          </Col>
          <Col sm={2} className='ps-0'>
          <Image src={ this.props.book.previewUrl } thumbnail alt='book preview'/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Обложка</Form.Label>
          <Col sm={8}>
          <Form.Control 
            type="text" 
            placeholder="Ссылка на изображение" 
            value={ this.props.book.coverUrl } 
            onChange={ (e) => { this.props.onChange({ ...this.props.book, coverUrl: e.target.value }) } } />
          </Col>
          <Col sm={2} className='ps-0'>
          <Image src={ this.props.book.coverUrl } thumbnail alt='book cover'/>
          </Col>
        </Form.Group>

        <AuthorSearch 
          show={ this.state.selectAuthor } 
          onClose={ () => this.setState({ selectAuthor: false }) }
          onSelect={ (author) => this.selectAuthor(author) } />

        <SectionSearch 
          show={ this.state.selectSection } 
          onClose={ () => this.setState({ selectSection: false }) }
          onSelect={ (section) => this.selectSection(section) } />
      </Form>
    )
  }
}
