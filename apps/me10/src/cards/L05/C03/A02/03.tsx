import { Box, IQuestionProps, Image, PinchZoom, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Ladder Game',
    headerPattern: 'icon',
    iconType: 'talkToPlay',
  };

  const questionInfo: IQuestionProps = {
    text: '활동을 직접 해 봅시다.',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box hAlign='center' useFull>
        <PinchZoom>
          <Image
            src={'/L05/C03/A02/ME1-L05-C03-A02-P01.jpg'}
            width='410px'
            alt='다양한 계획과 실천 아이디어가 사다리타기로 연결되어 있다. 
          save energy – use the stairs
          made a short video – try a dance challenge
          do some exercise – play tennis with me
          have lunch – order tteokbokki
          do volunteer work – pick up trash in the park'
          />
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default P03;
