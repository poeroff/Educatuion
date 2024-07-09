import styled from '@emotion/styled';
import { Box, IQuestionProps, Image, Label, List, Radio, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const SAMPLE_DATA = ['1 L 200 mL', '2 L', '2 L 200 mL', '3 L'];

const EM04902 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='20' type='icon' />
        물이 들어 있는 수조의 눈금을 바르게 읽은 것을 찾아보세요.
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
          <Image
            src='../../assets/example/EM-049/water_tank.png'
            alt='2 L와 3 L 사이에 눈금이 10칸 있고, 물의 높이는 2 L에서 작은 눈금 2칸 더 간 곳을 가리키고 있는 수조 그림입니다.'
          />
        </Box>
        <ListWrapper>
          <List gap={50} align='horizontal' data={SAMPLE_DATA}>
            {({ value, index }) => (
              <Radio name='radio-group' type='square' key={`radio-group-${index}`}>
                <Box display='flex' alignItems='center'>
                  <Label value={index} />
                  <Box>
                    <Typography>{value}</Typography>
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

export default EM04902;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  ul {
    height: 56px;
    line-height: 56px;
  }
`;
