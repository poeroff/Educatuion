import { useState } from 'react';
import { Box, BoxWrap, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container, Stamp, EStampType } from '@maidt-cntn/ui/math';

const EM01101 = () => {
  const [radio, setRadio] = useState<number | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathRevaluation',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '스스로 평가해 보세요.',
  };

  const handleRadio = (index: number) => {
    setRadio(index);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {}}
      useRound
    >
      <BoxWrap justifyContent='center'>
        <Box>
          <Stamp isClicked={radio === 0} onClick={() => handleRadio(0)} stampType={EStampType.Excellent} />
        </Box>
        <Box>
          <Stamp isClicked={radio === 1} onClick={() => handleRadio(1)} stampType={EStampType.Good} />
        </Box>
        <Box>
          <Stamp isClicked={radio === 2} onClick={() => handleRadio(2)} stampType={EStampType.Soso} />
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default EM01101;
