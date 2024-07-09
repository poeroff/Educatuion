import { Container } from '@maidt-cntn/ui/en';
import { Box, TMainHeaderInfoTypes, Image, Typography, IAudioPlayerProps, BoxWrap, PinchZoom } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The King with Donkey Ears (1)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/SL2/C01/A04/ME1-SL2-C01-A04-P01.mp3',
    captionSrc: '/SL2/C01/A04/ME1-SL2-C01-A04-P01.srt',
  };

  const content =
    'Once upon a time, there was a king with big donkey ears. He always hid his ears. It was a big secret. Every month, the king got a haircut.\n After his haircut, he always sent the barber to prison. Then one day, a young barber came to the palace.';

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo} vAlign='center'>
      <BoxWrap>
        <Box>
          <PinchZoom>
            <Image
              src={'/SL2/C01/A04/ME1-SL2-C01-A04-P01.jpg'}
              width='387px'
              alt='등장인물, Narrator, King, Barber, Woodcutter, People 왕이 거울로 자신이 귀를 숨긴 모습을 보고 있다.'
            />
          </PinchZoom>
        </Box>
        <Box>
          <Box vAlign='top'>
            <Box padding='6px 11px'>
              <Typography color={'var(--color-grey-700)'} weight={'var(--font-weight-bold)'} fontSize={'28px'}>
                Narrator
              </Typography>
            </Box>
            <Typography usePre>{content}</Typography>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
