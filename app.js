import local from "./data/local";
// import orderInfo from "./data/orderInfo";
// import productInfo from "./data/productInfo";
import { showAlert } from "./utils";

App({
  onLaunch(options) {
    // 第一次打开
    const query = options.query || {}
    const appInitData = {
      serviceCode: query.serviceCode || '',
      serviceName: query.serviceName || '',
      bizOrderId: query.bizOrderId || '',
    }
    local.setData('appInitData', appInitData)
    // const page = query.page
    // if (page) {
    //   showAlert(page)
    //   // if (page == '/product/detail/index') {
    //   //   if (query.skuId) {
    //   //     productInfo.setId(query.skuId)
    //   //     my.navigateTo({
    //   //       url: '/pages/product/detail/index'
    //   //     })
    //   //   }
    //   // } else if (page == '/product/order/index') {
    //   //   if (query.payId) {
    //   //     orderInfo.setId(query.payId)
    //   //     my.navigateTo({
    //   //       url: '/pages/product/order/index'
    //   //     })
    //   //   }
    //   // } else {
    //     my.navigateTo({
    //       url: '/pages' + page
    //     })
    //   // }
    // } else {
    //   showAlert(query)
    // }
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  }
});
