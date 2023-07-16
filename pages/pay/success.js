
Page({
  data: {
    info: null,
    load: '',
    payId: undefined,
    redirect: false
  },
  onLoad(query) {
    this.data.payId = query.payId
  },
  toList({ target }) {
    my.navigateTo({
      url: '/pages/product/index'
    })
  },
  useProduct({ target }) {
    my.navigateTo({
      url: '/pages/order/index?type=isPay'
    })
  }
})
