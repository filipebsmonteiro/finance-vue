import { Repository } from "src/repositories/Base/Repository";
// import ENVIRNMONET from "src/boot/providers/environment";
// import { saudeCheckin } from "src/boot/axios";

class Login extends Repository {
  endpoint = null

  login(username, password) {
    // return saudeCheckin.post(`oauth/token`, {
    //   grant_type: 'password',
    //   username,
    //   password,
    //   client_id: ENVIRNMONET.saudeCheckin.clientId,
    //   client_secret: ENVIRNMONET.saudeCheckin.clientSecret
    // })
  }

  sendRecoveryEmail(params) {
    // return this.$axios.post(`auth/password/email`, params)
  }

  loadUserInfo() {
    // return this.$axios.useBearerToken().get(`user`)
  }

  loadUserAvatar(user_id) {
    // return axios.get(`${examProfileUrl}/avatar/${user_id}?d${Date.now()}`)
  }
}

export default new Login()
