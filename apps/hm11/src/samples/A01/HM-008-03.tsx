import { useState } from 'react';
import { Box, Button, EStyleFontSizes, Label, TMainHeaderInfoTypes, Typography, EStyleSizes, EStyleButtonTypes } from '@maidt-cntn/ui';
import { HContainer } from '@maidt-cntn/ui/math';

const HM00803 = () => {
  const [show, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '다항식의 덧셈과 뺄셈',
    headerPattern: 'icon',
    headerTextColor: 'var(--color-h-math-primary-strong)',
    iconType: 'thinkOpen',
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <Typography fontSize='28px' lineHeight='42px' usePre useGap={false}>
        &nbsp; 다항식의 덧셈은&nbsp;
        <Typography useGap={false} useSticker fontSize='28px' lineHeight='42px'>
          동류항
        </Typography>
        끼리 모아서 정리한다. 또, 다항식의 뺄셈은 빼는 식의 각 항의&nbsp;
        <Typography useGap={false} useSticker fontSize='28px' lineHeight='42px'>
          부호
        </Typography>
        를 바꾸어서 더한다.
      </Typography>
      <Box vAlign='center' marginTop='24px'>
        <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(true)} aria-label='개념 설명'>
          <Label type='arrow' title='오른쪽 화살표' direction='right' background='var(--color-h-math-border-strong)' />
        </Button>
        <Box opacity={show ? '1' : '0'} padding='12px 16px' background='var(--color-h-math-blue-gb)' useRound>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>다항식에서 문자와 차수가 각각 같은 항을 동류항이라고 한다.</Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00803;
