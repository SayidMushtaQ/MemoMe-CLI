export const sendVerifyCode = async (userIdentifier) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/sentVerifyCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userIdentifier }),
      credentials: 'include'
    });
    return {otpRes:res};
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong during SENDING OTP");
  }
};
