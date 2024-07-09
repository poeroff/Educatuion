import { Box, ESvgType, SvgIcon } from '@maidt-cntn/ui';
import PuzzleRule from './components/PuzzleRule';
import { MContainer } from '@maidt-cntn/ui/math';
import Activity1SVG from '@/assets/A01/0001/12/activity1.svg';

const P02 = () => {
  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'funPlayAndMathEmotion' }}
      questionInfo={{ text: '어떻게 색칠하면 될까?' }}
      vAlign='start'
      cardType='mainText'
    >
      <Box display='flex' flexDirection='column' gap='20px'>
        <Box display='flex' gap='20px' alignItems='center'>
          <SvgIcon src={Activity1SVG} type={ESvgType.IMG} width='96px' height='38px' />
          <Box>위와 같은 성질을 이용하여 다음 규칙에 따라 퍼즐을 풀어 보자.</Box>
        </Box>
        <PuzzleRule />
      </Box>
    </MContainer>
  );
};

export default P02;
