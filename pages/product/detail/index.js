import productInfo from "../../../data/productInfo";
import user from "../../../data/user";
import { toLogin } from "../../../utils";

Page({
  data: {
    [productInfo.$prop]: productInfo,
    showModal: false
  },
  onLoad(query) {
    if (!query || !query.id) {
      my.navigateBack(1)
      return
    }
    productInfo.$appendPage(this)
    productInfo.$reloadData(true, query.id)
  },
  close() {
    this.setData({
      showModal: false
    })
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
