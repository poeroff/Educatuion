import { Box, Label, Typography, Image, Input } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const HM00503 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPrepLearn',
  };

  return (
    <HContainer headerInfo={headerInfo} submitLabel='채점하기' onSubmit={() => !isShow}>
      <Box vAlign='center'>
        <Typography fontWeight='var(--font-weight-semiBold)' fontSize='var(--font-size-32)' lineHeight='50px'>
          <Label
            marginRight={0}
            value='2'
            color='var(--color-white)'
            background='var(--color-h-math-primary-normal)'
            lineColor='none'
            fontSize={30}
            lineHeight={30}
          />
          &nbsp;&nbsp;오른쪽 그림에서 두 점 A와 B가 점 P에서 원 O에 그은 두 접선의 접점일 때,{' '}
          <Box display='inline' borderTop='1px solid var(--color-grey-900)' width='50px'>
            <MathExpression equation={'$PA$'} />
          </Box>
          의 길이를 구하시오.
        </Typography>
        <Image
          width='185px'
          height='120px'
          src='../../assets/example/HM-005-03/M2-1-1-02-12 1.png'
          alt='반지름이 5인 원이 있습니다. 원 밖의 한 점 P에서 원의 중심까지의 거리는 13이고, 점 P에서 원에 접선을 그어 원 위의 각 점을 점 A, 점 B라 합니다.'
        />
      </Box>

      <Box useFull marginTop='24px'>
        <Box hAlign='end'>
          <Label size='x-small' value='답' shape='square' type='paint' background='var(--color-h-math-primary-normal)' color='var(--color-white)' />
          <Box marginLeft='24px'>
            <Input onChange={() => {}} width='257px' textAlign='center' ariaLabel='PA의 길이에 대한 답' />
          </Box>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00503;
