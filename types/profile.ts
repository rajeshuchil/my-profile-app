export interface Project {
  title: string;
  link?: string;
  description: string;
}

export interface Profile {
  _id?: string
  name: string
  avatar: string
  bio: string
  education: string
  skills: string[]
  experience: string
  projects: Project[]
  linkedin?: string
  videoUrl?: string
}
