import { BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, Scroll, IAudioPlayerProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (1)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C06/A03/HE2-L01-C06-A03-P01.mp3',
    captionSrc: '/L01/C06/A03/HE2-L01-C06-A03-P01.srt',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={'/L01/C06/A03/HE2-L01-C06-A03-P01.jpg'}
              width='100%'
              height='100%'
              alt="Care for Animals, Let's Go!라는 문구가 적혀 있는 사진. 사진 속에서 한 여성이 VOLUNTEER이라고 쓰인 티셔츠를 입고 엄지 손가락을 들어올린채 웃고 있다. "
            />
          </PinchZoom>
        </Box>
        <Box useFull background='white' useRound>
          <Scroll tabIndex={0} height='100%'>
            As the leader of our school club Care for Animals, I organized a volunteer trip to an animal sanctuary for my club members. An animal
            sanctuary is a special place where rescued, injured, or abused animals can live in a safe and caring environment. All the club members and
            I agreed that the sanctuary would be the perfect place to learn about animal care. Excited for a new experience, we set out to volunteer.
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
