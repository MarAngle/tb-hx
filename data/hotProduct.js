import ProductList from './class/ProductList'

const hotProduct = new ProductList({
  prop: 'hotProduct',
  service: {
    url: 'http://ihuanxi.cn'
  }
})

export default hotProduct
