import { Box, ESvgType, IQuestionProps, Image, Input, Label, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';
import empty_square from '@/assets/icon/math_empty_square.svg';

const EM04101 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Label type='icon' value={2} marginRight={12} />
        꼭짓점과 변 중에서 알맞은 말을&nbsp;
        <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
        &nbsp;안에 써넣으세요.
      </Box>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box hAlign='center' vAlign='center' position='relative'>
        <Box position='absolute' top='-10px' left='24%' transform='translateX(-5px)'>
          <Input width='130px' ariaLabel='선과 선이 만나는 점' value={input1} onChange={e => setInput1(e.target.value)} />
        </Box>

        <Image src='/example/MC31232.jpg' width='321px' height='238px' />

        <Box position='absolute' top='-25px' left='63%' transform='translateX(-5px)'>
          <Input width='130px' ariaLabel='점과 점을 이은 선' value={input2} onChange={e => setInput2(e.target.value)} />
        </Box>
      </Box>
    </Container>
  );
};

export default EM04101;
