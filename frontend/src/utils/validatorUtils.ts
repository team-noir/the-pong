export function validateAgreements(checkList: boolean[]) {
  // check if every isRequied is true
  return checkList.every((c) => c === true);
}

export function validateNickname(nickname: string) {
  // 2자 이상 16자 이하, 영어 또는 숫자 또는 한글
  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
  return nicknameRegex.test(nickname);
}
