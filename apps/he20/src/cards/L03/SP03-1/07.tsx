import { Scroll, PinchZoom, Image, BoxWrap, Box, TMainHeaderInfoTypes, Typography, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull>
          <Box background='gray' border='none' hAlign='center'>
            <Typography useGap={false} weight={700} style={{ width: '100%' }}>
              Bill Traylor 1
            </Typography>
          </Box>

          <Box display='flex' marginTop='20px'>
            <Box>
              <PinchZoom>
                <Image
                  src={'/L03/SP03-1/HE2-L03-SP03-1-P07.jpg'}
                  width='346px'
                  alt='사람들을 바라보며 그림을 설명하고 있는 여성 도슨트와 설명을 듣고 있는 세 명의 사람들'
                />
                <Box type='hidden' id='img_desc'>
                  사람들을 바라보며 그림을 설명하고 있는 여성 도슨트와 설명을 듣고 있는 세 명의 사람들
                </Box>
              </PinchZoom>
            </Box>
            <Scroll height='390px'>
              <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
                <Typography color='var(--color-grey-900)'>{`Traylor was born into slavery in the U.S. in 1853 and spent his early life working on a cotton farm in Alabama.`}</Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`Traylor는 1853년 미국에서 노예로 태어나 앨라배마 주의 목화 농장에서 일하며 어린 시절을 보냈습니다.`}</Typography>
                <Typography color='var(--color-grey-900)'>{`Although he became a free man after the American Civil War, he still had to face racial discrimination, working for very low wages on the farm.`}</Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`그는 미국 남북전쟁 이후 자유인이 되었지만, 농장에서 매우 낮은 임금을 받고 일하며 여전히 인종차별을 겪어야 했습니다.`}</Typography>
                <Typography color='var(--color-grey-900)'>{`It wasn’t until he was 85 years old and became too ill to work that he turned to drawing to express his life experiences.`}</Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`85세가 되고 몸이 너무 아파서 일을 할 수 없게 된 후에야 그는 자신의 인생 경험을 표현하기 위해 그림으로 눈을 돌렸습니다.`}</Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P07;
