
Page({
  data: {},
  onLoad() {},
  toList({ target }) {
    my.toList({
      url: '/pages/product/index'
    })
  },
  useProduct({ target }) {
    // 支付成功？？？数据传递问题
    // my.toList({
    //   url: '/pages/product/index'
    // })
  }
})
