import orderInfo from "../../../data/orderInfo";
import { showAlert, showMsg } from "../../../utils";

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
      },
      evaluate: {
        show:false,
        rate: 0,
        content: ''
      },
      factory: {
        show: false,
        list: []
      }
    }
  },
  onLoad(query) {
    if (query && query.id) {
      orderInfo.setId(query.id)
    }
    // showMsg('设置单独的订单')
    // orderInfo.setId('tb500000018')
    orderInfo.$appendPage(this)
  },
  onShow() {
    if (!orderInfo.id) {
      my.navigateBack(1)
      return
    }
    this.hiddenWashList()
    this.hideRefundOrder()
    this.hideEvaluate()
    this.hideFactory()
    orderInfo.$loadData(true).then(() => {}, err => {
      // showAlert(err)
      my.navigateBack(1)
    })
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
  onRateChange(value) {
    this.data.popup.evaluate.rate = value
    this.setData({
      popup: this.data.popup
    })
  },
  onContentChange({ detail }) {
    this.data.popup.evaluate.content = detail.value
    this.setData({
      popup: this.data.popup
    })
  },
  showEvaluate() {
    this.data.popup.evaluate.rate = 0
    this.data.popup.evaluate.content = ''
    this.setPopup('evaluate', true)
  },
  hideEvaluate() {
    this.setPopup('evaluate', false)
  },
  onEvaluate() {
    if (!this.data.popup.evaluate.rate) {
      showMsg('请选择星级')
    } else if (!this.data.popup.evaluate.content) {
      showMsg('请输入评价内容')
    } else {
      orderInfo.evaluateOrder(this.data.popup.evaluate).then(() => {
        showMsg('评价成功！')
        this.setPopup('evaluate', false)
        orderInfo.$reloadData(true)
      })
    }
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
  },
  onWashTap(e) {
    let index = e.target.dataset.index
    let washData = orderInfo.data.wash.list[index]
    if (washData.no == '2005') {
      orderInfo.getFactoryPic().then((res) => {
        this.data.popup.factory.list = res.data
        this.setPopup('factory', true)
      }).catch(err => {
        console.error(err)
      })
    } else if (washData.no == '1006') {
      orderInfo.getExpressInfo(washData.no).then((res) => {
        this.data.popup.express.title = '取件物流'
        this.data.popup.express.list = res.data
        this.setPopup('express', true)
      }).catch(err => {
        console.error(err)
      })
    } else if (washData.no == '2008' || washData.no == '2009') {
      orderInfo.getExpressInfo(washData.no).then((res) => {
        this.data.popup.express.title = '送件物流'
        this.data.popup.express.list = res.data
        this.setPopup('express', true)
      }).catch(err => {
        console.error(err)
      })
    }
  },
  hideFactory() {
    this.data.popup.factory.list = []
    this.setPopup('factory', false)
  },
  hideExpress() {
    this.data.popup.express.list = []
    this.data.popup.express.title = ''
    this.setPopup('express', false)
  }
})