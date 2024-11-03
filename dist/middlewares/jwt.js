"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "jwt", {
    enumerable: true,
    get: function() {
        return jwt;
    }
});
const _errors = require("../errors");
const _middlewares = require(".");
const _jsonwebtoken = require("jsonwebtoken");
const _User = require("../models/User");
const jwt = (0, _middlewares.endpoint)(async (req, res, next)=>{
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new _errors.HTTPError('Unauthorized', 401);
    }
    const token = authorization.slice('Bearer '.length);
    try {
        const decoded = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET);
        const user = await _User.User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: 'Usuário inexistente'
            });
        }
        req.user = user;
        return next();
    } catch (_error) {
        throw new _errors.HTTPError('Unauthorized', 401);
    }
});

//# sourceMappingURL=jwt.js.map