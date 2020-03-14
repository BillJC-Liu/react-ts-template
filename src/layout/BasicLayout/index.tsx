import React, { useState } from 'react'
import { Menu } from 'antd'
import { Router, withRouter, RouteComponentProps } from 'react-router-dom';
import styles from '../index.scss'

const { SubMenu } = Menu;

interface IProps extends RouteComponentProps {
  menuData: MenuDataItem[] // 菜单数据
}

const Index = (props: IProps) => {
  const { menuData, history } = props

  const renderMenuItem = (data) => {
    if (data?.length) {
      return data.map((item, index) => {
        if (!item.hideChildrenMenuItem && item.children?.length) {
          return (
            <SubMenu
              key={index}
              title={
                <span>
                  {item.icon}
                  <span>{item.name}</span>
                </span>
              }
            >
              {renderMenuItem(item.children)}
            </SubMenu>
          )
        } else {
          return (
            <Menu.Item key={item.path} onClick={() => handleLinkJump(item.path)} >
              {item.icon}
              <span>{item.name}</span>
            </Menu.Item>
          )
        }
      })
    } else {
      return false
    }
  }

  const handleLinkJump = (path) => {
    history.push(`${path}`)
  }

  return (
    <Menu mode="inline" theme="light">
      {renderMenuItem(menuData)}
    </Menu>
  )
}

export default withRouter<IProps, React.ComponentType<IProps>>(Index);