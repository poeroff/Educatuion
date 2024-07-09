import { useState } from 'react';
import { Box, IQuestionProps, Label, List, Radio, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM10301 = () => {
  const [selectedValue, setSelectedValue] = useState<number>();
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='6' type='icon' />
        33과 39 사이에 있는 수가 아닌 것을 찾아 색칠해 <br />
        보세요.
      </>
    ),
  };

  const numbers = [33, 35, 36, 38];

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound vAlign='flex-start'>
      <List gap={24} data={numbers} align='horizontal'>
        {({ value }) => (
          <Radio name='radio-group' onClick={() => setSelectedValue(value)} value={selectedValue === value}>
            <Box
              width='212px'
              height='70px'
              border={`2px solid ${selectedValue === value ? 'var(--color-blue-300)' : 'var(--color-yellow-300)'}`}
              boxShadow={selectedValue === value ? '0px 4px 4px 0px #00000040' : 'none'}
              background={selectedValue === value ? 'var(--color-blue-50)' : 'transparent'}
              useRound
              hAlign='center'
            >
              <Typography fontSize='var(--font-size-32)' lineHeight='42px'>
                {value}
              </Typography>
            </Box>
          </Radio>
        )}
      </List>
    </Container>
  );
};

export default EM10301;
