import orderInfo from "../../../data/orderInfo";

Page({
  data: {
    [orderInfo.$prop]: orderInfo,
    popup: {
      wash: {
        show: false
      },
      re: {
        show: false
      }
    },
    refundPopup: false
  },
  onLoad() {
    orderInfo.$appendPage(this)
  },
  showWashList() {
    this.data.popup.wash.show = true
    this.setData({
      popup: this.data.popup
    })
  },
  hiddenWashList() {
    this.data.popup.wash.show = false
    this.setData({
      popup: this.data.popup
    })
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
  refund() {
    this.setData({
      refundPopup: true
    })
  },
  cancel() {
    this.setData({
      refundPopup: false
    })
  },
  useThali() {
    my.navigateTo({
      url: '/pages/order/use/index'
    });
  },
  refundPage() {
    my.navigateTo({
      url: '/pages/order/refund/refund'
    });
  }
})