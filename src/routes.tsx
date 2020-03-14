import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import MenuData from '@/config/menu'
import Menu1Home from '@/page/menu1/home'

interface IRouteItem {
  path: string
  component: React.Component
}

class Routes extends React.Component<any, any> {

  renderRoute(data): Array<IRouteItem> {
    let routeItemData = []
    this.renderRouteItem(data, routeItemData)
    return routeItemData;
  }

  renderRouteItem = (data, warpChunk) => {
    if (data?.length) {
      data.map((item, index) => {
        if (item.children?.length) {
          item.component && warpChunk.push({
            path: item.path,
            component: item.component,
          })

          return this.renderRouteItem(item.children, warpChunk)
        } else {
          warpChunk.push({
            path: item.path,
            component: item.component,
          })
        }
      })
    }
  }

  render() {
    const routeData = this.renderRoute(MenuData)
    return (
      <Switch>
        {
          routeData?.length && routeData.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                component={item.component as any}
              />
            )
          })
        }

        <Redirect to="/menu1/home" />
        {/*
        <Route exact path="/app" component={App} />
        <Route exact path="/menu1" component={Menu1} />
        <Route exact path="/menu1/home" component={Menu1Home} />
        <Route exact path="/menu1/list" component={Menu2List} /> 
        <Route exact path="/menu1/list/1" component={Menu2List} />
        <Route exact path="/menu1/list/2" component={Menu2List} />
        <Route exact path="/menu1/home/detail" component={Menu1HomeDetail} />
        <Route exact path="/menu2" component={Menu2} />
        <Route exact path="/menu2/home" component={Menu2Home} />
        <Route exact path="/menu2/list" component={Menu2List} />
        
        */}
      </Switch >
    )
  }
}

export default Routes