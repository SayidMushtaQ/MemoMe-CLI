const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const userExcludePaths = ["/login", "/register", "/verify"];
export { EMAIL_REGEX, userExcludePaths };
