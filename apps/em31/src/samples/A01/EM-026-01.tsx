import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, BoxWrap, IQuestionProps, Image, Label, OverlayTooltip, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import robot from '../../assets/example/EM-026-01/robot.png';

const EM02601 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [clickSeedlingsButtons, setClickSeedlingsButtons] = useState<number[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    iconType: 'search',
    headerPattern: 'icon',
    headerText: '심을 수 있는 모종 수 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='#969590' color='var(--color-white)' />
        모종 붙임딱지 6개를 2명의 텃밭에 똑같이 나누어 붙여 보세요.
      </>
    ),
  };

  const handleClick = (index: number) => {
    setClickSeedlingsButtons(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]));
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {
        setShow(!isShow);
      }}
      useRound
      vAlign='start'
    >
      <Box flexDirection='column' hAlign='center'>
        <BoxWrap justifyContent='center'>
          <Box position='relative'>
            <Image src='/example/EM-026-01/Frame 1000005025.png' alt='텃밭 1 이미지' width='340px' height='183px' />
            <GardenButton type='button'>
              {Array(5)
                .fill('')
                .map((_, idx) => (
                  <button type='button' key={`tree-A-${idx}`} onClick={() => {}}>
                    <Image src={`/example/EM-026-01/seedlings.png`} alt={`번째 모종 이미지`} width='47px' height='52px' />
                  </button>
                ))}
            </GardenButton>
          </Box>
          <Box position='relative'>
            <Image src='/example/EM-026-01/Frame 1000005026.png' alt='텃밭 2 이미지' width='340px' height='183px' />
            <GardenButton type='button'>
              {Array(5)
                .fill('')
                .map((_, idx) => (
                  <button type='button' key={`tree-B-${idx}`} onClick={() => {}}>
                    <Image src={`/example/EM-026-01/seedlings.png`} alt={`번째 모종 이미지`} width='47px' height='52px' />
                  </button>
                ))}
            </GardenButton>
          </Box>
        </BoxWrap>
        <RobotBalloon>
          <OverlayTooltip type='cloud' place='top'>
            하나씩 번갈아가며
            <br />
            붙여 보세요
          </OverlayTooltip>
        </RobotBalloon>

        <BoxWrap justifyContent='center' marginTop={24}>
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <Box key={index}>
                <ClickButton
                  type='button'
                  aria-label={`${index + 1}번째 모종 버튼`}
                  onClick={() => handleClick(index)}
                  state={clickSeedlingsButtons.includes(index) ? 'active' : undefined}
                >
                  <Image src={`/example/EM-026-01/seedlings.png`} alt={`${index + 1}번째 모종 이미지`} width='47px' height='52px' />
                </ClickButton>
              </Box>
            ))}
        </BoxWrap>
      </Box>
    </Container>
  );
};

const GardenButton = styled.button`
  position: absolute;
  height: 110px;
  width: 100%;

  bottom: 7px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const RobotBalloon = styled.span`
  position: absolute;
  right: 59px;
  top: 0;

  display: inline-block;
  height: 165px;
  width: 135px;
  background: url(${robot}) bottom right no-repeat;
  background-size: 80px 75px;
`;

// 텃밭 버튼에 올라갔을 시 투명색으로 변하게 => disabled
const ClickButton = styled.button<{ state?: 'active' | 'disabled' }>`
  border-radius: 16px;
  padding: 24px 26px;
  border: 1px solid var(--color-grey-300);

  ${({ state }) =>
    state === 'active' &&
    `
      padding: 23px 25px;
      border: 2px solid #1E6EFA;
      background: var(--color-blue-50);
    `}

  ${({ state }) =>
    state === 'disabled' &&
    `
      opacity : 20%;
    `}
`;

export default EM02601;
