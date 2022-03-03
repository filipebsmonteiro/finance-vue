import CONSTANTS from "src/boot/providers/constants";

export default [
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: 'login',
        name: CONSTANTS.routes.login.name,
        component: () => import('pages/Auth/Login.vue')
      },
      {
        path: 'recuperar',
        name: 'auth.recuperar',
        component: () => import('pages/Auth/Recuperar.vue')
      },
    ]
  },
  // {
  //   path: '/',
  //   component: () => import('layouts/LoginLayout.vue'),
  //   children: [
  //     {
  //       path: 'register',
  //       name: 'register',
  //       component: () => import("pages/User/Form.vue"),
  //       meta: { title: 'Cadastro' }
  //     }
  //   ]
  // }
]
