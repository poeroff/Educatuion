import { Box, BoxWrap, IQuestionProps, Radio, Typography, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE03701 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 말하기 연습',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '다음 단어의 알맞은 뜻을 고르세요.',
  };

  const data = [
    {
      text: '완료하다',
    },
    {
      text: '제출하다',
    },
    {
      text: '현대식의',
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
        <Box vAlign='center' width='685px' padding='48px 16px' hAlign='center' background='white' borderRadius={24} useShadow>
          <Typography fontSize='36px' lineHeight='50px' weight='var(--font-weight-bold)'>
            Complete
          </Typography>
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

export default HE03701;
