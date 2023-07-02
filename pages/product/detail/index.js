import productInfo from "../../../data/productInfo";
import { showMsg } from "../../../utils";

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
          url: '/pages/pay/success'
        })
      } else {
        // ...
        showMsg('支付失败，如何处理？')
      }
    }).catch(err => {
      console.error(err)
    })
  },
});
