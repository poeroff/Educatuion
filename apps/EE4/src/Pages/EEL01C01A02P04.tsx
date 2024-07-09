import { MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  IQuestionProps,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  Typography,
  BottomSheet,
  ETagLine,
  Tag,
  PinchZoom,
  Image,
  VideoPlayer,
} from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { ListBox } from '@/assets/styles';
import { initDataType } from '@maidt-cntn/api';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  mainKey: number;
  data: { left: string; right: string; mainKey: number; subKey: string; image: { src: string; alt: string } }[];
  video: { src: string; srt: string };
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => {
    mainKey: number;
    inputDatas: {
      subKey: string;
      value: string | boolean | number | string[];
    }[][];
  }[];
  getSolutionData: (pageNumber: number) => {
    script?: { text: string }[];
    interpretation?: { text: string }[];
  }[];
}

interface CONST {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: { left: string; right: string; mainKey: number; subKey: string; image: { src: string; alt: string } }[];
  video: { src: string; srt: string };
  isSolutionData: { script?: { text: string }[]; interpretation?: { text: string }[] };
}

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

const EEL01C01A02P04 = ({ headerInfo, questionInfo, mainKey, data, video, getDefaultData, getCorrectData, getSolutionData }: Props) => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const [leftNames] = useState([...data.filter(item => item.left)]);
  const [rightNames] = useState([...data.filter(item => item.right)]);
  const [leftPoints, setLeftPoints] = useState<Point[]>([]);
  const [rightPoints, setRightPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<CurrentLine | null>(null);
  const [draggingPoint, setDraggingPoint] = useState<Point | null>(null);
  const [clickedPointId, setClickedPointId] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const gradeData = useRecoilValue(currentPageGradeData);

  const isValChk: boolean =
    data
      .map((item, idx: number) => {
        return getValueInputData(item.mainKey, item.subKey) !== '';
      })
      .filter(item => !item).length === 0;

  const isComplete: boolean = isSubmittedInput(mainKey, data[0].subKey) ? true : false;
  const svgAreaRef = useRef<SVGSVGElement>(null);

  const CONST: CONST = {
    headerInfo: headerInfo,
    questionInfo: {
      ...questionInfo,
      mark: isComplete
        ? gradeData.find(item => item.mainKey === data[0].mainKey)?.isCorrect === undefined
          ? 'none'
          : gradeData.filter(item => !item.isCorrect).length === 0
          ? 'correct'
          : 'star'
        : 'none',
      markSize: 'middle',
    },
    video: video,
    data: data,
    isSolutionData: getSolutionData(mainKey)[0],
  };

  const values = String(getValueInputData([...data].length + 1, 'OFFSET'));
  useEffect(() => {
    setLines(isComplete ? [...Object(getValueInputData([...data].length + 1, 'OFFSET'))] : [...lines]);
  }, [isOpen, values]);

  useEffect(() => {
    changeInputData([...data].length + 1, 'OFFSET', lines);
  }, [lines]);

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
  }, []);

  const handleDragStart = (e: MouseEvent<SVGCircleElement>, point: Point) => {
    if (!svgAreaRef.current) return;
    if (isComplete) return;

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

      [...rightNames].map((_, idx: number) => {
        if (draggingPoint.id === `left-${idx + 1}`) {
          changeInputData(idx + 1, data[idx].subKey, [draggingPoint.id, targetPoint.id]);
        }
      });
    }

    setCurrentLine(null);
    setDraggingPoint(null);
    // 드래그 상태 초기화
  };

  const fnClickComplete = () => {
    if (!isComplete) {
      gradeSubmitPageData();
    } else {
      setIsOpen(!isOpen);
    }
  };

  console.log(getValueInputData(3, 'OFFSET'));
  console.log(lines);

  return (
    <Container
      useExtend={true}
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      submitLabel={isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isComplete ? (isOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isValChk}
      onSubmit={() => fnClickComplete()}
    >
      <Box vAlign={'center'} hAlign={'center'} useFull>
        <BoxWrap gap='10px' useFull>
          <Box vAlign={'center'} hAlign={'center'} useFull width='450px'>
            <VideoPlayer srtFile={CONST.video.srt} videoSrc={CONST.video.src} />
          </Box>
          <Box vAlign={'center'} hAlign={'center'} useFull width='532px'>
            <ContentArea>
              <ContentLeft>
                {CONST.data.map((item, idx: number) => {
                  return (
                    <ListBox key={idx} align='left' style={{ height: '100%', justifyContent: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '28px',
                          width: 'fit-content',
                          flexDirection: 'row',
                        }}
                      >
                        <div style={{ height: '170px' }}>
                          <div style={{ height: '120px', width: '136px', textAlign: 'center' }}>
                            <PinchZoom>
                              <Image src={item.image.src} alt={item.image.alt} style={{ borderRadius: '8px' }} height='120px' width='136px' />
                            </PinchZoom>
                          </div>
                          <Box textAlign='center'>
                            <Typography>{item.left}</Typography>
                          </Box>
                        </div>

                        <svg width='10px' height='10px' viewBox='-5 -5 10 10' style={{ position: 'relative', zIndex: '1', marginLeft: 'auto' }}>
                          <circle
                            key={idx}
                            className='drag-point'
                            strokeWidth={5}
                            r={5}
                            fill='black'
                            style={
                              clickedPointId === leftPoints.find(el => el.id === `left-${idx + 1}`)?.id ? { fill: '#1E78FF' } : { fill: 'black' }
                            }
                            onMouseDown={e =>
                              !isComplete && handleDragStart(e, leftPoints.find(el => el.id === `left-${idx + 1}`) ?? { id: '', x: 0, y: 0 })
                            }
                          />
                        </svg>
                      </div>
                    </ListBox>
                  );
                })}
              </ContentLeft>
              {/* lines */}
              <svg
                ref={svgAreaRef}
                onMouseMove={handleDragging}
                onMouseUp={handleDragEnd}
                overflow='visible'
                style={{ width: '154px', height: '220px' }}
              >
                {lines.map((line, idx) => (
                  <line
                    key={`${line.startId}-${line.endId}`}
                    x1={line.startX - svgAreaRef.current!.getBoundingClientRect().left + 5}
                    x2={line.endX - svgAreaRef.current!.getBoundingClientRect().left + 5}
                    y1={line.startY - svgAreaRef.current!.getBoundingClientRect().top + 5}
                    y2={line.endY - svgAreaRef.current!.getBoundingClientRect().top + 5}
                    strokeWidth={5}
                    style={{ pointerEvents: 'none' }}
                    strokeLinecap='round'
                    stroke={
                      isComplete
                        ? gradeData.find(item => item.mainKey === data[0].mainKey)?.isCorrect === undefined
                          ? ''
                          : gradeData.find(item => item.mainKey === idx + 1)?.isCorrect
                          ? '#1E6EFA'
                          : '#EB1807'
                        : '#B0B6C0'
                    }
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
                    stroke='#B0B6C0'
                  />
                )}
              </svg>

              <ContentRight>
                {CONST.data.map((item, idx: number) => {
                  return (
                    <ListBox key={idx} style={{ width: '150px', height: '170px' }}>
                      <Box width='100%' useFull>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '28px',
                            width: 'fit-content',
                            height: '100%',
                          }}
                        >
                          <svg width='10px' height='10px' viewBox='-5 -5 10 10' style={{ position: 'relative', zIndex: '1', marginLeft: 'auto' }}>
                            <circle
                              key={idx}
                              className='drag-point'
                              strokeWidth={5}
                              r={5}
                              fill='black'
                              style={
                                clickedPointId === rightPoints.find(el => el.id === `right-${idx + 1}`)?.id ? { fill: '#1E78FF' } : { fill: 'black' }
                              }
                              onMouseDown={e =>
                                !isComplete && handleDragStart(e, rightPoints.find(el => el.id === `right-${idx + 1}`) ?? { id: '', x: 0, y: 0 })
                              }
                            />
                          </svg>
                          {item.right}
                        </div>
                      </Box>
                    </ListBox>
                  );
                })}
              </ContentRight>
            </ContentArea>
          </Box>
        </BoxWrap>
      </Box>
      {isOpen && (
        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Box>
              <Box>
                <Tag type={ETagLine.GREEN} label={'답안'} />
              </Box>
              {CONST.isSolutionData.interpretation?.map((item: { text: string }) => {
                return (
                  <Box key={item.text} marginTop='12px'>
                    {item.text}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </BottomSheet>
      )}
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
  gap: 10px;
  white-space: nowrap;
`;

const ContentRight = styled(ContentLeft)`
  align-items: center;
  justify-content: center;
  //gap: 130px;
`;

export default EEL01C01A02P04;
