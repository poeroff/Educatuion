import { BoxWrap, Box, TMainHeaderInfoTypes, PinchZoom, Image, Scroll, Typography, List, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import DownArrow from '@/assets/icon/down_arrow.svg';

interface ITranslation {
  en: string;
  ko: string;
}

const P10 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  const contents: ITranslation[] = [
    {
      en: 'Kindness is the key to success.',
      ko: '친절이 성공의 열쇠입니다.',
    },
    {
      en: 'We can use the power of our natural kindness to communicate and cooperate with different individuals.',
      ko: '우리는 다른 사람들과 소통하고 협력하기 위해 우리의 타고난 친절의 힘을 사용할 수 있습니다.',
    },
    {
      en: 'By being kind and working together, we can truly flourish.',
      ko: '친절하고 함께 일함으로써, 우리는 진정으로 번창할 수 있습니다.',
    },
  ];

  const info = {
    altText: '학교 캠퍼스 잔디 위에 나란히 서서 밝게 웃고  있는 일곱 명의 학생들',
    text: contents,
    imageSrc: '/L01/SP03-1/HE1-L01-SP03-1-P10.jpg',
    imageWidth: '278px',
    imageHeight: '195px',
  };
  return (
    <Container headerInfo={headerInfo}>
      <BoxWrap useFull>
        <Box width='346px' vAlign='center' useFull>
          <PinchZoom>
            <Image src={info.imageSrc} width={info?.imageWidth || '100%'} height={info?.imageHeight || '100%'} alt={info.altText} />
          </PinchZoom>
        </Box>
        <Box useFull>
          <Box useFull background='white' useRound>
            <Scroll height='100%' tabIndex={0}>
              <Box useFull display='flex' gap='10px' flexDirection='column'>
                <Typography size={EStyleFontSizes.MEDIUM}>{contents[0].en}</Typography>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                  {contents[0].ko}
                </Typography>
                <Typography size={EStyleFontSizes.MEDIUM}>{contents[1].en}</Typography>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                  {contents[1].ko}
                </Typography>
                <Typography size={EStyleFontSizes.MEDIUM}>{contents[2].en}</Typography>
                <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                  {contents[2].ko}
                </Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P10;
