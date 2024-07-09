import { useState } from 'react';
import { Box, Button, EStyleButtonTypes, EStyleFontSizes, EStyleSizes, Label, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM00804 = () => {
  const [show, setShow] = useState<boolean>(false);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: '인수정리',
    headerPattern: 'icon',
    headerTextColor: 'var(--color-h-math-primary-strong)',
    iconType: 'thinkOpen',
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <Typography fontSize='32px' lineHeight='48px' usePre useGap={false}>
        &nbsp; 나머지정리에 의하여 다항식 <MathExpression equation={`\\(f(x)\\)`} />를 일차식 <MathExpression equation={`\\(x-a\\)`} /> 로 나누었을
        때의 나머지가 <MathExpression equation={`\\(f(a)\\)`} /> 이므로, <MathExpression equation={`\\(f(a) = (0)\\)`} />
        이면,&nbsp;
        <Typography useGap={false} useSticker fontSize='32px' lineHeight='48px'>
          <MathExpression equation={`\\(f(x)\\)`} />가 <MathExpression equation={`\\(x-a\\)`} /> 로 나누어떨어짐
        </Typography>
        을 알 수 있다.{'\n'}&nbsp; 또, <MathExpression equation={`\\(f(x)\\)`} />가 <MathExpression equation={`\\(x-a\\)`} /> 로 나누어떨어지면&nbsp;
        <Typography useGap={false} useSticker fontSize='32px' lineHeight='48px'>
          <MathExpression equation={`\\(f(a) = (0)\\)`} />
        </Typography>
        이다.
        {'\n'}
        {'\n'}
        &nbsp; 이상을 정리하면 다음과 같은&nbsp;
        <Typography
          useGap={false}
          useSticker
          fontSize='32px'
          lineHeight='48px'
          weight='var(--font-weight-extraBold)'
          color='var(--color-h-math-yellow-strong)'
        >
          인수정리
        </Typography>
        를 얻는다.
      </Typography>
      <Box vAlign='center' marginTop='24px'>
        <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(true)} aria-label='개념 설명'>
          <Label type='arrow' title='오른쪽 화살표' direction='right' background='var(--color-h-math-border-strong)' />
        </Button>
        <Box opacity={show ? '1' : '0'} padding='12px 16px' background='var(--color-h-math-blue-gb)' useRound>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>
            다항식 <MathExpression equation={`\\(f(x)\\)`} />가 &nbsp;
            <MathExpression equation={`\\(x-a\\)`} />로 나누어떨어지면&nbsp;
            <MathExpression equation={`\\(x-a\\)`} /> 는 <MathExpression equation={`\\(f(x)\\)`} /> 의 인수이다.
          </Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00804;
