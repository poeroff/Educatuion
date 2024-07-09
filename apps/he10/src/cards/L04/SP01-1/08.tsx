import { Box, BoxWrap, EStyleFontSizes, ESvgType, SimpleAudioPlayer, SvgIcon, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import BlueDotSVG from '@/assets/icon/blue_dot.svg';
import styled from '@emotion/styled';

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Listen & Speak] 주요 내용 이해하기',
  };

  return (
    <Container headerInfo={headerInfo}>
      <BoxWrap useFull flexDirection='column' gap='24px'>
        <Box padding='10px 0' gap='10px'>
          <Box vAlign='center' gap='10px' paddingLeft='10px'>
            <SvgIcon src={BlueDotSVG} type={ESvgType.IMG} alt='' />
            <TitleTypography size={EStyleFontSizes['LARGE']}>제안하기</TitleTypography>
          </Box>
          <Typography color='var(--color-blue-900)'>
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              Why don't you~?
            </Typography>{' '}
            를 사용하여 제안을 표현할 수 있다.
          </Typography>
        </Box>
        <Box display='flex' useFull gap='20px' flexDirection='column'>
          <Box display='flex' flexDirection='row' hAlign='space-between' vAlign='flex-start'>
            <Box gap='4px' display='flex' flexDirection='column'>
              <Box>
                <Typography>
                  <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                    Why don't you
                  </Typography>{' '}
                  turn it into a swing?
                </Typography>
              </Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                그것을 그네로 바꿔 보는 것이 어때?
              </Typography>
            </Box>
            <Box hAlign='flex-end' padding='6px 0'>
              <SimpleAudioPlayer audioSrc='/L04/SP01-1/HE1-L04-SP01-1-P08-01.mp3' />
            </Box>
          </Box>
          <Box display='flex' flexDirection='row' hAlign='space-between' vAlign='flex-start'>
            <Box gap='4px' display='flex' flexDirection='column'>
              <Box>
                <Typography>
                  <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                    Why don't you
                  </Typography>{' '}
                  make one with me?
                </Typography>
              </Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                나와 함께 하나 만들어 보는 것이 어때?
              </Typography>
            </Box>
            <Box hAlign='flex-end' padding='6px 0'>
              <SimpleAudioPlayer audioSrc='/L04/SP01-1/HE1-L04-SP01-1-P08-02.mp3' />
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P08;

const TitleTypography = styled(Typography)`
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-32);
  height: 64px;
`;
