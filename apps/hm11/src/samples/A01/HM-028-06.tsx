import { Box, Typography, EStyleFontSizes, ArrowBox, List } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

const HM02806 = () => {
  const data = [
    {
      math: '$D>0$',
      color: 'var(--color-red-100)',
      arrowColor: 'var(--color-red-200)',
      explanation: (
        <>
          서로 다른{' '}
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} color='var(--color-h-math-purple-strong)'>
            두 점
          </Typography>
          에서 만난다.
        </>
      ),
    },
    {
      math: '$D=0$',
      color: 'var(--color-yellow-100)',
      arrowColor: 'var(--color-yellow-300)',
      explanation: (
        <>
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} color='var(--color-h-math-purple-strong)'>
            한 점
          </Typography>
          에서 만난다. (
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} color='var(--color-h-math-purple-strong)'>
            접한다.{' '}
          </Typography>
          )
        </>
      ),
    },
    {
      math: '$D<0$',
      color: 'var(--color-purple-50)',
      arrowColor: 'var(--color-purple-200)',
      explanation: (
        <>
          <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} color='var(--color-h-math-purple-strong)'>
            만나지 않는다.
          </Typography>
        </>
      ),
    },
  ];

  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Typography weight='var(--font-weight-semiBold)' fontSize='var(--font-size-32)' lineHeight='50px'>
        이차함수의 그래프와 <MathExpression equation={'$x$'} /> 축의 위치 관계
      </Typography>
      <Box marginTop='24px'>
        <Typography>
          이차함수 <MathExpression equation={'$y=ax^2+bx+c$'} />의 그래프와 <MathExpression equation={'$x$'} />
          축의 위치 관계는
        </Typography>
        <Typography>
          이차방정식 <MathExpression equation={'$y=ax^2+bx+c=0$'} />의 판별식 <MathExpression equation={'$D$'} />의 값에 따라 다음과 같이 정해진다.
        </Typography>
      </Box>
      <Box marginTop='24px' hAlign='center'>
        <Box vAlign='center'>
          <Box vAlign='center' flexDirection='column' borderRadius='8px' background='var(--color-h-math-blue-gb)' padding='12px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>이차방정식</Typography>
            <MathExpression equation={'$y=ax^2+bx+c=0$'} />
            <Typography size={EStyleFontSizes['X-MEDIUM']}>
              의 판별식 <MathExpression equation={'$D$'} />
            </Typography>
          </Box>
          <Box maxWidth='82px' maxHeight='234px' display='flex' flexDirection='column'>
            <ArrowBox
              arrowColor='var(--color-red-200)'
              height={106}
              rotate={49}
              x={-10}
              y={31}
              arrowWeight={2}
              leftArrow={{ tailType: 'line-arrow' }}
            />
            <ArrowBox
              arrowColor='var(--color-yellow-300)'
              height={82}
              rotate={90}
              x={-10}
              y={-28}
              arrowWeight={2}
              leftArrow={{ tailType: 'line-arrow' }}
            />
            <ArrowBox
              arrowColor='var(--color-purple-200)'
              height={106}
              rotate={131}
              x={-12}
              y={-88}
              arrowWeight={2}
              leftArrow={{ tailType: 'line-arrow' }}
            />
          </Box>
          <List data={data} gap={0}>
            {({ value, index = 1 }) => (
              <Box vAlign='center'>
                <Box borderRadius='8px' background={value?.color} padding='4px 12px' fontSize='var(--font-size-24)'>
                  <MathExpression equation={value?.math || ''} />
                </Box>
                <ArrowBox arrowColor={value?.arrowColor} height={78} rotate={90} arrowWeight={2} leftArrow={{ tailType: 'line-arrow' }} />
                <Box hAlign='center' width='284px' borderRadius='8px' background={value?.color} padding='4px 12px '>
                  <Typography width='260px' align='center' size={EStyleFontSizes['X-MEDIUM']} useGap={false} useSticker>
                    {value?.explanation}
                  </Typography>
                </Box>
              </Box>
            )}
          </List>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM02806;
