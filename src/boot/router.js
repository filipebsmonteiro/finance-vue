import { onAuthStateChanged } from "firebase/auth";
import constants from "./providers/constants";
import { SessionStorage } from "quasar";
import { useAuthStore } from "src/stores/auth";
import firebase from "./firebase";

export default async ({ router, store }) => {
  router.beforeEach(async ($to, $from, $next) => {
    const { isLogged } = useAuthStore(store);
    if (
      $to.meta &&
      $to.meta.middleware &&
      $to.meta.middleware.includes('auth') &&
      !isLogged
    ) {
      // $next({
      //   name: constants.routes.login.name,
      //   query: { ...$to.query, redirectPath: $to.path }
      // });
      $next({ name: constants.routes.login.name });
      return;
    }

    $next()
  })

  onAuthStateChanged(firebase.auth, (user) => {
    if (user) {
      SessionStorage.set(constants.storage.session.USER, user);
      const authStore = useAuthStore(store);
      authStore.user = user;

      // console.log('authStore :>> ', authStore);
      router.push({ name: `home` })
      // console.log('router :>> ', router);
      // if (window.location.search.split('?').length > 1) {
      //   var params = window.location.search.split('?')[1].split('&');
      //   for (var i = 0; i < params.length; i++) {
      //     var key = params[i].split('=')[0];
      //     var value = decodeURIComponent(params[i].split('=')[1]);
      //     queryString[key] = value;
      //   }
      // }
      // const uri = window.location.search.substring(1);
      // const params = new URLSearchParams(uri);
      // if (params.get("redirectPath")) {
      //   window.location.href = params.get("redirectPath")
      // }
    }
  })

}