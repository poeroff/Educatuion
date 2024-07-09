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

  const data: IListenAndAnswer[] = [
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'Now, here comes the final question.',
      translation: '이제 마지막 문제 나갑니다.',
    },
    {
      originText: 'Which country has the most pyramids in the world?',
      translation: '세계에서 어느 나라에 피라미드가 가장 많이 있을까요?',
    },
    {
      label: 'Sara',
      labelColor: 'var(--color-green-500)',
      originText: 'I’m sure it’s Egypt!',
      translation: '그것은 이집트인 것이 확실합니다!',
    },
    {
      label: 'Namjun',
      labelColor: 'var(--color-red-500)',
      originText: 'It’s Sudan.',
      translation: '그것은 수단입니다.',
    },
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'The answer is … Sudan!',
      translation: '정답은… 수단입니다!',
    },
    {
      label: 'Sara',
      labelColor: 'var(--color-green-500)',
      originText: 'Oh, really?',
      translation: '오, 정말요?',
    },
    {
      label: 'Host',
      labelColor: 'var(--color-purple-700)',
      originText: 'I’m surprised, too.',
      translation: '저도 놀랐습니다.',
    },
    {
      originText: 'Hey Joe, tell us more about it.',
      translation: '이봐요, Joe, 그것에 대해 좀 더 말해 주세요.',
    },
    {
      label: 'AI Joe',
      labelColor: 'var(--color-blue-400)',
      originText: 'Please look at this map.',
      translation: '이 지도를 보세요.',
    },
    {
      originText: 'Sudan and Egypt are close to each other.',
      translation: '수단과 이집트는 서로 가까이 있습니다.',
    },
    {
      originText: 'Egypt is more famous for its pyramids, but Sudan has more pyramids than Egypt.',
      translation: '이집트가 피라미드로 더 유명하지만, 수단에는 이집트보다 더 많은 피라미드가 있어요.',
    },
  ];

  const dialog = (
    <List<IListenAndAnswer>
      data={data}
      row={({ value, index = 1 }) => (
        <BoxWrap boxGap={10}>
          <Box minWidth='120px' textAlign='right' color={value?.labelColor} height='fit-content' borderRadius='8px'>
            <Typography weight='var(--font-weight-bold)'>{value?.label || ``}</Typography>
          </Box>
          <Box>
            <Typography>{value?.originText}</Typography>
          </Box>
        </BoxWrap>
      )}
    />
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Amazing Facts About the World (4)',
    headerPattern: 'text',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L07/C06/A07/ME1-L07-C06-A07-P01.mp3',
    captionSrc: '/L07/C06/A07/ME1-L07-C06-A07-P01.srt',
  };

  const info: IHE01602Info = {
    hiddenAltText: (
      <>
        <p>사막을 가상 공간으로 한 배경 앞에서 로봇이 세계 각 나라에 대해 설명하고 있고 아이들은 사막에 서서 로봇의 설명을 듣고 있다.</p>
        <p>로봇이 설명 하고 있는 세계 지도</p>
        <p>LIBYA</p>
        <p>CHAD</p>
        <p>NIGERIA</p>
        <p>ETHIOPIA</p>
        <p>SAUDI ARABIA</p>
        <p>NIGER</p>
        <p>SUDAN</p>
      </>
    ),
    altText: '',
    text: dialog,
    imageSrc: '/L07/C06/A07/ME1-L07-C06-A07-P01.jpg',
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
          <Box background='white' useFull useRound>
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
