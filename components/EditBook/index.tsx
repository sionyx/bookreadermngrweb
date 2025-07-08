'use client'
import { Component } from 'react';
import { Container, Row, Col, Card, Stack, Spinner, Breadcrumb } from 'react-bootstrap';
import { BookReadNavbar, NavigationPage } from '@/components/BookReadNavbar';
import { IBook, ISection } from '@/components/models';
import { BookForm } from '@/components/BookForm'
import { Buttons } from '@/components/Buttons'
import { fetchAPI } from '@/components/API/fetchAPI';
import { useRouter } from 'next/navigation';

interface IBookState {
  book?: IBook
  path: ISection[]
  saved: boolean
  loading: boolean
  saving: boolean
}

interface IBookProps {
  book?: string
  section?: string
  navigeteTo: (url: string) => void
}

class Book extends Component<IBookProps, IBookState> {
  state = {
    book: {} as IBook,
    path: [] as ISection[],
    saved: true,
    loading: true,
    saving: false
  }
  
  load = async () => {
    if (this.props.book) {
      this.setState({ loading: true })
      const data = await fetchAPI('GET', `/books/${this.props.book}`)
      const book = await data.json() as IBook

      if (book) {
        this.setState({ book: book, loading: false })
        this.loadPath(book.sectionId)
      }
    }
    else {
      this.setState({ book: {
        sectionId: this.props.section ?? '',
        authorId: '',
        title: '',
        description: '',
        template: '',
        textLink: '',
        mediaUrl: '',
        previewUrl: '',
        coverUrl: '',
        duration: 0,
        publishDate: 0
      }, loading: false })
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

    const isNew = this.state.book.id == undefined
    console.log(this.state.book)

    const response = isNew 
      ? await fetchAPI('POST', `/books`, this.state.book)
      : await fetchAPI('PUT', `/books/${this.state.book.id}`, this.state.book);
    
    if (response.ok) {
      const book = await response.json() as IBook
      this.setState({ saving: false, saved: true, book: book })
      if (isNew) {
        this.props.navigeteTo(`/books/${book.id}`)
      }
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
                <Card.Header>
                  <Breadcrumb className='mt-3'>
                    <Breadcrumb.Item href="/sections">Разделы</Breadcrumb.Item>
                    { this.state.path.map((section) => (
                      <Breadcrumb.Item key={ "sections_"+section.id } href={ "/sections/"+section.id }>{ section.title }</Breadcrumb.Item>
                    ))}
                    { this.state.book.title && <Breadcrumb.Item active>{ this.state.book.title }</Breadcrumb.Item> }
                  </Breadcrumb>
                </Card.Header>
                <Card.Body>
                  <BookForm book={ this.state.book } onChange={ (b) => { this.setState({ saved: false, book: b }) } } />
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

interface IEditBookProps {
  book?: string
  section?: string
}

export function EditBook(props: IEditBookProps) {
  const router = useRouter()
  return <Book book={ props.book } section={ props.section } navigeteTo={ (url) => { router.push(url) } } />
}
