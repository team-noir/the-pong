import Button from 'components/atoms/Button';
import { useState } from 'react';
import Message from 'components/atoms/Message';
import { FormData } from 'components/organisms/OnBoarding';
import { ProfileFormType } from 'types/profileFormType';

type FunctionORNull = (() => any) | null;

interface Props {
  formData: FormData;
  stepComponents: React.ReactElement[];
  resultComponent: React.ReactElement;
  validators: FunctionORNull[];
  messages: string[];
  isSubmitted: boolean;
  onSubmit: (formData: ProfileFormType) => void;
}

export default function MultiSteps({
  formData,
  stepComponents,
  resultComponent,
  validators,
  messages,
  isSubmitted,
  onSubmit,
}: Props) {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(true);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === stepComponents.length - 1;

  const handleClickPrevStep = () => {
    if (stepIndex === 0) return;
    setStepIndex((prevState) => prevState - 1);
    setIsValid(true);
  };

  const handleClickNextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLastStep) {
      onSubmit({
        nickname: formData.nickname,
        imageFile: formData.imageFile,
      });
      return;
    }
    if (!validators[stepIndex]?.()) {
      setIsValid(false);
      return;
    }
    setStepIndex((prevState) => prevState + 1);
    setIsValid(true);
  };

  if (isSubmitted) {
    return <>{resultComponent}</>;
  }

  return (
    <>
      {!isFirstStep && (
        <Button type="button" onClick={handleClickPrevStep}>
          &lt;
        </Button>
      )}
      <form onSubmit={handleClickNextStep}>
        {stepComponents[stepIndex]}
        <Message isShow={!isValid} message={messages[stepIndex]} />
        <Button type="submit">{isLastStep ? '완료' : '다음'}</Button>
      </form>
    </>
  );
}
