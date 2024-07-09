import { MouseEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/en';
import {
  BoxWrap,
  Box,
  IQuestionProps,
  IAudioPlayerProps,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  Typography,
  BottomSheet,
  ETagLine,
  Tag,
  PinchZoom,
  Image,
} from '@maidt-cntn/ui';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { ListBox } from '@/assets/styles';
import { initDataType } from '@maidt-cntn/api';

interface Props {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo: IAudioPlayerProps;
  mainKey: number;
  data: { text: (string | null)[]; mainKey: number; subKey: string }[];
  image: { src: string; alt: string; title: string; mainKey: number; subKey: string }[];
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
  audioInfo: IAudioPlayerProps;
  data: { text: (string | null)[]; mainKey: number; subKey: string }[];
  image: { src: string; alt: string; title: string; mainKey: number; subKey: string }[];
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

const EEL01C04A05P01 = ({ headerInfo, questionInfo, audioInfo, mainKey, data, image, getDefaultData, getCorrectData, getSolutionData }: Props) => {
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const [leftNames] = useState([...data]);
  const [rightNames] = useState([...image]);
  const [leftPoints, setLeftPoints] = useState<Point[]>([]);
  const [rightPoints, setRightPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<CurrentLine | null>(null);
  const [draggingPoint, setDraggingPoint] = useState<Point | null>(null);
  const [clickedPointId, setClickedPointId] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const gradeData = useRecoilValue(currentPageGradeData);

  const isValChk: boolean =
    [...leftNames, ...rightNames]
      .map((_, idx: number) => {
        if (idx < rightNames.length) {
          return getValueInputData(idx + 1, data[0].subKey) !== '';
        } else {
          return getValueInputData(idx + 1, image[0].subKey) !== '';
        }
      })
      .filter(item => !item).length === 0;

  const isComplete: boolean = isSubmittedInput(mainKey, data[0].subKey) ? true : false;
  const svgAreaRef = useRef<SVGSVGElement>(null);

  const CONST: CONST = {
    headerInfo: headerInfo,
    questionInfo: {
      ...questionInfo,
      mark: isComplete
        ? gradeData.find(data => data.mainKey === mainKey)?.isCorrect === undefined
          ? 'none'
          : gradeData.filter(item => !item.isCorrect).length === 0
          ? 'correct'
          : 'star'
        : 'none',
      markSize: 'middle',
    },
    audioInfo: audioInfo,
    data: data,
    image: image,
    isSolutionData: getSolutionData(mainKey)[0],
  };

  const values = String(getValueInputData([...leftNames, ...rightNames].length + 1, 'OFFSET'));
  useEffect(() => {
    setLines(isComplete ? [...Object(getValueInputData([...leftNames, ...rightNames].length + 1, 'OFFSET'))] : []);
  }, [values, isOpen]);

  useEffect(() => {
    changeInputData([...leftNames, ...rightNames].length + 1, 'OFFSET', lines);
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
          changeInputData(idx + 1 + leftNames.length, image[0].subKey, [draggingPoint.id, targetPoint.id]);
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

  return (
    <Container
      //useExtend={true}
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      questionInfo={CONST.questionInfo}
      submitLabel={isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isComplete ? (isOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isValChk}
      audioInfo={CONST.audioInfo}
      onSubmit={() => fnClickComplete()}
    >
      <Box vAlign={'center'} hAlign={'center'} useFull>
        <ContentArea>
          <ContentLeft>
            {CONST.data.map((item, idx: number) => {
              return (
                <ListBox key={idx} align='left' style={{ width: '520px' }}>
                  <BoxWrap height='104px'>
                    <Typography weight='800' {...{ color: '#996500', fontSize: '36px', lineHeight: '94px' }}>
                      {idx + 1}
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '50px',
                        width: '100%',
                      }}
                    >
                      <WordInputs>
                        {item.text.map((items, index = 1) => {
                          return (
                            <WordInput
                              key={index}
                              className={
                                items === null
                                  ? gradeData.find(data => data.mainKey === item.mainKey)?.isCorrect === undefined
                                    ? 'blue'
                                    : gradeData.find(data => data.mainKey === item.mainKey)?.isCorrect
                                    ? 'blue'
                                    : 'red'
                                  : ''
                              }
                              maxLength={1}
                              onChange={e =>
                                items === null
                                  ? changeInputData(item.mainKey, String(item.subKey), e.target.value)
                                  : () => {
                                      return;
                                    }
                              }
                              value={items === null ? (getValueInputData(item.mainKey, String(item.subKey)) as string) : items}
                              disabled={items === null ? isSubmittedInput(item.mainKey, String(item.subKey)) : true}
                            />
                          );
                        })}
                      </WordInputs>

                      <svg width='10px' height='10px' viewBox='-5 -5 10 10' style={{ position: 'relative', zIndex: '1', marginLeft: 'auto' }}>
                        <circle
                          key={idx}
                          className='drag-point'
                          strokeWidth={5}
                          r={5}
                          fill='black'
                          style={clickedPointId === leftPoints.find(el => el.id === `left-${idx + 1}`)?.id ? { fill: '#1E78FF' } : { fill: 'black' }}
                          onMouseDown={e =>
                            !isComplete && handleDragStart(e, leftPoints.find(el => el.id === `left-${idx + 1}`) ?? { id: '', x: 0, y: 0 })
                          }
                        />
                      </svg>
                    </div>
                  </BoxWrap>
                </ListBox>
              );
            })}
          </ContentLeft>
          {/* lines */}
          <svg ref={svgAreaRef} onMouseMove={handleDragging} onMouseUp={handleDragEnd} overflow='visible' style={{ width: '200px', height: '352px' }}>
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
                    ? gradeData.find(data => data.mainKey === idx + 4)?.isCorrect === undefined
                      ? ''
                      : gradeData.find(data => data.mainKey === idx + 4)?.isCorrect
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
            {CONST.image.map((_, idx: number) => {
              return (
                <ListBox key={idx} align='left' style={{ height: '104px', width: 'inherit' }}>
                  <Box width='100%' useFull>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '50px',
                        width: '100%',
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

                      <div>
                        <PinchZoom>
                          <Image src={CONST.image[idx].src} alt={CONST.image[idx].alt} title={CONST.image[idx].title} height='104px' />
                        </PinchZoom>
                      </div>
                    </div>
                  </Box>
                </ListBox>
              );
            })}
          </ContentRight>
        </ContentArea>
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

export const WordInputs = styled.div`
  display: flex;
  justify-content: start;
  margin: 0 0 0 30px;
  & > * {
    margin-right: 5px;
    font-weight: 600;
    width: 60px;
    height: 60px;
    background: #eff0f2;
    border-radius: 10px;
    font-size: 36px;
    color: #232426;
    align-items: center;
    justify-content: center;
    display: flex;
  }
`;

export const WordInput = styled.input`
  text-align: center;

  &:focus,
  &.blue {
    color: #1e6efa !important;
    background: #f4f8ff !important;
  }

  &.green {
    border: 2px solid #058943 !important;
    color: #058943 !important;
    background: #e5f4ea !important;
  }

  &.red {
    border: 2px solid #eb1807 !important;
    color: #eb1807 !important;
    background: #fff4f3 !important;
  }
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;
  white-space: nowrap;
`;

const ContentRight = styled(ContentLeft)`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;
  white-space: nowrap;
  align-items: baseline;
`;

export default EEL01C04A05P01;
