import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  IAudioPlayerProps,
  IQuestionProps,
  VideoPlayer,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import ItemWithDot from '@/components/ItemWithDot';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import GradeCheck from '@/components/gradeCheck';
import { TContentInfo, TSolutionData } from '@/types/contentInfo';
import { correctDataType, initDataType } from '@maidt-cntn/api';

const ACTIVE_COLOR = '#1E78FF';
const INACTIVE_COLOR = '#6A6D73';

type Point = {
  x: number;
  y: number;
  id: string;
};

interface Line {
  startId: string;
  endId: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface CurrentLine {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

type TPageData = {
  pageNumber: number;
  mainKey: number;
  subKey: string | string[];
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => correctDataType[];
  getSolutionData: (pageNumber: number) => TSolutionData[];
};

interface Props {
  layout: {
    headerInfo: TMainHeaderInfoTypes;
    hQuestionInfo: IQuestionProps;
    srtFile?: string;
    audioInfo?: IAudioPlayerProps;
  };
  pageData: TPageData;
  contentInfo: TContentInfo<'video', 'text'>;
}

const EEL01C01A05P03 = ({ layout, pageData, contentInfo }: Props) => {
  const CONST = { ...layout };
  const { pageNumber, mainKey, getDefaultData, getCorrectData, getSolutionData } = pageData;
  const { questionInfo, answerInfo } = contentInfo;

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const [leftNames] = useState(answerInfo.answerText.map(el => el.title));
  const [rightNames] = useState(answerInfo.answerText.map(el => el.value));

  const [leftPoints, setLeftPoints] = useState<Point[]>([]);
  const [rightPoints, setRightPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<CurrentLine | null>(null);
  const [draggingPoint, setDraggingPoint] = useState<Point | null>(null);
  const [clickedPointId, setClickedPointId] = useState('');
  const [isShow, setIsShow] = useState<boolean>(false);

  const [solutionData] = useState<TSolutionData>(getSolutionData(pageNumber)[0]);
  const isComplete: boolean = isSubmittedInput(mainKey, 'LINE-1') && isSubmittedInput(mainKey, 'LINE-2'); // submit 여부
  // const isValChk = getValueInputData(mainKey, 'LINE-1') && getValueInputData(mainKey, 'LINE-2');

  const svgAreaRef = useRef<SVGSVGElement>(null);

  const handleDragStart = (e: MouseEvent<SVGCircleElement>, point: Point) => {
    if (!svgAreaRef.current || isComplete) return;

    e.preventDefault();
    setClickedPointId(point.id);
    setDraggingPoint(point);

    const updatedLines = lines.filter(line => line.startId !== point.id && line.endId !== point.id);
    setLines(updatedLines);

    const { left, top } = svgAreaRef.current.getBoundingClientRect();
    setCurrentLine({
      startX: point.x - left,
      startY: point.y - top,
      endX: point.x - left,
      endY: point.y - top,
    });
  };

  const handleDragging = (e: MouseEvent<SVGSVGElement>) => {
    if (!currentLine || !draggingPoint) return;

    const { left, top } = e.currentTarget.getBoundingClientRect();

    setCurrentLine({
      ...currentLine,
      endX: e.clientX - left,
      endY: e.clientY - top,
    });
  };

  const handleDragEnd = (e: MouseEvent<SVGSVGElement>) => {
    setClickedPointId('');
    if (
      !currentLine ||
      !draggingPoint ||
      !svgAreaRef.current
      //  || isGraded
    )
      return;

    const rect = e.currentTarget.getBoundingClientRect();
    const upX = e.clientX - rect.x + svgAreaRef.current.getBoundingClientRect().left;
    const upY = e.clientY - rect.y + svgAreaRef.current.getBoundingClientRect().top;

    const targetPoint = [...leftPoints, ...rightPoints].find(
      point => upX >= point.x - 30 && upX <= point.x + 30 && upY >= point.y - 30 && upY <= point.y + 30 && point.id !== draggingPoint.id,
    );

    // 기존에 이어진 점들과 겹치는게 있다면 연결하지 않는다.
    if (
      targetPoint &&
      !lines.find(line => line.startId === targetPoint.id || line.endId === targetPoint.id) &&
      ((leftPoints.includes(draggingPoint) && rightPoints.includes(targetPoint)) ||
        (rightPoints.includes(draggingPoint) && leftPoints.includes(targetPoint)))
    ) {
      setLines(prev => [
        ...prev,
        {
          startId: draggingPoint.id,
          endId: targetPoint.id,
          startX: draggingPoint.x,
          startY: draggingPoint.y,
          endX: targetPoint.x,
          endY: targetPoint.y,
        },
      ]);
      if (draggingPoint.id === 'left-1' || targetPoint.id === 'left-1') {
        changeInputData(mainKey, 'LINE-1', [draggingPoint.id, targetPoint.id]);
      }
      if (draggingPoint.id === 'left-2' || targetPoint.id === 'left-2') {
        changeInputData(mainKey, 'LINE-2', [draggingPoint.id, targetPoint.id]);
      }
    }

    // 드래그 상태 초기화
    setCurrentLine(null);
    setDraggingPoint(null);
  };

  const fnClickComplete = () => {
    if (!isComplete) {
      gradeSubmitPageData();
      return;
    }
    setIsShow(!isShow);
  };

  //재진입시 선 다시 그리기 , 선 위치 조정
  const drawLine = useCallback(() => {
    const getLineData = (lineKey: string): { id: string; point: number } | null => {
      const lineData = getValueInputData(mainKey, lineKey) as string[];
      return lineData
        ? {
            id: lineData[0],
            point: parseInt(lineData[1].split('-')[1]),
          }
        : null;
    };

    const line1 = getLineData('LINE-1');
    const line2 = getLineData('LINE-2');

    if (line1 === null || line2 === null) return;

    const circles = Array.from(document.querySelectorAll('circle'));
    const circleLength = circles.length;

    const getCirclePoints = (start: number, end: number) => {
      return circles.slice(start, end).map(el => ({
        x: el.getBoundingClientRect().left,
        y: el.getBoundingClientRect().top,
        id: '',
      }));
    };

    const leftCirclePoint = getCirclePoints(0, circleLength / 2);
    const rightCirclePoint = getCirclePoints(circleLength / 2, circleLength);

    const createLine = (lineData: { id: string; point: number }, leftPoint: Point, rightPoint: Point) => ({
      startId: lineData.id,
      endId: lineData.id,
      startX: leftPoint.x,
      endX: rightPoint.x,
      startY: leftPoint.y,
      endY: rightPoint.y,
    });

    setLines([
      createLine(line1, leftCirclePoint[0], rightCirclePoint[line1.point - 1]),
      createLine(line2, leftCirclePoint[1], rightCirclePoint[line2.point - 1]),
    ]);
  }, [getValueInputData, mainKey]);

  // 점들의 위치를 계산하고, (x, y) 좌표를 계산합니다.
  useEffect(() => {
    const circles = document.querySelectorAll('.drag-point');
    const circlePoints: { x: number; y: number }[] = [];

    circles.forEach(el => {
      const { left, top } = el.getBoundingClientRect();

      circlePoints.push({
        x: left,
        y: top,
      });
    });

    const leftCircles = circlePoints.slice(0, leftNames.length).map((el, index) => {
      return {
        ...el,
        id: `left-${index + 1}`,
      };
    });

    const rightCircles = circlePoints.slice(-1 * rightNames.length).map((el, index) => {
      return {
        ...el,
        id: `right-${index + 1}`,
      };
    });

    setLeftPoints(leftCircles);
    setRightPoints(rightCircles);
  }, [leftNames.length, rightNames.length]);

  useEffect(() => {
    if (isComplete) {
      drawLine();
    }
  }, [drawLine, isComplete, isShow]);

  useEffect(() => {
    if (clickedPointId) {
      const element = document.querySelector(`#${clickedPointId}-text`) as HTMLElement;
      if (element) {
        element.style.color = ACTIVE_COLOR;
      }
    } else {
      document.querySelectorAll('p[id]').forEach(el => {
        (el as HTMLElement).style.color = INACTIVE_COLOR;
      });
    }
  }, [clickedPointId]);

  return (
    <Container
      bodyId='targetContainer'
      vAlign='top'
      headerInfo={CONST.headerInfo}
      // questionInfo={{
      //   ...CONST.questionInfo,
      //   mark: isComplete ? (isCorrect === undefined ? 'none' : isCorrect ? 'correct' : 'star') : 'none',
      //   markSize: 'middle',
      // }}
      questionInfo={{
        text: (
          <span>
            {CONST.hQuestionInfo.text}
            <GradeCheck mainKey={mainKey} />
          </span>
        ),
      }}
      audioInfo={CONST.audioInfo}
      submitLabel={isComplete ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitBtnColor={lines.length === 2 ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      submitDisabled={isComplete ? false : lines.length === 2 ? false : true}
      onSubmit={() => fnClickComplete()}
    >
      <BoxWrap useFull justifyContent={'center'} alignItems=' center' padding={'20px, 40px, 10px, 40px'} gap={'8px'}>
        <Box vAlign={'center'} hAlign={'center'} useFull width='480px' height='fit-content'>
          <VideoPlayer srtFile={questionInfo.qusetionVideoSrt || ''} videoSrc={questionInfo.questionVideoSrc} />
        </Box>
        <Box vAlign={'center'} hAlign={'center'} useFull width='480px' height='336px'>
          <ContentArea>
            <ContentLeft>
              {leftNames.map((el, index) => {
                // console.log(el, index);
                return (
                  <ItemWithDot
                    key={el}
                    leftPoints={leftPoints}
                    rightPoints={rightPoints}
                    id={`left-${index + 1}`}
                    dotPosition='right'
                    circleId={`left-${index + 1}`}
                    clickedPointId={clickedPointId}
                    onDragStart={handleDragStart}
                  >
                    <ContentText id={`left-${index + 1}-text`}>{el}</ContentText>
                  </ItemWithDot>
                );
              })}
            </ContentLeft>

            {/* lines */}
            <svg ref={svgAreaRef} onMouseMove={handleDragging} onMouseUp={handleDragEnd} overflow='visible' style={{ width: '154px' }}>
              {lines.map(line => (
                <line
                  key={`${line.startId}-${line.endId}`}
                  x1={line.startX - svgAreaRef.current!.getBoundingClientRect().left + 5}
                  x2={line.endX - svgAreaRef.current!.getBoundingClientRect().left + 5}
                  y1={line.startY - svgAreaRef.current!.getBoundingClientRect().top + 5}
                  y2={line.endY - svgAreaRef.current!.getBoundingClientRect().top + 5}
                  strokeWidth={5}
                  style={{ pointerEvents: 'none' }}
                  strokeLinecap='round'
                  stroke={ACTIVE_COLOR}
                />
              ))}
              {currentLine && (
                <line
                  x1={currentLine.startX + 5}
                  y1={currentLine.startY + 5}
                  x2={currentLine.endX + 5}
                  y2={currentLine.endY + 5}
                  strokeLinecap='round'
                  strokeWidth={5}
                  stroke={ACTIVE_COLOR}
                />
              )}
            </svg>

            <ContentRight>
              {rightNames.map((el, index) => (
                <ItemWithDot
                  key={el}
                  leftPoints={leftPoints}
                  rightPoints={rightPoints}
                  id={`right-${index + 1}`}
                  dotPosition='left'
                  circleId={`right-${index + 1}`}
                  clickedPointId={clickedPointId}
                  onDragStart={handleDragStart}
                >
                  <ContentText id={`right-${index + 1}-text`}>{el}</ContentText>
                </ItemWithDot>
              ))}
            </ContentRight>
          </ContentArea>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='60px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'답안'} />
            </Box>
            <Box marginTop='12px' whiteSpace='pre-line'>
              <Typography>{solutionData.answer}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 75px;
`;

const ContentRight = styled(ContentLeft)`
  align-items: baseline;
`;

const ContentText = styled.p`
  font-family: 'SUIT';
  font-weight: 700;
  font-size: 28px;
  line-height: 58px;
  color: ${INACTIVE_COLOR};
`;

export default EEL01C01A05P03;
