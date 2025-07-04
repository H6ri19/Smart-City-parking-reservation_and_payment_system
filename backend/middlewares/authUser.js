// import jwt from 'jsonwebtoken';

// // admin authentication middleware
// const authUser = async (req, res, next) => {
//   try {
//     const { token } = req.headers;
//     if (!token) {
//       return res.json({
//         success: false,
//         message: 'Not Authorized Login Again',
//       });
//     }
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = token_decode.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authUser;

// middlewares/authUser.js
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    let token;

    // Case 1: Authorization: Bearer <token>
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Case 2: Custom token header
    else if (req.headers.token) {
      token = req.headers.token;
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Not Authorized. Login again.' });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    res
      .status(401)
      .json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authUser;
