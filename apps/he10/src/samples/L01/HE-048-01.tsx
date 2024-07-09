import { useState } from 'react';
import styled from '@emotion/styled';

import { Box, TMainHeaderInfoTypes, List, Typography, IQuestionProps, Textarea } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE04801 = () => {
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Plan and Write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Choose a book that you want to review and complete the form.',
  };

  const data = [
    {
      color: '#C0E4CB',
      text: 'What kind of valunteer work would you like to do?',
    },
    {
      color: '#FFE199',
      text: 'What made you want to apply for the program?',
    },
    {
      color: '#FCC6CC',
      text: 'What do you expect from the volunteer work?',
    },
    {
      color: '#DCC3FE',
      text: 'When are you available to valunteer?',
    },
  ];

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useExtend
    >
      <Box useFull>
        <Content>
          <List gap={7} data={data}>
            {({ value, index = 1 }) => (
              <Box vAlign='center'>
                <>
                  <Box width={'60px'} height={92} hAlign='center' background={value?.color}>
                    <Typography useGap={false} weight={700}>
                      {index}
                    </Typography>
                  </Box>
                  <Box width={344} marginRight={24}>
                    <Typography>{value?.text}</Typography>
                  </Box>
                </>
                <Box flex={1}>
                  <Textarea placeholder='내용을 넣어 주세요.' width='100%' height='92px' />
                </Box>
              </Box>
            )}
          </List>
        </Content>
      </Box>
    </Container>
  );
};

const Content = styled.div`
  li + li {
    padding-top: 7px;
    border-top: 2px dashed #e0e2e6;
  }
`;

export default HE04801;
