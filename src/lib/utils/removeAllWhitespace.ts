export default function removeAllWhitespace(inputStr: string): string {
  if (!inputStr) return "";

  /**
   * 주어진 문자열 내의 모든 공백을 제거합니다.
   *
   * @param inputStr - 입력 문자열
   * @returns 모든 공백이 제거된 문자열
   */
  return inputStr.replace(/\s+/g, "");
}
