const express = require('express');
require('dotenv').config();
const jwt = require('express-jwt'); // validate jwt and set req.user
const jwksRSA = require('jwks-rsa'); // retreive rsa keys from a json web key  set (jwks) endpoint

const app = express();

let jwtCheck = jwt({
    secret: jwksRSA.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: 'http://localhost:3001',
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});


app.get('/public', (req, res, next) => {
    return res.json({
        message: 'Hello from a public API'
    });
});

app.get('/private', jwtCheck, (req, res, next) => {
    return res.json({
        message: 'Hello from a private API'
    });
});

app.listen(3001, () => {
    console.log(`API server is listening on ${process.env.REACT_APP_AUTH0_AUD}`);
});