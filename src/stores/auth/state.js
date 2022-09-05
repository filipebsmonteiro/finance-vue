export default () => {
  return {
    loading: false,
    user: {
      name: `Visitante`,
      gender: `M`
    },
    avatar: null,
    jwt_token: null,
    expiration_date: null,
    access_token: null,
    refresh_token: null
  }
}
