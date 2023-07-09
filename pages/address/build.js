
import address from "../../data/address";

Page({
  data: {
    [address.$prop]: address,
    county: [],
    form: {
      name: '',
      mobile: '',
      provinceCity: [],
      county: undefined,
      address: ''
    }
  },
  onLoad() {
  },
  onShow(query) {
    address.$appendPage(this)
    address.loadLocation()
  },
  onLocationChange(valueList) {
    this.data.county = []
    this.data.form.provinceCity = valueList
    this.data.form.county = undefined
    this.setData({
      form: this.data.form,
      county: this.data.county
    })
    address.getCounty(valueList).then(res => {
      this.data.county = res.list
      this.setData({
        county: this.data.county
      })
    })
  },
  onCountyChange(value) {
    this.data.form.county = value
    this.setData({
      form: this.data.form
    })
  },
  onNameChange(value) {
    this.data.form.name = value
    this.setData({
      form: this.data.form
    })
  },
  onMobileChange(value) {
    this.data.form.mobile = value
    this.setData({
      form: this.data.form
    })
  },
  onAddressChange(value) {
    this.data.form.address = value
    this.setData({
      form: this.data.form
    })
  },
  onBuild() {
    if (!this.data.form.name) {
      showMsg('请输入姓名')
    } else if (!this.data.form.mobile) {
      showMsg('请输入手机号')
    } else if (this.data.form.provinceCity.length != 2) {
      showMsg('请选择城市')
    } else if (!this.data.form.county) {
      showMsg('请选择县区')
    } else if (!this.data.form.address) {
      showMsg('请输入详细地址')
    } else {
      address.buildItem({
        name: this.data.form.name,
        mobile: this.data.form.mobile,
        province_name: this.data.form.provinceCity[0],
        city_name: this.data.form.provinceCity[1],
        county_name: this.data.form.county,
        address: this.data.form.address,
      }).then(() => {
        my.navigateBack()
      })
    }
  }
})