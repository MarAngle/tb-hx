import orderInfo from "../../../data/orderInfo";
import user from "../../../data/user";

Page({
  data: {
    [orderInfo.$prop]: orderInfo,
    [user.$prop]: user,
    minDate: new Date(),
    data: {
      send: undefined,
      back: undefined
    }
  },
  onLoad() {
    if (!orderInfo.data.id) {
      my.navigateBack(1)
      return
    }
    orderInfo.$appendPage(this)
    orderInfo.$syncPage()
    user.$appendPage(this)
    user.getAddressList()
  },
  onShow() {},
  handleTriggerPicker(visible, e) {
    console.log('onVisibleChange', visible, e);
  },
  handleOk(date, format, e) {
    console.log('onOk', date, format, e);
  },
})