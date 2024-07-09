import { useState } from 'react';
import { Box, Typography, TMainHeaderInfoTypes, IQuestionProps, EStyleSizes, EStyleButtonTypes, Button, Input, Label } from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';

const ME11601 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [value1, setValue1] = useState<string>('');

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Read and Complete',
  };

  const questionInfo: IQuestionProps = {
    text: '빈칸에 알맞은 말을 본문에서 찾아 등장인물이 한 말을 완성해 봅시다.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='채점하기'
    >
      <Box useFull>
        <Box hAlign='flex-end'>
          <Button minWidth='96px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound />
        </Box>
        <Box padding='20px 0'>
          <Box hAlign='flex-start'>
            <Box padding='19px 11px'>
              <Label value={1} />
            </Box>
            <Balloon place='right' backgroundColor='var(--color-pink-100)' isShadow>
              <Typography>I</Typography>
              <Input minWidth='243px' placeholder='내용을 넣어 주세요' ariaLabel='답 입력란' value={value} onChange={e => setValue(e.target.value)} />
              <Typography>my student's names with sticky notes.</Typography>
            </Balloon>
          </Box>

          <Box hAlign='flex-start' marginTop='24px'>
            <Box padding='19px 11px'>
              <Label value={2} />
            </Box>
            <Balloon place='right' backgroundColor='var(--color-purple-100)' isShadow>
              <Typography>With a Band-Aid, I'm</Typography>
              <Input
                minWidth='243px'
                placeholder='내용을 넣어 주세요'
                ariaLabel='답 입력란'
                value={value1}
                onChange={e => setValue1(e.target.value)}
              />
              <Typography>.</Typography>
            </Balloon>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ME11601;
