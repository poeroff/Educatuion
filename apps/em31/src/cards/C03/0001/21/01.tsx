import { Box, Image, IQuestionProps, BoxWrap, SvgIcon, Typography } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { Container } from '@maidt-cntn/ui/math';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <SvgIcon src={headerIcon} size='48px' />
        &nbsp;몇의 몇 배 알아보기
      </Box>
    ),
  };

  const textList = [
    {
      id: 0,
      mark: '・',
      question: '2씩 4묶음은 8입니다.',
    },
    {
      id: 1,
      mark: '・',
      question: '2씩 4묶음은 2의 4배입니다.',
    },
    {
      id: 2,
      mark: '➡',
      question: '2의 4배는 8입니다.',
    },
  ];

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} useRound vAlign='flex-start'>
      <BoxWrap display='flex' justifyContent='center'>
        <Box type='line' padding='20px 40px' marginRight='12px' useRound>
          <Image src='/C03/0001/21/DEC313I02.png' alt='하트가 2개씩 4묶음 그려진 그림입니다.' width='396px' height='201px' />
        </Box>
        <Box useRound display='flex' justifyContent='center' flexDirection='column'>
          <Box>
            {textList.map(value => (
              <Box vAlign='center' key={value.id}>
                <Typography>{value?.mark}</Typography>
                <Typography>{value?.question}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
