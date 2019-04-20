import Validate from '../../helpers/validation';
import response from '../../helpers/response';

class UserValidation {
  /**
   *helps validate that the data passed in through the signp end point is as expected
   *
   * @static validateSignup
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns error message that guides for correct use of this endpoint
   * @memberof UserValidation
   */
  static validateSignup(req, res, next) {
    const {
      firstName, lastName, email, phoneNumber, password,
    } = req.body;

    const requiredNotGiven = Validate.requiredFieldIsGiven({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    if (requiredNotGiven) {
      return response.error(res, 400, requiredNotGiven);
    }

    const isStringNotValid = Validate.stringType({
      firstName,
      lastName,
      password,
    });

    if (isStringNotValid) {
      return response.error(res, 400, isStringNotValid);
    }

    const isEmailNotValid = Validate.emailType({ email });
    if (isEmailNotValid) {
      return response.error(res, 400, isEmailNotValid);
    }

    const isPasswordSecure = Validate.minPasswordLength({ password });
    if (isPasswordSecure) {
      return response.error(res, 400, isPasswordSecure);
    }

    const isPhoneNumberNotValid = Validate.phoneNumberValid({ phoneNumber });
    if (isPhoneNumberNotValid) return response.error(res, 400, isPhoneNumberNotValid);

    next();
  }

  /**
   *validates that the expected data are passed to the signin route
   *
   * @static validateSignup
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns error messages to guide users in passing expected input to the signin endpoint
   * @memberof UserValidation
   */
  static validateSignin(req, res, next) {
    const { email, password } = req.body;

    const requiredNotGiven = Validate.requiredFieldIsGiven({ email, password });

    if (requiredNotGiven) return response.error(res, 400, requiredNotGiven);

    next();
  }
}
export default UserValidation;