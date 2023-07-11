import orderInfo from "../../../data/orderInfo";
import address from "../../../data/address";
import { showMsg } from "../../../utils";

const currentDate = new Date()
const currentY = currentDate.getFullYear()
const currentM = currentDate.getMonth()
const currentD = currentDate.getDate()
const currentH = currentDate.getHours()
const minH = currentH + 2
let minDate
if (minH > 17) {
  minDate = new Date(currentY, currentM, currentD + 1, 9)
} else {
  minDate = new Date(currentY, currentM, currentD, minH)
}

const maxDate = new Date(currentY, currentM + 3, currentD, 17)

Page({
  data: {
    [orderInfo.$prop]: orderInfo,
    [address.$prop]: address,
    minDate: minDate,
    maxDate: maxDate,
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
    let h = date.getHours()
    if (h < 9 || h > 17) {
      showMsg('可选时间范围为9点-17点！', 'error')
      // this.data.data.time = undefined
    } else {
      this.data.data.time = format
    }
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