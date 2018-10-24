export default {
  Password(password) {
    return function Password() {
      return password;
    };
  },
  PhoneNumber(phoneNumber) {
    return function PhoneNumber() {
      return phoneNumber;
    };
  }
};
