import ProductList from './class/ProductList'

const hotProductList = new ProductList({
  prop: 'hotProductList',
  option: {
    auto: false
  },
  params: {
    status: "tradeItemList"
  },
  service: {
    url: '/tb_api/api/TradeItem.php'
  },
  getSearch() {
    return this.$getExtra('search') || {}
  }
})

export default hotProductList
