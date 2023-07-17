export const toLogin = function(redirect) {
  my.navigateTo({
    url: '/pages/login/index?redirect=' + redirect
  })
}

export const ruleData = {
  mobile: /^1(3|4|5|6|7|8|9)\d{9}$/
}

export const setLocal = function(key, value) {
  my.setStorageSync({
    key: key,
    data: value
  })
}

export const getLocal = function(key) {
  my.getStorageSync({
    key: key
  })
}

export const confirm = function(content, next, option = {}) {
  const currentOption = {
    title: option.title,
    content: content,
    confirmButtonText: option.okText || '确认',
    cancelButtonText: option.cancelText || '取消'
  }
  if (next) {
    currentOption.success = function({ confirm }) {
      if (confirm) {
        next('ok')
      } else {
        next('cancel')
      }
    }
    currentOption.fail = function() {
      next('fail')
    }
  }
  my.confirm(currentOption)
}

export const showMsg = function(msg, type, option = {}) {
  my.showToast({
    type: type,
    content: msg,
    duration: option.duration || 3000
  })
}

export const showAlert = function(content, title) {
  if (typeof content === 'object') {
    content = JSON.stringify(content)
  }
  my.alert({
    title: title,
    content: content
  })
}
