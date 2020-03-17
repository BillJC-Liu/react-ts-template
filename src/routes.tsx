import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import MenuData from '@/config/menu'

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
      data.map((item) => {
        item.component && warpChunk.push({
          path: item.path,
          component: item.component,
        })
        item.children?.length && this.renderRouteItem(item.children, warpChunk)
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
                exact
                key={index}
                path={item.path}
                component={item.component as any}
              />
            )
          })
        }
        {/*  <Route render={() => <Redirect to="/404" />} /> */}
        <Redirect to="/menu1/home" />
      </Switch>
    )
  }
}

export default Routes