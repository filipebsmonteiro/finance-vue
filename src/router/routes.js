import auth from "./auth";

const routes = [
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue"), meta: { title: 'Dashboard' } },
      {
        path: "balance",
        name: "balance",
        component: () => import("pages/Balance/Index.vue"),
        meta: { title: 'Balanço Patrimonial' }
      }
    ],
  },
  {
    path: "/freedom",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: 'freedom',
        component: () => import("pages/Freedom/Index.vue"),
        meta: { title: 'Projeção Liberdade Financeira' }
      },
    ],
  },

  ...auth,


  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
