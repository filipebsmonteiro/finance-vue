import auth from "./auth";

const routes = [
  {
    path: "/",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue"), meta: { title: 'Dashboard' } },
      {
        path: "balanco",
        name: "balanco",
        component: () => import("pages/Balance/Index.vue"),
        meta: { title: 'Balanço Patrimonial' }
      }
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
