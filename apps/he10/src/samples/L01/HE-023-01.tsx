import { Box, BoxWrap, List, Scroll, TMainHeaderInfoTypes, Dropdown, Typography, Question } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

const HE02301 = () => {
  const [isShow, setShow] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Grammar in Reading',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Choose the grammatically coreect words for (1) ~ (3).',
  };
  const data = [
    { num: '(1)', dropdownList: ['including', 'included'] },
    { num: '(2)', dropdownList: ['Embracing', 'Embraced'] },
    { num: '(3)', dropdownList: ['who', 'which'] },
  ];

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <BoxWrap useFull>
        <Box useFull useRound lineHeight='48px' paddingRight='16px' marginRight='24px' background='white'>
          <Scroll>
            <Box padding='4px 22px 4px 12px'>
              It is commonly believed that conflict within a team only has negative impacts. For this reason, when
              <Typography textDecoration='underline' weight='bold'>
                (1) including / included
              </Typography>
              in a team, you are often advised to avoid conflict at all costs. While this suggestion seems to make sense, it may not be helpful for
              your team's growth.
              <Typography textDecoration='underline' weight='bold'>
                (2) Embracing / Embraced
              </Typography>
              disagreements and differences, team members can generate more ideas and make better decisions.
            </Box>
          </Scroll>
        </Box>
        <Box>
          <List data={data}>
            {({ value }) => (
              <Box hAlign='center' marginBottom='10px' padding='10px'>
                <Question type='text' size='small'>
                  {value?.num}
                </Question>
                <Dropdown width='225px' marginLeft='10px' dropdownList={value?.dropdownList}></Dropdown>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default HE02301;
