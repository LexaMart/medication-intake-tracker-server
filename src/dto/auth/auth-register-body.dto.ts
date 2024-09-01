export type AuthRegisterBodyDto = {
  email: string;
  password: string;
};

export const authRegisterBodyDtoValidator = (value: AuthRegisterBodyDto) => {
  const emailRegExp = /^[\w.-]+@[a-zA-Z\d.-]+.[a-zA-Z]{2,}$/;
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  if (!emailRegExp.test(value.email)) {
    throw new Error("Email is incorrect");
  }

  if (!passwordRegExp.test(value.password)) {
    throw new Error("Password is incorrect");
  }

  return;
};
