export default {
  Password(password) {
    return {
      modelType: 'Password',
      modelValue: password != null ? password : '',
    };
  },
  PhoneNumber(phoneNumber) {
    return {
      modelType: 'PhoneNumber',
      modelValue: phoneNumber != null ? phoneNumber : '',
    };
  },
};
