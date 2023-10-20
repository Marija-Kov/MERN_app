const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
  try {
   const { authorization } = req.headers;
   const token = authorization.split(' ')[1];
   const {_id} = jwt.verify(token, process.env.SECRET);
   req.user = await User.findOne({_id }).select('_id'); 
   next(); 
  } catch (error){
    res.status(401).json({error: 'Request not authorized. Click anywhere to leave this page.'})
  }
}

module.exports = requireAuth;