import { useState } from 'react';
import { Box, Label, List, Scroll, TMainHeaderInfoTypes, Typography, Radio } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const HE01301 = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'What’s in Your School Survival Kit? (3/3)',
  };

  const questionInfo = {
    text: 'Math the underlined words and their correct meaning.',
  };

  const data = [
    { text: 'being done or used instead' },
    { text: 'a group of animals or plants sharing biological characteristics' },
    { text: 'relating to the way in which living things develop over a long period of time' },
  ];

  const handleRowClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Container bodyId='targetContainer' headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box useFull hAlign='center' padding='50px 0px' height='100%'>
        <Box useFull hAlign='center' flexDirection='column' gap='20px'>
          <Box width='910px' vAlign='center' display='inline' alignContent='center' padding='20px' height='30%' background='white' useRound>
            Scientists have discovered a new{' '}
            <Typography useGap={false} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              species
            </Typography>{' '}
            of insect in the mountains.
          </Box>

          <Scroll height='70%' width='910px'>
            <List gap={24} data={data}>
              {({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index - 1 === selectedIndex}
                  onClick={() => handleRowClick(index - 1)}
                >
                  <Box>
                    <Label value={index} /> {value?.text}
                  </Box>
                </Radio>
              )}
            </List>
          </Scroll>
        </Box>
      </Box>
    </Container>
  );
};

export default HE01301;
