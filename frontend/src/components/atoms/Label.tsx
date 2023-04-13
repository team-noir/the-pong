import { classNames } from 'utils';

interface Props {
  id: string;
  label: string;
  className?: string;
}

export default function Label({ id, label, className }: Props) {
  return (
    <label
      htmlFor={id}
      className={classNames(
        'block text-sm font-medium w-full text-text-light',
        className ? className : ''
      )}
    >
      {label}
    </label>
  );
}
