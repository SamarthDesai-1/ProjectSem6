const generateOTP = (length) => {

  let otp = "";
  for (let i = 1; i <= length; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
};

module.exports = generateOTP;