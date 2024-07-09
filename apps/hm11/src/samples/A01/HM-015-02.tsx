import { Box, BoxWrap, ESvgType, Input, Label, SvgIcon, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import icPredicate from '@maidt-cntn/assets/icons/icPredicate.svg';
import img from '../../assets/example/HM-015-02/box_image.svg';
import { useState } from 'react';

const HM01502 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: (
      <BoxWrap boxGap={12}>
        <Box>평가문제</Box>
        <Box>
          <SvgIcon src={icPredicate} type={ESvgType.IMG} alt='발전' />
        </Box>
      </BoxWrap>
    ),
    headerTextColor: 'var(--color-black)',
    headerPattern: 'icon',
    iconType: 'mathFinale',
    headerSubTexts: ['predicate'],
    useExtend: true,
  };

  return (
    <HContainer headerInfo={headerInfo} submitLabel='채점하기' onSubmit={() => !isShow}>
      <BoxWrap boxGap={24} marginTop='10px'>
        <Box>
          <Typography fontSize='var(--font-size-32)' lineHeight='50px' fontWeight='var(--font-weight-semiBold)'>
            <Label type='level' level='middle'>
              <Typography color='var(--color-h-math-primary-normal)' fontSize='var(--font-size-36)' fontWeight='var(--font-weight-extraBold)'>
                17
              </Typography>
            </Label>
            모든 양수
            <MathExpression equation={`$x$`} />에 대하여 세 모서리의 길이가 각각 <MathExpression equation={`$x+1, x+a, x+b$`} />인 직육면체의 부피가
            항상 <MathExpression equation={`$x^3+7x^2+cx+8$`} />과 같다고 한다. 양수 <MathExpression equation={`$a, b, c$`} />에 대하여{' '}
            <MathExpression equation={`$a+b+c$`} />의 값을 구하시오.
          </Typography>
        </Box>
        <Box>
          <SvgIcon src={img} width='195px' height='162px' alt='직육면체의 가로의 길이는 x+1, 세로의 길이는 x+a, 높이는 x+b입니다.' />
        </Box>
      </BoxWrap>
      <Box useFull marginTop='24px'>
        <Box>그리기 도구</Box>
        <BoxWrap justifyContent='end' marginRight='28px' marginTop='12px'>
          <Box vAlign='center' marginRight='24px'>
            <Label
              size='x-small'
              value='답'
              shape='square'
              color='var(--color-white)'
              background='var(--color-h-math-primary-normal)'
              lineColor='none'
            />
          </Box>
          <Input value='' ariaLabel='' width='210px' textAlign='center' onChange={() => {}} />
        </BoxWrap>
      </Box>
    </HContainer>
  );
};

export default HM01502;
