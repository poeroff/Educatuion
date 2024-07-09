import { useState } from 'react';

import { Box, BoxWrap, Input, Label, Typography, SvgIcon, ESvgType, Image } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

import icDevelop from '@maidt-cntn/assets/icons/icDevelop.svg';

const HM01803 = () => {
  const [value, setValue] = useState<string>('');
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: <SvgIcon src={icDevelop} type={ESvgType.IMG} alt='발전' />,
    headerPattern: 'icon',
    iconType: 'mathWrapUp',
    useExtend: true,
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start' submitLabel='채점하기' onSubmit={() => setIsShow(!isShow)}>
      <BoxWrap>
        <Box>
          <Typography fontSize='var(--font-size-32)' weight='var(--font-weight-semiBold)' lineHeight='50px'>
            <Typography fontSize='var(--font-size-36)' weight='var(--font-weight-extraBold)' color='#7F71B3' useGap={false}>
              10
            </Typography>
            &nbsp;오른쪽 그림과 같이 밑면의 가로와 세로의 길이가 각각&nbsp;
            <MathExpression equation={`$a$`} />
            와&nbsp;
            <MathExpression equation={`$b$`} />
            이고 높이가 <MathExpression equation={`$c$`} />인 직육면체의 겉넓이는 94이다. 대각선 <MathExpression equation={`$AG$`} />
            길이가 <MathExpression equation={`$5\\sqrt{2}$`} />일 때, <MathExpression equation={`$a+b+c$`} />의 값을 구하시오.
          </Typography>
        </Box>
        <Box>
          <Image
            src='/example/HM-018-03/M1-1-1-중마-02.png'
            width='261px'
            height='197px'
            alt='직육면체의 가로의 길이는 x+1, 세로의 길이는 x+a, 높이는 x+b입니다.'
          />
        </Box>
      </BoxWrap>

      <Box hAlign='flex-end' marginTop='24px'>
        <Box marginRight='8px'>
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
        <Input name={`value1`} value={value} onChange={e => setValue(e.target.value)} width='210px' ariaLabel='답 입력란' />
      </Box>
    </HContainer>
  );
};

export default HM01803;
