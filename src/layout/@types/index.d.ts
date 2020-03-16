declare interface MenuDataItem {
  name: string
  path: string
  display?: boolean
  icon?: React.ReactNode
  children?: MenuDataItem[]
  hideChildrenInMenu?: boolean
  component?: React.ReactNode
}