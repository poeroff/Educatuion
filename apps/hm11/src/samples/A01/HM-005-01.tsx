import { Box, List, Typography, Input, Label } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM00501 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPrepLearn',
  };

  return (
    <HContainer headerInfo={headerInfo} useExtend vAlign='flex-start' submitLabel='채점하기' onSubmit={() => !isShow}>
      <Box vAlign='center' marginLeft='12px'>
        <Label
          size='medium-small'
          type='paint'
          value='1'
          color='var(--color-white)'
          background='var(--color-h-math-primary-normal)'
          fontSize={30}
          lineHeight={30}
        />
        <Typography weight={700} fontSize='32px' lineHeight='50px'>
          &nbsp;다음을 계산하시오.
        </Typography>
      </Box>

      <Box useFull marginTop='24px'>
        <List gap={24} data={['(5a+3b) + (2a-4b) = ', '(x+y-3) - (3x-y-2) = ']}>
          {({ value, index = 1 }) => (
            <Box vAlign='center' key={index}>
              <Typography weight='var(--font-weight-regular)'>({index})</Typography>
              <MathExpression equation={`\\(${value}\\)`} />
              <Box marginLeft={16}>
                <Input inputSize='x-small' width='210px' ariaLabel='답을 입력하세요.' />
              </Box>
            </Box>
          )}
        </List>
      </Box>
    </HContainer>
  );
};

export default HM00501;
