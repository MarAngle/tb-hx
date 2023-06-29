import ProductList from './class/ProductList'

const hotProductList = new ProductList({
  prop: 'hotProductList',
  params: {
    status: "tradeItemList"
  },
  service: {
    url: '/tb_api/api/TradeItem.php'
  }
})

export default hotProductList
