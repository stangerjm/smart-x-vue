export default {
  Password(password) {
    return function GetPassword() {
      return password;
    };
  },
  PhoneNumber(phoneNumber) {
    return function GetPhoneNumber() {
      return phoneNumber;
    };
  },
};
