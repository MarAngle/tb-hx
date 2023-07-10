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
    productInfo.createOrder().then((res) => {
      if (res.success) {
        my.navigateTo({
          url: '/pages/pay/success?payNo=' + res.payNo
        })
      } else {
        my.navigateTo({
          url: '/pages/order/index?type=isOrder'
        })
      }
    }).catch(err => {
      console.error(err)
    })
  },
});
