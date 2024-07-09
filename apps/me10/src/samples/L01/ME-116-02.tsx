import { useState } from 'react';
import { Box, Typography, TMainHeaderInfoTypes, IQuestionProps, Recorder, Input } from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';

const ME11602 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Tell Your Story',
  };

  const questionInfo: IQuestionProps = {
    text: '자신의 school survival kit에 넣고 싶은 물건을 쓰고 그 이유를 말해봅시다.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='center'
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='완료하기'
    >
      <Box vAlign='center' flexDirection='column'>
        <Balloon place='right' backgroundColor='var(--color-green-100)' isShadow>
          <Typography>I want</Typography>
          <Input minWidth='243px' placeholder='내용을 넣어 주세요' ariaLabel='답 입력란' value={value} onChange={e => setValue(e.target.value)} />
          <Typography>school survival kit.</Typography>
        </Balloon>
        <Box marginTop='24px'>
          <Typography fontSize='18px' lineHeight='28px'>
            이유를 말해보세요.
          </Typography>
          <Box marginTop='4px' hAlign='center'>
            <Recorder recorderIndex={0} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ME11602;
