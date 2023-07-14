import productInfo from "../../../data/productInfo";
import { showAlert } from "../../../utils";

Page({
  data: {
    [productInfo.$prop]: productInfo
  },
  onLoad(query) {
    if (query && query.id) {
      productInfo.setId(query.id)
    }
    productInfo.$appendPage(this)
  },
  onShow() {
    if (!productInfo.id) {
      my.navigateBack(1)
      return
    }
    productInfo.$loadData(true).then(() => {}, err => {
      // showAlert(err)
      my.navigateBack(1)
    })
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
