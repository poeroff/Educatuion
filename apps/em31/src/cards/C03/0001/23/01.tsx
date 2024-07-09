import { Box, IQuestionProps, SvgIcon, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '@/assets/icon/m_default_01.svg';

export interface IEM00601 {
  goals: string[];
}

const P01 = () => {
  const questionListData = [
    {
      number: '①',
      question: '문제에서 구하려고 하는 것이 무엇인지 살펴봅니다.',
    },
    {
      number: '②',
      question: '주어진 조건과 정보를 파악합니다.',
    },
    {
      number: '③',
      question: '적절한 곱셈구구를 찾아 문제를 해결합니다.',
    },
  ];

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Box>
        <Box display='flex' alignItems='center'>
          <SvgIcon src={headerIcon} size='48px' />
          &nbsp;곱셈구구를 이용하여 문제 해결하기
        </Box>
        {questionListData.map(value => (
          <Box display='flex' alignItems='center' key={value?.number} marginTop='8px'>
            <Typography>{value?.number}</Typography>
            <Typography useGap={false}>{value?.question}</Typography>
          </Box>
        ))}
      </Box>
    ),
  };

  return <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound vAlign='start'></Container>;
};

export default P01;
