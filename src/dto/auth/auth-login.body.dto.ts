export type AuthLoginBodyDto = {
  email: string;
  password: string;
};

export const authLoginBodyDtoValidator = (value: AuthLoginBodyDto) => {
  if (!value.email) {
    throw new Error("Password can not be empty");
  }

  if (!value.password) {
    throw new Error("Password can not be empty");
  }

  return;
};
