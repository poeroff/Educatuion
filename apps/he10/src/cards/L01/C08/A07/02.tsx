import { Box, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

const P02 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Fun with Grammar',
  };
  const questionInfo = {
    text: 'Upload the songs you found.',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='제출하기'
    >
      <Box>
        {/* ToDo 파일 업로드 Component 추가 */}
        <Box background='blue' height='300px'>
          TODO: 파일 업로드 Component
        </Box>
      </Box>
    </Container>
  );
};

export default P02;
