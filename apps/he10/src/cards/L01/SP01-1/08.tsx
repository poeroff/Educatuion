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
            <TitleTypography size={EStyleFontSizes['LARGE']}>공감 표현하기</TitleTypography>
          </Box>
          <Typography color='var(--color-blue-900)'>
            상대방의 말을 듣고 공감을 표현할 때는{' '}
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              I know how you~
            </Typography>{' '}
            또는
            <Typography useGap={false} weight={'var(--font-weight-bold)'}>
              I understand how you~
            </Typography>{' '}
            등으로 말할 수 있다.
          </Typography>
        </Box>
        <Box display='flex' useFull gap='20px' flexDirection='column'>
          <Box display='flex' flexDirection='row' hAlign='space-between' vAlign='flex-start'>
            <Box gap='4px' display='flex' flexDirection='column'>
              <Box>
                <Typography>
                  <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                    I know how
                  </Typography>{' '}
                  you feel.
                </Typography>
              </Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                네가 어떤 기분일지 알아.
              </Typography>
            </Box>
            <Box hAlign='flex-end' padding='6px 0'>
              <SimpleAudioPlayer audioSrc='/L01/SP01-1/HE1-L01-SP01-1-1-P08-01.mp3' />
            </Box>
          </Box>
          <Box display='flex' flexDirection='row' hAlign='space-between' vAlign='flex-start'>
            <Box gap='4px' display='flex' flexDirection='column'>
              <Box>
                <Typography>
                  <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                    I understand how
                  </Typography>{' '}
                  you feel.
                </Typography>
              </Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                네가 어떤 기분일지 이해해.
              </Typography>
            </Box>
            <Box hAlign='flex-end' padding='6px 0'>
              <SimpleAudioPlayer audioSrc='/L01/SP01-1/HE1-L01-SP01-1-1-P08-02.mp3' />
            </Box>
          </Box>
          <Box display='flex' flexDirection='row' hAlign='space-between' vAlign='flex-start'>
            <Box gap='4px' display='flex' flexDirection='column'>
              <Box>
                <Typography>
                  <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                    I know how
                  </Typography>{' '}
                  all of you must feel.
                </Typography>
              </Box>
              <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                여러분 모두의 마음을 알고 있습니다.
              </Typography>
            </Box>
            <Box hAlign='flex-end' padding='6px 0'>
              <SimpleAudioPlayer audioSrc='/L01/SP01-1/HE1-L01-SP01-1-1-P08-03.mp3' />
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
