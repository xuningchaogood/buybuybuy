import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入样式
import './assets/css/style.css'
//导入vue router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://111.230.232.110:8899/'
//设置让axios发请求默认带cookie
axios.defaults.withCredentials = true;

import moment from 'moment'
//全局过滤器
Vue.filter('formatTime', function (value, format) {
  return moment(value).format(format)
})

//导入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//要use一下
Vue.use(ElementUI)

//设置路由
import index from './components/index.vue'
import detail from './components/detail.vue'
import login from './components/login.vue'
import user from './components/user/user.vue'
import userindex from './components/user/index.vue'
import list from './components/user/list.vue'
import orderdetail from './components/user/detail.vue'
// 设置路由规则
const routes = [
  { path: '/index', component: index },
  { path: '/detail/:id', component: detail },
  { path: '/login', component: login },
  { path: '', redirect: '/index' },
  {
    path: '/user', component: user, beforeEnter: (to, from, next) => {
      //发请求判断
      axios.get("site/account/islogin").then(res => {
        //如果没有登录打回登录页
        if (res.data.code == 'nologin') {
          Vue.prototype.$message.error('请先登录');
          //打回登录页
          router.push('/login');
        } else {
          next()
        }
      })
    },
    children: [
      { path: 'index', component: userindex },
      { path: 'list', component: list },
      { path: 'detail', component: orderdetail },
      {path:'',redirect:'index'},
    ]
  }
]
//实例化路由
const router = new VueRouter({
  routes
})
//挂载路由
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
