import Button from 'components/atoms/Button';
import TextInputWithMessage from 'components/molecule/TextInputWithMessage';
import { useState } from 'react';
import { validateChannelTitle } from 'utils/validatorUtils';

interface Props {
  channelTitle: string;
  onClickBack: () => void;
}

export default function ChannelSettingTitle({
  channelTitle,
  onClickBack,
}: Props) {
  const [title, setTitle] = useState<string>(channelTitle);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onClickBack();
    // TODO: 서버로 데이터 전송
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Button type="button" onClick={onClickBack}>
          &lt;
        </Button>
        <h2>채널 이름 수정</h2>
      </div>
      <TextInputWithMessage
        id="title"
        label="채널 이름"
        value={title}
        placeholder="채널 이름을 입력해주세요"
        setValue={(value) => setTitle(value)}
        isValid={isValid}
        setIsValid={(value) => setIsValid(value)}
        validate={validateChannelTitle}
        message="2자 이상 25자 이하로 입력해주세요."
      />
      <Button type="submit">저장하기</Button>
    </form>
  );
}
