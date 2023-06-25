export const toLogin = function(redirect) {
  my.navigateTo({
    url: '/pages/login/index?redirect=' + redirect
  })
}