import auth from '../helpers/auth';
import responseHandler from '../helpers/response';

const { error } = responseHandler;

class authorization {
  /**
   * Helps create user type
   *
   * @static createUserType
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @memberof authorization
   */
  static async createUserType(request, response, next) {
    const headerAuth = request.header('Authorization');

    if (!headerAuth && !request.body.token) {
      request.body.type = 'client';
      request.isAdmin = false;
      next();
      return;
    }

    const token = request.body.token || headerAuth.split(' ')[1];

    let decoded;
    try {
      decoded = await auth.decodeToken(token);
    } catch (err) {
      return error(response, 401, 'Invalid Token, reauthenticate');
    }

    const { type } = decoded;
    const { isAdmin } = request.body;

    request.body.type = type === 'admin' ? 'staff' : 'client';
    request.body.isAdmin = type === 'admin' ? isAdmin : false;

    next();
  }

  /**
   * Checks if token passed are valid
   *
   * @static requireToken
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @returns
   * @memberof authorization
   */
  static async requireToken(request, response, next) {
    const headerAuth = request.header('Authorization');

    if (!headerAuth && !request.body.token) {
      return error(response, 401, 'Token required');
    }

    const token = request.body.token || headerAuth.split(' ')[1];
    let decoded;

    try {
      decoded = await auth.decodeToken(token);
    } catch (err) {
      return error(response, 401, 'Invalid Token');
    }

    request.body.decoded = decoded;
    next();
  }

  /**
   * Helps protect route to admin users only
   *
   * @static adminSaffOnly
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @returns
   * @memberof authorization
   */
  static adminStaffOnly(request, response, next) {
    const { decoded } = request.body;
    const { type, isadmin } = decoded;

    if (type === 'staff' && isadmin) {
      next();
      return;
    }

    return error(response, 403, 'Not authorized to access this route');
  }

  /**
   * Helps keep out non staff user
   *
   * @static staffOnly
   * @param {object} request
   * @param {object} response
   * @param {object} next
   * @returns
   * @memberof authorization
   */
  static staffOnly(request, response, next) {
    const { decoded } = request.body;
    const { type, id } = decoded;

    if (type === 'staff') {
      request.body.id = id;

      next();
      return;
    }

    return error(response, 403, 'Not authorized to access this route');
  }

  /**
   * helps pass users id through the request body
   *
   * @static generalUser
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @memberof authorization
   */
  static generalUser(request, response, next) {
    const { decoded } = request.body;
    const { id } = decoded;

    request.body.id = id;
    next();
  }

  /**
   * @description Validates that the client accessing
   another user's that it accounts.
   *
   * @static
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @returns
   * @memberof authorization
   */
  static staffOrAccountsOwner(request, response, next) {
    const { decoded, accountOwner } = request.body;
    const { type, id } = decoded;

    if (accountOwner === id || type === 'staff') {
      next();
      return;
    }

    return error(
      response,
      403,
      "You are not Authorized to view this account's details"
    );
  }

  /**
   * @description Validates that the client accessing
   another user's that it accounts.
   *
   * @static
   * @param {*} request
   * @param {*} response
   * @param {*} next
   * @returns
   * @memberof authorization
   */
  static staffAdminEmailOwner(request, response, next) {
    const { decoded, id } = request.body;
    const { type, isadmin } = decoded;

    if (decoded.id === id || (type === 'staff' && isadmin)) {
      next();
      return;
    }

    return error(response, 403, 'You are not Authorized to view this details');
  }
}

export default authorization;
