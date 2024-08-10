export const sendVerifyCode = async (userIdentifier) => {
  try {
    const res = await fetch("https://memome-srv.onrender.com/api/v1/auth/sentVerifyCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userIdentifier }),
    });
    return {otpRes:res};
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong during SENDING OTP");
  }
};
