import { Box, IQuestionProps, Label, TMainHeaderInfoTypes, Image, OverlayTooltip, EStampType } from '@maidt-cntn/ui';
import { Container, Stamp } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EM06902 = () => {
  const [radio, setRadio] = useState<number | null>(null);

  const handleRadio = (index: number) => {
    setRadio(index);
  };
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '짝 짓기 놀이로 나머지 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value={'ㄴ'} color='var(--color-white)' background='#969590' />
        남는 학생 없이 모두 짝을 지을 수 있나요?{' '}
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
            <Image src='../../assets/example/EM-069-02/image 799.png' width='634px' height='254px' />
            <Box position='absolute' top='5px' right='4px' whiteSpace='pre-line'>
              <OverlayTooltip type='cloud' place='right'>
                2명씩{'\n'}모이세요.
              </OverlayTooltip>
            </Box>
          </Box>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Box hAlign='center' marginRight='64px'>
            <Stamp width='130px' height='124px' isClicked={radio === 0} onClick={() => handleRadio(0)} stampType={EStampType.O} />
          </Box>
          <Box hAlign='center'>
            <Stamp width='130px' height='124px' isClicked={radio === 1} onClick={() => handleRadio(1)} stampType={EStampType.X} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EM06902;
