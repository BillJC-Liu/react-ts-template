/*
 * @Author: JC.Liu
 * @Date: 2020-03-11 17:25:29
 * @Last Modified by: JC.Liu
 * @Last Modified time: 2020-03-16 17:44:23
 * 菜单表
 */
import React from 'react'
import Icon, { IconClass } from '@/component/common/Icon'
import { Icon as AntdIcon } from 'antd'
import Menu1Home from '@/page/menu1/home'
import Menu1HomeDetail from '@/page/menu1/home/detail'
import Menu2Home from '@/page/menu2/home'
import Menu2List from '@/page/menu2/list'
import App from '@/App'
import ErrorCom from '@/component/common/Error'
import Com404 from '@/component/common/404'

const menu = [
  {
    name: '菜单1',
    path: '/menu1',
    display: true,
    icon: <AntdIcon component={() => <Icon type={IconClass.ASSWORD} />} />,
    children: [
      {
        name: '菜单1-1',
        path: '/menu1/home',
        display: true, // 是否展示
        icon: <AntdIcon component={() => <Icon type={IconClass.DIT} />} />,
        hideChildrenMenuItem: true, // 隐藏子路由 
        component: Menu1Home,
        children: [
          {
            name: '菜单1详情页',
            path: '/menu1/home/detail',
            display: false,
            icon: '',
            component: Menu1HomeDetail
          },
        ]
      },
      {
        name: '菜单1-2',
        path: '/menu1/list',
        display: true,
        icon: <AntdIcon component={() => <Icon type={IconClass.ENU} />} />,
        children: [
          {
            name: '菜单1-2-1',
            path: '/menu1/list/1',
            display: true,
            icon: <AntdIcon component={() => <Icon type={IconClass.DIT} />} />,
            component: Menu1HomeDetail
          }, {
            name: '菜单1-2-2',
            path: '/menu1/list/2',
            display: true,
            icon: <AntdIcon component={() => <Icon type={IconClass.DIT} />} />,
            component: Menu1HomeDetail,
            hideChildrenMenuItem: true,
            children: [
              {
                name: '菜单1-2-3',
                path: '/menu1/list/2/detail',
                display: false,
                icon: <AntdIcon component={() => <Icon type={IconClass.DIT} />} />,
                component: Menu1HomeDetail,
              }
            ]
          }
        ]
      },
    ]
  }, {
    name: '菜单2',
    path: '/menu2',
    display: true,
    icon: <AntdIcon component={() => <Icon type={IconClass.ASSWORD} />} />,
    children: [
      {
        name: '菜单2-1',
        path: '/menu2/home',
        display: true,
        component: Menu2Home,
        icon: <AntdIcon component={() => <Icon type={IconClass.DIT} />} />,
      },
      {
        name: '菜单2-2',
        path: '/menu2/list',
        display: true,
        component: Menu2List,
        icon: <AntdIcon component={() => <Icon type={IconClass.ENU} />} />,
      },
    ]
  }
]

// 这里是放不在菜单上的公共路由
const whiteMenu = [
  {
    name: 'app',
    path: '/app',
    display: false,
    icon: <AntdIcon type="app" />,
    component: App,
    children: []
  }, {
    name: 'error',
    path: '/error',
    display: false,
    icon: <AntdIcon type="app" />,
    component: ErrorCom,
    children: []
  }, {
    name: '404',
    path: '/404',
    display: false,
    icon: <AntdIcon type="app" />,
    component: Com404,
    children: []
  }
]

export default menu.concat(whiteMenu);