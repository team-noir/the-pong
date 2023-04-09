import { FormData } from 'components/organisms/OnBoarding';
import CheckboxInputWithLabel from 'components/molecule/CheckboxInputWithLabel';

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
      <h2 className="section-title">서비스 이용약관에 동의해 주세요</h2>
      <div className="my-16">
        <div className="my-4 border border-gray-dark rounded">
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
        </div>
        <ul className="text-sm font-medium text-text-light border border-gray-dark rounded">
          {[
            <CheckboxInputWithLabel
              key="step-age"
              id="step-age"
              label="(필수) 만 14세 이상입니다."
              checked={formData.isCheckedAge}
              setValue={(checked: boolean) => {
                setFormData((prevState) =>
                  checkAll(prevState, 'isCheckedAge', checked)
                );
              }}
            />,
            <CheckboxInputWithLabel
              key="step-terms"
              id="step-terms"
              label="(필수) 서비스 이용약관"
              checked={formData.isCheckedTerms}
              setValue={(checked: boolean) => {
                setFormData((prevState) =>
                  checkAll(prevState, 'isCheckedTerms', checked)
                );
              }}
            />,
            <CheckboxInputWithLabel
              key="step-privacy"
              id="step-privacy"
              label="(필수) 개인정보처리방침"
              checked={formData.isCheckedPrivacy}
              setValue={(checked: boolean) => {
                setFormData((prevState) =>
                  checkAll(prevState, 'isCheckedPrivacy', checked)
                );
              }}
            />,
            <CheckboxInputWithLabel
              key="step-marketing"
              id="step-marketing"
              label="(선택) Team Noir 소식 받아보기"
              checked={formData.isCheckedMarketing}
              setValue={(checked: boolean) => {
                setFormData((prevState) =>
                  checkAll(prevState, 'isCheckedMarketing', checked)
                );
              }}
            />,
          ].map((component, index) => (
            <li
              className="border-b border-gray-dark rounded-sm last:border-none"
              key={index}
            >
              {component}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
