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
} from '@maidt-cntn/ui';
import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import DropIcon from '../assets/writing/drop_icon.png';
import WrtingImage from '../assets/writing/writing.png';
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

export interface IEEL01C03A07P02 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  imageInfo: IImageProps;
  pageInfo: IPageInfo;
  cards: Card[];
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string;
    }[][];
  }[];
}

const EE4L04C03A07bP04 = ({ headerInfo, questionInfo, cards, imageInfo, pageInfo, getCorrectData, getDefaultData }: IEEL01C03A07P02) => {
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
    src: WrtingImage,
    alt: '판서 기능',
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      useExtend
      submitLabel={'완료하기'}
      submitBtnColor={!validationCheck() ? (isComplete ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isComplete}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <ColumnBoxWrap>
          <ColumnBox>
            <WritingBox>
              <CardContainer style={{ width: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', whiteSpace: 'nowrap' }}>
                  <div style={{ marginTop: '10%' }}>
                    {cards.map(card => (
                      <DragBox
                        key={card.text}
                        draggable
                        onDragStart={() => !isComplete && handleDragStart(card)}
                        hidden={dropCard?.text == card?.text}
                        style={{ marginBottom: '15%' }}
                      >
                        {card.text}
                      </DragBox>
                    ))}
                  </div>
                  <Box display={'flex'} flex-direction={'column'} gap={20}>
                    <Drawing width={'480px'} height={'110px'} />
                    <Drawing width={'480px'} height={'110px'} />
                    <Drawing width={'480px'} height={'110px'} />
                    <Drawing width={'480px'} height={'110px'} />
                  </Box>
                </div>
              </CardContainer>
            </WritingBox>
          </ColumnBox>
          <ColumnBox></ColumnBox>
        </ColumnBoxWrap>
      </BoxWrap>
    </Container>
  );
};

const DropBox = styled.div`
  width: 360px;
  height: 58px;
  margin: 20px auto;
`;

const DragBox = styled.div<{ hidden: boolean }>`
  width: 360px;
  height: 58px;
  margin: 0px auto;
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
  gap: 30px;
`;

const ColumnBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -35px;
  margin-top: 30px;
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
  width: 530px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

export default EE4L04C03A07bP04;
