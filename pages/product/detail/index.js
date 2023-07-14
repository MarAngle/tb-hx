import productInfo from "../../../data/productInfo";

Page({
  data: {
    [productInfo.$prop]: productInfo
  },
  onLoad() {
    productInfo.$appendPage(this)
  },
  onShow() {
    if (!productInfo.id) {
      my.navigateBack(1)
      return
    }
    productInfo.$reloadData(true)
  },
  createOrder() {
    productInfo.$triggerMethod('createOrder', [], true).then((res) => {
      if (res.success) {
        my.navigateTo({
          url: '/pages/pay/success?payId=' + productInfo.payId
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
