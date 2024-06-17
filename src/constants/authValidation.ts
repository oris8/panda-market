export const AUTH_LIMIT = {
  nicknameMinLength: 3,
  nicknameMaxLength: 15,
  passwordMinLength: 8,
};

export const AUTH_ERROR_MESSAGE = {
  emailRequired: "이메일을 입력해주세요.",
  invalidEmailFormat: "잘못된 이메일 형식입니다.",
  nicknameRequired: "닉네임을 입력해주세요.",
  invalidNicknameFormat: `닉네임은 ${AUTH_LIMIT.nicknameMinLength}자 이상 ${AUTH_LIMIT.nicknameMaxLength}자 이하이며, 알파벳, 숫자, 밑줄(_)만 포함할 수 있습니다`,
  passwordRequired: "비밀번호를 입력해주세요.",
  passwordMinLength: `비밀번호를 ${AUTH_LIMIT.passwordMinLength}자 이상 입력해주세요.`,
  passwordConfirmationRequired: "비밀번호를 다시 한 번 입력해주세요.",
  passwordMismatch: "비밀번호가 일치하지 않습니다.",
};

export const AUTH_REGEX = {
  email:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  nickname: new RegExp(
    `^[a-zA-Z0-9._]{${AUTH_LIMIT.nicknameMinLength},${AUTH_LIMIT.nicknameMaxLength}}$`,
  ),
  password: new RegExp(
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{${AUTH_LIMIT.passwordMinLength},}$`,
  ),
};
