import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
import Form from '@/components/Form'
import Data from '@/components/Data'
import Step from '@/components/step'
import Senior from '@/components/senior'
import Validate from '@/components/Validate'
import Table from '@/components/Table'
import Tag from '@/components/Tag'
import Button from '@/components/Button'
import Tabs from '@/components/Tabs'
import Echarts from '@/components/Echarts'
import Dialog from '@/components/Dialog'
import List from '@/pages/list/List'
import Card from '@/pages/list/CardList'
import Standard from '@/pages/list/StandardList'

Vue.use(Router);

let router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/main',
      alias: '/main',
      name: 'main',
      component: Main,
      meta: {
        title: 'Main'
      },
      children: [
        {
          path: '/main/form',
          alias: '/form',
          name: 'form',
          component: Form,
          meta: {
            title: 'Form',
            icon: 'el-icon-eleme',
            requireAuth: true
          },
          children: [
            {
              path: '/main/form/validate',
              alias: '/validate',
              name: 'validate',
              component: Validate,
              meta: {
                title: '基础表单',
                requireAuth: true
              }
            },
            {
              path: '/main/form/step',
              alias: '/step',
              name: 'Step',
              component: Step,
              meta: {
                title: '分步表单',
                requireAuth: true
              }
            },
            {
              path: '/main/form/senior',
              alias: '/senior',
              name: 'senior',
              component: Senior,
              meta: {
                title: '高级表单',
                requireAuth: true
              }
            }
          ]
        },
        {
          path: '/main/data',
          alias: '/data',
          name: 'data',
          component: Data,
          meta: {
            title: 'Data',
            icon: 'el-icon-upload',
            requireAuth: true
          },
          children: [
            {
              path: '/main/data/table',
              alias: '/table',
              name: 'table',
              component: Table,
              meta: {
                title: 'Table',
                requireAuth: true
              }
            },
            {
              path: '/main/data/tag',
              alias: '/tag',
              name: 'tag',
              component: Tag,
              meta: {
                title: 'Tag',
                requireAuth: true
              }
            }
          ]
        },
        {
          path: '/main/list',
          alias: '/list',
          name: 'list',
          component: List,
          meta: {
            title: 'List',
            icon: 'el-icon-upload',
            requireAuth: true
          },
          children: [
            {
              path: '/main/list/standard',
              alias: '/standard',
              name: 'standard',
              component: Standard,
              meta: {
                title: '标准列表',
                requireAuth: true
              }
            },
            {
              path: '/main/list/card',
              alias: '/card',
              name: 'card',
              component: Card,
              meta: {
                title: '卡片列表',
                requireAuth: true
              }
            }
          ]
        },
        {
          path: '/main/button',
          alias: '/button',
          name: 'button',
          component: Button,
          meta: {
            title: 'Button',
            icon: 'el-icon-s-order',
            requireAuth: true
          }
        },
        {
          path: '/main/tabs',
          alias: '/tabs',
          name: 'tabs',
          component: Tabs,
          meta: {
            title: 'Tabs',
            icon: 'el-icon-s-flag',
            requireAuth: true
          }
        },
        {
          path: '/main/echarts',
          alias: '/echarts',
          name: 'echarts',
          component: Echarts,
          meta: {
            title: 'Echarts',
            icon: 'el-icon-s-data',
            requireAuth: true
          }
        },
        {
          path: '/main/dialog',
          alias: '/dialog',
          name: 'dialog',
          component: Dialog,
          meta: {
            title: 'Dialog',
            icon: 'el-icon-phone',
            requireAuth: true
          }
        }
      ]
    }
  ]
});

export default router

router.beforeEach((to, from, next) => {
  let islogin = localStorage.getItem("islogin");
  islogin = Boolean(Number(islogin));
 
  if(to.path == "/login"){
    if(islogin){
      next("/validate");
    }else{
      next();
    }
  }else{
    // requireAuth:可以在路由元信息指定哪些页面需要登录权限
    if(to.meta.requireAuth && islogin) {
      next();
    }else{
      next("/login");
    }
  }
})