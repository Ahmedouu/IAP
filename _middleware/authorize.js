const jwt = require('express-jwt');

const { secret } = require('config.json');
const db = require('_helpers/db');

module.exports = authorize;

function authorize() {
    
    return [
        // authenticate 
        jwt({ secret, algorithms: ['HS256'] }),  
        // attach full user record to request object
        async (req, res, next) => {
            // get user with id from token 'sub'  property
            const user = await db.User.findByPk(req.user.sub);
            // check user still exists
            if (!user)
                return res.status(401).json({ message: 'Unauthorized' });
            // success
            req.user = user.get();  
            next();
        }
    ];
}