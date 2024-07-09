import { useState } from 'react';

import { BoxWrap, Box, Label, Typography, Image, Button, EStyleSizes, EStyleButtonTypes } from '@maidt-cntn/ui';
import { HContainer } from '@maidt-cntn/ui/math';

const HM03001 = () => {
  const [show, setShow] = useState<boolean>(false);
  const [show1, setShow1] = useState<boolean>(false);

  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Typography weight='var(--font-weight-semiBold)' fontSize='var(--font-size-32)' lineHeight='50px'>
        자연수의 나눗셈과 다항식의 나눗셈
      </Typography>
      <BoxWrap marginTop='24px'>
        <Box width={385} borderRight={'1px solid var(--color-h-math-border-normal)'}>
          <Button width='fit-content' size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(!show)}>
            <Label type={'paint'} size={'xxx-small'} background={'var(--color-black)'} />
            <Typography weight='var(--font-weight-bold)'>자연수의 나눗셈</Typography>
            <Image src={'/icons/handPointing.svg'} alt='손가락 아이콘' />
          </Button>
          {show && (
            <Image
              src='/example/HM-030-01/HM_030_01_01.svg'
              alt='117을 8로 나눈 몫은 14이고 나머지는 5입니다. 즉, 117은 8곱하기 14더하기 5가 됩니다.'
              height='319px'
            />
          )}
        </Box>

        <Box flex={1}>
          <Button width='fit-content' size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow1(!show1)}>
            <Label type={'paint'} size={'xxx-small'} background={'var(--color-black)'} />
            <Typography weight='var(--font-weight-bold)'>다항식의 나눗셈</Typography>
            <Image src={'/icons/handPointing.svg'} alt='손가락 아이콘' />
          </Button>
          {show1 && (
            <Image
              src='/example/HM-030-01/HM_030_01_02.svg'
              alt='3x²-5x+6을 x-1로 나눈 몫은 3x-2이고 나머지는 4입니다. 즉, 3x²-5x+6는 x-1곱하기 x-2에서 4를 더한 값입니다.'
              height='319px'
            />
          )}
        </Box>
      </BoxWrap>
    </HContainer>
  );
};

export default HM03001;
