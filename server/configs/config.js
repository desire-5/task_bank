module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/bank',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access_tokem_secret',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'access_refresh_secret',
    FORGOT_PASSWORD_TOKEN_SECRET: process.env.FORGOT_PASSWORD || 'forgotpass',
    FRONTED_URL: process.env.FRONTED_URL || 'http://localhost:3000',
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200;http://localhost:3000',
};
