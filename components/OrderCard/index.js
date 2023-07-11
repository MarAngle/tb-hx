import orderInfo from "../../data/orderInfo";
import orderList from "../../data/orderList";

Component({
  mixins: [],
  data: {
    showPay: false
  },
  props: {},
  didMount() {
    // console.log('item', this.props)
    const data = this.props.data
    this.setData({
      showPay: !!orderList.checkDataCanPay(data)
    })
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    payOrder() {
      orderList.payOrder(this.props.data).then(() => {
        orderList.changeType('isPay')
      }).catch(err => {
        console.error(err)
      })
    },
    payBack() {
      orderList.payBack(this.props.data).then(() => {}).catch(err => {
        console.error(err)
      })
    },
    use() {
      orderInfo.setData(this.props.data)
      my.navigateTo({
        url: '/pages/order/use/index'
      });
    },
    toDetail() {
      orderInfo.setData(this.props.data)
      my.navigateTo({
        url: '/pages/order/detail/index'
      })
    }
  },
});