module.exports = {
  database: 'mongodb://root:root1234@ds021711.mlab.com:21711/cafe_ecomm',
  port: 3000,
  secretKey: "Sam1!@#23^4",
  stripeKey: 'sk_test_K36BlvdGefGD64yNpotjj1j6',
  facebook: {
    clientID: process.env.FACEBOOK_ID || '609264509236054',
    clientSecret: process.env.FACEBOOK_SECRET || '26a08f6378a74502706be62b44ae693c',
    profileFields: ['emails', 'displayName'],
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }
}