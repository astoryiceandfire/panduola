function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
export const goback = makeAction('GOBACK')
export const addOrderLists = makeAction('ADDORDERLISTS')
export const setShopLists = makeAction('SAVESHOPITEMS')