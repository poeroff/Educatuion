import { Box, IQuestionProps, SvgIcon } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';

export interface IEM00601 {
  goals: string[];
}

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box display='flex' alignItems='center'>
        <SvgIcon src={headerIcon} size='48px' />
        <Box background='var(--color-pink-600)' width='24px' height='24px' margin='0px 12px'></Box>단 곱셈구구
      </Box>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound vAlign='start'>
      <Box display='flex' alignItems='center'>
        <Box background='var(--color-pink-600)' width='24px' height='24px' marginLeft='12px'></Box>
        곱셈구구에서 곱하는 수가 1씩 커지면 그 곱은
        <Box background='var(--color-pink-600)' width='24px' height='24px' marginLeft='12px'></Box>씩 커집니다.
      </Box>
    </Container>
  );
};

export default P01;
