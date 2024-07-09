import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, Typography, PinchZoom, Image, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull>
          <Box background='gray' border='none' hAlign='center'>
            <Typography useGap={false} weight={700} style={{ width: '100%' }}>
              Bill Traylor 2
            </Typography>
          </Box>

          <Box display='flex' marginTop='20px'>
            <Box>
              <PinchZoom>
                <Image
                  src={'/L03/SP03-1/HE2-L03-SP03-1-P08.jpg'}
                  width='346px'
                  alt='Bill Traylor의 그림 세 점. (으르렁거리고 있는 개의 그림, 개를 산책시키고 있는 모자를 쓴 사람의 그림, 지갑을 들고 있는 여성과 우산을 들고 있는 남성의 그림)'
                />
                <Box type='hidden' id='img_desc'>
                  Bill Traylor의 그림 세 점. (으르렁거리고 있는 개의 그림, 개를 산책시키고 있는 모자를 쓴 사람의 그림, 지갑을 들고 있는 여성과 우산을
                  들고 있는 남성의 그림)
                </Box>
              </PinchZoom>
            </Box>
            <Scroll height='390px'>
              <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
                <Typography color='var(--color-grey-900)'>
                  {`Now, we’re going to look at some of his paintings, starting with`} <span style={{ fontStyle: 'italic' }}>Mean Dog</span> and{' '}
                  <span style={{ fontStyle: 'italic' }}>Man and Large Dog</span>.
                </Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`이제 <비열한 개>와 <인간과 큰 개>를 시작으로 그의 그림 몇 점을 살펴보겠습니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>{`His fear of dogs is expressed strongly in these pieces.`}</Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`이 작품들에는 개에 대한 그의 두려움이 강하게 표현되어 있습니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>
                  In contrast, <span style={{ fontStyle: 'italic' }}>Woman with Purse and Man with Umbrella</span> &nbsp;portrays the free lives of
                  African Americans that he observed on the streets of Montgomery.
                </Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`이와 대조적으로 <지갑을 든 여자와 우산을 든 남자>는 몽고메리 거리에서 관찰한 아프리카 계 미국인의 자유로운 삶을 묘사합니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>{`Using simple shapes and colors, Traylor captured complex moments in American history from slavery to freedom.`}</Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`Traylor는 단순한 형태와 색채를 사용하여 노예제에서 자유에 이르는 미국 역사의 복잡한 순간을 포착했습니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>{`As a result, he’s now considered an important figure in American folk art.`}</Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`그 결과 그는 현재 미국 민속 예술의 중요한 인물로 여겨지고 있습니다.`}</Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P08;
