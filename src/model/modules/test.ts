interface IState {
  count: number
}

interface IReducers {
  add: () => any
  reduce: () => any
}

const model: Model<IState, IReducers> = {
  namespace: 'test',
  state: {
    count: 0,
  },
  reducers: {
    // 加
    async add() {
      const { count } = this.getModelState()
      console.log("获取全部状态：", this.getState());
      this.setState({
        count: count + 1,
      })
    },

    // 减
    async reduce() {
      const { count } = this.getModelState()
      console.log("获取全部状态：", this.getState());
      this.setState({
        count: count - 1,
      })
    }
  }
}

export default model