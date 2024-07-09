import { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IAudioPlayerProps, Typography, TMainHeaderInfoTypes, BoxWrap, Box, PinchZoom, Scroll, Image, List } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P01 = () => {
  interface IListenAndAnswer {
    label?: string;
    labelColor?: string;
    originText: string;
    translation: string;
  }

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Amazing Facts About the World (5)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L07/C06/A08/ME1-L07-C06-A08-P01.mp3',
    captionSrc: '/L07/C06/A08/ME1-L07-C06-A08-P01.srt',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'Thanks, Joe.',
      translation: '고마워요, Joe.',
    },
    {
      originText: 'We have two winners today.',
      translation: '오늘 우승자가 두 명 있네요.',
    },
    {
      originText: 'Congratulations, Namjun and Sara!',
      translation: '축하합니다, 남준과 사라!',
    },
  ];

  const dialog = (
    <List<IListenAndAnswer>
      data={data}
      row={({ value, index = 1 }) => (
        <BoxWrap boxGap={10}>
          <Box minWidth='84px' textAlign='left' color={value?.labelColor} height='fit-content' borderRadius='8px'>
            <Typography weight='var(--font-weight-bold)'>{value?.label || ``}</Typography>
          </Box>
          <Box>
            <Typography>{value?.originText}</Typography>
          </Box>
        </BoxWrap>
      )}
    />
  );

  const info: IHE01602Info = {
    altText: '진행자가 무대에서 마이크를 들고 서 있고 남자 아이와 여자 아이는 무대에서 퀴즈를 맞추고 신나 있다. 로봇이 아이들을 축하하고 있다.',
    text: dialog,
    imageSrc: '/L07/C06/A08/ME1-L07-C06-A08-P01.jpg',
  };

  return (
    <Container headerInfo={headerInfo} audioInfo={audioInfo}>
      <BoxWrap useFull>
        <Box width='400px' vAlign='center' useFull>
          <PinchZoom>
            <Image
              src={info.imageSrc}
              width={info?.imageWidth || '100%'}
              height={info?.imageHeight || '100%'}
              alt={info.altText}
              ariaDescribedby={info.hiddenAltText ? 'img_desc' : undefined}
            />
          </PinchZoom>
          {info.hiddenAltText && (
            <Box type='hidden' id={'img_desc'}>
              {info.hiddenAltText}
            </Box>
          )}
        </Box>
        <Box marginLeft='10px' useFull hAlign='center'>
          <Box background='white' useRound>
            <Scroll height='100%' tabIndex={0}>
              {info.text}
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P01;
