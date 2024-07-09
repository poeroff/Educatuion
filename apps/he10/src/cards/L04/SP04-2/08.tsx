import { Box, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import HE10_L04_SP04_2_2 from './components/HE10_L04_SP04_2_2';
import { IChoice } from './store';

const P08 = () => {
  const pageNum = 'P08';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 어법 연습',
    headerPattern: 'text',
  };
  const questionText = '빈 칸에 들어갈 알맞은 단어를 골라 봅시다.';

  const choices: IChoice[] = [
    {
      text: 'turn on',
      id: 1,
    },
    {
      text: 'turned on',
      id: 2,
    },
    {
      text: 'turning on',
      id: 3,
    },
  ];
  const answerIndex = 2;

  const questionBox = (
    <Box vAlign='center' width='775px' height='156px' hAlign={'center'} background='white' useRound useShadow>
      <Box display='flex' hAlign='center'>
        <Typography>
          The doctor advised me not to sleep with the light{' '}
          <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography>.
        </Typography>
      </Box>
    </Box>
  );
  return (
    <HE10_L04_SP04_2_2
      pageNum={pageNum}
      headerInfo={headerInfo}
      questionText={questionText}
      choices={choices}
      answerIndex={answerIndex}
      questionBox={questionBox}
    />
  );
};

export default P08;
