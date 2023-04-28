import { useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import Button from 'components/atoms/Button';
import { validateChannelTitle } from 'utils/validatorUtils';

interface Props {
  channelTitle: string;
  onClickBack: () => void;
  onSubmit: (title: string) => void;
}

export default function ChannelSettingTitle({
  channelTitle,
  onClickBack,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState<string>(channelTitle);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ChevronLeftIcon
        className="absolute top-4 left-4 h-6 w-6"
        aria-hidden="true"
        onClick={onClickBack}
      />
      <h2 className="section-title">채널 이름 수정</h2>
      <div className="mb-16">
        <TextInputWithMessage
          id="title"
          value={title}
          placeholder="채널 이름을 입력해주세요"
          setValue={(value) => setTitle(value)}
          isValid={isValid}
          setIsValid={(value) => setIsValid(value)}
          validate={validateChannelTitle}
          message="2자 이상 25자 이하로 입력해주세요."
        />
      </div>
      <Button type="submit" primary fullLength>
        저장하기
      </Button>
    </form>
  );
}
