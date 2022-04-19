module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Usename must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Usename must not be empty";
  } else {
    const regx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;;
    if (!email.match(regx)) {
      errors.email = "Email must be valid";
    }
  }
  if (password === "") {
    errors.password = "Usename must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password must match";
  }
  return {
      errors,
      valid: Object.keys(errors).length < 1
  }
};
