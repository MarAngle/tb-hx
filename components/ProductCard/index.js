import productInfo from "../../data/productInfo";

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
    toInfo() {
      if (!this.props.show) {
        productInfo.setData(this.props.data)
        my.navigateTo({
          url: '/pages/product/detail/index'
        })
      }
    },
  },
});