import {
  Box,
  BoxWrap,
  EStyleFontSizes,
  ESvgType,
  ISimpleAudioPlayerRef,
  Label,
  SimpleAudioPlayer,
  SvgIcon,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import BlueDotSVG from '@/assets/icon/blue_dot.svg';
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

interface ISP011HE00801 {
  headerInfo: TMainHeaderInfoTypes;
  title: string;
  subtitle: string;
  data: {
    label: string;
    labelColor: string;
    originText: React.ReactNode;
    translation: string;
    audioSrc: string;
  }[];
}

const SP011HE00801 = ({ headerInfo, title, subtitle, data }: ISP011HE00801) => {
  const audioRefs = useRef<(ISimpleAudioPlayerRef | null)[]>([]);

  const handleAudioReset = (index: number) => {
    audioRefs.current.forEach((ref, idx) => {
      idx !== index && ref?.changePlayStatus(false);
    });
  };

  return (
    <Container headerInfo={headerInfo}>
      <BoxWrap useFull flexDirection='column' gap='24px'>
        <Box padding='10px 0' gap='10px'>
          <Box vAlign='center' gap='10px' paddingLeft='10px'>
            <SvgIcon src={BlueDotSVG} type={ESvgType.IMG} alt='' />
            <TitleTypography size={EStyleFontSizes['LARGE']}>{title}</TitleTypography>
          </Box>
          <Typography color='var(--color-blue-900)'>{subtitle}</Typography>
        </Box>
        <Box display='flex' useFull gap='20px' flexDirection='column'>
          {data.map((value, index = 1) => (
            <Box key={index} display='flex' flexDirection='row' hAlign='space-between' vAlign='flex-start'>
              <Box gap='4px' display='flex' flexDirection='column'>
                <Box useFull hAlign='flex-start'>
                  <Box marginRight='8px' alignSelf='start'>
                    <Label value={value.label} type={'paint'} background={value.labelColor} />
                  </Box>
                  <Box>
                    {value.originText}
                    <Box>
                      <Typography size={EStyleFontSizes['X-MEDIUM']} color='var(--color-grey-700)'>
                        {value.translation}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box hAlign='flex-end' padding='6px 0'>
                <SimpleAudioPlayer
                  ref={ref => {
                    audioRefs.current[index] = ref;
                  }}
                  audioSrc={value?.audioSrc ?? ''}
                  ariaLabel={index + 1 + '번 지문 듣기 버튼'}
                  onChangeStatus={() => handleAudioReset(index)}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default SP011HE00801;

const TitleTypography = styled(Typography)`
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-32);
  height: 64px;
`;
