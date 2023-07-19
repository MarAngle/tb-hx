import banner from "../../data/banner";
import productList from "../../data/productList";
import category from "./../../data/category";
import { createLifePage } from "../../utils/page";

// fresourceniche id: "1", resourceniche na
// 1: {resourceniche id: "2", resourceniche na
// 2: [resourceniche id: "3", resourceniche na
// success: true
// "热销
// ame:
// 0i
// 0i
// e:
// "热销”
// "上新"
// "更多推若

Page(createLifePage({
  data: {
    list: [],
    resourceniche: '1'
  },
  createList() {
    this.data.list = [...productList.list]
    let list = []
    for (let i = 0; i < productList.list.length; i++) {
      const item = productList.list[i];
      if (item.commodity_resourceniche_id == this.data.resourceniche) {
        list.push(item)
      }
    }
    this.data.list = list
    this.setData({
      list: this.data.list
    })
  },
  toProductList({ target }) {
    my.navigateTo({
      url: `/pages/product/index?id=${target.dataset.id}&name=${target.dataset.name}`
    })
  },
  onBanner({ target }) {
    const productId = target.dataset.product
    my.navigateTo({
      url: `/pages/product/detail/index?id=${productId}`
    })
  },
  changeProduct({ target }) {
    const id = target.dataset.id
    if (this.data.resourceniche != id) {
      this.data.resourceniche = id
      this.createList()
      this.setData({
        resourceniche: this.data.resourceniche
      })
    }
  }
}, {
  load() {
    category.$appendPage(this)
    category.$reloadData(true)
    banner.$appendPage(this)
    banner.$reloadData(true)
    productList.$appendPage(this)
    productList.$reloadData()
    productList.$onLife('loaded', {
      immediate: true,
      data: () => {
        this.createList()
      }
    })
  }
}));
