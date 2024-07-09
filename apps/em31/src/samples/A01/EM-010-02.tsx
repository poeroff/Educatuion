import { useState } from 'react';
import styled from '@emotion/styled';

import { Box, Typography, Input, Label, IQuestionProps } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import backgroundImg from '../../assets/example/EM-010/MC31108.png';

const EM01002 = () => {
  const [value, setValue] = useState<string>('');

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />세 자리 수가 쓰인 수 카드 2장을 뽑아 뺄셈을 하려고 했는데 한 장이 찢어져서 수가 보이지 않습니다. 카드에 쓰인 두
        수의 차가 672일 때 찢어진 수를 카드에 쓰인 수를 구해 보세요.
      </>
    ),
  };

  return (
    <Container headerInfo={null} questionInfo={questionInfo} background={'var(--color-white)'} submitLabel='채점하기' onSubmit={() => {}} useRound>
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <QuestionBox>
          <Typography weight={'var(--font-weight-bold)'} ariaLabel='첫번째 카드 : 840'>
            840
          </Typography>
          <Typography weight={'var(--font-weight-bold)'} ariaLabel='두번째 카드 : 68'>
            68
          </Typography>
        </QuestionBox>
        <Box marginTop='20px'>
          <Input width='263px' value={value} onChange={e => setValue(e.target.value)} ariaLabel='답을 입력하세요' />
        </Box>
      </Box>
    </Container>
  );
};

const QuestionBox = styled.div`
  width: 292px;
  height: 70px;
  padding: 0 7.52px 0 17.52px;

  display: flex;
  align-items: center;

  background: url(${backgroundImg}) no-repeat;
  background-size: 292px 74px;

  > span + span {
    margin-left: 130px;
  }
`;

export default EM01002;
