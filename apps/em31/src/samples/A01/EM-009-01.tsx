import { Box, BoxWrap, EStyleFontSizes, ESvgType, IQuestionProps, Input, Label, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import empty_square from '@/assets/icon/math_empty_square.svg';

const EM00901 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={1} size='small' />
        <Box>
          <Box vAlign='center'>
            <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
            &nbsp;안에 알맞은 수를 찾아 써넣어 문제를 풀고, 덧셈 문제
          </Box>
          를 만들어 해결해 보세요.
        </Box>
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound submitLabel='완료하기' onSubmit={() => {}}>
      <Box vAlign='flex-start'>
        <Box height={'68px'} display='flex' alignItems='center'>
          <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        </Box>
        <Typography size={EStyleFontSizes.LARGE}>이전 표에서 두 수를 골라 뺄셈 문제를 만들고 해결해 보세요.</Typography>
      </Box>
      <Box width='100%' height='156px' marginTop='24px'>
        그리기 도구
      </Box>
      <BoxWrap justifyContent='flex-end' marginTop='24px'>
        <Box>
          <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Input minWidth='298px' marginLeft={12} value='' onChange={() => {}} ariaLabel='뺄셈 문제의 식' />
        </Box>
        <Box>
          <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
          <Input minWidth='298px' marginLeft={12} value='' onChange={() => {}} ariaLabel='뺄셈 문제의 답' />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM00901;
