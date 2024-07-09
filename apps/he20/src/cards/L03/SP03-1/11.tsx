import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, Typography, PinchZoom, Image, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P11 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull>
          <Box background='gray' border='none' hAlign='center' marginBottom='20px'>
            <Typography useGap={false} weight={700} style={{ width: '100%' }}>
              Anna Ancher 1
            </Typography>
          </Box>

          <Scroll height='390px'>
            <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
              <Typography color='var(--color-grey-900)'>{`Anna Ancher was a famous painter from Denmark.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`Anna Ancher는 덴마크 출신의 유명 화가였습니다.`}</Typography>

              <Typography color='var(--color-grey-900)'>{`Her paintings have a common theme — they all feature female figures.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`그녀의 그림엔 공통적인 하나의 주제가 있는데, 바로 모든 그림에 여성 인물이 등장한다는 점입니다.`}</Typography>

              <Typography color='var(--color-grey-900)'>{`She attended a private painting school, and after that, she even studied abroad in Paris, which was unusual for women at the time.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`그녀는 사립 회화학교에 다녔고, 그 후에 그녀는 파리에서 유학도 했는데, 이는 당시 여성으로서는 드문 일이었습니다.`}</Typography>

              <Typography color='var(--color-grey-900)'>{`Even after getting married, Ancher persisted in painting, objecting to the social pressure that married women were to solely focus on household duties.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`결혼 후에도 Ancher는 기혼 여성은 가사에만 집중해야 한다는 사회적 압력에 저항하며 그림을 계속 그렸습니다.`}</Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P11;
