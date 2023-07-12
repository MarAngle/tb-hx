import orderList from "../../data/orderList";

Page({
  data: {
    [orderList.$prop]: orderList
  },
  onLoad(query) {
    orderList.changeType(query.type, true)
    orderList.$appendPage(this)
  },
  onShow() {
    orderList.$reloadData(true)
  },
  search() {
    my.showToast();
  },
  changeOrderType({ target }) {
    orderList.$triggerMethod('changeType', [target.dataset.value], true)
  },
})