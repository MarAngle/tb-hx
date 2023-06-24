Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {
    console.log('item', this.props)
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    toInfo() {
      console.log(this, 'click')
      my.navigateTo({
        url: '/pages/product/info/index?id=' + this.props.data.id
      })
    },
  },
});