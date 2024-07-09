import { useState } from 'react';
import { Box, BoxWrap, TMainHeaderInfoTypes, Typography, Image, EImageType, Dialog, Button, EStyleSizes, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { css, styled } from 'styled-components';

const imgItems = [
  {
    imgSrc: '/example/ME-130-01/ME_130_01_01.jpg',
    alt: '칠판 앞에 서 있는 선생님 ‘ Tomorrow’s presentation',
  },
  {
    imgSrc: '/example/ME-130-01/ME_130_01_02.jpg',
    alt: '고민하는 남학생의 배경에 아빠, 여동생, 누나',
  },
  {
    imgSrc: '/example/ME-130-01/ME_130_01_03.jpg',
    alt: '남학생을 위로하는 엄마',
  },
  {
    imgSrc: '/example/ME-130-01/ME_130_01_04.jpg',
    alt: '무언가 깨달은 표정을 짓는 남학생',
  },
  {
    imgSrc: '/example/ME-130-01/ME_130_01_05.jpg',
    alt: '학생들 앞에서 발표하는 남학생',
  },
];

const cardItems = [
  'Who do I want to be? I want to be me.',
  'What do you want to be?',
  'Don’t worry. I don’t know my dream job.',
  'Dad and my sisters know the answer, but I don’t.',
  'I know the answer now. Thank you, Mom.',
];

const ME13001 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isError, setIsError] = useState(2);
  const [dragItems, setDragItems] = useState(Array(cardItems.length).fill(null));
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedEmptyCard, setSelectedEmptyCard] = useState<number | null>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readAndWrite',
    headerText: 'Read And Put In Order',
    headerTextColor: 'var(--color-green-800)',
  };
  const questionInfo = {
    text: '본문의 내용과 일치하도록 알맞은 카드를 골라 빈칸에 옮겨 봅시다.',
  };

  const handleCardClick = (index: number) => {
    if (selectedEmptyCard === null) {
      setSelectedCard(index);
    } else {
      if (dragItems[selectedEmptyCard] === null) dragItems[selectedEmptyCard] = cardItems[index];
      setDragItems([...dragItems]);
      setSelectedEmptyCard(null);
    }
  };

  const handleEmptyCardClick = (index: number) => {
    if (selectedCard === null) {
      setSelectedEmptyCard(index);
    } else {
      if (dragItems[index] === null) dragItems[index] = cardItems[selectedCard];
      setDragItems([...dragItems]);
      setSelectedCard(null);
    }
  };

  return (
    <Container headerInfo={headerInfo} questionInfo={questionInfo} submitLabel='채점하기' onSubmit={() => {}} useExtend>
      <Box hAlign='right' marginBottom='8px'>
        <Button
          tabIndex={101}
          minWidth='96px'
          size={EStyleSizes.SMALL}
          color={EStyleButtonTypes.SECONDARY}
          label='지문보기'
          onClick={() => setIsDialogOpen(true)}
          useRound
        />
      </Box>

      <BoxWrap justifyContent='center'>
        {imgItems.map((item, index) => (
          <Box key={index} marginRight={index === imgItems.length - 1 ? 0 : 16}>
            <DragCard className={isError === index ? 'isError' : ''}>
              <BoxWrap marginBottom='4px'>
                <Typography fontSize='var(--font-size-22)'>&#40;{index + 1}&#41;</Typography>
                <Image type={EImageType.IMG} src={item.imgSrc} width='126px' alt={item.alt} />
              </BoxWrap>
              <DragZone>
                {dragItems[index] ? (
                  <DragZoneCard
                    onClick={() => {
                      dragItems[index] = null;
                      setDragItems([...dragItems]);
                    }}
                  >
                    {dragItems[index]}
                  </DragZoneCard>
                ) : (
                  <DragZoneCardEmpty className={selectedEmptyCard === index ? 'selected' : ''} onClick={() => handleEmptyCardClick(index)}>
                    {selectedEmptyCard !== index && '카드를 선택 해주세요.'}
                  </DragZoneCardEmpty>
                )}
              </DragZone>
            </DragCard>
          </Box>
        ))}
      </BoxWrap>
      <BoxWrap marginTop='12px' justifyContent='center' padding='18px' background='var(--color-green-50)' borderRadius='8px'>
        {cardItems.map((item, index) => {
          const isDisable = dragItems.includes(item);
          return (
            <Box key={index} marginRight={index === cardItems.length - 1 ? 0 : 16}>
              <DragZoneCard className={selectedCard === index ? 'selected' : ''} onClick={() => handleCardClick(index)} disabled={isDisable}>
                {item}
              </DragZoneCard>
            </Box>
          );
        })}
      </BoxWrap>
      <Dialog tabIndex={102} width={893} height={458} topHeight={50} isShow={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        지문 내용
      </Dialog>
    </Container>
  );
};

const DragZone = styled.div`
  position: relative;
  width: 180px;
  height: 110px;
  text-align: left;

  button {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: none;
    background: none;
  }
`;

const DragZoneCard = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 12px;
  width: 180px;
  height: 110px;
  background: var(--color-white);
  font-size: var(--font-size-18);
  line-height: 28px;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0px 1px 3px 0px #00000033;
  cursor: pointer;
  text-align: left;

  &.selected {
    box-shadow: 0px 5px 5px 0px #00000033;
  }

  &:disabled {
    box-shadow: none;
    background: var(--color-grey-100);
    color: var(--color-grey-500);
  }
`;

const DragZoneCardEmpty = styled(DragZoneCard)`
  font-size: var(--font-size-18);
  line-height: 28px;
  color: var(--color-grey-700);
  border: 1px dashed var(--color-grey-500);
  background: var(--color-grey-50);

  &.selected {
    box-shadow: none;
    border: 2px dashed var(--color-blue-700);
    background: var(--color-blue-50);
  }
`;

const DragCard = styled.div`
  border-radius: 8px;
  overflow: hidden;

  &.isError {
    border: 2px solid var(--color-red-700);
    background: var(--color-red-50);
    color: var(--color-red-800);

    button {
      color: var(--color-red-800);
    }
  }
`;

export default ME13001;
