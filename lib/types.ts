export interface Service {
  _id?: string
  id: string
  title: string
  description: string
  price: string
  icon: string
  images: string[]
  published: boolean
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ProcessStep {
  title: string
  description: string
}

export interface Project {
  _id?: string
  id: string
  title: string
  summary: string
  description: string
  cover_image: string
  process_steps: ProcessStep[]
  status: "planned" | "in-progress" | "completed"
  related_services: string[]
  company: string
  published: boolean
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export interface Company {
  _id?: string
  id: string
  name: string
  logo: string
  website: string
  description: string
  projects_list: string[]
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ContactDetails {
  _id?: string
  company_name: string
  emails: string[]
  phones: string[]
  address: string
  map: string
  social_links: {
    twitter?: string
    linkedin?: string
    github?: string
    instagram?: string
  }
  updatedAt?: Date
}
