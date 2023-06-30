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
      // commodity_id: "4"
      // commodity_marketing: "销售语"
      // commodity_marketing_id: "1"
      // commodity_name: "测试套餐2"
      // commodity_resourceniche_id: "1"
      // commodity_zone_id: "0"
      // create_time: "1687952331"
      // detail_pic: ["https://img.alicdn.com/imgextra/i3/2215920109002/O1CN01vDABbw2GMyEtd1UWF_!!2215920109002-0-wsb.jpg"]
      // evaluate: "99"
      // main_pic: ["https://img.alicdn.com/imgextra/i3/2215920109002/O1CN01zEp6s42GMyEooO4qb_!!2215920109002-0-wsb.jpg"]
      // model_id: ""
      // order_by: "1"
      // original_price: "10000"
      // sale_status: "1"
      // selling_price: "990"
      // sku_id: "92001003"
      // sold_quantity: "1234"
      const item = {
        id: resItem.commodity_id,
        cateId: resItem.commodity_zone_id,
        skuId: resItem.sku_id, // 外部商品ID
        tbId: resItem.model_id, // 阿里商品ID
        name: resItem.commodity_name,
        label: '特惠',
        desc: resItem.commodity_marketing,
        import: '拒用"四氯"健康洗',
        icon: resItem.main_pic[0],
        price: price,
        sale: resItem.sold_quantity,
        evaluate: resItem.evaluate,
        mainPic: resItem.main_pic,
        detailPic: resItem.detail_pic
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
    // this.formatData([{"commodity_id":"4","commodity_zone_id":"0","commodity_name":"测试套餐2","sku_id":"92001003","model_id":"","original_price":"10000","selling_price":"990","sold_quantity":"1234","evaluate":"99","order_by":"1","sale_status":"1","commodity_marketing_id":"1","commodity_resourceniche_id":"1","create_time":"1687952331","path":"https://img.alicdn.com/imgextra/i3/2215920109002/O1CN01vDABbw2GMyEtd1UWF_!!2215920109002-0-wsb.jpg","commodity_marketing":"销售语"},{"commodity_id":"5","commodity_zone_id":"0","commodity_name":"测试套餐","sku_id":"92001008","model_id":"3000000535","original_price":"1","selling_price":"1","sold_quantity":"1234","evaluate":"99","order_by":"1","sale_status":"1","commodity_marketing_id":"1","commodity_resourceniche_id":"1","create_time":"1688002819","path":"https://img.alicdn.com/imgextra/i3/2215920109002/O1CN01zEp6s42GMyEooO4qb_!!2215920109002-0-wsb.jpg","commodity_marketing":"销售语"}])
    // return Promise.resolve()
  }
}

export default ProductList
