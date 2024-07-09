import { Box, IQuestionProps, Label, List, Typography } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes, MathExpression } from '@maidt-cntn/ui/math';

const HM01602 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerText: '중단원의 핵심 개념을 확인해 보자.',
    headerTextColor: 'var(--color-black)',
    headerPattern: 'icon',
    iconType: 'mathWrapUp',
    useExtend: true,
  };

  const questionInfo: IQuestionProps = {
    text: (
      <Box vAlign='center'>
        <Box width='6px' height='24px' background='var(--color-h-math-primary-normal)' borderRadius='3px' />
        <Typography fontSize='var(--font-size-32)' lineHeight='50px' weight='var(--font-weight-semiBold)' color='var(--color-h-math-primary-normal)'>
          다항식의 곱셈
        </Typography>
      </Box>
    ),
  };

  const data = [
    '$(a+b+c)^2=a^2+b^2+c^2+2ab+2bc+2ca$',
    '$(a+b)^3=a^3+3a^2b+3ab^2+b^3$,\n$(a-b)^3=a^3-3a^2b+3ab^2-b^3$',
    '$(a+b)(a^2-ab+b^2)=a^3+b^3$,\n$(a-b)(a^2+ab+b^2)=a^3-b^3$',
  ];

  return (
    <HContainer headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box>
        <Typography>
          (1)&nbsp;
          <Typography useGap={false} weight='var(--font-weight-bold)'>
            다항식의 곱셈
          </Typography>
        </Typography>
        <Box whiteSpace='nowrap' marginLeft='34px'>
          <Typography>
            다항식의 곱셈은&nbsp;
            <Box display='inline' background='var(--color-pink-100)'>
              <Typography useGap={false} useSticker>
                분배법칙
              </Typography>
              을 이용하여 식을 전개한 다음 동류항끼리 모아서 정리한다.
            </Box>
          </Typography>
        </Box>
      </Box>
      <Box marginTop='24px'>
        <Typography>
          (2)&nbsp;
          <Typography useGap={false} weight='var(--font-weight-bold)'>
            곱셈 공식
          </Typography>
        </Typography>
        <Label type='star' />
        <Box>
          <List data={data} gap={0}>
            {({ value, index = 0 }) => (
              <Box vAlign='flex-start' marginLeft='34px'>
                <Box>
                  <Label value={index} type='math_icon' />
                </Box>
                <Typography>
                  <MathExpression equation={value || ''} />
                </Typography>
              </Box>
            )}
          </List>
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM01602;
