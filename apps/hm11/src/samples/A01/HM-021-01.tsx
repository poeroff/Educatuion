import { Box, IQuestionProps, PinchZoom, VideoPlayer } from '@maidt-cntn/ui';
import { HContainer, THighLevelMainHeaderInfoTypes } from '@maidt-cntn/ui/math';

const HM02101 = () => {
  const headerInfo: THighLevelMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathEnginTool',
    headerText: '공학 도구를 이용한 조립제법',
    headerTextColor: 'var(--color-header-blue)',
    headerSubTexts: ['relation', 'compute'],
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <>
        &nbsp;스프레드시트를 이용하여 조립제법으로 삼차식 x3-2x+x-3을 일차식
        <br />
        x-3으로 나누었을 때의 몫과 나머지를 구하는 방법을 알아보자.
      </>
    ),
  };

  return (
    <HContainer headerInfo={headerInfo} questionInfo={questionInfo} useExtend>
      <Box useFull vAlign='center' hAlign='center'>
        <PinchZoom zIndex='11'>
          <VideoPlayer width={920} height={355} videoSrc={''} srtFile={''} />
        </PinchZoom>
      </Box>
    </HContainer>
  );
};

export default HM02101;
