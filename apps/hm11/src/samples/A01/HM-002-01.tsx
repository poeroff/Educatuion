import { Box, EStyleFontSizes, ETagPaint, List, Tag, Typography } from '@maidt-cntn/ui';
import { HContainer } from '@maidt-cntn/ui/math';

const learningContents = [
  {
    title: '평면좌표와 직선의 방정식',
    subTitle: ['다항식의 덧셈과 뺄셈', '다항식의 곱셈과 나눗셈'],
  },
  {
    title: '원의 방정식',
    subTitle: ['항등식', '나머지정리 나머지정리', '인수분해', '나머지정리 나머지정리 나머지정리 나머'],
  },
  {
    title: '도형의 이동',
    subTitle: ['Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum', 'Lorem Ipsum'],
  },
];

const HM00201 = () => {
  return (
    <HContainer headerInfo={null} vAlign='flex-start'>
      <Box marginTop='32px'>
        <Box margin='0 12px'>
          <Tag type={ETagPaint.GREEN_PAINT} label='핵심 아이디어' />
        </Box>
        <Typography color='var(--color-h-math-primary-strong)' weight='var(--font-weight-bold)' fontSize='var(--font-size-32)' lineHeight='48px'>
          식에 대한 사칙연산과 인수분해는 복잡한 다항식으로 확장되어 적용된다.
        </Typography>

        <Box marginTop='83px'>
          <Box margin='0 12px'>
            <Tag type={ETagPaint.GREEN_PAINT} label='학습 내용' />
          </Box>
          <Box display='flex' marginTop='12px'>
            {learningContents.map((value, idx) => (
              <>
                {idx > 0 && <Box margin='12px' backgroundColor='var(--color-grey-300)' width='1px' />}
                <Box flex={1}>
                  <Box marginBottom='12px'>
                    <Typography size={EStyleFontSizes['X-MEDIUM']} weight={700} color='var(--color-h-math-primary-strong)'>
                      {idx + 1}. {value.title}
                    </Typography>
                  </Box>

                  <List data={value.subTitle}>
                    {({ value, index = 1 }) => (
                      <Box vAlign='flex-start' marginLeft='46px'>
                        <Typography useGap={false} weight={900} color='var(--color-h-math-primary-normal)' fontSize='14px' lineHeight='23px'>
                          0{index}
                        </Typography>
                        <Box marginLeft='8px' display='flex' maxWidth='185px'>
                          <Typography useGap={false} size={EStyleFontSizes['SMALL']} lineHeight='30px'>
                            {value}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </List>
                </Box>
              </>
            ))}
          </Box>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00201;
