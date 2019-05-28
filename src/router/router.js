/* Layout */
import Layout from "@/layout/Layout";

const constantRouterMap = [
  {
    path: "/",
    component: Layout,
    hidden: true,
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
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    meta: { title: "登录" },
    hidden: true,
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
      },
      {
        path: "/admin/setting",
        component: () => import("@/views/setting/index"),
        name: "设置",
        meta: { title: "设置", icon: "index" }
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

export default constantRouterMap;
