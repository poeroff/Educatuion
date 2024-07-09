import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, Image, Input, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

interface IPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const EM40901 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '주변에서 볼 수 있는 물건의 각도를 재어 보세요.',
  };

  const [value1, setValue1] = useState<string>(' ');
  const [value2, setValue2] = useState<string>(' ');
  const [value3, setValue3] = useState<string>(' ');
  const [value4, setValue4] = useState<string>(' ');
  const [value5, setValue5] = useState<string>(' ');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background='var(--color-white)'
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
    >
      <BoxWrap justifyContent='space-between' marginTop='77.5px' useFull>
        <Box position='relative'>
          <Image src='/example/EM-409-01/EM40901_tria1.jpg' alt='세 각이 표시된 삼각자가 있어요.' width='396px' height='196px' />
          <InputWrapper position={{ top: '5px', right: '106px' }}>
            <Input width='98px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='각도를 적어주세요.' />
          </InputWrapper>
          <InputWrapper position={{ top: '104px' }}>
            <Input width='98px' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='각도를 적어주세요.' />
          </InputWrapper>
          <InputWrapper position={{ top: '107px', right: '8px' }}>
            <Input width='98px' value={value3} onChange={e => setValue3(e.target.value)} ariaLabel='각도를 적어주세요.' />
          </InputWrapper>
        </Box>
        <Box position='relative'>
          <Image
            src='/example/EM-409-01/EM40901_tria2.jpg'
            alt='세 각이 표시된 삼각자가 있어요. 이 중 위에 있는 각은 60도 예요.'
            width='351.27px'
            height='249px'
          />
          <InputWrapper position={{ bottom: '77px', left: '22px' }}>
            <Input width='98px' value={value4} onChange={e => setValue4(e.target.value)} ariaLabel='각도를 적어주세요.' />
          </InputWrapper>
          <InputWrapper position={{ bottom: '77px', right: '39px' }}>
            <Input width='98px' value={value5} onChange={e => setValue5(e.target.value)} ariaLabel='각도를 적어주세요.' />
          </InputWrapper>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM40901;

const InputWrapper = styled.div<{ position?: IPosition }>`
  position: absolute;
  ${({ position }) =>
    position &&
    `
      top: ${position.top ? position.top : 'unset'};
      bottom: ${position.bottom ? position.bottom : 'unset'};
      left: ${position.left ? position.left : 'unset'};
      right: ${position.right ? position.right : 'unset'};
    `}
`;
