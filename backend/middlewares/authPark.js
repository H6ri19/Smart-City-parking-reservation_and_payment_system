import jwt from 'jsonwebtoken';

const authPark = async (req, res, next) => {
  try {
    let dtoken;

    // Case 1: Authorization header (Bearer token)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      dtoken = req.headers.authorization.split(' ')[1];
    }
    // Case 2: Custom header (dtoken)
    else if (req.headers.dtoken) {
      dtoken = req.headers.dtoken;
    }

    if (!dtoken) {
      return res
        .status(401)
        .json({ success: false, message: 'Not Authorized. Login again.' });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.parkId = decoded.id;
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    res
      .status(401)
      .json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authPark;

// import jwt from 'jsonwebtoken';

// // admin authentication middleware
// const authPark = async (req, res, next) => {
//   try {
//     const { dtoken } = req.headers;
//     if (!dtoken) {
//       return res.json({
//         success: false,
//         message: 'Not Authorized Login Again',
//       });
//     }
//     const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
//     req.parkId = token_decode.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authPark;

// // middlewares/authUser.js
