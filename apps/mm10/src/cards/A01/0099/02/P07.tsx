import { useState, ReactElement, useRef, Children, MouseEventHandler, cloneElement, useEffect, MutableRefObject, useMemo } from 'react';
import styled from 'styled-components';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import GradeCheck from '@/components/gradeCheck';
import { MContainer } from '@maidt-cntn/ui/math';
import { Box } from '@maidt-cntn/ui';
import { HeaderTitle, HeaderTitleIndexWrap, HeaderTitleIndex, LevelIcon } from './styles';
import { useLongTab } from './hooks/useLongTab';

const MAIN_KEY = [7];

interface ConnectLineProps {
  children: ReactElement<SideProps>[];
  className?: string;
  id?: string;
  onConnect: (connection: { from: ItemData; to: ItemData }) => void;
  setAnswer: (lines: CompleteLine[]) => void;
  getInitialLine: () => CompleteLine[] | null;
  isSubmittedInput: (mainKey: number, subKey: string) => boolean;
  isWrong?: boolean;
}

interface SideProps {
  children: ReactElement<ItemProps>[] | ReactElement<ItemProps>;
  sideId: string;
  id?: string;
  handleItemClick?: THandleItemClick;
  className?: string;
  progressItemId?: string;
}

interface ItemProps {
  children: ReactElement[] | ReactElement;
  dotPosition: 'left' | 'right' | 'top' | 'bottom';
  itemId: string;
  sideId?: string;
  value: string;
  className?: string;
  handleItemClick?: THandleItemClick;
  progressItemId?: string;
  idx: number;
  itemRefs: MutableRefObject<null[] | HTMLSpanElement[]>;
}

interface LineProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  isWrong?: boolean;
  onLongTab: () => void;
}

type Position = {
  top: number;
  left: number;
};

interface ItemData {
  sideId: string;
  itemId: string;
  value: string;
}

type Dot = ItemData & Position;

interface CompleteLine {
  from: Dot;
  to: Dot;
}

type THandleItemClick = (props: Dot) => void;

const P07 = () => {
  const { getValueInputData, changeInputData, gradeSubmitPageData, isSubmittedInput, pageSubmitted, gradeList } = useCurrentPageData({
    initData: getDefaultData(7),
    collectDatas: getCorrectData(7),
  });
  const VALUES = ['14', '15', '21', '39', '8'];
  const itemRefs = useRef<null[] | HTMLSpanElement[]>(new Array(VALUES.length).fill(null));
  const isWrong = useMemo(() => {
    if (gradeList.length <= 0) return undefined;
    const correctData = gradeList.find(data => data.mainKey === MAIN_KEY[0]);
    return !correctData?.isCorrect;
  }, [gradeList]);

  const setAnswer = (lines: CompleteLine[]) => {
    const answerValue = lines.flatMap(line => [`${line.from.value}-${line.to.value}`, `${line.to.value}-${line.from.value}`]);
    changeInputData(MAIN_KEY[0], 'TEXT_LIST-0', answerValue);
  };

  const removeDuplicateArrays = (arrays: string[][]): string[][] => {
    const sortedArrays = arrays.map(arr => arr.slice().sort());
    const uniqueArrays = [...new Set(sortedArrays.map(e => JSON.stringify(e)))];
    return uniqueArrays.map(e => JSON.parse(e));
  };

  const getInitialLine = (): CompleteLine[] | null => {
    const initialInputData = getValueInputData(MAIN_KEY[0], 'TEXT_LIST-0');
    if (!initialInputData || !Array.isArray(initialInputData)) return null;
    const lineData = removeDuplicateArrays(initialInputData.map(numStr => numStr.split('-')));
    const values = itemRefs.current.map(itemRef => ({ value: itemRef?.id.split('-')[1], ref: itemRef }));
    const lineValuePair = lineData.map(line =>
      line.map((num: string | undefined) => {
        const data = values.find(({ value }) => value === num);
        if (!data)
          return {
            top: 0,
            left: 0,
            sideId: '',
            itemId: '',
            value: '',
          };
        const coords = getCoordFromRef(data.ref);
        return { top: coords?.top ?? 0, left: coords?.left ?? 0, sideId: '', itemId: '', value: data.value ?? '' };
      }),
    );
    return lineValuePair.map(lineValue => ({ from: lineValue[0], to: lineValue[1] }));
  };

  return (
    <MContainer
      headerInfo={{ headerPattern: 'icon', iconType: 'finish' }}
      questionInfo={{
        text: (
          <HeaderTitle>
            <HeaderTitleIndexWrap>
              <HeaderTitleIndex>
                07
                <GradeCheck mainKey={MAIN_KEY[0]} />
              </HeaderTitleIndex>
              <Box display='flex' alignItems='center' gap='4px'>
                {[true, true, false].map((colored, i) => (
                  <LevelIcon $colored={colored} key={i} />
                ))}
              </Box>
            </HeaderTitleIndexWrap>
            <Box whiteSpace='nowrap'>다음 다섯 개의 자연수 중에서 서로소인 수끼리 선으로 연결하시오.</Box>
          </HeaderTitle>
        ),
      }}
      submitLabel='채점하기'
      onSubmit={gradeSubmitPageData}
      submitDisabled={pageSubmitted || (getValueInputData(MAIN_KEY[0], 'TEXT_LIST-0') as string[]).length <= 0} // TODO : 수정
      vAlign='baseline'
    >
      <Box display='flex' justifyContent='center'>
        <ConnectLineContainer
          onConnect={() => {}}
          setAnswer={setAnswer}
          getInitialLine={getInitialLine}
          isSubmittedInput={isSubmittedInput}
          isWrong={isWrong}
        >
          {VALUES.map((num, idx) => (
            <ConnectLineSide sideId={`side${idx}`} key={num}>
              <ConnectLineItem
                dotPosition={idx === 0 ? 'bottom' : idx === 1 ? 'left' : idx === 4 ? 'right' : 'top'}
                itemId={`item${idx}`}
                value={num}
                idx={idx}
                itemRefs={itemRefs}
              >
                <LabelBox>{num}</LabelBox>
              </ConnectLineItem>
            </ConnectLineSide>
          ))}
        </ConnectLineContainer>
      </Box>
    </MContainer>
  );
};

const ConnectLine: React.FC<ConnectLineProps> & { Side: React.FC<SideProps>; Item: React.FC<ItemProps> } = ({
  children,
  className,
  onConnect,
  setAnswer,
  getInitialLine,
  isSubmittedInput,
  isWrong,
}) => {
  const [drawingLineStartPosition, setDrawingLineStartPosition] = useState<Dot>({
    top: 0,
    left: 0,
    sideId: '',
    itemId: '',
    value: '',
  });

  const [drawingLineRealTimePosition, setDrawingLineRealTimePosition] = useState<Position>({ top: 0, left: 0 });
  const [drawingSide, setIsDrawingSide] = useState<string>('');
  const [completeLine, setCompleteLine] = useState<CompleteLine[]>([]);
  const [isInitialLineUpdated, setIsInitialLineUpdated] = useState(false);

  useEffect(() => {
    const initialLineData = getInitialLine();
    if (isInitialLineUpdated || !initialLineData || initialLineData.every(line => !line.from.top && !line.to.top)) return;
    setIsInitialLineUpdated(true);
    setCompleteLine(initialLineData);
  }, [getInitialLine, isInitialLineUpdated]);

  const lineInit = () => {
    setIsDrawingSide('');
    setDrawingLineStartPosition({ top: 0, left: 0, sideId: '', itemId: '', value: '' });
    setDrawingLineRealTimePosition({ top: 0, left: 0 });
  };

  const isLineAlreadyExist = (itemId: string) => {
    return completeLine.some(
      line =>
        (line.from.itemId === drawingLineStartPosition.itemId && line.to.itemId === itemId) ||
        (line.to.itemId === drawingLineStartPosition.itemId && line.from.itemId === itemId),
    );
  };

  const removeLine = (selectedLine: CompleteLine) => {
    const isSelectedLine = (line: CompleteLine) =>
      (line.from.itemId === selectedLine.from.itemId && line.to.itemId === selectedLine.to.itemId) ||
      (line.from.itemId === selectedLine.from.itemId && line.to.itemId === selectedLine.to.itemId);
    setCompleteLine(prev => prev.filter(e => !isSelectedLine(e)));
  };

  const addLine = (line: CompleteLine) => {
    return [...completeLine, line];
  };

  const onLineChange = (newLines: CompleteLine[]) => {
    setCompleteLine(newLines);
    setAnswer(newLines);
  };

  const handleItemClick: THandleItemClick = ({ itemId, left, sideId, top, value }) => {
    if (isSubmittedInput(MAIN_KEY[0], 'TEXT_LIST-0')) return;
    if (isLineAlreadyExist(itemId)) return;

    if (!drawingSide) {
      setDrawingLineStartPosition({ top, left, sideId, itemId, value });
      setIsDrawingSide(sideId);
    } else if (sideId !== drawingSide) {
      const newLines = addLine({
        from: {
          top: drawingLineStartPosition.top,
          left: drawingLineStartPosition.left,
          sideId: drawingLineStartPosition.sideId,
          itemId: drawingLineStartPosition.itemId,
          value: drawingLineStartPosition.value,
        },
        to: { top, left, sideId, itemId, value },
      });
      onLineChange(newLines);

      onConnect({
        from: { sideId: drawingLineStartPosition.sideId, itemId: drawingLineStartPosition.itemId, value: drawingLineStartPosition.value },
        to: { sideId, itemId, value },
      });
      lineInit();
    }
  };

  const onBoxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drawingLineStartPosition.itemId) return;
    const { clientX, clientY } = e.nativeEvent;
    setDrawingLineRealTimePosition({ top: clientY, left: clientX });
  };

  const onBoxMouseClick = () => {
    if (!drawingSide) {
      return;
    }
    lineInit();
  };

  const handleLineClick = (line: CompleteLine) => {
    removeLine(line);
  };

  return (
    <>
      <div onClick={onBoxMouseClick} onMouseMove={onBoxMouseMove} className={className}>
        {Children.map(children, child => {
          return cloneElement(child, { handleItemClick, progressItemId: drawingLineStartPosition.itemId });
        })}
      </div>
      <div>
        <CanvasSVG>
          {drawingSide && (
            <Line
              x1={drawingLineStartPosition.left}
              x2={drawingLineRealTimePosition.left || drawingLineStartPosition.left}
              y1={drawingLineStartPosition.top}
              y2={drawingLineRealTimePosition.top || drawingLineStartPosition.top}
            />
          )}
          {completeLine.map((line, index) => {
            return (
              <CompleteLine
                key={index}
                x1={line.from.left}
                x2={line.to.left}
                y1={line.from.top}
                y2={line.to.top}
                isWrong={isWrong}
                onLongTab={() => {
                  if (isSubmittedInput(MAIN_KEY[0], 'TEXT_LIST-0')) return;
                  handleLineClick(line);
                }}
              />
            );
          })}
        </CanvasSVG>
      </div>
    </>
  );
};

const Side: React.FC<SideProps> = ({ children, progressItemId, className, sideId, handleItemClick }) => {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => {
            return cloneElement(child, { key: index, sideId, handleItemClick, progressItemId });
          })
        : cloneElement(children, { sideId, handleItemClick, progressItemId })}
    </div>
  );
};

const Item: React.FC<ItemProps> = ({ children, progressItemId, className, dotPosition, sideId, itemId, value, handleItemClick, idx, itemRefs }) => {
  const onClickItem: MouseEventHandler<HTMLDivElement> = event => {
    const coords = getCoordFromRef(itemRefs.current[idx]);
    if (!coords) return;
    handleItemClick?.({ itemId, sideId: sideId ?? '', top: coords.top, left: coords.left, value });
  };

  return (
    <ItemContainer className={className} $dotPosition={dotPosition} onClick={onClickItem}>
      {Children.map(children, child => {
        return cloneElement(child, { $isActive: progressItemId === itemId });
      })}
      <Circle $isActive={progressItemId === itemId} ref={el => (itemRefs.current[idx] = el)} id={`circle-${value}`} />
    </ItemContainer>
  );
};

const CompleteLine: React.FC<LineProps> = ({ x1, x2, y1, y2, isWrong, onLongTab }) => {
  const { handleMouseDown, handleMouseUp, handleMouseLeave } = useLongTab({ onLongTab });
  return (
    <Line
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      $isWrong={isWrong}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseLeave}
    ></Line>
  );
};

ConnectLine.Side = Side;
ConnectLine.Item = Item;

const Circle = styled.span<{ $isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${({ $isActive }) => ($isActive ? 'blue' : 'black')};
  display: block;
  margin: 10px;
`;

const ItemContainer = styled.div<{ $dotPosition: 'left' | 'right' | 'top' | 'bottom' }>`
  position: relative;
  display: flex;
  cursor: pointer;
  height: fit-content;
  align-items: center;
  z-index: 10;

  ${({ $dotPosition }) =>
    $dotPosition === 'left'
      ? `
        flex-direction: row-reverse;
        `
      : $dotPosition === 'right'
      ? `
        justify-content: center;
        `
      : $dotPosition === 'top'
      ? `
        flex-direction: column-reverse;
      `
      : $dotPosition === 'bottom'
      ? `
        flex-direction: column;
        `
      : ``};
`;

const CanvasSVG = styled.svg`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: auto;
`;

const Line = styled.line<{ $isWrong?: boolean }>`
  stroke-width: 5;
  stroke: ${({ $isWrong }) => ($isWrong ? 'var(--color-red-700, #EB1807)' : 'var(--color-blue-700, #1e6efa)')};
`;

export default P07;

const ConnectLineSide = styled(ConnectLine.Side)`
  position: absolute;

  &:nth-child(1) {
    top: 0%;
    left: 50%;
  }

  &:nth-child(2) {
    top: 38%;
    left: 100%;
  }

  &:nth-child(3) {
    top: 100%;
    left: 82%;
  }

  &:nth-child(4) {
    top: 100%;
    left: 18%;
  }

  &:nth-child(5) {
    top: 38%;
    left: 0%;
  }
`;

const LabelBox = styled.label<{ $isActive?: boolean }>`
  color: ${({ $isActive }) => ($isActive ? 'rgba(30, 120, 255, 1)' : 'black')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  background-color: var(--color-green-50, #e5f4ea);
  border-radius: 50%;
  font-family: NOTO;
  font-size: 28px;
  font-weight: 400;
  line-height: 36px;
`;

const ConnectLineContainer = styled(ConnectLine)`
  position: relative;
  width: 348px;
  height: 312px;
  margin-left: -50px;
  margin-top: -43px;
`;

const ConnectLineItem = styled(ConnectLine.Item)`
  width: 100px;
  height: 86px;
`;

const getCoordFromRef = (ref: HTMLSpanElement | null | undefined) => {
  const rect = ref?.getBoundingClientRect();
  if (!rect) return;
  const { top, left, width, height } = rect;
  return { top: top + height / 2, left: left + width / 2 };
};
