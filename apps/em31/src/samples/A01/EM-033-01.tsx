import { useState } from 'react';
import { Box, TMainHeaderInfoTypes, Label, OverlayTooltip, Input, IQuestionProps, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import otter from '../../assets/example/otter_41.png';

const EM03201 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈의 몫을 곱셈식으로 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='#969590' color='var(--color-white)' />
        32 ÷ 4의 몫을 구할 수 있는 곱셈식을 써 보세요.
      </>
    ),
  };

  const [isShow, setShow] = useState(false);
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='완료하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      vAlign='flex-start'
      useRound
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' useRound padding='20px 44px'>
          <Typography>4×</Typography>
          <Input width='122px' value={value1} onChange={e => setValue1(e.target.value)} ariaLabel='곱셈식의 두번째 값을 입력하세요' />
          <Typography>=</Typography>
          <Input width='122px' value={value2} onChange={e => setValue2(e.target.value)} ariaLabel='곱셈식을 계산한 값을 입력하세요' />
        </Box>

        <OtterSpeak>
          <Box useFull display='flex' justifyContent='flex-end' alignItems='flex-start'>
            <OverlayTooltip type='cloud' place='right' isShow>
              4와 곱해서 <br /> 32가 되어야 <br /> 하니까........
            </OverlayTooltip>
          </Box>
        </OtterSpeak>
      </Box>
    </Container>
  );
};

const OtterSpeak = styled.div`
  position: absolute;
  top: 50px;
  right: 40px;

  display: block;
  background: url(${otter}) bottom left no-repeat;
  background-size: 142px 156px;

  width: 266px;
  height: 167px;
`;

export default EM03201;
