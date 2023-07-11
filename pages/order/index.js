import orderList from "../../data/orderList";

Page({
  data: {
    [orderList.$prop]: orderList
  },
  onLoad(query) {
    orderList.changeType(query.type)
    orderList.$appendPage(this)
    orderList.$reloadData(true)
  },
  // onShow(query) {
  //   console.log(query)
  //   orderList.changeType(query.type)
  //   orderList.$appendPage(this)
  //   orderList.$reloadData(true)
  // },
  search() {
    my.showToast();
  },
  changeOrderType({target}) {
    orderList.$triggerMethod('changeType', [target.dataset.value], true)
  },
})