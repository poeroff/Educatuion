import { Box, IQuestionProps, Image, PinchZoom, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P03 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Roll the Dice',
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
          <Image src={'/L03/C03/A02/ME1-L03-C03-A02-P01.jpg'} width='410px' alt='1~17번까지 있고 각 칸마다 다양한 상황이 쓰여있는 보드게임판' />
        </PinchZoom>
      </Box>
    </Container>
  );
};

export default P03;
