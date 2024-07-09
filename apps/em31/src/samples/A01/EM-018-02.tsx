import { ChangeEvent, useState } from 'react';

import { Box, IQuestionProps, Input, Question, Radio, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import arrowRight from '@/assets/icon/arrow_right.svg';

const EM01802 = () => {
  const [inputs, setInputs] = useState({
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
  });

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box vAlign='baseline' fontSize={28}>
        <Box marginRight={20}>[5~6]</Box>
        문구점에서 스케치북 1권은 813원, 자 1개는 489원에 할인하여 팝니다. 우진이는 용돈 1200원으로 스케치북 1권과 자 1개를 사려고 합니다. 물음에
        답하세요.
      </Box>
    ),
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
    >
      <Question type='number' number='5'>
        스케치북 1권과 자 1개는 얼마큼일지 어림하는 식을 쓰고, 어림셈을 하여 문장을 완성해 보세요.
      </Question>

      <Box hAlign='center' marginTop='24px'>
        <Input textAlign='center' name='value1' value={inputs.value1} onChange={handleInputChangeEvent} width='130px' ariaLabel='스케치북 1권의 값' />
        <Typography>+</Typography>
        <Input textAlign='center' name='value2' value={inputs.value2} onChange={handleInputChangeEvent} width='130px' ariaLabel='자 1개의 값' />
        <Typography>=</Typography>
        <Input
          textAlign='center'
          name='value3'
          value={inputs.value3}
          onChange={handleInputChangeEvent}
          width='130px'
          ariaLabel='스케치북 1권과 자 1개를 더해 어림한 값'
        />
      </Box>
      <Box vAlign='flex-start' marginTop='24px'>
        <SvgIcon src={arrowRight} size='50px' />
        <Typography>
          어림셈을 하면 스케치북 1권과 자 1개는&nbsp;
          <Input
            textAlign='center'
            name='value4'
            value={inputs.value4}
            onChange={handleInputChangeEvent}
            width='130px'
            ariaLabel='스케치북 1권과 자 1개를 더해 어림한 값'
          />
          &nbsp;원 쯤이므로 1200원으로 살 수 (&nbsp;
          <Radio gap={0} type={'box'} name={'radio-group'} label={'있을'}>
            있을
          </Radio>
          <Typography>,</Typography>
          <Radio type={'box'} name={'radio-group'} label={'없을'}>
            없을
          </Radio>
          &nbsp; ) 것 같습니다.
        </Typography>
      </Box>
    </Container>
  );
};

export default EM01802;
