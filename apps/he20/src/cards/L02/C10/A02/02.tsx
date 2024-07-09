import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Typography, Scroll, BoxWrap, PinchZoom, Image } from '@maidt-cntn/ui';
import styled from '@emotion/styled';

const P02 = () => {
  const contentImage = '/L02/C10/A02/HE2-L02-C10-A02-P02.jpg';

  const imageText = '한 남성의 초상화가 그려져 있는 50 파운드 영국 화폐 ';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Stories of the People on Our Money',
  };

  const questionInfo = {
    text: 'Learn about the people on bills from around the world.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <BoxWrap display='flex' justifyContent='center' height={'320px'} width={'940px'}>
        <Box hAlign='center'>
          <PinchZoom>
            <Image src={contentImage} width='340px' height='180px' alt={imageText} />
          </PinchZoom>
        </Box>
        <Box hAlign='center' useFull>
          <Box useFull background='white' useRound>
            <Scroll height='280px' tabIndex={101}>
              <Box>
                <Typography>
                  <SpanColorWeight>Alan Turing (on the British 50-pound bill)</SpanColorWeight> is widely consideredthe father of modern computer
                  science and artificial intelligence. He was a remarkable scientist who helped save millions of lives by breaking the German army’s
                  communication codes in World War II.
                </Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

const SpanColorWeight = styled.span`
  font-weight: var(--font-weight-bold);
  color: var(--color-red-800);
`;

export default P02;
