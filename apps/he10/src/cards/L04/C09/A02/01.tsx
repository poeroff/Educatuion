import { Box, TMainHeaderInfoTypes, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };
  const questionInfo = {
    text: 'Read the description of the graph and complete the table.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box>
        <Box marginTop='20px'>
          <PinchZoom>
            <Image src={'/L04/C09/A02/HE1-L04-C09-A02-P01.jpg'} alt='' height='385px' style={{ objectFit: 'contain' }} ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>
                한국의 물질 유형별 재활용률 을 나타내는 막대그래프 2020 Recycling Rates for Distinct Material Types in Korea Waste Paper : 48% Glass :
                59% Plastic : 56% Metal : 75% Average : 60% Source: 2021 Environmental Statistics Yearbook, 2022
              </p>
              <p>
                글의 구조가 보이는 그래프 분석 글. Topic : The graph on the left displays the recycling rates for four distinct material types in
                Korea in 2020: waste paper, glass, plastic, and metal.
              </p>
              <p>
                Analysis : Metal had the highest recycling rate at 75 percent. Glass held the second position with a 59 percent rate. Plastic followed
                closely behind with a recycling rate of 56 percent. Notably, waste paper not only was recycled the least, at 48 percent, but also fell
                significantly below the average recycling rate of 60 percent.
              </p>
              <p>Conclusion : With more people striving to recycle waste paper, the average rate of recycling in Korea may increase.</p>
            </Box>
          </PinchZoom>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
