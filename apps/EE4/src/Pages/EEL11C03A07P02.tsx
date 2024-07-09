import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  Image,
  Drawing,
  IQuestionProps,
  PinchZoom,
  Tag,
  Typography,
  ETagLine,
  Label,
} from '@maidt-cntn/ui';
import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { initDataType } from '@maidt-cntn/api';

export interface IImageProps {
  src: string;
  alt: string;
  title: string;
  width?: string;
  height?: string;
}

export interface IPageInfo {
  pageNum: number;
  mainKey: number;
  subKey: string;
}

export type Card = {
  text: string;
};
export type Num = {
  num: number;
};
export type Content = {
  content: string;
};
export interface IEEL11C03A07P02 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageProps;
  pageInfo: IPageInfo;
  cards: Card[];
  number: Num;
  content: Content;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | null;
    }[][];
  }[];
}

const EEL11C03A07P02 = ({
  headerInfo,
  questionInfo,
  cards,
  number,
  content,
  imageInfo,
  pageInfo,
  getCorrectData,
  getDefaultData,
}: IEEL11C03A07P02) => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageInfo.pageNum),
    collectDatas: getCorrectData(pageInfo.pageNum),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const gradeData = useRecoilValue(currentPageGradeData);
  const isComplete = isSubmittedInput(pageInfo.mainKey, pageInfo.subKey);
  const isCorrect = gradeData.find(data => data.mainKey === pageInfo.mainKey)?.isCorrect;
  const currentAnswer = getValueInputData(pageInfo.mainKey, pageInfo.subKey);
  const correctAnswer = getCorrectData(pageInfo.pageNum)[0].inputDatas[0][0].value;
  questionInfo.mark = isComplete ? (isCorrect ? 'correct' : 'star') : 'none';

  const initialDropCard = currentAnswer ? { text: currentAnswer as string } : null;
  const [dropCard, setDropCard] = useState<Card | null>(initialDropCard);

  const dragDestinationRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (card: Card) => {
    dragDestinationRef.current?.setAttribute('data-dragging', JSON.stringify(card));
  };

  const handleDrop = () => {
    const draggingCard = dragDestinationRef.current?.getAttribute('data-dragging');
    if (draggingCard) {
      setDropCard(JSON.parse(draggingCard));
      const currentCard: Card = JSON.parse(draggingCard);
      handleChangeInputData(pageInfo.mainKey, pageInfo.subKey, currentCard.text);
      dragDestinationRef.current?.removeAttribute('data-dragging');
    }
    inActiveBox();
  };

  const activeBox = () => {
    if (!dragDestinationRef.current) return;
  };

  const inActiveBox = () => {
    if (!dragDestinationRef.current) return;
  };

  const handleSubmit = () => {
    if (!isComplete) {
      gradeSubmitPageData();
      return;
    }
    setIsOpen(!isOpen);
  };

  const validationCheck = () => {
    return currentAnswer == null || currentAnswer == undefined || (currentAnswer as string).trim().length == 0;
  };

  useEffect(() => {
    if (currentAnswer) {
      setDropCard({ text: currentAnswer as string });
    }
  }, [currentAnswer]);

  const backgroundImage = {
    src: '/writing.png',
    alt: '판서 기능',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitDisabled={validationCheck()}
      submitLabel={isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!validationCheck() ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      useExtend
    >
      <BoxWrap useFull>
        <ColumnBoxWrap>
          <ColumnBox>
            <Box width={620}>
              <PinchZoom>
                <Image src={imageInfo.src} alt={imageInfo.alt} title={imageInfo.title} width={imageInfo.width} height={imageInfo.height} />
              </PinchZoom>

              <BoxWrap marginTop={20}>
                <BoxWrap flexDirection='column' gap={20}>
                  <Box width={'100%'} display='flex' gap={20}>
                    <Box>
                      <Label
                        size='large'
                        value={number.num}
                        type='text'
                        //  weight='800'
                        {...{ color: '#996500' }}
                      />
                      <Typography fontSize='32px' fontWeight='500'>
                        {content.content}
                      </Typography>
                    </Box>
                    <DropBox
                      ref={dragDestinationRef}
                      onDragOver={e => {
                        e.preventDefault();
                        activeBox();
                      }}
                      onDragLeave={inActiveBox}
                      onDrop={handleDrop}
                    >
                      {dropCard ? (
                        <DragBox hidden={false}>{dropCard.text}</DragBox>
                      ) : (
                        <>
                          <Placeholder>
                            <Icon src={'/drop_icon.png'} alt='icon' />
                            이곳에 드래그해 주세요
                          </Placeholder>
                        </>
                      )}
                    </DropBox>
                  </Box>

                  <Box>
                    <Drawing width='620px' height='90px' image={backgroundImage} />
                  </Box>
                </BoxWrap>
              </BoxWrap>
            </Box>
            <WritingBox>
              <CardContainer>
                {cards.map(card => (
                  <DragBox key={card.text} draggable onDragStart={() => !isComplete && handleDragStart(card)} hidden={dropCard?.text == card?.text}>
                    {card.text}
                  </DragBox>
                ))}
              </CardContainer>
            </WritingBox>
          </ColumnBox>
          <ColumnBox>
            {isOpen && (
              <Box marginBottom='25px' marginTop='50px' background='gray' padding='28px' useRound width='952px'>
                <Box margin='25px 0'>
                  <Tag fontSize='22px' height='auto' label='답안' type={ETagLine.GREEN} width='auto' />
                  <Box margin='25px 0 50px'>
                    <Typography>{correctAnswer}</Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </ColumnBox>
        </ColumnBoxWrap>
      </BoxWrap>
    </Container>
  );
};

const DropBox = styled.div`
  width: 360px;
  height: 58px;
  /* margin: 20px auto; */
`;

const DragBox = styled.div<{ hidden: boolean }>`
  width: 360px;
  height: 58px;
  /* margin: 0px auto; */
  display: grid;
  place-items: center;
  background-color: ${props => (props.hidden == true ? '#FFFFFF' : '#fff0cc')};
  color: ${props => (props.hidden == true ? '#FFFFFF' : '#232426')};
  border-radius: 8px;
  padding: 0px 42px 0px 42px;
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;

  text-align: center;
  cursor: pointer;
  box-shadow: ${props => (props.hidden == true ? 'none' : '0px 1px 3px 0px #00000033, 0px 2px 1px 0px #0000001f, 0px 1px 1px 0px #00000024;')};
`;

const WritingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 30px; */
`;

const ColumnBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-left: -35px; */
  gap: 20px;
`;

const Placeholder = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  color: #6a6d73;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px #b0b6c0 dashed;
  border-radius: 8px;
  background-color: #f9f9fa;
`;

const CardContainer = styled.div`
  width: 360px;

  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

export default EEL11C03A07P02;
