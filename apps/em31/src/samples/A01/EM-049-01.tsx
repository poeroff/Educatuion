import styled from '@emotion/styled';
import { Box, IQuestionProps, Image, Label, List, Radio } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const SAMPLE_DATA = [
  {
    src: '../../assets/example/EM-049/cube.png',
    alt: '모든 면이 네모 모양인 큐브 그림입니다.',
  },
  {
    src: '../../assets/example/EM-049/toilet_paper.png',
    alt: '두루마리 휴지 그림입니다.',
  },
  {
    src: '../../assets/example/EM-049/basket_ball.png',
    alt: '농구공 그림입니다.',
  },
  {
    src: '../../assets/example/EM-049/grass_drawing.png',
    alt: '위와 아래가 동그란 딱풀 그림입니다.',
  },
];

const EM04901 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='2' type='icon' />
        모양에 알맞은 물건은 어느 것인가요?
      </>
    ),
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='start'
      onSubmit={() => {}}
      submitLabel='채점하기'
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box padding='20px 44px' type='line' useRound useFull hAlign='center'>
          <Image src='../../assets/example/EM-049/question_pic.png' alt='상자의 뾰족한 부분이 그려진 그림입니다.' />
        </Box>
        <ListWrapper>
          <List gap={20} align='horizontal' data={SAMPLE_DATA}>
            {({ value, index }) => (
              <Radio name='radio-group' key={`radio-group-${index}`}>
                <Box display='flex' flexDirection='column' justifyContent='flex-start' width={212} padding={12}>
                  <Box>
                    <Label value={index} />
                  </Box>
                  <Box display='flex' justifyContent='center'>
                    <Image src={value?.src as string} alt={value?.alt} />
                  </Box>
                </Box>
              </Radio>
            )}
          </List>
        </ListWrapper>
      </Box>
    </Container>
  );
};

export default EM04901;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  ul {
    height: 172px;
  }
`;
