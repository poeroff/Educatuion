import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, IQuestionProps, Label, TMainHeaderInfoTypes, Symbol, Typography, List, Radio } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import icCorrect from '@maidt-cntn/assets/icons/correct.svg';

const EMA00302 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        <Box vAlign='center'>
          계산 결과가 더 큰 것에&nbsp;
          <Box>
            <Symbol type='correct' />
          </Box>
          &nbsp;표 하세요.
        </Box>
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [radio, setRadio] = useState<number>(0);
  const handleClick = (index: number) => {
    setRadio(index);
  };
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => setShow(!isShow)}
      vAlign='flex-start'
      useRound
    >
      <Box hAlign='center'>
        <Box type='line' width='448px' hAlign='center' padding='24px 0' useRound>
          <Box hAlign='center'>
            <List gap={24} align='horizontal' data={['41×7', '82×2']}>
              {({ value, index = 1 }) => (
                <Radio name={'radio-group'} onClick={() => handleClick(index - 1)}>
                  <StyleButton>
                    <Symbol type={(index === 1 && 'correct') || 'none'} size={40} cssStyle={{ position: 'absolute', left: '10px', top: '0' }} />
                  </StyleButton>
                  {value}
                </Radio>
              )}
            </List>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

const StyleButton = styled.span`
  position: relative;
  display: inline-block;
  height: 40px;

  & + * {
    margin-left: 12px;
  }
`;

export default EMA00302;
