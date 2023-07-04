import BaseData from "../class/BaseData"
import require from "../utils/require";

// 1	success	int	是	返回调用结果码，true代表成功 false代表失败
// 3	data	string	否	结果数据，code为0时有数据
// 4	pay_no	string	是	浣洗订单号
// 5	pay_order_id	string	是	手淘订单号
// 6	pay_number	string	是	商品购买数量
// 7	pay_amount	string	是	订单金额 单位分
// 8	commodity_id	string	是	商品id
// 9	commodity_zone_id	string	是	专区id
// 10	commodity_name	string	是	商品名称
// 11	sku_id	string	是	外部商品id
// 12	model_id	string	是	手淘商品id
// 13	original_price	string	是	原始价格 单位分
// 14	selling_price	string	是	售价 单位分
// 15	sold_quantity	string	是	售卖数量
// 16	evaluate	string	是	评价度
// 17	order_by	string	否	商品排序（此处不用）
// 18	sale_status	string	是	商品售卖状态 0下架 1上架
// 19	commodity_marketing	string	是	销售语
// 20	commodity_resourceniche_id	string	是	资源位
// 21	create_time	string	是	创建时间
// 22	main_pic	string[]	是	主图列表
// 23	detail_pic	string[]	是	详情图列表



// "sold_quantity": "1234",
// "evaluate": "99",

// "commodity_marketing_id": "1",
// "commodity_resourceniche_id": "1",
// "create_time": "2023-07-02 18:55:38",



class OrderList extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.type = {
      current: 'total',
      params: {},
      list: [
        {
          value: 'total',
          label: '全部',
          params: {
            status: 'tradeOrderToBePaid'
          }
        },
        {
          value: 'unPay',
          label: '待支付',
          params: {
            status: 'tradeOrderToBePaid'
          }
        },
        {
          value: 'isPay',
          label: '未使用',
          params: {
            status: 'tradeOrderToBePaid'
          }
        },
        {
          value: 'isUse',
          label: '洗护中',
          params: {
            status: 'tradeOrderToBePaid'
          }
        },
        {
          value: 'finished',
          label: '已完成',
          params: {
            status: 'tradeOrderToBePaid'
          }
        },
      ]
    }
    this.list = []
  }
  changeType(current) {
    this.type.current = current || 'total'
    for (let i = 0; i < this.type.list.length; i++) {
      const typeItem = this.type.list[i];
      if (typeItem.value == this.type.current) {
        this.type.params = typeItem.params
        break
      }
    }
    this.$syncPage()
    this.$reloadData(true)
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
        id: resItem.pay_no,
        payId: resItem.pay_order_id,
        payNumber: resItem.pay_number,
        payAmount: resItem.pay_amount,
        itemId: resItem.commodity_id,
        cateId: resItem.commodity_zone_id,
        skuId: resItem.sku_id, // 外部商品ID
        tbId: resItem.model_id, // 阿里商品ID
        name: resItem.commodity_name,
        icon: resItem.main_pic[0],
        price: price,
        desc: resItem.commodity_marketing,
        mainPic: resItem.main_pic,
        detailPic: resItem.detail_pic
      }
      list.push(item)
    }
    this.list = list
  }
  $getData() {
    return new Promise((resolve, reject) => {
      // const search = this.$getSearch()
      require.post({
        url: '/tb_api/api/Order.php',
        data: this.type.params,
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

const orderList = new OrderList({
  prop: 'orderList'
})

export default orderList
