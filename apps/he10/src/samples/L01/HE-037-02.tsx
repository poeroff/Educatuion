import { Box, BoxWrap, IQuestionProps, Radio, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE03702 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 말하기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '빈 칸에 들어갈 알맞은 단어를 골라 봅시다.',
  };

  const data = [
    {
      text: 'who',
    },
    {
      text: 'whom',
    },
    {
      text: 'which',
    },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='채점하기'
    >
      <Box useFull flexDirection='column' hAlign='center'>
        <Box vAlign='center' padding='48px 30px' hAlign={'center'} background='white' borderRadius={24} useShadow>
          <Box hAlign='center'>
            <Typography>I finished reading the novel </Typography>
            <Box width='100px' height='40px' borderBottom=' 2px solid black' />
            <Box type='hidden'>빈칸 영역</Box>
            <Typography>she recommended.</Typography>
          </Box>
        </Box>
        <BoxWrap marginTop={48}>
          {data.map((value, index) => {
            return (
              <Box flex='1' textAlign='center'>
                <Radio type={'box'} align='vertical' name={'radio-question-A'} label={value?.text} key={index}>
                  {value?.text}
                </Radio>
              </Box>
            );
          })}
        </BoxWrap>
      </Box>
    </Container>
  );
};

export default HE03702;
