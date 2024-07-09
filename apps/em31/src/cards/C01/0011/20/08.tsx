import { useState } from 'react';
import { IQuestionProps, TMainHeaderInfoTypes, Input, Box, Typography, SvgIcon } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import arrowRight from '@/assets/icon/arrow_right.svg';
import { Container, MathExpression } from '@maidt-cntn/ui/math';

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: '배운 내용 정리',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        뺄셈의 어림셈 알아보기
      </>
    ),
  };

  const [value1, setValue1] = useState<string>(' ');
  const [value2, setValue2] = useState<string>(' ');
  const [value3, setValue3] = useState<string>(' ');
  const [value4, setValue4] = useState<string>(' ');

  const onSubmit = (index: number) => {
    switch (index) {
      case 1:
        setValue1('200');
        break;
      case 2:
        setValue2('700');
        break;
      case 3:
        setValue3('200');
        break;
      case 4:
        setValue4('500');
        break;
    }
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} vAlign='flex-start' background={'var(--color-white)'} useRound>
      <Typography fontSize='32px'>700-198의 어림셈</Typography>
      <Box vAlign='center' hAlign='center' marginTop='50px'>
        <Typography>
          198은&nbsp;
          <Input
            type='button'
            value={value1}
            width='85px'
            onClick={() => {
              onSubmit(1);
            }}
          ></Input>
          으로 어림하여 계산합니다.
        </Typography>
      </Box>
      <Box vAlign='flex-start' hAlign='center' marginTop='24px'>
        <SvgIcon src={arrowRight} size='50px' />
        <Input
          type='button'
          value={value2}
          width='85px'
          onClick={() => {
            onSubmit(2);
          }}
        ></Input>
        <Typography>
          <MathExpression equation={'$-$'} />
        </Typography>
        <Input
          type='button'
          value={value3}
          width='85px'
          onClick={() => {
            onSubmit(3);
          }}
        ></Input>
        <Typography>
          <MathExpression equation={'$=$'} />
        </Typography>
        <Input
          type='button'
          value={value4}
          width='85px'
          onClick={() => {
            onSubmit(4);
          }}
        ></Input>
      </Box>
    </Container>
  );
};

export default P08;
