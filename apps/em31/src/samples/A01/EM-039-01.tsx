import { ChangeEvent, useState } from 'react';
import { Box, Typography, Input, Label, Question, List, IQuestionProps, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import React from 'react';

const EM03901 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='6' type='icon' />
        나눗셈의 몫이 큰 것부터 차례로 기호를 써 보세요.
      </>
    ),
  };

  const questionListData = [
    {
      number: 'ㄱ',
      question: '72÷9',
    },
    {
      number: 'ㄴ',
      question: '27÷3',
    },
    {
      number: 'ㄷ',
      question: '30÷6',
    },
  ];

  const [inputs, setInputs] = useState([{ value: '' }, { value: '' }, { value: '' }]);

  const handleModalInputChangeEvent = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setInputs(result => result.map((val, idx) => (idx === index ? { value: e.target.value } : val)));
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='start'
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box type='dashed' padding='20px' useRound display='flex' justifyContent='space-around' width='682px'>
          {questionListData.map((value, index) => (
            <Box vAlign='center' key={`box-item-${index}`}>
              <Label value={value?.number} />
              <Box marginLeft='8px'>
                <Typography>{value?.question}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box marginTop='24px'>
          <List align='horizontal' gap={0} data={questionListData}>
            {({ value, index = 1 }) => (
              <React.Fragment key={`list-item-${index}`}>
                <Input width='52px' value={inputs[index - 1].value} onChange={e => handleModalInputChangeEvent(e, index - 1)} maxLength={1} />
                {index !== questionListData.length && <Typography>,</Typography>}
              </React.Fragment>
            )}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default EM03901;
