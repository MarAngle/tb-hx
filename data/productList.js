import ProductList from './class/ProductList'

const productList = new ProductList({
  prop: 'productList',
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
