import banner from "../../data/banner";
import productList from "../../data/productList";
import category from "./../../data/category";
import { createLifePage } from "../../utils/page";

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
    productList.$bindPage(this)
    productList.$onLife('loaded', {
      immediate: true,
      data: () => {
        this.createList()
      }
    })
  }
}));
