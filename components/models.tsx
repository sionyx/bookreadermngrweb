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
  author: string
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
  title: string
  description: string
  template: string
  textLink: string
  mediaUrl: string
  previewUrl: string
  coverUrl: string
  duration: number
  publishDate: number
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