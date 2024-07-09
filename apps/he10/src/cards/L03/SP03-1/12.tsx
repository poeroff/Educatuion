import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, Typography, PinchZoom, Image, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P12 = () => {
  // const cdnPath = import.meta.env.VITE_CDN_PATH;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box padding='0 20px'>
          <Scroll tabIndex={0}>
            <Box background='white' useRound padding='10px'>
              <Typography color='var(--color-grey-900)'>{`As technology advances, many people expect it will solve various social issues caused by noise pollution. `}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`기술이 발전함에 따라, 많은 사람은 그것이 소음 공해로 인해 발생하는 다양한 사회 문제를 해결할 것이라고 기대한다.`}</Typography>
              <Typography
                style={{ marginTop: 16 }}
                color='var(--color-grey-900)'
              >{`A common source of these problems is noisy neighbors, as the noise they make can lead to conflict among residents. `}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`이러한 문제의 흔한 원인은 시끄러운 이웃인데, 이는 이웃이 발생시키는 소음이 주민 간의 갈등으로 이어질 수 있기 때문이다. `}</Typography>
              <Typography
                style={{ marginTop: 16 }}
                color='var(--color-grey-900)'
              >{`Noise-cancellation technology can help address these problems by reducing unwanted disturbances, allowing people to lead more peaceful and healthier lives.`}</Typography>
              <Typography
                color='var(--color-blue-900)'
                size={EStyleFontSizes['X-MEDIUM']}
              >{`노이즈 캔슬링 기술은 원치 않는 방해를 줄여 이 문제를 해결하는 데 도움을 주며, 사람들이 더욱 평화롭고 건강한 삶을 살게 할 수 있다.`}</Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P12;
