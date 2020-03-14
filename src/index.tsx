import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import registerEkko, { Provider } from "spa-redux-tool"
import * as allModel from '@/model'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import { ConfigProvider } from 'antd'
import Layout from '@/layout'
import './style/base.css'

// 创建 store
const store = registerEkko(allModel)
// 前端单页路由白名单 layout 在白名单中的路由下不会有菜单出现
const whiteRoute = ['/app', '/error']

ReactDOM.render(
  <ConfigProvider>
    <Provider store={store}>
      <Router basename="/">
        <Layout whiteRoute={whiteRoute}>
          <Routes />
        </Layout>
      </Router>
    </Provider>
  </ConfigProvider>
  , document.getElementById('root'))

