import { useState } from 'react';

import { ArrowBox, Box, Button, EStyleButtonTypes, EStyleFontSizes, EStyleSizes, ESvgType, Label, SvgIcon, Typography, Image } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

import homework from '../../assets/example/HM-026-01/homework.svg';

const equation = [
  { equation: '(3a+b)+(a+2b)=3a+b+a+2b', text: '괄호 풀기' },
  { equation: '=(3a+a)+(b+2b)', text: '동류항끼리 모으기' },
  { equation: '=4a+3b', text: '계산하기' },
];

const HM02601 = () => {
  const [show, setShow] = useState<boolean>(false);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathPrepLearn',
    headerText: <SvgIcon type={ESvgType.IMG} alt='과제' src={homework} width='59px' height='32px' />,
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <Button width='fit-content' size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setShow(!show)}>
        <Box vAlign='center'>
          <Typography weight='var(--font-weight-bold)' fontSize='var(--font-size-32)' lineHeight='50px'>
            다항식의 덧셈과 뺄셈
          </Typography>
          <Image src={'/icons/handPointing.svg'} alt='손가락 아이콘' />
        </Box>
      </Button>
      {show && (
        <Box marginTop='24px'>
          <Typography>괄호를 풀고 동류항끼리 모아서 계산한다.</Typography>
          <Box marginTop={12} vAlign='flex-start'>
            <Box padding='6px 12px'>
              <Label
                size='medium-small'
                fontSize={20}
                value='예'
                lineColor='var(--color-grey-200)'
                background='var(--color-grey-50)'
                color='var(--color-grey-700)'
              />
            </Box>
            <Box>
              {equation.map((value, index) => {
                return (
                  <Box key={index} marginLeft={index !== 0 ? '210px' : ''}>
                    <Typography fontSize='24px' lineHeight='42px'>
                      <MathExpression equation={`$${value.equation}$`} />
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <Box>
              {equation.map((value, index) => {
                return (
                  <Box key={index} vAlign='center' height='52px'>
                    <ArrowBox width={30} height={30} rotate={-90} arrowColor='var(--color-header-purple)' />
                    <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-header-purple)'>
                      {value.text}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}
    </HContainer>
  );
};

export default HM02601;
