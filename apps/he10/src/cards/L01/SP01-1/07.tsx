import { Box, BoxWrap, EStyleFontSizes, ESvgType, SimpleAudioPlayer, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import BlueDotSVG from '@/assets/icon/blue_dot.svg';
import styled from '@emotion/styled';

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo}>
      <BoxWrap useFull flexDirection='column' gap='24px'>
        <Box padding='10px 0' gap='10px'>
          <Box vAlign='center' gap='10px' paddingLeft='10px'>
            <SvgIcon src={BlueDotSVG} type={ESvgType.IMG} alt='' />
            <TitleTypography size={EStyleFontSizes['LARGE']}>희망 표현하기</TitleTypography>
          </Box>
          <Typography color='var(--color-blue-900)'>
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              I hope~
            </Typography>
            를 사용하여 어떤 일이 일어나기를 바라거나 기대하는 표현을 말할 수 있다.
          </Typography>
        </Box>
        <Box display='flex' useFull gap='20px' flexDirection='column'>
          <Box display='flex' flexDirection='row' hAlign='space-between' vAlign='flex-start'>
            <Box gap='4px' display='flex' flexDirection='column'>
              <Box>
                <Typography>
                  Personally,{' '}
                  <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                    I hope I can
                  </Typography>{' '}
                  complete a 5 km race.
                </Typography>
              </Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                개인적으로, 나는 5 km 경기를 완주할 수 있으면 좋겠다.
              </Typography>
            </Box>
            <Box hAlign='flex-end' padding='6px 0'>
              <SimpleAudioPlayer audioSrc='/L01/SP01-1/HE1-L01-SP01-1-P07-01.wav' />
            </Box>
          </Box>
          <Box display='flex' flexDirection='row' hAlign='space-between' vAlign='flex-start'>
            <Box gap='4px' display='flex' flexDirection='column'>
              <Box>
                <Typography>
                  Well,{' '}
                  <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                    I hope my school soccer team can
                  </Typography>{' '}
                  win first place.
                </Typography>
              </Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                나는 우리 학교 축구팀이 1등을 할 수 있으면 좋겠다.
              </Typography>
            </Box>
            <Box hAlign='flex-end' padding='6px 0'>
              <SimpleAudioPlayer audioSrc='/L01/SP01-1/HE1-L01-SP01-1-P07-02.wav' />
            </Box>
          </Box>
          <Box display='flex' flexDirection='row' hAlign='space-between' vAlign='flex-start'>
            <Box gap='4px' display='flex' flexDirection='column'>
              <Box>
                <Typography>
                  <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                    I hope you’ll
                  </Typography>{' '}
                  come and enjoy some of the school’s new facilities!
                </Typography>
              </Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                저는 여러분이 학교의 새로운 시설을 방문하여 즐기길 바랍니다.
              </Typography>
            </Box>
            <Box hAlign='flex-end' padding='6px 0'>
              <SimpleAudioPlayer audioSrc='/L01/SP01-1/HE1-L01-SP01-1-P07-03.wav' />
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P07;

const TitleTypography = styled(Typography)`
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-32);
  height: 64px;
`;
