interface Props {
  message: string;
  isShow: boolean;
}

export default function Message({ message, isShow }: Props) {
  return isShow ? <div>{message}</div> : null;
}
