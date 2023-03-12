import CheckboxInputWithLabel from 'components/molecule/CheckboxInputWithLabel';
import { FormData } from 'components/organisms/OnBoarding';

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const checkAll = (state: FormData, key: string, value: boolean): FormData => {
  const newState: FormData = {
    ...state,
    [key]: value,
  };
  if (key === 'isCheckedAll') {
    newState.isCheckedAge = value;
    newState.isCheckedTerms = value;
    newState.isCheckedPrivacy = value;
    newState.isCheckedMarketing = value;
  }
  if (
    newState.isCheckedAge &&
    newState.isCheckedTerms &&
    newState.isCheckedPrivacy &&
    newState.isCheckedMarketing
  ) {
    newState.isCheckedAll = value;
  } else if (!value) {
    newState.isCheckedAll = value;
  }
  return newState;
};

export default function StepAgreements({ formData, setFormData }: Props) {
  return (
    <div>
      <h2>서비스 이용약관에 동의해 주세요.</h2>
      <div>
        <CheckboxInputWithLabel
          id="step-all"
          label="모두 동의하기"
          checked={formData.isCheckedAll}
          setValue={(checked: boolean) => {
            setFormData((prevState) =>
              checkAll(prevState, 'isCheckedAll', checked)
            );
          }}
        />
        <CheckboxInputWithLabel
          id="step-age"
          label="(필수) 만 14세 이상입니다."
          checked={formData.isCheckedAge}
          setValue={(checked: boolean) => {
            setFormData((prevState) =>
              checkAll(prevState, 'isCheckedAge', checked)
            );
          }}
        />
        <CheckboxInputWithLabel
          id="step-terms"
          label="(필수) 서비스 이용약관"
          checked={formData.isCheckedTerms}
          setValue={(checked: boolean) => {
            setFormData((prevState) =>
              checkAll(prevState, 'isCheckedTerms', checked)
            );
          }}
        />
        <CheckboxInputWithLabel
          id="step-privacy"
          label="(필수) 개인정보처리방침"
          checked={formData.isCheckedPrivacy}
          setValue={(checked: boolean) => {
            setFormData((prevState) =>
              checkAll(prevState, 'isCheckedPrivacy', checked)
            );
          }}
        />
        <CheckboxInputWithLabel
          id="step-marketing"
          label="(선택) Team Noir 소식 받아보기"
          checked={formData.isCheckedMarketing}
          setValue={(checked: boolean) => {
            setFormData((prevState) =>
              checkAll(prevState, 'isCheckedMarketing', checked)
            );
          }}
        />
      </div>
    </div>
  );
}
