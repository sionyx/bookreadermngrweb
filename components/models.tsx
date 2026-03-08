export interface ISection {
  id?: string
  parentId: string
  name: string
  title: string
  description: string
  template: string
  bookTemplate: string
  textLink: string
  coverUrl: string
}

export interface IShortBook {
  id: string
  section: string
  user: string
  title: string
  coverUrl: string
}

export interface ISectionContent {
  section: ISection
  sections: ISection[]
  books: IShortBook[]
}

export interface IBook {
  id?: string
  sectionId: string
  authorId: string
  userId: string
  title: string
  description: string
  template: string
  textLink: string
  previewUrl: string
  coverUrl: string
  publishDate: number
  createDate?: number
  updateDate?: number
  roles: IRole[]
  chapters: IChapter[]
}

export interface IAuthor {
  id?: string
  firstName: string
  lastName: string
  photoUrl: string
  link: string
  description: string
}

export interface IError {
  error: boolean,
  reason: string
}

export interface IUser {
  id?: string
  login: string
  pass?: string
  photoUrl: string
  link: string
  description: string
}

export interface IRole {
    id?: string
    bookId?: string
    authorId: string
    type: string
    author?: IAuthor
}

export interface IPageMetadata {
  page: number
  per: number
  total: number
}

export interface IPage<T> {
  items: [T]
  metadata: IPageMetadata
}

export interface IChapter {
  id?: string
  bookId?: string 
  title: string
  coverUrl?: string
  previewUrl?: string
  mediaUrl: string
  publishDate?: number
  link?: string
  description?: string
}