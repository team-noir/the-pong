export function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  const locale = 'ko-KR';
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export function formatTime(iso: string) {
  const d = new Date(iso);
  const locale = 'ko-KR';
  return `${d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}
