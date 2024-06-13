export const AUTH_ERROR_MESSAGE = {
  emailRequired: "이메일을 입력해주세요.",
  invalidEmailFormat: "잘못된 이메일 형식입니다.",
  nicknameRequired: "닉네임을 입력해주세요.",
  invalidNicknameFormat:
    "닉네임은 3자 이상 15자 이하이며, 알파벳, 숫자, 밑줄(_)만 포함할 수 있습니다",
  passwordRequired: "비밀번호를 입력해주세요.",
  passwordMinLength: "비밀번호를 8자 이상 입력해주세요.",
  passwordMismatch: "비밀번호가 일치하지 않습니다.",
};

export const AUTH_REGEX = {
  email:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  nickname: /^[a-zA-Z0-9._]{3,15}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};
