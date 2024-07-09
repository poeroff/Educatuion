import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, Typography, PinchZoom, Image, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P09 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull>
          <Box background='gray' border='none' hAlign='center' marginBottom='20px'>
            <Typography useGap={false} weight={700} style={{ width: '100%' }}>
              Maud Lewis 1
            </Typography>
          </Box>

          <Scroll height='390px'>
            <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
              <Typography color='var(--color-grey-900)'>{`Next, we have Maud Lewis, a renowned artist known for her heart-warming paintings.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`다음은 마음이 따뜻해지는 그림으로 유명한 예술가 Maud Lewis입니다.`}</Typography>

              <Typography color='var(--color-grey-900)'>{`Born in a small Canadian town in 1903, Lewis suffered from physical weaknesses such as distorted shoulders and fingers.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`1903년 캐나다의 작은 마을에서 태어난 Lewis는 뒤틀린 어깨와 손가락 같은 신체적 결함으로 고생했습니다.`}</Typography>

              <Typography color='var(--color-grey-900)'>{`This limited her mobility and caused her to drop out of school. `}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`이러한 결함으로 그녀는 거동이 불편해졌고 학교를 중퇴하게 되었습니다.`}</Typography>

              <Typography color='var(--color-grey-900)'>{`To make a living, she began to paint and sell Christmas cards. `}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`생계를 위해 그녀는 크리스마스 카드를 그려서 팔기 시작했습니다. `}</Typography>

              <Typography color='var(--color-grey-900)'>{`After marrying, the couple spent the rest of their lives there, and Lewis continued to paint.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`결혼 후, 부부는 남은 삶을 그곳에서 보냈고 Lewis는 계속해서 그림을 그렸습니다.`}</Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P09;
