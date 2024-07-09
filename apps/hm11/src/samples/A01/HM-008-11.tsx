import { useState } from 'react';
import { Box, Button, EStyleButtonTypes, EStyleSizes, ESvgType, Label, Question, SvgIcon, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

import icReference from '@maidt-cntn/assets/icons/ic_learned.svg';
import title from '../../assets/example/HM-008-11/title.svg';

const expressions_content = [
  {
    equations: [{ equation: '\\(a^2 + b^2 + c^2 + 2ab + 2bc + 2ca = \\)', result: '\\((a+b+c)^2\\)' }],
  },
  {
    equations: [
      { equation: '\\(a^3 + 3a^2b + 3ab^2 = \\)', result: '\\((a+b)^2\\)' },
      { equation: '\\(a^3 - 3a^2b + 3ab^2 - b^3 = \\)', result: '\\((a-b)^2\\)' },
    ],
  },
  {
    equations: [
      { equation: '\\(a^3 + b^3 = \\)', result: '\\((a+b)(a^2-ab+b^2)\\)' },
      { equation: '\\(a^3 - b^3 = \\)', result: '\\((a-b)(a^2+ab+b^2)\\)' },
    ],
  },
];

const expression_learn = [
  ['\\(a^2 + 2ab + b^2 = (a+b)^2\\)', '\\(a^2 - 2ab + b^2 = (a-b)^2 \\)'],
  ['\\(a^2 - b^2 = (a+b)(a-b)\\)'],
  ['\\(x^2 + (a+b)x + ab = (x+a)(x+b)\\)'],
  ['\\(acx^2 + (ad+bc)x + bd = (ax+b)(cx+d)\\)'],
];

const HM00811 = () => {
  const [show, setShow] = useState<boolean>(false);

  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'text',
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <Box vAlign='center'>
        <Typography>곱셈 공식으로부터 다음과 같은 인수분해 공식을 얻을 수 있다.</Typography>
      </Box>
      <Box
        marginTop={48}
        border={'3px solid var(--color-grey-100)'}
        position='relative'
        borderRadius={8}
        padding={'8px 24px 12px'}
        whiteSpace='nowrap'
      >
        <Box position='absolute' top={'-18px'} left={'-3px'}>
          <SvgIcon src={title} width={'165px'} height='36px' />
        </Box>
        <Box>
          {expressions_content.map((item, index) => (
            <Box vAlign='center' marginTop={16} key={index}>
              <Label type='math_icon' value={index + 1} />
              {item.equations.map((eq, eqIndex) => (
                <Box key={eqIndex}>
                  <Typography>
                    {eqIndex === 1 && ', '}
                    <MathExpression equation={eq.equation} />
                  </Typography>
                  <Typography useGap={false} useSticker width='auto'>
                    <MathExpression equation={eq.result} />
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <Box display='flex' marginTop={48}>
        <Button
          size={EStyleSizes.SMALL}
          color={EStyleButtonTypes.NORMAL}
          style={{ padding: 0 }}
          onClick={() => setShow(true)}
          aria-label='배웠어요 설명'
        >
          <SvgIcon src={icReference} width='70px' height='30px' style={{ marginRight: '8px' }} />
        </Button>
        <Box display={show ? 'block' : 'none'} flex={1} padding='12px 24px' background='var(--color-h-math-blue-gb)' useRound>
          <Typography>
            {expression_learn.map((ex, index) => (
              <>
                <Question key={index} subject='math' type='dot' size='small'>
                  {ex.map((eq, eqIndex) => (
                    <>
                      <MathExpression equation={eq} />
                      {eqIndex < ex.length - 1 && <Typography>, </Typography>}
                    </>
                  ))}
                </Question>
                <br />
              </>
            ))}
          </Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00811;
