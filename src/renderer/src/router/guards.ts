//前置守卫
export const beforeEach = (to, from, next) => {
  console.log(to, from)
  next()
}

//后置守卫
export const afterEach = (to, from) => {
  console.log(to, from)
}
