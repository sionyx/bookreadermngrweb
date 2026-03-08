'use client'
import { Component } from 'react';
import { Row, Col, Form, Image, Button, InputGroup } from 'react-bootstrap';
import { IAuthor, IBook, IChapter, IRole, ISection, ISectionContent, IUser } from '@/components/models';
import { fetchAPI } from '@/components/API/fetchAPI';
import { SectionSearch } from '@/components/SectionSearch';
import { AuthorSearch } from '@/components/AuthorSearch';
import { UserSearch } from '@/components/UserSearch';


export interface IBookFormProps {
  book: IBook
  onChange: (book: IBook) => void
  onError: (text:string) => void
}

interface IBookFormState {
  section?: ISection
  author?: IAuthor
  user?: IUser
  selectSection: boolean
  selectAuthor: number
  selectUser: boolean
}

export class BookForm extends Component<IBookFormProps, IBookFormState> {
  state = {
    section: {} as ISection,
    author: {} as IAuthor,
    user: {} as IUser,
    selectSection: false,
    selectAuthor: -1,
    selectUser: false,
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
    if (this.props.book.authorId == '00000000-0000-0000-0000-000000000000') {
      return
    }

    if (this.props.book.authorId) {
      const data = await fetchAPI('GET', `/authors/${this.props.book.authorId}`)
      const author = await data.json() as IAuthor

      if (author) {
        this.setState({ author: author })
      }
    }
  }

  loadUser = async () => {
    if (this.props.book.userId) {
      const data = await fetchAPI('GET', `/users/${this.props.book.userId}`)
      const user = await data.json() as IUser

      if (user) {
        this.setState({ user: user })
      }
    }
  }

  selectSection = (section: ISection) => {
    if (section.id) {
      this.props.onChange({ ...this.props.book, sectionId: section.id })
    }
    this.setState({ selectSection: false })
  }  

  selectAuthor = (author: IAuthor, index: number) => {
    if (author.id) {
      const updatedBook = this.props.book
      if (index < updatedBook.roles.length) {
        updatedBook.roles[index].authorId = author.id
        updatedBook.roles[index].author = author
      }
      else {
        updatedBook.roles.push({
          bookId: updatedBook.id,
          authorId: author.id,
          author: author,
          type: "author"
        } as IRole )
      }
      this.props.onChange(updatedBook)
    }
    this.setState({ selectAuthor: -1 })
  }

  changeRoleType = (type: string, index: number) => {
    if (index >= this.props.book.roles.length) {
      return
    }

    const updatedBook = this.props.book
    updatedBook.roles[index].type = type
    this.props.onChange(updatedBook)
  }

  deleteRole = async  (index: number) => {
    const book = this.props.book
    if (index >= book.roles.length) {
      return
    }

    const role = book.roles[index]
    if (!role.id) { 
      book.roles.splice(index, 1)
      this.props.onChange(book)
      return 
    }

    const response = await fetchAPI('DELETE', `/roles/${role.id}`)
    if (response.ok) {
      book.roles.splice(index, 1)
      this.props.onChange(book)
    }
    else {
      this.props.onError("Не удалось удалить роль")
    }
  }

  selectUser = (user: IUser) => {
    if (user.id) {
      this.props.onChange({ ...this.props.book, userId: user.id })
    }
    this.setState({ selectUser: false })
  }

  addChapter = () => {
    const book = this.props.book
    book.chapters.push({title: 'Глава ' + (+book.chapters.length + 1), mediaUrl: ''} as IChapter)
    this.props.onChange(book)
  }

  updateChapterTitle = (title: string, index: number) => {
    if (index >= this.props.book.chapters.length) {
      return
    }

    const updatedBook = this.props.book
    updatedBook.chapters[index].title = title
    this.props.onChange(updatedBook)
  }

  updateChapterMedia = (media: string, index: number) => {
    if (index >= this.props.book.chapters.length) {
      return
    }

    const updatedBook = this.props.book
    updatedBook.chapters[index].mediaUrl = media
    this.props.onChange(updatedBook)
  }

  deleteChapter = async (index: number) => {
    const book = this.props.book
    if (index >= book.chapters.length) {
      return
    }

    const chapter = book.chapters[index]
    if (!chapter.id) { 
      book.chapters.splice(index, 1)
      this.props.onChange(book)
      return 
    }

    const response = await fetchAPI('DELETE', `/chapters/${chapter.id}`)
    if (response.ok) {
      book.chapters.splice(index, 1)
      this.props.onChange(book)
    }
    else {
      this.props.onError("Не удалось удалить главу")
    }
  }

  componentDidUpdate(prevProps: IBookFormProps) {
    if (this.props.book.sectionId !== prevProps.book.sectionId) {
      this.loadSection()
    }
    if (this.props.book.userId !== prevProps.book.userId) {
      this.loadUser()
    }
  }

  componentDidMount() {
    this.loadSection()
    this.loadUser()
  }

  timestampToDate = (timestamp: number): string => {
    const date = (timestamp > 0) ? new Date(timestamp * 1000) : new Date() 
    return date.toISOString().split('T')[0]
  }

  dateToTimestamp = (date: string): number => {
    const d = new Date(date)
    return Math.floor(d.getTime() / 1000)
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
          <Form.Label column sm={2} >Пользователь</Form.Label>
          <Col sm={10}>
            <InputGroup>
              <Form.Control 
                readOnly
                type="text" 
                placeholder="Пользователь" 
                value={ 
                  this.state.user && this.state.user.login 
                    ? this.state.user.login : "" 
                } />
              <Button variant="outline-primary" onClick={ () => this.setState({ selectUser: true }) } >Выбрать</Button>
            </InputGroup>
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
          <Form.Label column sm={2} >Авторы</Form.Label>
          <Col sm={10}>

          { this.props.book.roles && this.props.book.roles.map((role, index) => (
            <>
              <InputGroup>
                <Form.Select aria-label="Default select example" 
                  value={ role.type }
                  onChange={ (e) => this.changeRoleType(e.target.value, index) } >
                  <option value="author">Автор</option>
                  <option value="translator">Переводчик</option>
                  <option value="reader">Чтец</option>
                  <option value="host">Ведущий</option>
                </Form.Select>
                <Form.Control 
                  readOnly
                  type="text" 
                  placeholder="Автор" 
                  value={ role.author ? role.author.firstName + " " + role.author.lastName : role.authorId 
                  } />
                <Button variant="outline-primary" onClick={ () => this.setState({ selectAuthor: index }) } >Выбрать</Button>
                <Button variant="outline-danger" onClick={ () => this.deleteRole(index) } >Удалить</Button>
              </InputGroup>
            </>
          ))}
          <Button variant="primary" onClick={ () => this.setState({ selectAuthor: this.props.book.roles.length }) } >Добавить</Button>
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
          <Form.Label column sm={2} >Дата публикации</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              placeholder="Дата публикации"
              value={ this.timestampToDate(this.props.book.publishDate) }
              onChange={ (e) => { this.props.onChange({ ...this.props.book, publishDate: this.dateToTimestamp(e.target.value) }) } } />
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

        <Form.Group as={Row} className="mb-1" >
          <Form.Label column sm={2} >Главы</Form.Label>
          <Col sm={10}>

          { this.props.book.chapters && this.props.book.chapters.map((chapter, index) => (
            <>
              <InputGroup>
                <InputGroup.Text id="basic-addon3">Глава { index + 1 }</InputGroup.Text>
                <Form.Control 
                  type="text" 
                  placeholder="Название" 
                  value={ chapter.title } 
                  onChange={ (e) => { this.updateChapterTitle(e.target.value, index) } } />
                <Form.Control 
                  type="text" 
                  placeholder="Медиа" 
                  value={ chapter.mediaUrl } 
                  onChange={ (e) => { this.updateChapterMedia(e.target.value, index) } } />
                <Button variant="outline-danger" onClick={ () => this.deleteChapter(index) } >Удалить</Button>
              </InputGroup>
            </>
          ))}
          <Button variant="primary" onClick={ () => this.addChapter() } >Добавить</Button>
          </Col>
        </Form.Group>


        <SectionSearch 
          show={ this.state.selectSection } 
          onClose={ () => this.setState({ selectSection: false }) }
          onSelect={ (section) => this.selectSection(section) } />

        <AuthorSearch 
          show={ this.state.selectAuthor >= 0 } 
          onClose={ () => this.setState({ selectAuthor: -1 }) }
          onSelect={ (author) => this.selectAuthor(author, this.state.selectAuthor) } />

        <UserSearch 
          show={ this.state.selectUser } 
          onClose={ () => this.setState({ selectUser: false }) }
          onSelect={ (user) => this.selectUser(user) } />
      </Form>
    )
  }
}
