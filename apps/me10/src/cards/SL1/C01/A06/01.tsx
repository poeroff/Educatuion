import styled from '@emotion/styled';
import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { Box, IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The World of Picasso (3)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/SL1/C01/A06/ME1-SL1-C01-A06-P01.mp3',
    captionSrc: '/SL1/C01/A06/ME1-SL1-C01-A06-P01.mp3',
    top: -10,
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

  const info: IHE01602Info = {
    altText: '피카소의 입체주의 대표작인 우는 여인을 그리는 피카소',
    text: (
      <Box lineHeight={'48px'}>
        &nbsp;&nbsp;&nbsp;&nbsp;Finally, Picasso began a new art style, {cubismText}. He liked painting faces from the front and from the side. So he
        started painting a face from the front and the side <EmpasisSpan>AT THE SAME TIME!</EmpasisSpan> He became very famous.
      </Box>
    ),
    imageSrc: '/SL1/C01/A03/ME1-SL1-C01-A03-4.jpg',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};
export default P01;

const EmpasisSpan = styled.span<{ color?: string }>`
  color: ${props => props.color};
  font-weight: var(--font-weight-extraBold);
`;
