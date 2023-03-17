export function validateAgreements(checkList: boolean[]) {
  // check if every isRequied is true
  return checkList.every((c) => c === true);
}

export function validateNickname(nickname: string) {
  // 2자 이상 16자 이하, 영어 또는 숫자 또는 한글
  const nicknameRegex = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
  return nicknameRegex.test(nickname);
}

export function validateChannelTitle(channelTitle: string) {
  // 2자 이상 25자 이하
  const channelTitleRegex = /^\w{2,25}$/;
  return channelTitleRegex.test(channelTitle);
}

export function validateChannelPassword(password: string) {
  // 4자 이상 10자 이하, 영어 또는 숫자
  const channelPasswordRegex = /^(?=.*[a-z0-9])[a-z0-9]{4,10}$/;
  return channelPasswordRegex.test(password);
}
