import styled from '@emotion/styled';
import { Box, IQuestionProps, Label, Symbol, TMainHeaderInfoTypes, Image, EImageType, Typography, BoxWrap, List, Radio } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

const EMA00303 = () => {
  const [isShow, setShow] = useState<boolean>(true);
  const [radio, setRadio] = useState<number>(0);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        <Box vAlign='center'>
          계산 결과가 가장 작은 것에&nbsp;
          <Symbol type='correct' />
          &nbsp;표 하세요.
        </Box>
      </>
    ),
  };
  const handleClick = (index: number) => {
    setRadio(index);
  };
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background='var(--color-white)'
      useRound
      onSubmit={() => {
        setShow(!isShow);
      }}
    >
      <Box display='flex' justifyContent='center' marginTop='9px' position='relative' useFull>
        <Image src={'../../assets/example/EMA-003-03/animals.png'} width='683px' height='199px' alt='' type={EImageType.IMG} />
        <BoxWrap position='absolute' justifyContent='space-between' top='141px' width='590px' marginRight={5}>
          <List gap={155} align='horizontal' data={['48×2', '19×5', '26×4']}>
            {({ value, index = 1 }) => (
              <Radio name={'radio-group'} onClick={() => handleClick(index - 1)}>
                <StyleButton>
                  <Symbol type={(index === 1 && 'correct') || 'none'} size={60} cssStyle={{ position: 'absolute', left: '17px', top: '-8px' }} />
                </StyleButton>
                <Typography lineHeight='42px'>{value}</Typography>
              </Radio>
            )}
          </List>
        </BoxWrap>
      </Box>
    </Container>
  );
};
const StyleButton = styled.span`
  position: relative;
  display: inline-block;
  height: 40px;
`;
export default EMA00303;
