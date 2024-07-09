import { Box, BoxWrap, ESvgType, Input, Label, SvgIcon, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import { useState } from 'react';

import homework from '../../assets/example/HM-026-01/homework.svg';

const HM01204 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFormEvl',
    headerText: <SvgIcon type={ESvgType.IMG} alt='과제' src={homework} width='59px' height='32px' />,
  };

  const [value, setValue] = useState<string>('');

  return (
    <HContainer vAlign='flex-start' headerInfo={headerInfo} useExtend submitLabel='채점하기' onSubmit={() => {}}>
      <Typography fontSize='var(--font-size-32)' lineHeight='48px' weight='var(--font-weight-semiBold)'>
        다음 중 옳은 것을 모두 고르시오.
      </Typography>
      <Box marginTop='24px' flexDirection='column'>
        <Box vAlign='center'>
          <Typography lineHeight='42px'>ㄱ.</Typography>
          <Typography>
            <MathExpression equation={'$(7+2i)-(4-3i)=3+5i$'} />
          </Typography>
        </Box>
        <Box vAlign='center' marginTop='24px'>
          <Typography lineHeight='42px'>ㄴ.</Typography>
          <Typography>
            <MathExpression equation={'$(2+i)(2-i)=3$'} />
          </Typography>
        </Box>
        <Box vAlign='center' marginTop='24px'>
          <Typography lineHeight='42px'>ㄷ.</Typography>
          <Typography fontSize='var(--font-size-36)'>
            <MathExpression equation={`$\\frac{3+2i}{3-2i}+\\frac{5}{13}+\\frac{2}{13}i$`} />
          </Typography>
        </Box>
        <BoxWrap justifyContent='flex-end' alignItems='center' marginTop='12px'>
          <Box>
            <Label size='x-small' value='답' shape='square' type='paint' background='var(--color-h-math-primary-normal)' color='var(--color-white)' />
          </Box>
          <Box>
            <Input placeholder='' name={`value1`} value={value} onChange={e => setValue(e.target.value)} width='257px' ariaLabel={`답 입력란`} />
          </Box>
        </BoxWrap>
      </Box>
    </HContainer>
  );
};
export default HM01204;
