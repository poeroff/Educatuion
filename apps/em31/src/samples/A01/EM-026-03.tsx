import { useState } from 'react';
import { Box, Label, List, IQuestionProps, TMainHeaderInfoTypes, Image } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import BadukStoneIcon from '../../assets/icon/MC31301.svg';

const EM02603 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '나눗셈식으로 나타내기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='#969590' color='var(--color-white)' />
        바둑돌 12개를 주머니 3개에 똑같이 나누어 넣으려고 합니다. 주머니에 바둑돌을 넣어 보세요.
      </>
    ),
  };

  const [pocket, setPocket] = useState<number[][]>([[], [], []]);
  const handleClickPocket = (index: number) => {
    const clickedBadukStone: number[] = [];
    const newBadukStoneButtons = badukStoneButtons.map((value, index) => {
      value === true && clickedBadukStone.push(index);
      return value ? false : value;
    });
    setBadukStoneButtons(newBadukStoneButtons);

    const newPocket = [...pocket];
    newPocket[index] = [...pocket[index], ...clickedBadukStone];
    setPocket(newPocket);
  };
  const handleClickPocketInBadukStoneButtons = (pocketIndex: number, badukStoneButtonIndex: number) => {
    const newPocket = [...pocket];
    newPocket[pocketIndex].splice(badukStoneButtonIndex, 1);
    setPocket(newPocket);
  };

  const [badukStoneButtons, setBadukStoneButtons] = useState<boolean[]>(Array(11).fill(false));
  ``;
  const handleClickBadukStoneButtons = (index: number) => {
    const newBadukStoneButtons = [...badukStoneButtons];
    newBadukStoneButtons[index] = badukStoneButtons[index] ? false : true;
    setBadukStoneButtons(newBadukStoneButtons);
  };

  const getBadukStoneButtonsState = (index: number) => {
    const indexs: number[] = [];
    pocket.map(value => indexs.push(...value));
    if (indexs.includes(index)) return 'disabled';
    if (badukStoneButtons[index]) return 'active';
    return undefined;
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel='채점하기'
      onSubmit={() => {}}
      useRound
      vAlign='start'
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box hAlign='cneter'>
          <List data={pocket} align='horizontal' gap={8}>
            {({ value, index = 1 }) => (
              <PocketButton type='button' onClick={() => handleClickPocket(index - 1)}>
                <Image src='/example/EM-026/MC31301.png' alt='바둑돌을 넣는 주머니' width='178px' height='151px' />
                <BadukStoneImageBox>
                  {value?.map((__, badukStoneButtonIndex) => (
                    <PocketInBadukStoneButton
                      type='button'
                      key={badukStoneButtonIndex}
                      onClick={() => handleClickPocketInBadukStoneButtons(index - 1, badukStoneButtonIndex)}
                    />
                  ))}
                </BadukStoneImageBox>
              </PocketButton>
            )}
          </List>
        </Box>

        <Box hAlign='center' marginTop='24px'>
          {Array(11)
            .fill(null)
            .map((__, index) => (
              <BadukStoneButton
                type='button'
                key={index}
                state={getBadukStoneButtonsState(index)}
                onClick={() => handleClickBadukStoneButtons(index)}
              />
            ))}
        </Box>
      </Box>
    </Container>
  );
};

const PocketButton = styled.button<{ isError?: boolean }>`
  position: relative;
  border-radius: 16px;

  width: 178px;
  height: 151px;

  ${({ isError }) =>
    isError &&
    css`
      background-color: #fff4f3;
      border: 2px solid #eb1807;
    `}
`;

const BadukStoneImageBox = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) rotate(180deg);

  width: 76px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1px;
`;

const PocketInBadukStoneButton = styled.button`
  background: url(${BadukStoneIcon}) center center no-repeat;
  background-size: 36px;

  width: 36px;
  height: 36px;
`;

const BadukStoneButton = styled(PocketInBadukStoneButton)<{ state?: 'active' | 'disabled' }>`
  width: 60px;
  height: 60px;
  padding: 12px;
  border-radius: 50%;

  ${({ state }) =>
    state === 'active' &&
    `
      border: 2px solid #1e6efa;
      background-color: #f4f8ff;
    `}

  ${({ state }) =>
    state === 'disabled' &&
    `
      opacity : 20%;
    `}
`;

export default EM02603;
