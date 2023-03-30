interface Props {
  children: React.ReactNode;
}

export default function PageTitle({ children }: Props) {
  return <h1 className="text-2xl">{children}</h1>;
}
