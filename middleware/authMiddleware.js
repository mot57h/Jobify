import { UnauthenticatedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser =  (request, res, next) => {
  const { token } = request.cookies;
  if (!token)  throw new UnauthenticatedError('authentication invalid');
  
  try {
    const { userId, role } = verifyJWT(token);
    request.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const authorizePermissions = (...roles) => {
  return (request, res, next) => {
    if (!roles.includes(request.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};      