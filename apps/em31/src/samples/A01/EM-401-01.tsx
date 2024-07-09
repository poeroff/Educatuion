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
import empty_square from '@/assets/icon/math_empty_square.svg';
import { useState } from 'react';

const EM40101 = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Label type='icon' value={1} marginRight={12} />
        <TextViewTitle title='보기' />
        에서 알맞은 말을 찾아 &nbsp;
        <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
        &nbsp;안에 써넣으세요.
      </Box>
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
      <BoxWrap justifyContent='center' alignItems='center'>
        <TextView padding='32px 65px' title='보기'>
          <Typography>
            변 <br />
            <br /> 꼭짓점
          </Typography>
        </TextView>
        <Box paddingLeft='130px' position='relative'>
          <Image src='/example/EM-401-01/MC41228.jpg' width='316px' alt='두 선분의 끝이 서로 맞닿아 있다.' />
          <Box position='absolute' top='10px' left='80px'>
            <Input width='130px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='답 입력칸' />
          </Box>
          <Box position='absolute' bottom='20px' left='0'>
            <Input width='130px' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='답 입력칸' />
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM40101;
