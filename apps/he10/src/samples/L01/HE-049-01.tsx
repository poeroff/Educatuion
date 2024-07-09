import { useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  IQuestionProps,
  Image,
  BoxWrap,
  PinchZoom,
  ETextViewColor,
  TextView,
  Scroll,
  Typography,
  EStyleFontSizes,
  OverlayTooltip,
  Label,
  SimpleAudioPlayer,
} from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';

const HE04901 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'What Will Our Future Look Like?',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Search for information about the future spciety and take a look at the example to create your own.',
  };

  return (
    <Container bodyId='targetContainer' headerInfo={headerInfo} questionInfo={questionInfo} useExtend>
      <BoxWrap boxGap={36} useFull>
        <Box useFull vAlign='center'>
          <TextView type={ETextViewColor.DEFAULT} title={'보기'} height='292px'>
            <PinchZoom>
              <Image
                src={'../../assets/example/HE2-L04-C10-A02-P04.png'}
                width='438px'
                height='240px'
                alt='집 이미지에 다양한 회로가 연결된 배경에 Smart Home Devices, Smart Curtains, Smart Refrigerators, Smart Security Systems 이라고 적혀 있다.'
              />
            </PinchZoom>
          </TextView>
        </Box>
        <Balloon place='left' backgroundColor='var(--color-yellow-50)' isShadow whiteSpace={false}>
          <Scroll tabIndex={0}>
            <Typography size={EStyleFontSizes['X-MEDIUM']} useGap={false}>
              Smart homes include devices that are automatically operated and controlled from a distance. Smart curtains open and close based on the
              amount of sunlight and smart refrigerators order food without human directions. Smart security systems can also protect our homes can
              also protect our homes can also protect our homes
            </Typography>
          </Scroll>
        </Balloon>
      </BoxWrap>
    </Container>
  );
};

export default HE04901;
