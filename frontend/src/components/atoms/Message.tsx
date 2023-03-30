interface Props {
  message: string;
  isShow: boolean;
}

export default function Message({ message, isShow }: Props) {
  return isShow ? (
    <div className="mt-2 text-sm text-red-600" role="alert">
      {message}
    </div>
  ) : null;
}
