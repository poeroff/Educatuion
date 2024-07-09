import { useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { Box, BoxWrap, IQuestionProps, Input, Label, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import ConnectorLine from '../../assets/example/connector_line.svg';
import ConnectorArrow from '../../assets/example/connector_arrow.svg';

const EM00501 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
  };

  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' hAlign='center' useRound width='636px' height='172px'>
          <BoxWrap display='flex' justifyContent='center' boxGap={0} marginTop='65px'>
            <Box width='130px' height='52px' hAlign='center' borderRadius='8px' background='var(--color-yellow-300)'>
              44
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>+ 19</GrayRoundBox>
            </Box>
            <Box>
              <Input width='130px' ariaLabel='답 입력란' value={value1} onChange={e => setValue1(e.target.value)} />
            </Box>
            <Box width='80px' hAlign='center'>
              <GrayRoundBox>-36</GrayRoundBox>
            </Box>
            <Box>
              <Input width='130px' ariaLabel='답 입력란' value={value2} onChange={e => setValue2(e.target.value)} />
            </Box>
          </BoxWrap>
        </Box>
      </Box>
    </Container>
  );
};

const GrayRoundBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-100);
  min-width: 120px;
  height: 52px;
  padding: 4px 12px;
  border-radius: 80px;
  margin-top: -140px;

  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    left: -30px;
    top: 50%;
    width: 26px;
    height: 42px;
    background: url(${`"${ConnectorLine}"`}) no-repeat;
    background-size: contain;
  }

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -40px;
    top: 50%;
    width: 35px;
    height: 46px;
    background: url(${`"${ConnectorArrow}"`}) no-repeat;
    background-size: contain;
  }
`;

export default EM00501;
