declare interface Model<S, R> {
  namespace: string
  state: S
  reducers: R
  
}