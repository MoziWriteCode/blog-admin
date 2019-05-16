import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // getToken from cookie

Vue.use(Router);

/* Layout */
import Layout from "@/layout/Layout";

export const constantRouterMap = [
  {
    path: "/",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "首页",
        meta: { title: "首页", icon: "index" }
      }
    ]
  },
  {
    path: "/login",
    meta: { title: "登录" },
    component: () => import("@/views/login/index")
  },
  {
    path: "/admin",
    component: Layout,
    redirect: "/admin/article",
    children: [
      {
        path: "/admin/article",
        component: () => import("@/views/article/index"),
        name: "文章",
        meta: { title: "文章", icon: "index" }
      },
      {
        path: "/admin/tags",
        component: () => import("@/views/tags/index"),
        name: "标签",
        meta: { title: "标签", icon: "index" }
      },
      {
        path: "/admin/addArticle",
        component: () => import("@/views/addArticle/index"),
        name: "添加文章",
        meta: { title: "添加文章", icon: "index" }
      }
    ]
  }
  // {
  //   path: "/404",
  //   component: () => import("@/views/errorPage/404"),
  //   hidden: true
  // },
  // {
  //   path: "/401",
  //   component: () => import("@/views/errorPage/401"),
  //   hidden: true
  // }
];

const router = new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
const whiteList = ["/login"]; // no redirect whitelist
//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  NProgress.start();
  if (getToken()) {
    if (to.path === "/login") {
      next({
        path: "/"
      });
      NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      next();
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

export default router;
