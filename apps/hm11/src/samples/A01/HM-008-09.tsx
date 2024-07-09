import styled from '@emotion/styled';
import { Box, EStyleFontSizes, Label, Image, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { HContainer, MathExpression } from '@maidt-cntn/ui/math';

import bgImg from '@/assets/example/HM-008-09/A-HM1-010202-C-03-01_bg.png';
import lineImg from '@/assets/example/HM-008-09/A-HM1-010202-C-03-01_line.png';

const HM00809 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '조립제법',
    headerPattern: 'icon',
    headerTextColor: 'var(--color-h-math-primary-strong)',
    iconType: 'thinkOpen',
  };

  return (
    <HContainer headerInfo={headerInfo} vAlign='flex-start'>
      <Typography lineHeight='42px' usePre useGap={false}>
        &nbsp; 다항식
        <MathExpression equation={`\\(f(x)\\)`} />를 일차식 <MathExpression equation={`\\(x-a\\)`} />로 나눌 때, 계수만을 사용하여 몫과 나머지를
        구하는 방법을 알아보자.
        <br />
        <br />
        &nbsp; 예를 들어 나눗셈 <MathExpression equation={`\\((3x3-4x2+2x-5)÷(x-2)\\)`} />의 몫과 나머지를 구해 보자.
      </Typography>
      <TicketBox>
        <Box>
          <ImgTitle num={1} line={true}>
            직접 나누는 방법
          </ImgTitle>
          <Image
            src='/example/HM-008-09/A-HM1-010202-C-03-01_1.png'
            height='230px'
            alt='3x³-4x²+2x-5를 x-2로 나눈 몫은 3x²+2x+6이고 나머지 7입니다.'
          />
        </Box>
        <Box alignItems='center'>
          <ImgTitle num={2} line={true}>
            계수만을 사용하는 방법
          </ImgTitle>
          <Image
            src='/example/HM-008-09/A-HM1-010202-C-03-01_2.png'
            height='230px'
            alt='3x³-4x²+2x-5를 x-2로 나누기 위해 조립제법을 이용하여 구하면 나누는 다항식 계수인 3, -4, 2, -5과 x-2를 0으로 만드는 2를 기준으로 구할 수 있고, 그 결과 몫은 3x²+2x+6이고 나머지는 7이다.'
          />
        </Box>
      </TicketBox>
      <Typography fontSize='28px' lineHeight='42px' usePre useGap={false}>
        &nbsp; 위의 계산에서 몫은 <MathExpression equation={`\\(3x^2+2x+6\\)`} />
        이고 나머지는 7이다. 이와같이 다항식을 이차식으로 나눌 때, <ImgTitle num={2} line={false} />와 같이{' '}
        <Typography useSticker useGap={false}>
          계수만을 사용
        </Typography>
        하여 몫과 나머지를 구하는 방법을{' '}
        <Typography useSticker useGap={false}>
          조립제법
        </Typography>
        이라고 한다.
      </Typography>
      <Box vAlign='center' marginTop='24px'>
        <Label type='arrow' title='오른쪽 화살표' direction='right' background='var(--color-h-math-border-strong)' />
        <Box marginLeft='8px' padding='12px 16px' background='var(--color-h-math-blue-gb)' useRound>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>조립제법은 다항식을 일차식으로 나누는 경우에만 이용할 수 있다.</Typography>
        </Box>
      </Box>
    </HContainer>
  );
};

const TicketBox = styled.div`
  margin: 24px auto 28px;
  padding: 11px 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 290px;
  background: url(${bgImg}) center/100% 290px;

  & div {
    text-align: center;
  }
`;

const ImgTitle = styled.div<{ num: number; line: boolean }>`
  display: inline-flex;
  font-size: var(--font-size-18);
  font-weight: var(--font-weight-bold);
  align-items: center;

  &:before {
    position: relative;
    top: -4px;
    left: 0;
    content: '${({ num }) => num}';
    display: inline-flex;
    width: 24px;
    height: 24px;
    border-radius: 5px;
    font-size: var(--font-size-18);
    background: var(--color-grey-700);
    color: var(--color-white);
    justify-content: center;
    align-items: center;
  }
  ${({ line }) =>
    line &&
    `
  padding-left: 10px;
    padding-bottom: 10px;
    background: url(${lineImg}) no-repeat center bottom/100% 5px;

    &:before {
      top: 0;
      left: -10px;
    }
  `}
`;

export default HM00809;
