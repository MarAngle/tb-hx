import productInfo from "../../../data/productInfo";
import user from "../../../data/user";
import { toLogin } from "../../../utils";

Page({
  data: {
    [productInfo.$prop]: productInfo,
    showModal: false
  },
  onLoad(query) {
    if (!query || !query.id) {
      my.navigateBack(1)
      return
    }
    productInfo.$appendPage(this)
    productInfo.$reloadData(true, query.id)
  },
  close() {
    this.setData({
      showModal: false
    })
  },
  open() {
    if (!user.login) {
      toLogin()
      return

      my.tb.createOrderAndPay({
        additionalRemarks: '',
        additionalPrice: 0,
        logisticsInfo: {
          area: '余杭区',
          divisionCode: 'xxx',
          address: 'xxx',
          post: 'xxxx',
          mobilePhone: 'xxxx',
          town: '五常街道',
          phone: '',
          city: '杭州',
          postFee: 0,
          fullName: 'xxxxx',
          prov: '',
        },
        path: '/order/order',
        outOrderId: '22222222222222222222',
        itemList: [
          {
            outItemId: '92001008',
            itemId: '3000000535',
            amount: 1,
            salePrice: 0,
            realPrice: 1,
          },
        ],
        payAmount: 1,
        discountedPrice: 0,
        fail(res) {
          my.alert({
            content: 'fail == ' + JSON.stringify(res),
          });
        },
        success(res) {
          my.alert({
            content: 'success == ' + JSON.stringify(res),
          });
        },
      })


    }
    // this.setData({
    //   showModal: true
    // })
  },
});
