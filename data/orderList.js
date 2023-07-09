import BaseData from "../class/BaseData"
import require from "../utils/require";
import productList from "./productList";

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
            status: 'tradeOrderList',
            state: ''
          }
        },
        {
          value: 'unPay',
          label: '待支付',
          params: {
            status: 'tradeOrderList',
            state: 100
          }
        },
        {
          value: 'isPay',
          label: '未使用',
          params: {
            status: 'tradeOrderList',
            state: 200
          }
        },
        {
          value: 'isUse',
          label: '洗护中',
          params: {
            status: 'tradeOrderList',
            state: 201
          }
        },
        {
          value: 'finished',
          label: '已完成',
          params: {
            status: 'tradeOrderList',
            state: 202
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
      const resItem = resList[i]
      const price = {
        data: resItem.pay_amount,
        freight: resItem.freight || 0
      }
      price.show = {
        data: (price.data / 100).toString(),
        freight: (price.freight / 100).toString()
      }
      const item = {
        id: resItem.pay_id, // 订单id
        ucId: resItem.uc_id, // 用户商品id?
        payNo: resItem.pay_no, // 订单号
        aliOrderId: resItem.pay_order_id, // 手淘订单号
        status: resItem.status, // 100待支付 200未使用 201洗护中 202已完成
        payTime: resItem.pay_time, // 支付时间
        price: price,
        wash: {
          id: resItem.order_no, // 洗护
          time: resItem.reservation_time, // 预约时间
          send: resItem.waybill_send, // 取衣地址
          back: resItem.waybill_back, // 送回地址
          createTime: resItem.order_time, // 下单时间
        },
        product: productList.parseData(resItem)
      }
      list.push(item)
    }
    this.list = list
  }
  $getData() {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Order.php',
        data: {
          ...this.type.params,
          pageNumber: 1,
          pageSize: 50
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

const orderList = new OrderList({
  prop: 'orderList'
})

export default orderList
