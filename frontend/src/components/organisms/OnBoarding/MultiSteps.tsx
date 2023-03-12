import Button from 'components/atoms/Button';
import { useState } from 'react';
import Message from 'components/atoms/Message';
import { FormData } from 'components/organisms/OnBoarding';

type FunctionORNull = (() => any) | null;

interface Props {
  formData: FormData;
  stepComponents: React.ReactElement[];
  resultComponent: React.ReactElement;
  validators: FunctionORNull[];
  messages: string[];
}

export default function MultiSteps({
  formData,
  stepComponents,
  resultComponent,
  validators,
  messages,
}: Props) {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const isLastStep = stepIndex === stepComponents.length - 1;

  const handleClickPrevStep = () => {
    if (stepIndex === 0) return;
    setStepIndex((prevState) => prevState - 1);
    setIsValid(true);
  };

  const handleClickNextStep = () => {
    if (isLastStep) {
      setIsSubmitted(true);
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
      <Button type="button" onClick={handleClickPrevStep}>
        &lt;
      </Button>
      <form>{stepComponents[stepIndex]}</form>
      <Message isShow={!isValid} message={messages[stepIndex]} />
      <Button type="button" onClick={handleClickNextStep}>
        {isLastStep ? '완료' : '다음'}
      </Button>
    </>
  );
}
