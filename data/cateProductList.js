import ProductList from './class/ProductList'

const cateProductList = new ProductList({
  prop: 'cateProductList',
  params: {
    status: "tradeItemList"
  },
  service: {
    url: '/tb_api/api/TradeItem.php'
  }
})

export default cateProductList
