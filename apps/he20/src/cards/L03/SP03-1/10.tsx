import { Scroll, SvgIcon, ESvgType, BoxWrap, Box, TMainHeaderInfoTypes, Typography, PinchZoom, Image, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P10 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull>
          <Box background='gray' border='none' hAlign='center'>
            <Typography useGap={false} weight={700} style={{ width: '100%' }}>
              Maud Lewis 2
            </Typography>
          </Box>

          <Box display='flex' marginTop='20px'>
            <Box>
              <PinchZoom>
                <Image
                  src={'/L03/SP03-1/HE2-L03-SP03-1-P10.jpg'}
                  width='346px'
                  alt='Maud Lewis의 그림 세 점. (배와 갈매기가 그려진 항구의 그림, 눈밭을 달리고 있는 붉은 썰매의 그림, 한 쌍의 소의 그림)'
                />
                <Box type='hidden' id='img_desc'>
                  Maud Lewis의 그림 세 점. (배와 갈매기가 그려진 항구의 그림, 눈밭을 달리고 있는 붉은 썰매의 그림, 한 쌍의 소의 그림)
                </Box>
              </PinchZoom>
            </Box>
            <Scroll height='390px'>
              <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
                <Typography color='var(--color-grey-900)'>
                  She often depicted the Digby landscapes in paintings such as <span style={{ fontStyle: 'italic' }}>Edge of Digby Harbor.</span>
                </Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`그녀는 <딕비 항구의 가장자리>와 같은 그림에서 딕비의 풍경을 자주 묘사했습니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>{`Her artwork used a mixture of bright and vivid oil paints and simple forms, generating an original, innovative style.`}</Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`그녀의 작품은 밝고 선명한 유화물감과 단순한 형태를 혼합하여 독창적이고 혁신적인 스타일을 만들어 냈습니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>
                  In <span style={{ fontStyle: 'italic' }}>Red Sleigh</span>, red maple leaves appear on a special winter landscape, and{' '}
                  <span style={{ fontStyle: 'italic' }}>Pair of Oxen</span> shows decorated cows standing in a flower field.
                </Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`<붉은 썰매>에는 붉은 단풍잎이 특별한 겨울 풍경에 등장하고, <한 쌍의 소>는 꽃밭에 서 있는 장식된 소를 보여줍니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>{`With these features, Lewis’ paintings create a magical quality, like that of a fairy tale.`}</Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`이러한 특징을 통해 Lewis의 그림은 마치 동화의 그것과 같은, 마법 같은 분위기를 자아냅니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>{`Maud Lewis expressed her love for the world through her paintings and became an iconic figure in Canadian folk art.`}</Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`Maud Lewis는 그림을 통해 세상에 대한 사랑을 표현하며 캐나다 민속 예술의 상징적인 인물이 되었습니다.`}</Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P10;
