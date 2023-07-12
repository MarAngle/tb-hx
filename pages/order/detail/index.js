import orderInfo from "../../../data/orderInfo";
import { showMsg } from "../../../utils";

Page({
  data: {
    [orderInfo.$prop]: orderInfo,
    popup: {
      wash: {
        show: false
      },
      refund: {
        show: false,
        reason: ''
      }
    }
  },
  onLoad() {
    orderInfo.$appendPage(this)
  },
  setPopup(prop, show) {
    this.data.popup[prop].show = show
    this.setData({
      popup: this.data.popup
    })
  },
  showWashList() {
    this.setPopup('wash', true)
  },
  hiddenWashList() {
    this.setPopup('wash', false)
  },
  onShow() {
    if (!orderInfo.id) {
      my.navigateBack(1)
      return
    }
    orderInfo.$reloadData(true)
  },
  copy({target}) {
    my.setClipboard({
      text: target.dataset.orderNum,
      success: () => {
        my.showToast({
          content: '复制成功'
        });
      },
      fail: () => {
        my.showToast({
          content: '复制失败'
        });
      }
    });
  },
  showRefundOrder() {
    this.data.popup.refund.reason = ''
    this.setPopup('refund', true)
  },
  hideRefundOrder() {
    this.setPopup('refund', false)
  },
  onReasonChange(value) {
    this.data.popup.refund.reason = value
    this.setData({
      popup: this.data.popup
    })
  },
  cancelWash() {
    orderInfo.$triggerMethod('cancelWash', [], true).then(() => {
      // my.navigateBack(1)
      showMsg('取消预约成功！')
      orderInfo.$reloadData(true)
    })
  },
  payBack() {
    orderInfo.$triggerMethod('payBack', [this.data.popup.refund.reason], true).then(() => {
      // my.navigateTo({
      //   url: '/pages/order/refund/refund'
      // });
      showMsg('退款成功！')
      this.setPopup('refund', false)
      orderInfo.$reloadData(true)
    })
  },
  useOrder() {
    my.navigateTo({
      url: '/pages/order/use/index'
    });
  }
})