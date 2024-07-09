import { useState } from 'react';
import { Box, BoxWrap, IQuestionProps, TMainHeaderInfoTypes, Image, Input, Typography, Label } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';

const EM10001 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '문제',
    iconType: 'write',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '종이비행기가 나는 동안의 시간을 재어 보세요.',
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');

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
      <BoxWrap>
        <Box paddingTop='10px' gap={10} useFull flexDirection='column' flex={1} vAlign='center'>
          <Box vAlign='center'>
            <Image src='../../assets/example/EM-100-01/MA31510.jpg' alt='여자 아이가 종이 비행기를 날리고 있습니다' width='548px' height='296px' />
          </Box>
          <Box vAlign='center'>
            <StopwatchButton>
              <ButtonText onClick={() => {}}>초시계</ButtonText>
            </StopwatchButton>
          </Box>
          <Box vAlign='center'>
            <Input
              value={value1}
              width='136px'
              onChange={e => {
                setValue1(e.target.value);
              }}
              ariaLabel='종이비행기가 나는 동안의 시간 초를 적어주세요.'
            />

            <Typography useGap={false} lineHeight='48px'>
              초
            </Typography>
          </Box>
        </Box>
      </BoxWrap>
    </Container>
  );
};

const StopwatchButton = styled.button`
  width: 94px;
  height: 94px;
  position: absolute;
  top: 20px;
  left: 866px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1; /* Set to fully visible */
  background-color: lightgray; /* Update the background color here */
`;
const ButtonText = styled.span`
  font-size: 20px;
  font-weight: 500;
  line-height: 58px;
  text-align: center;
  width: 64px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1; /* Set to fully visible */
`;

export default EM10001;
