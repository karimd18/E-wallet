export const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const generateOtpString = () => {
  return generateOtp().toString();
};
