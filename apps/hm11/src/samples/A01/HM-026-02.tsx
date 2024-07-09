import { useState } from 'react';

import { Box, Button, EStyleButtonTypes, EStyleSizes, ESvgType, Label, SvgIcon, Typography, Image, BoxWrap, List } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

import homework from '../../assets/example/HM-026-01/homework.svg';

const HM02602 = () => {
  const [show, setShow] = useState<boolean>(false);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPrepLearn',
    headerText: <SvgIcon type={ESvgType.IMG} alt='과제' src={homework} width='59px' height='32px' />,
  };

  const data = [
    <>
      이차함수 <MathExpression equation={`$y=ax^2$`} />의 그래프를 <MathExpression equation={`$x$`} />
      축의 방향으로 <MathExpression equation={`$p$`} />
      만큼, <MathExpression equation={`$y$`} />
      축의 방향으로 <MathExpression equation={`$q$`} />
      만큼 평행이동한 것이다.
    </>,
    <>
      직선 <MathExpression equation={`$x=p$`} />를 축으로 하고, 점 <MathExpression equation={`$(p, q)$`} />를 꼭짓점으로 하는 포물선이다.
    </>,
  ];

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <Button width='fit-content' size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} style={{ padding: 0 }} onClick={() => setShow(!show)}>
        <Box vAlign='center'>
          <Typography weight='var(--font-weight-bold)' fontSize='var(--font-size-32)' lineHeight='50px'>
            이차함수 <MathExpression equation={`$y=a(x-p)2+q$`} />의 그래프
          </Typography>
          <Image src={'/icons/handPointing.svg'} alt='손가락 아이콘' />
        </Box>
      </Button>
      {show && (
        <BoxWrap marginTop='24px'>
          <Box>
            <List
              data={data}
              row={({ value, index }) => (
                <Typography lineHeight='42px' key={index}>
                  <Label svgWidth={28} svgHeight={28} fontSize={20} value={index} />
                  &nbsp;
                  {value}
                </Typography>
              )}
            />
          </Box>
          <Box>
            <Image
              src='/example/HM-026-02/D1-2-2-00-01.png'
              alt='이차함수 y=ax^{2}의 그래프를 x축의 방향으로 p만큼, y축의 방향으로 q만큼 평행이동한 이차함수 y=a(x-p) ^{2} +q의 그래프를 나타낸 그림입니다.'
              width='320px'
              height='233px'
            />
          </Box>
        </BoxWrap>
      )}
    </HContainer>
  );
};

export default HM02602;
