import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, EImageType, IQuestionProps, Image, Input, Label, OverlayTooltip, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import bear from '../../assets/example/EM-037-03/bear.svg';

const EM03703 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '26÷6을 맞게 계산했는지 확인하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        계산이 맞는지 구슬을 묶어 확인해 보세요.
      </>
    ),
  };

  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='flex-start'
      submitLabel='채점하기'
      onSubmit={() => {}}
    >
      <Box hAlign='center' padding='8px 7px'>
        <Image
          src='../../assets/example/EM-037-03/MC32312.jpg'
          type={EImageType.IMG}
          alt='26개의 초록색 공이 있습니다.'
          width='670px'
          height='88px'
        />
      </Box>
      <Box hAlign='center' marginTop='24px'>
        <Input placeholder='' name={`value1`} value={value} onChange={e => setValue(e.target.value)} width='52px' ariaLabel={`답 입력란`} />
        <Box display='inline' padding='4px 12px 6px 2px'>
          <Typography useGap={false}>묶음, 나머지</Typography>
        </Box>
        <Input placeholder='' name={`value2`} value={value2} onChange={e => setValue2(e.target.value)} width='52px' ariaLabel={`답 입력란`} />
        <Box display='inline' padding='4px 12px 6px 2px'>
          <Typography useGap={false}>개</Typography>
        </Box>
      </Box>
      <Box hAlign='end'>
        <BearBalloon>
          <Box>
            <OverlayTooltip type='cloud' place='top'>
              구슬을 몇 개씩 <br />
              묶으면 될까요?
            </OverlayTooltip>
          </Box>
        </BearBalloon>
      </Box>
    </Container>
  );
};

export default EM03703;

const BearBalloon = styled.span`
  background: url(${bear}) bottom no-repeat;
  height: 220px;
  width: 208px;
`;
