import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import styled from 'styled-components';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The World of Picasso (3)',
  };
  const questionInfo = {
    text: '해석을 확인해 봅시다.',
  };

  const cubismText = (
    <>
      <EmpasisSpan color={'#EB6707'}>C</EmpasisSpan>
      <EmpasisSpan color={'var(--color-blue-600)'}>u</EmpasisSpan>
      <EmpasisSpan color={'var(--color-pink-700)'}>b</EmpasisSpan>
      <EmpasisSpan color={'var(--color-green-600)'}>i</EmpasisSpan>
      <EmpasisSpan color={'var(--color-red-800)'}>s</EmpasisSpan>
      <EmpasisSpan color={'var(--color-purple-600)'}>m</EmpasisSpan>
    </>
  );

  const data: IListenAndAnswer[] = [
    {
      originText: <>Finally, Picasso began a new art style, {cubismText}.</>,
      translation: <>마지막으로, 피카소는 새로운 예술 양식인 ‘입체주의(큐비즘)’를 시작했습니다.</>,
      inLine: true,
    },
    {
      originText: 'He liked painting faces from the front and from the side.',
      translation: '그는 얼굴을 앞쪽과 옆쪽에서 그리는 것을 좋아했습니다.',
    },
    {
      originText: (
        <>
          So he started painting a face from the front and the side <EmpasisSpan>AT THE SAME TIME!</EmpasisSpan>
        </>
      ),
      translation: '그래서 그는 얼굴을 앞쪽과 옆쪽에서 동시에 그리기 시작했습니다! ',
    },
    {
      originText: 'He became very famous.',
      translation: '그는 매우 유명해졌습니다.',
    },
  ];
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};
export default P02;

const EmpasisSpan = styled.span<{ color?: string }>`
  color: ${props => props.color};
  font-weight: var(--font-weight-extraBold);
`;
