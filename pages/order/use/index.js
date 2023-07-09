import orderInfo from "../../../data/orderInfo";
import user from "../../../data/user";
import { showMsg } from "../../../utils";

Page({
  data: {
    [orderInfo.$prop]: orderInfo,
    [user.$prop]: user,
    minDate: new Date(),
    data: {
      send: undefined,
      back: undefined,
      time: undefined,
      remark: undefined
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
  onTimeChange(date, format, e) {
    console.log('onOk', date, format, e);
    this.data.data.time = format
    this.setData({
      data: this.data.data
    })
  },
  onSendChange(value, item) {
    this.data.data.send = value
    this.setData({
      data: this.data.data
    })
  },
  onBackChange(value, item) {
    this.data.data.back = value
    this.setData({
      data: this.data.data
    })
  },
  onRemarkChange(value, ...args) {
    console.log(value, ...args)
    this.data.data.remark = value
    this.setData({
      data: this.data.data
    })
  },
  choiceAddress() {
    user.choiceAddress()
  },
  onUse() {
    if (!this.data.data.send) {
      showMsg('请选择取衣地址')
    } else if (!this.data.data.back) {
      showMsg('请选择净衣地址')
    } else if (!this.data.data.time) {
      showMsg('请选择上门时间')
    } else {
      orderInfo.useOrder(this.data.data)
    }
  }
})