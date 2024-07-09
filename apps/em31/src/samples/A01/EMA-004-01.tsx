import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, IQuestionProps, List, SvgIcon, Typography, Symbol } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import headerIcon from '../../assets/icon/m_default_01.svg';

const EMA00401 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box vAlign='center'>
          차가 더 작은 것을 찾아&nbsp;<Symbol type='correct' />&nbsp;표 하세요.
        </Box>
      </>
    ),
  };

  const [isShow, setShow] = useState<boolean>(false);
  const [radio, setRadio] = useState<number>(0);
  const handleClick = (index: number) => {
    setRadio(index);
  };

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
    >
      <Box useFull>
        <List
          gap={24}
          data={['826-413', '593-121']}
          row={({ value, index = 1 }) => (
            <Box vAlign='center' justifyContent='center' key={index}>
              <Box background='yellow' padding='16px 24px' useRound marginRight='24px'>
                <Typography>{value}</Typography>
              </Box>
              <Box vAlign='center'>
                <Typography>(</Typography>
                <CircleCheck type='button' onClick={() => handleClick(index - 1)}>
                  {index - 1 === radio && <Symbol type='correct' />}
                </CircleCheck>
                <Typography>)</Typography>
              </Box>
            </Box>
          )}
        />
      </Box>
    </Container>
  );
};

const CircleCheck = styled.button`
  width: 140px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default EMA00401;
