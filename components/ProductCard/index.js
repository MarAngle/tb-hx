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
      my.navigateTo({
        url: '/pages/product/info/index?id=' + this.props.data.id
      })
    },
  },
});