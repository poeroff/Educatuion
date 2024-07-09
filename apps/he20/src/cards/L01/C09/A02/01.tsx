import styled from '@emotion/styled';
import { Box, TMainHeaderInfoTypes, PinchZoom, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };
  const questionInfo = {
    text: 'Read the volunteer application and answer the questions.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box>
        <Box marginTop='20px'>
          <PinchZoom>
            <Image src={'/L01/C09/A02/HE2-L01-C09-A02-P01.jpg'} alt='' height='400px' style={{ objectFit: 'contain' }} />
            <HiddenDev>
              <p>
                글의 구조가 보이는 자원봉사 지원서 양식 Volunteer Application for Senior Welfare Center Name (First) Mia (Last) Watson Phone
                013-5959-1004 E-mail angelmia@example.com
              </p>
              <p> Type of Work You Want to Do : I’d like to deliver everyday items to seniors who live alone and spend time with them.</p>
              <p>
                Reasons for Volunteering : I’m interested in the welfare of the elderly. One day, I saw on the news that there had been an increase in
                the number of elderly people suffering from depression. I felt really sorry for them, so I wanted to provide emotional support by
                spending some time with them.
              </p>
              <p> Your Expectations : I expect my volunteer work to contribute to the welfare of the elderly.</p>
              <p> Available Time : I’m available to volunteer any time during the weekend.</p>
            </HiddenDev>
          </PinchZoom>
        </Box>
      </Box>
    </Container>
  );
};

const HiddenDev = styled.div`
  overflow: hidden;
  position: absolute;
  z-index: -1;
  width: 1px;
  height: 1px;
  font-size: 1px;
  opacity: 0.01;
  clip: rect(1px, 1px, 1px, 1px);
`;

export default P01;
