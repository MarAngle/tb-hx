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
      const resItem = resList[i];
      const price = {
        data: resItem.selling_price,
        origin: resItem.original_price
      }
      price.discounted = price.origin - price.data
      price.show = {
        data: (price.data / 100).toString(),
        discounted: (price.discounted / 100).toString()
      }
      const item = {
        id: resItem.commodity_id,
        cateId: resItem.commodity_zone_id,
        skuId: resItem.sku_id, // 外部商品ID
        tbId: resItem.model_id, // 阿里商品ID
        name: resItem.commodity_name,
        label: '特惠',
        desc: resItem.commodity_marketing,
        import: '拒用"四氯"健康洗',
        icon: resItem.path,
        price: price,
        sale: resItem.sold_quantity,
        evaluate: resItem.evaluate
      }
      list.push(item)
    }
    this.list = list
  }
  $getData() {
    return new Promise((resolve, reject) => {
      const search = this.$getSearch()
      require[this.service.method]({
        url: this.service.url,
        [this.service.data]: {
          ...this.$params,
          search
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
