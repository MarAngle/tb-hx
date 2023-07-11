import orderInfo from "../../data/orderInfo";
import orderList from "../../data/orderList";

Component({
  mixins: [],
  data: {
    showPay: false
  },
  props: {},
  didMount() {
    const data = this.props.data
    this.setData({
      showPay: !!orderList.checkDataCanPay(data)
    })
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    payOrder() {
      orderList.$triggerMethod('payOrder', [this.props.data], true).then((res) => {
        my.navigateTo({
          url: '/pages/pay/success'
        })
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