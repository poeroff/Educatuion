import { useState } from 'react';

import { Box, Label, Input, List, Typography, SvgIcon, ESvgType } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

import icStandard from '@maidt-cntn/assets/icons/icStandard.svg';

type TValues = { [index: string]: string };

const HM01802 = () => {
  const [values, setValues] = useState<TValues>({});
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: <SvgIcon src={icStandard} type={ESvgType.IMG} alt='표준' />,
    headerPattern: 'icon',
    iconType: 'mathWrapUp',
    useExtend: true,
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start' submitLabel='채점하기' onSubmit={() => setIsShow(!isShow)}>
      <Box padding='7px 0'>
        <Typography useGap={false} fontSize='var(--font-size-32)' weight='var(--font-weight-semiBold)'>
          <Typography useGap={false} color='var(--color-grey-500)' fontSize='var(--font-size-36)' weight='var(--font-weight-extraBold)'>
            0
          </Typography>
          <Typography useGap={false} color='#3099BF' fontSize='var(--font-size-36)' weight='var(--font-weight-extraBold)'>
            1
          </Typography>
          &nbsp; 다음을 만족시키는 두 다항식 <MathExpression equation={`$A$`} />와 <MathExpression equation={`$B$`} />를 구하시오.
        </Typography>
      </Box>

      <Box hAlign='center' marginTop='24px'>
        <Box padding='24px' vAlign='center' flexDirection='column' gap={24} useRound useShadow>
          <MathExpression equation={`$A + B = x^3 - 9x^2 + 4$`} />
          <MathExpression equation={`$2A - B = 2x^3 - 6x^2 - 3x + 2$`} />
        </Box>
      </Box>

      <Box hAlign='flex-end' vAlign='flex-start' marginTop='24px'>
        <Box margin='8px 8px 8px 0'>
          <Label
            value='답'
            type='paint'
            size='x-small'
            shape='square'
            fontSize={20}
            background='var(--color-h-math-primary-normal)'
            color='var(--color-white)'
          />
        </Box>
        <Box>
          <List gap={12} data={['A', 'B']}>
            {({ value: item, index = 0 }) => (
              <Box key={index}>
                <MathExpression equation={`\\(${item}\\)`} />
                <Typography fontSize='var(--font-size-24)'>=</Typography>
                <Input
                  name={`value${index}`}
                  onChange={e => setValues({ ...values, [index]: e.target.value })}
                  width='210px'
                  ariaLabel={`답 입력란`}
                />
              </Box>
            )}
          </List>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM01802;
