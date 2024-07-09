import { ChangeEvent, useState } from 'react';
import { Box, Typography, Input, Label, List, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM04802 = () => {
  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '5',
    text: '길이의 단위를 잘못 사용한 문장을 모두 찾아 기호를 써보세요.',
  };

  const questionListData = [
    {
      number: 'ㄱ',
      question: '줄넘기의 길이는 약 200 m입니다.',
    },
    {
      number: 'ㄴ',
      question: '수학책 긴 쪽의 길이는 약 28 cm입니다.',
    },
    {
      number: 'ㄷ',
      question: '실내화의 길이는 약 220 mm입니다.',
    },
    {
      number: 'ㄹ',
      question: '칠판의 길이는 약 5 km입니다.',
    },
  ];

  const [inputs, setInputs] = useState([{ value: '' }, { value: '' }]);

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
      vAlign='center'
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box type='dashed' padding='8px 24px' useRound width='607px'>
          {questionListData.map(value => (
            <Box vAlign='center' key={value.number}>
              <Label value={value?.number} />
              <Typography weight='var(--font-weight-bold)' lineHeight='48px'>
                {value?.question}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box marginTop='24px'>
          <List align='horizontal' gap={0} data={inputs}>
            {({ value, index = 1 }) => (
              <>
                <Input
                  marginLeft={12}
                  width='52px'
                  value={inputs[index - 1].value}
                  onChange={e => handleModalInputChangeEvent(e, index - 1)}
                  maxLength={1}
                  ariaLabel='기호를 입력하세요'
                />
                {index !== inputs.length && <Typography >,</Typography>}
              </>
            )}
          </List>
        </Box>
      </Box>
    </Container>
  );
};

export default EM04802;
