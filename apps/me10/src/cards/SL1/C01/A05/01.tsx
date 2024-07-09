import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { Box, IAudioPlayerProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The World of Picasso (2)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/SL1/C01/A05/ME1-SL1-C01-A05-P01.mp3',
    captionSrc: '/SL1/C01/A05/ME1-SL1-C01-A05-P01.srt',
    top: -10,
  };

  const info: IHE01602Info = {
    altText: '',
    text: (
      <>
        <Box lineHeight={'48px'}>
          &nbsp;&nbsp;&nbsp;&nbsp;When Picasso was 20 years old, he moved to Paris. Then one of his friends died. He was very sad. He started painting
          in blue. He painted sad, lonely, and poor people, like the old guitar player on the street. This time is his{' '}
          <Typography color='var(--color-blue-600)' weight={'var(--font-weight-extraBold)'} useGap={false}>
            Blue Period
          </Typography>
          (1901-1904).
        </Box>
        <Box lineHeight={'48px'}>
          &nbsp;&nbsp;&nbsp;&nbsp;Later, Picasso found happiness. He started using the colors pink and orange more. This time is his{' '}
          <Typography color='#EB6707' weight={'var(--font-weight-extraBold)'} useGap={false}>
            Rose Period
          </Typography>{' '}
          (1904-1906). A few years later, he also got interested in African art.
        </Box>
      </>
    ),
    hiddenAltText:
      '피카소의 두 시기를 나타낸 그림. 위쪽은 어두워 보이는 파란 방 안에 우울해 보이는 피카소가 푸른 계열의 그림을 그리고 있다. 아래쪽은 분홍색 방 안에 행복해 보이는 피카소가 붉은 색 계열의 색이 더 많아진 그림을 그리고 있다.',
    imageSrc: '/SL1/C01/A05/ME1-SL1-C01-A05-P01.jpg',
  };

  return <HE01602 headerInfo={headerInfo} audioInfo={audioInfo} info={info} />;
};
export default P01;
