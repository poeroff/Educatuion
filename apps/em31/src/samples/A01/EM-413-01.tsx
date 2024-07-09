import styled from '@emotion/styled';
import {
  Box,
  Drawing,
  EImageType,
  ESvgType,
  IQuestionProps,
  Image,
  Label,
  OverlayTooltip,
  SvgIcon,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import bear from '../../assets/example/EM-413-01/bear.svg';
import fox from '../../assets/example/EM-413-01/fox.svg';

const EM41301 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '각도 어림하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        각도를 어떻게 어림할 수 있을지 생각해 보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      submitLabel='완료하기'
      onSubmit={() => {}}
    >
      <Box height='183px'>
        <BearBalloon>
          <OverlayTooltip type='cloud' place='top'>
            직각과 비교하여
            <br />
            어림할 수 있어요.
          </OverlayTooltip>
        </BearBalloon>
        <FoxBalloon>
          <Box marginLeft='100px'>
            <OverlayTooltip type='cloud' place='right'>
              삼각자의 각과 비교하여
              <br />
              어림할 수 있어요.
              <br />
              <Image
                src='../../assets/example/EM-413-01/MC41227-2.jpg'
                type={EImageType.IMG}
                alt='삼각자의 각과 비교하여 어림할 수 있어요. 왼쪽에 직각, 60도, 30도가 표시된 삼각자가 있습니다. 오른쪽에는 직각과 나머지가 45도인 삼각자가 있습니다.'
                width='137px'
                height='98px'
              />
            </OverlayTooltip>
          </Box>
        </FoxBalloon>

        <Box hAlign='center' vAlign='flex-end' height='183px'>
          <Image
            src='../../assets/example/EM-413-01/MC41213.jpg'
            type={EImageType.IMG}
            alt='각의 크기가 직각보다 작은 도형이 있습니다.'
            width='193px'
            height='148px'
          />
        </Box>
      </Box>
      <Box marginTop='24px' flex={1}>
        <Drawing />
      </Box>
    </Container>
  );
};
export default EM41301;

const BearBalloon = styled.span`
  position: absolute;
  left: 190px;
  top: 10px;

  display: inline-block;
  background: url(${bear}) bottom right no-repeat;
  height: 183px;
  width: 134px;
`;

const FoxBalloon = styled.span`
  position: absolute;
  right: 100px;
  top: 10px;

  display: inline-block;
  background: url(${fox}) bottom left no-repeat;
  height: 183px;
  width: 285px;
`;
