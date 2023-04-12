import { Repository } from "src/repositories/Base/Repository";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  TwitterAuthProvider,
} from "firebase/auth";
import Firebase from "src/boot/firebase";

class Login extends Repository {
  //endpoint = null

  login(provider) {
    if (provider === `google`) provider = GoogleAuthProvider;
    if (provider === `facebook`) provider = FacebookAuthProvider;
    if (provider === `apple`) provider = OAuthProvider;
    if (provider === `github`) provider = GithubAuthProvider;
    if (provider === `microsoft`) provider = OAuthProvider;
    if (provider === `twitter`) provider = TwitterAuthProvider;

    const providerInstance = new provider();
    return signInWithPopup(Firebase.auth, providerInstance);
  }

  logout() {
    return signOut(Firebase.auth);
  }

}

export default new Login()
