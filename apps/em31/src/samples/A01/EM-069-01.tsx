import { Box, IQuestionProps, Label, TMainHeaderInfoTypes, Image, OverlayTooltip } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM06901 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '짝 짓기 놀이로 나머지 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄱ'} color='var(--color-white)' background='#969590' />
        2명씩 묶어 보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {}}
      vAlign='flex-start'
      useRound
    >
      <Box>
        <Box position='relative'>
          <Image src='../../assets/example/EM-069-01/MA32304_수정.png' width='920px' height='368px' />
          <Box position='absolute' top='13px' right='4px' whiteSpace='pre-line'>
            <OverlayTooltip type='cloud' place='right'>
              2명씩{'\n'}모이세요.
            </OverlayTooltip>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM06901;
