const routes = [
  {
    path: "/auth",
    component: () => import("layouts/LoginLayout.vue"),
    redirect: { name: 'login' },
    children: [
      {
        path: "login",
        name: "auth.login",
        component: () => import("pages/Auth/LoginPage.vue"),
        meta: { title: 'Login' }
      },
    ]
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: { name: 'home' },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("pages/Index.vue"),
        meta: {
          title: 'Home',
          middleware: [`auth`]
        }
      },
      {
        path: "balance",
        name: "balance",
        component: () => import("pages/Balance/Index.vue"),
        meta: { title: 'Balanço Patrimonial' }
      },
      {
        path: "freedom",
        name: 'freedom',
        component: () => import("pages/Freedom/Index.vue"),
        meta: { title: 'Projeção Liberdade Financeira' }
      },
      {
        path: "ipca",
        name: 'ipca',
        component: () => import("pages/IPCA/Index.vue"),
        meta: { title: 'Dados IPCA' }
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error/NotFound.vue"),
  },
];

export default routes;
