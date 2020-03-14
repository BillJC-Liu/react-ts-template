import React, { useState, useEffect } from 'react'
import { Layout, Icon } from 'antd'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import BasicLayout from './BasicLayout'
import menuData from '@/config/menu'
import styles from './index.scss'

const { Header, Sider, Content } = Layout;

interface IProps extends RouteComponentProps {
  children: React.ReactNode
  whiteRoute: string[]
}

const Index = (props: IProps) => {
  const { children, whiteRoute, history } = props
  const [collapsed, setCollapsed] = useState(false)
  const [collapseClickStatus, setCollapseClickStatus] = useState(false) // 是否点击了折叠按钮
  const [pathname, setPathname] = useState('')

  // 此处管理的 window.location.pathname 作用：路由切换时更新改变state，
  // 以此来动态修改content内容，当在有菜单的页面和无菜单的页面切换时
  // 有效的 re-render 整个页面 达到 whiteRoute 的功能
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [whiteRoute, children, window.location.pathname])

  const onCollapse = (collapsed, type) => {
    setCollapsed(collapsed ? true : false)
    setCollapseClickStatus(collapseClickStatus ? false : true)
  }

  const trigger = (
    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={() => onCollapse} />
  )

  if (whiteRoute?.length && whiteRoute.includes(pathname)) {
    return (
      <Layout className={styles.layout}>
        <Header style={{ background: 'none' }}>Header</Header>
        <Content>
          {children}
        </Content>
      </Layout>
    )
  }

  return (
    <Layout className={styles.layout}>
      <Header style={{ background: 'none' }}>Header</Header>
      <Layout className={collapseClickStatus ? styles.collapsedMenu : ''}>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          trigger={trigger}
          collapsedWidth={56}
        >
          <div
            onMouseEnter={() => { collapseClickStatus && collapsed ? setCollapsed(false) : null }}
            onMouseLeave={() => { collapseClickStatus && !collapsed ? setCollapsed(true) : false }}
          >
            <BasicLayout menuData={menuData} />
          </div>
        </Sider>
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default withRouter<IProps, any>(Index);