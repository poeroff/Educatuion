import { Box, Input, List, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM01205 = () => {
  const data = ['√-16', '- √-27'];
  const [values, setValues] = useState<string[]>(Array(data.length).fill(''));

  return (
    <HContainer vAlign='flex-start' headerInfo={null} useExtend submitLabel='풀이' onSubmit={() => {}}>
      <Typography fontSize='var(--font-size-32)' lineHeight='48px' weight='var(--font-weight-semiBold)'>
        다음 수를 허수단위{' '}
        <Typography fontSize='inherit' weight='var(--font-weight-bold)' useGap={false}>
          <MathExpression equation={`$i$`} />
        </Typography>
        를 사용하여 나타내 보자
      </Typography>
      <Box marginTop='24px'>
        <List gap={24} align='horizontal' data={data}>
          {({ value, index = 1 }) => (
            <Box key={index} marginRight='92px' vAlign='center' height='50px' marginBottom='12px'>
              <Typography>
                ({index}) <MathExpression equation={`$${value}$`} />
              </Typography>
              <Input
                inputSize='x-small'
                width='210px'
                value={values[index - 1]}
                onChange={e => {
                  setValues(prev => prev.map((value, idx) => (idx === index - 1 ? e.target.value : value)));
                }}
                marginLeft={24}
              />
            </Box>
          )}
        </List>
      </Box>
    </HContainer>
  );
};
export default HM01205;
