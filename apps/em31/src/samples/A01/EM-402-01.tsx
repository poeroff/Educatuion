import {
  Box,
  ESvgType,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Label,
  SvgIcon,
  TextViewTitle,
  TextView,
  Image,
  Input,
  Typography,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import checkSymbol from '@/assets/example/EM-402-01/check_symbol.svg';
import { useState } from 'react';

const EM40101 = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={2} marginRight={12} />
        <Box>
          직각을 모두 찾아 <SvgIcon type={ESvgType.IMG} alt='선분 두개가 만나 직각을 나타내는 모양입니다.' src={checkSymbol} size='32px' /> 표시를
          하고 직각이 각각 몇 개인지 써보세요.
        </Box>
      </>
    ),
  };
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background='var(--color-white)'
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
    >
      <Box margin='0 auto'>
        <Image src='/example/EM-402-01/MC41230.jpg' width='680px' alt='직각이 있는 부채꼴과 직각삼각형과 직사각형이 있습니다.' />
        <BoxWrap width='680px' marginTop='24px'>
          <Box width='33.3333%' textAlign='center'>
            <Input type='number' value={value1} onChange={e => setValue1(e.target.value)} width='48px' /> 개
          </Box>
          <Box width='33.3333%' textAlign='center'>
            <Input type='number' value={value2} onChange={e => setValue2(e.target.value)} width='48px' /> 개
          </Box>
          <Box width='33.3333%' textAlign='center'>
            <Input type='number' value={value3} onChange={e => setValue3(e.target.value)} width='48px' /> 개
          </Box>
        </BoxWrap>
      </Box>
    </Container>
  );
};

export default EM40101;
