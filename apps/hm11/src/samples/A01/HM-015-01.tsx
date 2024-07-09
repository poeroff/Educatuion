import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';
import { useState } from 'react';

import findout from '../../assets/example/HM-015-01/findout.svg';
import { Box, IQuestionProps, SvgIcon, Typography } from '@maidt-cntn/ui';

const HM01501 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathInqConvg',
    headerText: '재미있는 다항식의 전개식!',
    headerTextColor: 'var(--color-h-math-purple-strong)',
    headerSubTexts: ['communicate', 'inference'],
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Box>
          <SvgIcon src={findout} width='95px' height='47px' />
        </Box>
        <Box marginLeft={12}>
          <Typography fontSize={'var(--font-size-32)'} useGap={false} lineHeight='50px'>
            곱셈 공식 <MathExpression equation={'$(a+b+c)2=a2+b2+c2+2ab+2bc+2ca$'} />를 이용하여 다음이 성립함을 확인해보자.
          </Typography>
        </Box>
      </>
    ),
  };
  return (
    <HContainer headerInfo={headerInfo} questionInfo={questionInfo} submitLabel='완료하기' onSubmit={() => !isShow}>
      <Box useFull>
        <Box>그리기도구</Box>
      </Box>
    </HContainer>
  );
};

export default HM01501;
