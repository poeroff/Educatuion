import { Box, IQuestionProps, Label, TMainHeaderInfoTypes, Image, OverlayTooltip, EStampType, Input } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

const EM06903 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '짝 짓기 놀이로 나머지 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄹ'} color='var(--color-white)' background='#969590' />
        4명씩 몇 모둠을 만들고 몇 명이 남는지 알아보세요.
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      vAlign='flex-start'
      useRound
    >
      <Box>
        <Box display='flex' justifyContent='center'>
          <Box position='relative' width='686px'>
            <Image src='../../assets/example/EM-069-03/MA32304_수정.jpg' width='634px' height='254px' />
            <Box position='absolute' top='5px' right='4px' whiteSpace='pre-line'>
              <OverlayTooltip type='cloud' place='right'>
                4명씩{'\n'}모이세요.
              </OverlayTooltip>
            </Box>
          </Box>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Box padding='4px 12px 4px 0'>4명씩 </Box>
          <Input width='50px' onChange={() => {}} ariaLabel='4명씩 만들 수 있는 모둠의 수' textAlign='center' />
          <Box padding='4px 12px 4px 0'>모둠을 만들고 </Box>
          <Input width='50px' onChange={() => {}} ariaLabel='4명씩 모둠을 만들고 남는 사람의 수' textAlign='center' />
          <Box padding='4px 12px 4px 0'>명이 남습니다.</Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM06903;
