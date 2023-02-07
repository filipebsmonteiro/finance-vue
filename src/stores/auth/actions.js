import Auth from "src/repositories/Auth/Login";

export async function login(context, { email, senha }) {
  context.commit('setLoading', true)
  try {
    await Auth.login(email, senha)
      .then(response => {
        context.commit('setAccessToken', response.data.access_token)
        context.commit('setRefreshToken', response.data.refresh_token)
        context.commit('setExpirationSeconds', response.data.expires_in)
      })
  } catch (e) {
    // supress
  }
  context.commit('setLoading', false)
}

export async function loadUserInfo(context) {
  context.commit('setLoading', false)
  try {
    await Login.loadUserInfo()
      .then(response => {
        let obj = { ...response.data.data, ...response.data.data.attributes }
        delete obj.attributes
        context.commit('setUser', obj)
      })
  } catch (e) {
    // supress
  }
  context.commit('setLoading', false)
}

export async function loadUserAvatar(context, user_id) {
  try {
    await Login.loadUserAvatar(user_id)
      .then(response => {
        const reader = new FileReader()
        reader.readAsDataURL(response.data)
        console.log('new FileReader', reader.result)

        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log('window.URL.createObjectURL', url)
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'file.pdf'); //or any other extension
        // document.body.appendChild(link);
        // link.click();

      })
  } catch (e) {
    // supress
  }
}
