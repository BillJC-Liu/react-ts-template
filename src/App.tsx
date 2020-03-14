import React from 'react'
import Icon, { IconClass } from '@/component/common/Icon'
import { connect } from 'spa-redux-tool'
import { IAllState, TestModel } from '@model'
import { RouteComponentProps } from 'react-router-dom'
interface IProps extends RouteComponentProps {
  count: number
}

const App = (props: IProps) => {
  const { count } = props

  return (
    <div>
      <p>Iconfont 的使用</p>
      <p><Icon type={IconClass.ASSWORD} /></p>
      <p>redux tool 的使用</p>
      <div>
        <p>计数器：{count}</p>
        <p>TestModel
          <button onClick={() => TestModel.reducers.add()}>加</button>&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={() => TestModel.reducers.reduce()}>减</button>
        </p>
      </div>
      <p>
        <button onClick={() => props.history.goBack()} >back</button>
      </p>
    </div>
  )
}

export default connect((state: IAllState) => {
  return {
    count: state.test.count
  }
})(App)