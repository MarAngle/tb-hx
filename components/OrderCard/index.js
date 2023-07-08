import orderInfo from "../../data/orderInfo";

Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {
    // console.log('item', this.props)
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
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