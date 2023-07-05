import { showMsg } from "./utils";

App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    my.alert({
      content: 'onLaunch : ' + JSON.stringify(options),
    })
    showMsg(JSON.stringify(options), undefined, {
      duration: 30000
    })
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
    my.alert({
      content: 'onShow : ' + JSON.stringify(options),
    })
    showMsg(JSON.stringify(options), undefined, {
      duration: 30000
    })
  }
});
