import productInfo from "../../../data/productInfo";

Page({
  data: {
    [productInfo.$prop]: productInfo
  },
  onLoad() {
    if (!productInfo.data.id) {
      my.navigateBack(1)
      return
    }
    productInfo.$appendPage(this)
    productInfo.$syncPage()
  },
  createOrder() {
    productInfo.createOrder().then(() => {
      my.toList({
        url: '/pages/pay/success'
      })
    }).catch(err => {
      console.error(err)
    })
  },
});
