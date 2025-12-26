export const generateOtp = (email) => {
  const testEmails = [
    "user@akg7547.uta.cloud",
    "vendor@akg7547.uta.cloud",
    "admin@akg7547.uta.cloud",
  ];

  const otp =
    testEmails.includes(email) ? "999999" : Math.floor(100000 + Math.random() * 900000).toString();

  console.log("OTP generated for", email, "=>", otp);
  return otp;
};
