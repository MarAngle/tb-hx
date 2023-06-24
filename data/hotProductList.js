import ProductList from './class/ProductList'

const hotProductList = new ProductList({
  prop: 'hotProductList',
  service: {
    url: 'https://ihuanxi.cn'
  }
})

export default hotProductList
