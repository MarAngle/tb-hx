import local from "./data/local"

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
  }
});
