import { ReactNode, useState } from 'react';
import { FormData } from 'components/organisms/OnBoarding';
import Header from 'components/molecule/Header';
import Button from 'components/atoms/Button';
import Message from 'components/atoms/Message';
import { ProfileFormType } from 'types';

type ValidatorFunctionOrNull = (() => boolean) | null;

interface Props {
  formData: FormData;
  stepComponents: ReactNode[];
  validators: ValidatorFunctionOrNull[];
  messages: string[];
  onSubmit: (formData: ProfileFormType) => void;
}

export default function MultiSteps({
  formData,
  stepComponents,
  validators,
  messages,
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

  return (
    <>
      {!isFirstStep && (
        <Header noTitle hasBackButton onClick={handleClickPrevStep} />
      )}
      <form
        onSubmit={handleClickNextStep}
        className="container mx-auto max-w-xl min-h-screen py-24 px-4"
      >
        {stepComponents[stepIndex]}
        <Message isShow={!isValid} message={messages[stepIndex]} />
        <Button type="submit" primary fullLength>
          {isLastStep ? '완료' : '다음'}
        </Button>
      </form>
    </>
  );
}
