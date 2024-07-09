import styled from '@emotion/styled';
import { Box, IQuestionProps, Input, Label, OverlayTooltip, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState } from 'react';

import friends from '../../assets/example/EM-039-02/MA32309.jpg';

const EM03902 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        깃털을 한 명에게 3개씩 나누어 주려고 합니다. 준비한 깃털 수에 따라 남는 깃털 수가 될 수 있는 수를 알아보세요.
      </>
    ),
  };

  const onSubmit = () => {
    setShow(!isShow);
  };

  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');

  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={onSubmit}
      submitLabel='채점하기'
      useRound
      vAlign='flex-start'
    >
      <Box display='flex'>
        <Box paddingTop='12px'>
          <Label value='ㅁ' color='var(--color-white)' background='#969590' marginRight={20} />
        </Box>
        <Typography useGap={false} lineHeight='58px'>
          위에서 구한 수를 보고 나누는 수가 3일 때 나머지가 될 수 있는 수를
          <br />
          모두 써 보세요.
        </Typography>
      </Box>
      <Box marginTop='24px' hAlign='center'>
        <Input placeholder='' name={`value`} value={value} onChange={e => setValue(e.target.value)} width='52px' ariaLabel={`답 입력란`} />
        <Typography>,</Typography>
        <Input placeholder='' name={`value1`} value={value2} onChange={e => setValue2(e.target.value)} width='52px' ariaLabel={`답 입력란`} />
        <Typography>,</Typography>
        <Input placeholder='' name={`value2`} value={value3} onChange={e => setValue3(e.target.value)} width='52px' ariaLabel={`답 입력란`} />
      </Box>
      <Box marginTop='24px' hAlign='center'>
        <FriendsBalloon>
          <Box position='absolute' left='-250px' top='20px'>
            <OverlayTooltip type='cloud' place='left'>
              어떻게 문제를 해결했는지
              <br />
              설명해 봐요.
            </OverlayTooltip>
          </Box>

          <Box position='absolute' right='-250px' top='20px'>
            <OverlayTooltip type='cloud' place='right'>
              친구의 설명을 잘 듣고
              <br />
              궁금한 점을 질문해 봐요.
            </OverlayTooltip>
          </Box>
        </FriendsBalloon>
      </Box>
    </Container>
  );
};

export default EM03902;

const FriendsBalloon = styled.span`
  display: inline-block;
  position: relative;
  background: url(${friends}) no-repeat;
  background-size: cover;
  background-position: center;
  height: 124px;
  width: 370px;
  object-fit: contain;
`;
