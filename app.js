import local from "./data/local";
import productInfo from "./data/productInfo";
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
    const page = query.page
    if (page) {
      if (page == '/product/detail/index' && query.skuId) {
        productInfo.getInfo(query.skuId).then(() => {
          my.navigateTo({
            url: '/pages/product/detail/index'
          })
        })
      }
    }
    // productInfo.getInfo('12345').then(() => {
    //   my.navigateTo({
    //     url: '/pages/product/detail/index'
    //   })
    // })
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  }
});
