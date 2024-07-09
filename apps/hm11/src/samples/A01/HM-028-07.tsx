import { Box, Typography, Scroll, ESvgType, SvgIcon, EStyleFontSizes, ArrowBox, List, BoxWrap } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM02807 = () => {
  const data = [
    {
      color: 'var(--color-red-100)',
      explanation: (
        <Typography size={EStyleFontSizes['X-MEDIUM']}>
          <Typography size={EStyleFontSizes['X-MEDIUM']} useGap={false} useSticker>
            <MathExpression equation={'$f(α), f(p), f(β)$'} />
          </Typography>
          의 대소를 비교한다.
        </Typography>
      ),
    },
    {
      color: 'var(--color-red-100)',
      explanation: (
        <Typography>
          <Typography size={EStyleFontSizes['X-MEDIUM']} useGap={false} useSticker>
            가장 큰 값이 최댓값, 가장 작은 값이 최솟값
          </Typography>
        </Typography>
      ),
    },
  ];

  const data2 = [
    {
      color: 'var(--color-purple-50)',
      explanation: (
        <Typography size={EStyleFontSizes['X-MEDIUM']}>
          <Typography size={EStyleFontSizes['X-MEDIUM']} useGap={false} useSticker>
            <MathExpression equation={'$f(α), f(β)$'} />
          </Typography>
          의 대소를 비교한다.
        </Typography>
      ),
    },
    {
      color: 'var(--color-purple-50)',
      explanation: (
        <Typography>
          <Typography size={EStyleFontSizes['X-MEDIUM']} useGap={false} useSticker>
            큰 값이 최댓값, 작은 값이 최솟값
          </Typography>
        </Typography>
      ),
    },
  ];

  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Typography weight='var(--font-weight-semiBold)' fontSize='var(--font-size-32)' lineHeight='50px'>
        제한된 범위에서 이차함수의 최댓값과 최솟값
      </Typography>
      <Box marginTop='24px'>
        <Typography>
          <MathExpression equation={'$x$'} />의 값의 범위가 <MathExpression equation={'$α≤x≤β$'} />
          일 때, 이차함수 <MathExpression equation={'$f(x)=a(x-p)^2+q$'} />에 대하여
        </Typography>
      </Box>
      <Box marginTop='24px' hAlign='center'>
        <Box vAlign='center' flexDirection='column' borderRadius='8px' background='var(--color-h-math-blue-gb)' padding='12px'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>
            꼭짓점의 <MathExpression equation={'$x$'} /> 좌표
            <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-h-math-purple-strong)'>
              <MathExpression equation={'$p$'} />가
            </Typography>
            <MathExpression equation={'$x$'} />의 값의 범위
            <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-h-math-purple-strong)'>
              <MathExpression equation={'$α≤x≤β$'} />에 포함되는가?
            </Typography>
          </Typography>
        </Box>
      </Box>
      <ArrowBox
        type='both'
        width={511}
        height={24}
        x={233}
        y={30}
        arrowColor='var(--color-grey-300)'
        arrowWeight={2}
        leftArrow={{ useTail: true, tailType: 'line-arrow' }}
        rightArrow={{ useTail: true, tailType: 'line-arrow' }}
        centerContent={
          <Box hAlign='space-between' width='300px' position='absolute' top='23px' right='-157px'>
            <Box hAlign='center' padding='0 12px' background='var(--color-white)'>
              <Typography useGap={false} size={EStyleFontSizes['X-SMALL']} color='var(--color-grey-700)'>
                예
              </Typography>
            </Box>
            <Box hAlign='center' padding='0 12px' background='var(--color-white)'>
              <Typography useGap={false} size={EStyleFontSizes['X-SMALL']} color='var(--color-grey-700)'>
                아니요
              </Typography>
            </Box>
          </Box>
        }
        direction='up'
      >
        <Box minHeight='30px' minWidth='2px' position='absolute' left='50%' borderLeft='2px solid var(--color-grey-300)' />
        <BoxWrap display='flex' marginTop='60px'>
          <Box>
            <List data={data} gap={0}>
              {({ value, index = 1 }) => (
                <>
                  <Box width='476px' hAlign='center' padding='12px 0' borderRadius='8px' background={value?.color}>
                    {value?.explanation}
                  </Box>
                  {index == data.length || (
                    <ArrowBox
                      arrowColor='var(--color-grey-300)'
                      height={24}
                      rotate={180}
                      x={185}
                      arrowWeight={2}
                      leftArrow={{ tailType: 'line-arrow' }}
                    />
                  )}
                </>
              )}
            </List>
          </Box>
          <Box>
            <List data={data2} gap={0}>
              {({ value, index = 1 }) => (
                <>
                  <Box width='476px' hAlign='center' padding='12px 0' borderRadius='8px' background={value?.color}>
                    {value?.explanation}
                  </Box>
                  {index == data.length || (
                    <ArrowBox
                      arrowColor='var(--color-grey-300)'
                      height={24}
                      rotate={180}
                      x={185}
                      arrowWeight={2}
                      leftArrow={{ tailType: 'line-arrow' }}
                    />
                  )}
                </>
              )}
            </List>
          </Box>
        </BoxWrap>
      </ArrowBox>
    </HContainer>
  );
};

export default HM02807;
