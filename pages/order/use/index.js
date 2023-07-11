import orderInfo from "../../../data/orderInfo";
import address from "../../../data/address";
import { showMsg } from "../../../utils";

Page({
  data: {
    [orderInfo.$prop]: orderInfo,
    [address.$prop]: address,
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
    address.$appendPage(this)
    address.$loadData().then(() => {
      if (address.data.length == 0) {
        showMsg('请先添加地址')
        this.toAddress()
      }
    })
  },
  toAddress() {
    my.navigateTo({
      url: '/pages/address/index'
    })
  },
  onShow() {},
  handleTriggerPicker(visible, e) {
    console.log('onVisibleChange', visible, e);
  },
  onTimeChange(date, format, e) {
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
  onRemarkChange(value) {
    this.data.data.remark = value
    this.setData({
      data: this.data.data
    })
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