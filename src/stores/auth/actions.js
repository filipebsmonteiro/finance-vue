// import Auth from "src/repositories/Auth/Login";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import { SessionStorage } from "quasar";
import Firebase from "src/boot/firebase";
import constants from "src/boot/providers/constants";

export async function login(provider) {
  this.loading = true
  try {
    if (provider === `google`) provider = GoogleAuthProvider;
    if (provider === `facebook`) provider = FacebookAuthProvider;
    if (provider === `apple`) provider = OAuthProvider;
    if (provider === `github`) provider = GithubAuthProvider;
    if (provider === `microsoft`) provider = OAuthProvider;
    if (provider === `twitter`) provider = TwitterAuthProvider;

    const providerInstance = new provider();
    await signInWithPopup(Firebase.auth, providerInstance)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = provider.credentialFromResult(result);
        this.token = credential.accessToken;

        // The signed-in user info.
        this.user = result.user;
        SessionStorage.set(constants.storage.session.USER, result.user)
        SessionStorage.set(constants.storage.session.AUTH_TOKEN, credential.accessToken)
        SessionStorage.set(constants.storage.session.AUTH_EXPIRATION, result._tokenResponse.oauthExpireIn)
      })

  } catch (error) {
    console.log("error :>> ", error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("errorCode :>> ", errorCode);
    console.log("errorMessage :>> ", errorMessage);

    // The email of the user's account used.
    const email = error.customData.email;
    console.log("email :>> ", email);

    // The AuthCredential type that was used.
    const credential = provider.credentialFromError(error);
    console.log("credential :>> ", credential);
  }
  this.loading = false
}

export async function logout(context) {
  return await Promise.resolve(true)
}

// export async function loadUserAvatar(context, user_id) {
//   try {
//     await Login.loadUserAvatar(user_id)
//       .then(response => {
//         const reader = new FileReader()
//         reader.readAsDataURL(response.data)
//         console.log('new FileReader', reader.result)

//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         console.log('window.URL.createObjectURL', url)
//         // const link = document.createElement('a');
//         // link.href = url;
//         // link.setAttribute('download', 'file.pdf'); //or any other extension
//         // document.body.appendChild(link);
//         // link.click();

//       })
//   } catch (e) {
//     // supress
//   }
// }
