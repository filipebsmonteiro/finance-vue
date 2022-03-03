export default {
  saudeCheckin: {
    url: process.env.SAUDECHECKIN_URL,
    clientId: process.env.SAUDECHECKIN_CLIENT_ID,
    clientSecret: process.env.SAUDECHECKIN_CLIENT_SECRET
  },

  googleApiKey: process.env.GOOGLE_API_KEY,
  examProfileUrl: process.env.EXAM_PROFILE_URL,
  agendaUrl: process.env.AGENDA_VEUS_URL,

  stripe: {
    key: process.env.STRIPE_KEY,
    secret: process.env.STRIPE_SECRET
  }
}
