import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { Router, withRouter, RouteComponentProps, useLocation } from 'react-router-dom';
import styles from './index.scss'

const { SubMenu } = Menu;

interface IProps extends RouteComponentProps {
  menuData: MenuDataItem[] // 菜单数据
}

let target = null

// 会根据当前 pathname 找到选中的menu key，openKey
const getRoutesAndMenuKey = (
  pathname: string,
  menu: MenuDataItem[]
) => {
  if (menu?.length && pathname) {

    getMenuItemKeys(pathname, menu)
    const pathArr = target?.path?.split('/').filter(o => o)
    const openKeys = []
    pathArr?.length && pathArr.map((item, index) => {
      if (index === 0) {
        openKeys.push(`/${item}`)
      } else if (index < (pathArr.length - 1)) {
        openKeys.push(`/${pathArr[index - 1]}/${item}`)
      }
    })

    // console.log("pathname:", pathname);
    // console.log("pathArr:", pathArr);
    // console.log("openKeys:", openKeys);
    console.log("target:", target);


    return { selectKey: target?.path, openKeys }
  } else {
    return { selectKey: [], openKeys: [] }
  }
}

const getMenuItemKeys = (pathname: string, menu: MenuDataItem[]) => {
  menu.map(item => {
    (item.path === pathname) && (target = item)
    item.children?.length && getMenuItemKeys(pathname, item.children)
  })
}

const Index: React.FC<IProps> = (props: IProps) => {
  const { menuData, history } = props
  const location = useLocation()
  const [selectKey, setSelectKey] = useState<{ selectKey: string[], openKeys: string[] }>(getRoutesAndMenuKey(location.pathname, menuData))

  useEffect(() => {
    setSelectKey(getRoutesAndMenuKey(location.pathname, menuData))
  }, [target])

  const renderMenuItem = (data) => {
    if (data?.length) {
      return data.map((item, index) => {
        if (!item.hideChildrenMenuItem && item.children?.length) {
          return (
            <SubMenu
              key={item.path}
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
            item.display && <Menu.Item key={item.path} onClick={() => handleLinkJump(item.path)}>
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
    setSelectKey({ ...selectKey, selectKey: path })
    history.push(`${path}`)
  }

  return (
    <Menu
      mode="inline"
      theme="light"
      className={styles.nav}
      openKeys={selectKey.openKeys}
      selectedKeys={selectKey.selectKey}
      onOpenChange={(keys) => setSelectKey({ ...selectKey, openKeys: keys })}
    >
      {renderMenuItem(menuData)}
    </Menu>
  )
}

// export default withRouter<IProps, any>(Index);
export default withRouter<IProps, React.ComponentType<IProps>>(Index);