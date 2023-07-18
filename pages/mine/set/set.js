import user from "../../../data/user";
import { createLifePage } from "../../../utils/page";

Page(createLifePage({
  data: {},
  logout() {
    user.$reset()
    my.navigateTo({
      url: '/pages/login/index'
    })
  },
  changePage({target}) {
    my.navigateTo({
      url: target.dataset.pageUrl
    });
  }
}, {
  load() {
    user.$bindPage(this)
  }
}))