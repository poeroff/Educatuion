import { Box, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import HE10_L04_SP04_2_2 from './components/HE10_L04_SP04_2_2';
import { IChoice } from './store';

const P07 = () => {
  const pageNum = 'P07';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 어법 연습',
    headerPattern: 'text',
  };
  const questionText = '빈 칸에 들어갈 알맞은 단어를 골라 봅시다.';

  const questionBox = (
    <Box vAlign='center' width='775px' height='156px' hAlign={'center'} background='white' useRound useShadow>
      <Box display='flex' hAlign='center'>
        <Typography>
          You can help others by either volunteering at a nursing home or{' '}
          <Typography type='blank' width='100px' title='빈칸' boxColor='var(--color-black)'></Typography> to the charity.
        </Typography>
      </Box>
    </Box>
  );

  const choices: IChoice[] = [
    {
      text: 'donate',
      id: 1,
    },
    {
      text: 'donated',
      id: 2,
    },
    {
      text: 'donating',
      id: 3,
    },
  ];

  const answerIndex = 3;

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

export default P07;
