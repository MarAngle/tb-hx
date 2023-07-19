import ProductList from './class/ProductList'

const productList = new ProductList({
  prop: 'productList',
  option: {
    auto: true
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

export default productList
