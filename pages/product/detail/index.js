import productInfo from "../../../data/productInfo";
import productList from "../../../data/productList";
import { showAlert } from "../../../utils";
import { createLifePage } from "../../../utils/page";

Page(createLifePage({
  data: {
    [productInfo.$prop]: productInfo,
    list: [],
    resourceniche: '3'
  },
  createOrder() {
    productInfo.$triggerMethod('createOrder', [], true).then((res) => {
      if (res.success) {
        my.navigateTo({
          url: '/pages/pay/success?payId=' + productInfo.payId
        })
      } else {
        my.navigateTo({
          url: '/pages/order/index?type=isOrder'
        })
      }
    }).catch(err => {
      console.error(err)
    })
  },
  createList() {
    this.data.list = [...productList.list]
    let list = []
    for (let i = 0; i < productList.list.length; i++) {
      const item = productList.list[i];
      if (item.commodity_resourceniche_id != this.data.resourceniche) {
        list.push(item)
      }
    }
    this.data.list = list
    this.setData({
      list: this.data.list
    })
  },
}, {
  load(query) {
    if (query && query.id) {
      productInfo.setId(query.id)
    }
    productInfo.$appendPage(this)
  },
  show() {
    if (!productInfo.id) {
      my.navigateBack(1)
      return
    }
    productInfo.$loadData(true).then(() => {}, err => {
      // showAlert(err)
      my.navigateBack(1)
    })
    productList.$bindPage(this)
    productList.$onLife('loaded', {
      immediate: true,
      data: () => {
        this.createList()
      }
    })
  }
}));
