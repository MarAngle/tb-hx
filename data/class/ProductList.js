import BaseData from "../../class/BaseData"
import require from "../../utils/require";

class ProductList extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.service = initOption.service
    if (!this.service.method) {
      this.service.method = 'post'
    }
    if (!this.service.data) {
      this.service.data = 'data'
    }
    this.$params = initOption.params || {}
    this.$appendMethod('getSearch', initOption.getSearch)
    this.$appendMethod('formatData', initOption.formatData)
    this.list = []
  }
  $getSearch() {
    if (this.getSearch) {
      return this.getSearch()
    } else {
      return {}
    }
  }
  formatData(resList = []) {
    let list = []
    for (let i = 0; i < resList.length; i++) {
      const item = this.parseData(resList[i])
      list.push(item)
    }
    this.list = list
  }
  parseData(originData) {
    const price = {
      data: originData.selling_price,
      origin: originData.original_price
    }
    price.discounted = price.origin - price.data
    price.show = {
      data: (price.data / 100).toString(),
      discounted: (price.discounted / 100).toString()
    }
    const data = {
      id: originData.commodity_id,
      cateId: originData.commodity_zone_id,
      skuId: originData.sku_id, // 外部商品ID
      aliId: originData.model_id, // 阿里商品ID
      name: originData.commodity_name,
      label: '特惠',
      desc: originData.commodity_marketing,
      commodity_resourceniche_id: originData.commodity_resourceniche_id, // 资源位ID
      import: '拒用"四氯"健康洗',
      icon: originData.main_pic[0],
      price: price,
      sale: originData.sold_quantity,
      evaluate: originData.evaluate,
      mainPic: originData.main_pic,
      detailPic: originData.detail_pic
    }
    return data
  }
  $getData() {
    return new Promise((resolve, reject) => {
      const search = this.$getSearch()
      require[this.service.method]({
        url: this.service.url,
        [this.service.data]: {
          ...this.$params,
          ...search
        },
        timeout: 0,
        token: false
      }).then(res => {
        console.log(res)
        this.formatData(res.data)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default ProductList
