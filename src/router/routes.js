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
  {
    path: "/projection",
    component: () => import("layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: 'projection',
        component: () => import("pages/Projection/Basic.vue"),
        meta: { title: 'Projeção Básica' }
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
