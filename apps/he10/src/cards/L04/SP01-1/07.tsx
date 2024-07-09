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
            <TitleTypography size={EStyleFontSizes['LARGE']}>걱정 표현하기</TitleTypography>
          </Box>
          <Typography color='var(--color-blue-900)'>
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              I'm worried about~
            </Typography>{' '}
            을 사용하여 걱정을 표현할 수 있다.
          </Typography>
        </Box>
        <Box display='flex' useFull gap='20px' flexDirection='column'>
          <Box display='flex' flexDirection='row' hAlign='space-between' vAlign='flex-start'>
            <Box gap='4px' display='flex' flexDirection='column'>
              <Box>
                <Typography>
                  <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                    I'm worried about
                  </Typography>{' '}
                  turtles in the ocean.
                </Typography>
              </Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                나는 바닷속 거북이들에 대해 걱정이 돼.
              </Typography>
            </Box>
            <Box hAlign='flex-end' padding='6px 0'>
              <SimpleAudioPlayer audioSrc='/L04/SP01-1/HE1-L04-SP01-1-P07-01.mp3' />
            </Box>
          </Box>
          <Box display='flex' flexDirection='row' hAlign='space-between' vAlign='flex-start'>
            <Box gap='4px' display='flex' flexDirection='column'>
              <Box>
                <Typography>
                  <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                    I'm worried about
                  </Typography>{' '}
                  polar bears in the Arctic.
                </Typography>
              </Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                나는 북극의 북극곰들에 대해 걱정이 돼.
              </Typography>
            </Box>
            <Box hAlign='flex-end' padding='6px 0'>
              <SimpleAudioPlayer audioSrc='/L04/SP01-1/HE1-L04-SP01-1-P07-02.mp3' />
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
