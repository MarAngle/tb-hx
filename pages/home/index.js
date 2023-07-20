import banner from "../../data/banner";
import hotProductList from "../../data/hotProductList";
import category from "./../../data/category";
import { createLifePage } from "../../utils/page";

const startTime = Date.now()

Page(createLifePage({
  data: {
    list: [],
    resourceniche: '1'
  },
  createList() {
    if (Date.now() - startTime > 4000 || hotProductList.list.length <= 4) {
      this.data.list = hotProductList.list
    } else {
      this.data.list = hotProductList.list.slice(0, 4)
      setTimeout(() => {
        this.createList()
      }, 4000)
    }
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
      this.setData({
        resourceniche: this.data.resourceniche
      })
      this.syncProduct()
    }
  },
  syncProduct() {
    hotProductList.$setExtra('search', {
      select_resourceniche: this.data.resourceniche
    })
    hotProductList.$reloadData(true)
  }
}, {
  load() {
    category.$appendPage(this)
    category.$reloadData(true)
    banner.$appendPage(this)
    banner.$reloadData(true)
    hotProductList.$bindPage(this)
    hotProductList.$bindLifeToPage(this, 'loaded', {
      immediate: true,
      data: () => {
        this.createList()
      }
    })
  },
  show() {
    let needLoad = false
    if (hotProductList.status.load != 'success') {
      // // 未加载
      needLoad = true
    } else {
      const search = hotProductList.$getSearch()
      if (search.select_resourceniche != this.data.resourceniche) {
        needLoad = true
      }
    }
    if (needLoad) {
      this.syncProduct()
    } else {
      this.createList()
    }
  }
}));
