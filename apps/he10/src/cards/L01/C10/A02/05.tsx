import { Box, TMainHeaderInfoTypes, PinchZoom, Textarea, Image, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '활동',
  };
  const questionInfo: IQuestionProps = {
    text: 'Create a movie trailer and share it with the class.',
    type: 'text',
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo}>
      <Box useFull hAlign='center' marginTop='24px' gap='24px' padding='4px 12px'>
        <PinchZoom>
          <Image src={'/L01/C10/A02/HE1-L01-C10-A02-P03.jpg'} width='260px' height='340px' alt='영화 Elemental 포스터' />
        </PinchZoom>
        <Textarea
          readOnly={true}
          value={
            'This movie is set in an exciting city where the elements of fire, water, air, and earth live together. Ember, a fire girl, and Wade, a water boy, are totally different but must work together to save their world. Discover the power of friendship and understanding in this movie!'
          }
          height={'340px'}
        />
      </Box>
    </Container>
  );
};

export default P05;
