// Common types used across the application

export interface Service {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  features: string[]
  benefits: string[]
  pricing?: string
}

export interface Industry {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  challenges: string[]
  solutions: string[]
  caseStudy?: {
    title: string
    description: string
    result: string
  }
}

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  service: string
  message: string
  preferredContact: 'email' | 'phone'
  urgency: 'low' | 'medium' | 'high' | 'urgent'
}

export interface NavigationItem {
  name: string
  path: string
}

export interface Stat {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}

export interface TeamMember {
  name: string
  role: string
  description: string
  credentials: string
}

export interface TimelineItem {
  year: string
  title: string
  description: string
}

export interface Value {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

export interface ContactMethod {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  contact: string
  action: string
  available: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface ServicePackage {
  name: string
  description: string
  price: string
  features: string[]
  popular?: boolean
  buttonText: string
  buttonColor: string
}