import local from "./data/local";
// import { showMsgAllTime } from "./utils";

App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    const query = options.query || {}
    local.setData('appInitData', {
      serviceCode: query.serviceCode || '',
      serviceName: query.serviceName || '',
      bizOrderId: query.bizOrderId || '',
    })
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  }
});
