import banner from "../../data/banner";
import productList from "../../data/productList";
import category from "./../../data/category";
import { createLifePage } from "../../utils/page";

Page(createLifePage({
  data: {
    list: []
  },
  createList() {
    this.data.list = [...productList.list]
    this.setData({
      list: this.data.list
    })
  },
  toProductList({ target }) {
    my.navigateTo({
      url: `/pages/product/index?id=${target.dataset.id}&name=${target.dataset.name}`
    })
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
