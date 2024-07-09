import { useState } from 'react';
import { Box, Button, EStyleButtonTypes, EStyleFontSizes, Label, SvgIcon, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

import icReference from '@maidt-cntn/assets/icons/icReference.svg';
import left from '../../assets/example/HM-008-05/left_border.svg';
import right from '../../assets/example/HM-008-05/right_border.svg';

const HM00805 = () => {
  const [show, setShow] = useState<boolean>(false);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: '',
    headerPattern: 'text',
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <Box marginTop={10} border={'3px solid var(--color-grey-100)'} position='relative' borderRadius={8} padding={'24px 24px 12px 24px'}>
        <Box position='absolute' top='-18px' left='-3px' padding='0px 12px' backgroundColor='var(--color-white)' height='27px'>
          <Box position='absolute' height='27px' left='0px' top='5px' borderRadius='50px' overflow='hidden'>
            <SvgIcon src={left} width='4px' height='27px' />
          </Box>
          <Box position='absolute' right='0px' top='2px' borderRadius='50px' overflow='hidden'>
            <SvgIcon src={right} width='4px' height='32px' />
          </Box>
          <Typography
            useGap={false}
            size={EStyleFontSizes['X-MEDIUM']}
            color='var(--color-header-blue)'
            fontWeight='var(--font-weight-bold)'
            lineHeight='36px'
          >
            다항식의 덧셈에 대한 성질
          </Typography>
        </Box>
        <Box>
          <Box padding='12px 16px'>
            세 다항식{' '}
            <Typography fontStyle='italic' useGap={false}>
              <MathExpression equation={`$A,B,C$`} />
            </Typography>{' '}
            에 대하여
          </Box>
          <Box display='flex' alignItems='center' marginTop={8}>
            <Label type='math_icon' value={1} />
            <Typography>교환법칙</Typography>
            <Typography useGap={false} useSticker>
              <MathExpression equation={`$A+B=B+A$`} />
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            <Label type='math_icon' value={2} />
            <Typography> 결합법칙</Typography>{' '}
            <Typography useGap={false} useSticker>
              <MathExpression equation={`$(A+B)+C=A+(B+C)$`} />
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box vAlign='baseline' marginTop={24}>
        <Button minWidth='70px' style={{ padding: '18px 0 0' }} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(true)} aria-label='참고 설명'>
          <SvgIcon src={icReference} width='100%' height='30px' />
        </Button>
        <Box opacity={show ? '1' : '0'} padding='12px 16px' marginLeft={8}>
          세 다항식의 덧셈에서&nbsp;
          <Typography useGap={false}>
            <MathExpression equation={`(\\(A+B)+C\\)`} />
          </Typography>
          &nbsp; 와&nbsp;
          <Typography useGap={false}>
            <MathExpression equation={`$A+(B+C)$`} />
          </Typography>
          &nbsp;의 결과가 같으므로 이를 보통 괄호 없이&nbsp;
          <Typography fontStyle='italic' useGap={false}>
            <MathExpression equation={`$A+B+C$`} />
          </Typography>
          &nbsp;로 나타낸다.
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00805;
