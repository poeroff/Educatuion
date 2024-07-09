import {
  BoxWrap,
  IQuestionProps,
  Label,
  TMainHeaderInfoTypes,
  Image,
  Box,
  OverlayTooltip,
  Typography,
  Button,
  EStyleButtonTypes,
  SvgIcon,
  ESvgType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import Otter from '@/assets/example/EM-084-01/character_otter.svg';
import MapPin from '@/assets/example/EM-084-01/map_pin.svg';

const EM08401 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '1 m보다 큰 단위 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄹ' color='var(--color-white)' background='#969590' />
        우리 학교에서 1 km 떨어진 곳은 어디일지 예상해 보고 디지털 지도로 확인해 보세요.
      </>
    ),
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} background={'var(--color-white)'} useRound useExtend>
      <BoxWrap useFull>
        <Box hAlign='center' gap='24px' useFull>
          <Image src={'/example/EM-084-01/map.png'} width='566px' height='341px' alt='우체국과 초등학교 사이의 거리가 1km라고 표시되어 있는 지도' />
          <Box display='flex' flexDirection='column' gap='36px'>
            <Button color={EStyleButtonTypes.SECONDARY} width='330px' height='84px' aria-label='' useRound>
              <Box vAlign='center' gap='8px'>
                <SvgIcon src={MapPin} type={ESvgType.IMG} alt='지도 핀 모양' />
                <Typography fontSize='26px' color='var(--color-grey-900)' useGap={false}>
                  디지털 지도 확인하기
                </Typography>
              </Box>
            </Button>
            <Box hAlign='flex-start' width='100%'>
              <Box hAlign='center' flexDirection='column'>
                <OverlayTooltip type='cloud' place='top' fontSize='24px'>
                  1 km는
                  <br />
                  100 m가 10번인
                  <br />
                  길이예요.
                </OverlayTooltip>
                <SvgIcon src={Otter} type={ESvgType.IMG} alt='책을 읽고 있는 수달' />
              </Box>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM08401;
