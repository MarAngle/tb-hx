import BaseData from "../class/BaseData";
import require from "../utils/require";

class OrderInfo extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.data = {}
  }
  setData(data) {
    this.data = data
    this.$syncPage()
  }
  getWashData() {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Order.php',
        token: true,
        data: {
          status: "tradeOrderStatus",
          order_id: this.data.wash.id
        }
      }).then((res) => {
        this.data.wash.list = res.data
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
  useOrder(data) {
    return new Promise((resolve, reject) => {
      require.post({
        url: '/tb_api/api/Order.php',
        token: true,
        data: {
          status: "tradeWashOrderCreate",
          send: data.send,
          back: data.back,
          reservation_time: data.time + ':00:00',
          remark: data.remark || '无',
          uc_id: this.data.ucId,
          sku_id: this.data.product.skuId,
          freight: this.data.price.freight
        }
      }).then((res) => {
        my.navigateTo({
          url: '/pages/order/index?type=isUse'
        });
        resolve(res)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
}

const orderInfo = new OrderInfo({
  prop: 'orderInfo'
})

export default orderInfo
