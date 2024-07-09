import { Box, TMainHeaderInfoTypes, PinchZoom, Image, EImageType } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };

  const questionInfo = {
    text: "Read Dr. Wise's advice letter to Yuha and answer the questions.",
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box hAlign='center' useFull>
        <PinchZoom pinchType='image'>
          <Image type={EImageType.IMG} src={'/L01/C09/A02/HE1-L01-C09-A02-P01.jpg'} ariaDescribedby='img-desc' alt='' width='480px' />
          <Box type='hidden' id='img-desc'>
            <p>문단별로 구분 지어진 편지 글</p>
            <p>Now that I've entered high school, I have so many subjects to study. Can you give me some useful study tips?― Yuha</p>
            <p>
              Greeting: Dear Yuha, I'm sorry to hear that you're having a tough time studying so many subjects at your new school. Here are some tips
              that can assist you in studying more effectively.
            </p>
            <p>
              Advice: First, prioritize your subjects and plan your study time accordingly. This will help you manage your time efficiently in all
              subjects. Additionally, organize key concepts for each subject in a mind map. This can help you see the connection between concepts,
              enhancing your memory and understanding.
            </p>
            <p>Closing: I hope these tips will be helpful when you study. Regards, Dr. Wise</p>
          </Box>
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default P01;
