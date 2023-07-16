import productList from "../../data/productList";
import { createLifePage } from "../../utils/page";

Page(createLifePage({
  data: {
    id: undefined,
    title: '',
    list: []
  },
  createList() {
    let list = []
    if (this.data.id) {
      for (let i = 0; i < productList.list.length; i++) {
        const item = productList.list[i];
        if (item.cateId == this.data.id) {
          list.push(item)
        }
      }
    } else {
      list = productList.list
    }
    this.data.list = list
    this.setData({
      list: this.data.list
    })
  }
}, {
  load(query) {
    this.data.id = query.id
    this.data.title = query.name
    productList.$bindPage(this)
    productList.$reloadData()
    productList.$onLife('loaded', {
      immediate: true,
      data: () => {
        this.createList()
      }
    })
  }
}))

