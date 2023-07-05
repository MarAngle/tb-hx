import local from "./data/local";
import { showAlert } from "./utils";

App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    const query = options.query || {}
    const appInitData = {
      serviceCode: query.serviceCode || '',
      serviceName: query.serviceName || '',
      bizOrderId: query.bizOrderId || '',
    }
    // showAlert(appInitData)
    local.setData('appInitData', appInitData)
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  }
});
