import { Scroll, BoxWrap, Box, TMainHeaderInfoTypes, Typography, PinchZoom, Image, EStyleFontSizes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

const P12 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Read] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo} vAlign='flex-start' useExtend>
      <BoxWrap useFull>
        <Box useFull>
          <Box background='gray' border='none' hAlign='center'>
            <Typography useGap={false} weight={700} style={{ width: '100%' }}>
              Anna Ancher 2
            </Typography>
          </Box>

          <Box display='flex' marginTop='20px'>
            <Box>
              <PinchZoom>
                <Image
                  src={'/L03/SP03-1/HE2-L03-SP03-1-P12.jpg'}
                  width='346px'
                  alt='Anna Ancher의 그림 세 점. (주방에서 일하는 여성의 그림, 바느질하는 여성의 그림, 햇살이 들어오는 파란 방 창가에 서 있는 여성의 그림) 그리고 그 그림을 감상하고 있는 두 여성'
                />
                <Box type='hidden' id='img_desc'>
                  Anna Ancher의 그림 세 점. (주방에서 일하는 여성의 그림, 바느질하는 여성의 그림, 햇살이 들어오는 파란 방 창가에 서 있는 여성의 그림)
                  그리고 그 그림을 감상하고 있는 두 여성
                </Box>
              </PinchZoom>
            </Box>
            <Scroll height='390px'>
              <Box background='white' useRound margin='0 0 0 12px' padding='8px'>
                <Typography color='var(--color-grey-900)'>{`Ancher differed from other artists of that era, who depicted women as still life subjects.`}</Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`Ancher는 여성을 정물화 소재로 묘사한 당시의 다른 예술가들과는 달랐습니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>
                  She showcased them as active participants in everyday tasks, as seen in her works{' '}
                  <span style={{ fontStyle: 'italic' }}>The Maid in the Kitchen and Sewing Fisherman’s Wife.</span>
                </Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`그녀는 <부엌의 하녀>와 <바느질하는 어부의 아내>라는 그녀의 작품에서 볼 수 있듯이 여성을 일상 업무에 적극적으로 참여하는 사람으로 보여주었습니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>
                  She also skillfully explored light and color, contributing to the rich Impressionist movement in Denmark.
                </Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`그녀는 또한 빛과 색채를 능숙하게 탐구하여 덴마크의 풍부한 인상주의 운동에 기여했습니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>
                  In her painting <span style={{ fontStyle: 'italic' }}>Sunlight in the Blue Room,</span> the reflection of the sunlight on the blue
                  wall is stunningly portrayed.
                </Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`그녀의 그림 <푸른 방의 햇빛>에서는 푸른 벽에 반사되는 햇빛이 멋지게 묘사되어 있습니다.`}</Typography>

                <Typography color='var(--color-grey-900)'>{`Ancher challenged the conventional roles of women in the 20th century and displayed her exceptional artistic talent.`}</Typography>
                <Typography
                  color='var(--color-blue-900)'
                  size={EStyleFontSizes['X-MEDIUM']}
                >{`Ancher는 20세기 여성의 전통적인 역할에 도전하며 뛰어난 예술적 재능을 발휘했습니다.`}</Typography>
              </Box>
            </Scroll>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P12;
