import { useState } from 'react';
import { Box, Typography, TMainHeaderInfoTypes, IQuestionProps, SvgIcon, Recorder } from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';

import green from '../../assets/icon/green_person.svg';
import blue from '../../assets/icon/blue_person.svg';

const ME11201 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Speaking',
  };

  const questionInfo: IQuestionProps = {
    type: 'number',
    number: '7',
    text: '대화를 완성해 봅시다.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='완료하기'
    >
      <Box hAlign='center' useFull>
        <Box>
          <Box vAlign='center'>
            <SvgIcon src={green} size='48px' />
            <Box marginLeft={14}>
              <Balloon place='left' backgroundColor='var(--color-green-100)' isShadow>
                <Typography>My name is Alicia. Nice to meet you.</Typography>
              </Balloon>
            </Box>
          </Box>
          <Box vAlign='center' marginTop='24px' padding='14px 0'>
            <SvgIcon src={blue} size='48px' />
            <Box marginLeft='24px'>
              <Recorder recorderIndex={0} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ME11201;
