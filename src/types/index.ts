export interface NavLink {
  key: string
  path: string
}

export interface NavbarProps {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
}

export interface NavLinkProps {
  to: string
  titleKey: string
  setNavbarOpen?: (value: boolean) => void
  isActive?: boolean
}

export interface ProjectCardProps {
  title: string
  description: string
  gitUrl: string
  previewUrl: string
}

export interface ProjectData {
  id: number
  title: string
  description: string
  gitUrl: string
  previewUrl: string
}

export interface TabButtonProps {
  selectTab: () => void
  active: boolean
  children: React.ReactNode
}

export interface ProjectTagProps {
  name: string
  onClick: (name: string) => void
  isSelected: boolean
}

export type Theme = 'light' | 'dark'

export type MouseEventHandler<T = HTMLElement> = (
  event: React.MouseEvent<T>
) => void

export type ChangeEventHandler<T = HTMLElement> = (
  event: React.ChangeEvent<T>
) => void

export type FormEventHandler<T = HTMLFormElement> = (
  event: React.FormEvent<T>
) => void

export interface MotionVariants {
  initial?: Record<string, unknown>
  animate?: Record<string, unknown>
  exit?: Record<string, unknown>
}
