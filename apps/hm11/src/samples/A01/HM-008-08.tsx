import { Box, Label, ESvgType, SvgIcon, Typography, BoxWrap, EStyleFontSizes, Button, EStyleButtonTypes, EStyleSizes } from '@maidt-cntn/ui';
import { HContainer, MathExpression, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

import thinkPop from '../../assets/icons/think_pop.svg';
import { useState } from 'react';

const HM00808 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'text',
  };

  const [desShow, setDesShow] = useState<boolean>(false);
  const [answerShow, setAnswerShow] = useState<boolean>(false);
  const [isShow, setShow] = useState<boolean>(false);

  const toggleAnswer = () => {
    setAnswerShow(!answerShow);
  };

  return (
    <HContainer
      headerInfo={headerInfo}
      vAlign='flex-start'
      onSubmit={() => {
        setShow(!isShow);
      }}
      submitLabel='채점하기'
      useExtend
    >
      <Box useFull>
        <Typography>
          &nbsp;일반적으로 다항식 <MathExpression equation={`\\(A\\)`} />를 다항식 <MathExpression equation={`\\(B(B≠0)\\)`} />로 나누었을 때의
          몫을&nbsp;
          <MathExpression equation={`\\(Q\\)`} />, 나머지를 <MathExpression equation={`\\(R\\)`} />
          이라 하면
        </Typography>
        <Box marginTop='12px'>
          &nbsp;
          <Typography>
            <MathExpression equation={`\\(A\\)`} />=
          </Typography>
          <Typography useGap={false} useSticker>
            <MathExpression equation={'\\(BQ + R\\)'} />
          </Typography>
        </Box>
        <Box marginTop='12px'>
          <Typography>
            &nbsp;과 같이 나타낼 수 있다. 이때 <MathExpression equation={`\\(R\\)`} />의 차수는 <MathExpression equation={`\\(B\\)`} />의
            차수보다&nbsp;
            <Typography useGap={false} useSticker>
              낮다.
            </Typography>
            <br />
            &nbsp;&nbsp;&nbsp;특히 <MathExpression equation={`\\(R\\)`} />
            =0, 즉 <MathExpression equation={`\\(A\\)`} />=<MathExpression equation={`\\(BQ\\)`} />일 때{' '}
            <Typography useGap={false} useSticker>
              '<MathExpression equation={`\\(A\\)`} />
              는&nbsp;
              <MathExpression equation={`\\(B\\)`} />로 나누어떨어진다'
            </Typography>
            고 한다.
          </Typography>
        </Box>
        <Box vAlign='center' marginTop='24px'>
          <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.NORMAL} onClick={() => setDesShow(true)} aria-label='개념 설명'>
            <Label type='arrow' title='오른쪽 화살표' direction='right' background='var(--color-h-math-border-strong)' />
          </Button>
          <Box opacity={desShow ? '1' : '0'} padding='12px 16px' background='var(--color-h-math-blue-gb)' useRound>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>
              <MathExpression equation={`\\(Q\\)`} />는 몫을 뜻하는 quotient의 첫 글자이고, <MathExpression equation={`\\(R\\)`} />은 나머지를 뜻하는
              remainder의 첫 글자이다.
            </Typography>
          </Box>
        </Box>
        <Box marginTop='36px'>
          <Button color={EStyleButtonTypes.NORMAL}>
            <SvgIcon src={thinkPop} type={ESvgType.IMG} />
          </Button>
          <BoxWrap alignItems='center' marginTop='4px'>
            <Typography color='var(--color-grey-800)'>다항식을 이차식으로 나누었을 때의 나머지는 항상 일차식일까?</Typography>
            <Button color={EStyleButtonTypes.NORMAL} onClick={toggleAnswer}>
              <Typography size={EStyleFontSizes.SMALL} color='var(--color-h-math-primary-strong)'>
                {answerShow ? '정답닫기' : '정답보기'}
              </Typography>
            </Button>
          </BoxWrap>
          {answerShow && (
            <Box marginTop='4px'>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-h-math-primary-strong)'>
                다항식을 이차식으로 나누었을 때의 나머지는 일차식 또는 상수이므로, 항상 일차식인 것은 아니다.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </HContainer>
  );
};

export default HM00808;
