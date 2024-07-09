import { useState } from 'react';

import { Box, TMainHeaderInfoTypes, IQuestionProps, Typography, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const data = ['record', 'alarm', 'comic', 'empty', 'social'];

const ME12603 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Expressions',
  };

  const questionInfo: IQuestionProps = {
    text: '1. 빈칸에 알맞은 말을 골라 써 봅시다.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box hAlign='center' flexDirection='column'>
        <Box width='740px' hAlign='center' flexWrap='wrap' padding='20px 28px' gap='20px 40px' border='1px solid var(--color-grey-600)' useRound>
          {data.map((value, index) => (
            <Box minWidth='192px' textAlign='center' key={index}>
              <Typography>{value}</Typography>
            </Box>
          ))}
        </Box>
        <Box marginTop='36px'>
          <Typography>His</Typography>
          <Input width='271px' placeholder='내용을 넣어 주세요.' ariaLabel='답 입력란' value={value} onChange={e => setValue(e.target.value)} />
          <Typography>clock goes off at 7 o’clock in the morning.</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default ME12603;
