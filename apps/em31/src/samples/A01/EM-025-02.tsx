import { Box, Image, IQuestionProps, Input, Label, TMainHeaderInfoTypes, BoxWrap, SvgIcon, ESvgType } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';
import empty_square from '@/assets/icon/math_empty_square.svg';

const EM02502 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Label value={2} type='icon' size='small' />
        &nbsp;그림을 보고&nbsp;
        <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
        &nbsp;안에 알맞은 수를 써넣으세요.
      </Box>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [value4, setValue4] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
    >
      <BoxWrap display='flex' justifyContent='center'>
        <Box>
          <Image src='/example/EC31302.png' alt='꽃 12개가 3개씩 묶여있습니다.' width='396px' height='201px' />
        </Box>
        <Box
          type='dashed'
          useRound
          width='calc(100% - 396px)'
          height='201px'
          padding='0px 20px'
          display='flex'
          justifyContent='center'
          flexDirection='column'
        >
          <Box>
            3씩{' '}
            <Input
              inputSize='small'
              width='52px'
              value={value1}
              onChange={e => setValue1(e.target.value)}
              
              ariaLabel='3씩 몇 묶음인지 적는 입력란'
            />{' '}
            묶음은{' '}
            <Input
              inputSize='small'
              width='130px'
              value={value2}
              onChange={e => setValue2(e.target.value)}
              
              ariaLabel='3의 N묶음이 몇 개인지 적는 입력란'
            />{' '}
            입니다.
          </Box>
          <Box marginTop='24px'>
            3의{' '}
            <Input
              inputSize='small'
              width='52px'
              value={value3}
              onChange={e => setValue3(e.target.value)}
              
              ariaLabel='3의 N배는 몇인지 적는 입력란'
            />{' '}
            배는{' '}
            <Input
              inputSize='small'
              width='130px'
              value={value4}
              onChange={e => setValue4(e.target.value)}
              
              ariaLabel='3의 N배 값을 적는 입력란'
            />{' '}
            입니다.
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM02502;
