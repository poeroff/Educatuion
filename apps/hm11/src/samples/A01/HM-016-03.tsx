import styled from '@emotion/styled';
import { ArrowBox, Box, EStyleFontSizes, IQuestionProps, Label, List, Scroll, Typography } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes, MathExpression } from '@maidt-cntn/ui/math';

const HM01603 = () => {
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
        <Typography fontSize='32px' lineHeight='50px' weight='var(--font-weight-semiBold)' color='var(--color-h-math-primary-normal)'>
          항등식
        </Typography>
        <ArrowBox arrowColor='var(--color-h-math-purple-strong)' width={30} height={30} rotate={90} />
        &nbsp;
        <Typography
          useGap={false}
          size={EStyleFontSizes['X-MEDIUM']}
          lineHeight='50px'
          weight='var(--font-weight-semiBold)'
          color='var(--color-h-math-purple-strong)'
        >
          주어진 식의 문자에 어떤 값을 대입해도 항상 성립하는 등식
        </Typography>
      </Box>
    ),
  };

  const temperData = [
    {
      tamper1: '$ax^2+bx+c=0$ 이 $x$ 에 대한 항등식이면',
      temper2: '$a=b=c=0$',
    },
    {
      tamper1: "$ax^2+bx+c=a'x^2+b'x+c'$ 이 $x$ 에 대한 항등식이면",
      temper2: "$a=a', b=b', c=c'$",
    },
  ];

  const WayData = ['양변에서 동류항의 계수 비교', '문자에 적당한 수 대입'];

  return (
    <HContainer headerInfo={headerInfo} questionInfo={questionInfo}>
      <Scroll tabIndex={0}>
        <Box>
          <Typography>
            (1)&nbsp;
            <Typography useGap={false} weight='var(--font-weight-bold)'>
              항등식의 성질
            </Typography>
          </Typography>
          <List data={temperData} gap={0}>
            {({ value, index = 0 }) => (
              <Box vAlign='baseline' marginLeft={44}>
                <Label value={index} type='math_icon' />
                <Typography>
                  <MathExpression equation={value?.tamper1 || ''} />
                  <Box>
                    <Typography useGap={false} useSticker>
                      <MathExpression equation={value?.temper2 || ''} />
                    </Typography>
                  </Box>
                </Typography>
              </Box>
            )}
          </List>
        </Box>

        <Box marginTop='24px'>
          <Typography>
            (2)&nbsp;
            <Typography underlineColor='var(--color-h-math-purple-strong)' weight='var(--font-weight-bold)' useGap={false}>
              미정계수법
            </Typography>
            : 주어진 등식에서 정해져 있지 않은 계수를 항등식의 성질을 이용하여 정하는 방법
          </Typography>
          <Box vAlign='start' flexDirection='column' marginLeft='30px' padding='4px 12px'>
            <List data={WayData} gap={0}>
              {({ value, index = 0 }) => (
                <HowStyle useGap={false} borderWidth='67px' size={EStyleFontSizes['X-MEDIUM']} color='var(--color-h-math-purple-strong)'>
                  방법{index} &nbsp; {value}
                </HowStyle>
              )}
            </List>
          </Box>
        </Box>
      </Scroll>
    </HContainer>
  );
};

const HowStyle = styled(Typography)<{ borderWidth: string }>`
  ${({ borderWidth }) =>
    `
      ::before {
        content: '';
        position: absolute;
        top: 0;
        left: -10px;
        width: ${borderWidth};
        height: 36px;
        border: 2px solid var(--color-h-math-difficulty);
        border-radius: 50%;
      }`}
`;

export default HM01603;
