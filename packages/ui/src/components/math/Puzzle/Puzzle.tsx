import { DragEvent, useState, useEffect, useRef } from 'react';
import Style from './Puzzle.style';
import { Box } from '@maidt-cntn/ui';
// 수학 초등 3학년 StoryBoard 기준으로 화살표 없지만, 다시 적용이 되는 사항일 수도 있어서 주석 처리함.
// import SvgIcon from '../../atoms/SvgIcon/SvgIcon';
// import CenterArrow from '@/assets/Puzzle/CenterArrow.svg';

export interface IPuzzle {
  ariaLabel: string;
  initPuzzle?: TPuzzle;
  rowNum: number;
  colNum: number;
  backgroudImgUrl?: string;
  imgUrls: string[];
  imgAlts: string[];
  eqNums: string[][];
  tgtNums: number[];
  onFinish: (completedPuzzle: TPuzzle) => void; //해당 컴포넌트를 사용하는 페이지에서 퍼즐이 완료되면, 제출하기 버튼이 활성화되어야 하므로 이벤트 추가
}

export type TPuzzle = {
  placedPuzzles: number[];
};

export const Puzzle: React.FC<IPuzzle> = ({
  ariaLabel,
  initPuzzle,
  rowNum = 3,
  colNum = 3,
  backgroudImgUrl,
  imgUrls,
  imgAlts,
  eqNums,
  tgtNums,
  onFinish,
}) => {
  const [isInitialized, setisInitialized] = useState<boolean>(false);
  const [dragging, setDragging] = useState<string | null>(null);
  const [positions, setPositions] = useState<{ [key: string]: { left?: number; top?: number } }>({});
  const [targets, setTargets] = useState<{ [key: string]: string }>({});
  const [placedPuzzles, setPlacedPuzzles] = useState<number[]>([]);
  const dragBoxRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const dropBoxRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    let id = 0;
    const initialPositions: { [key: string]: { left?: number; top?: number } } = {};
    const initialTargets: {
      [key: string]: string;
    } = {};
    const colSize = 348 / colNum;

    for (let row = 0; row < rowNum; row++) {
      for (let col = 0; col < colNum; col++) {
        const pieceId = `piece${id}`;
        initialPositions[pieceId] = {
          left: col * colSize,
          top: row * colSize,
        };
        initialTargets[pieceId] = `target${tgtNums[id]}`;
        id++;
      }
    }
    setPlacedPuzzles(initPuzzle?.placedPuzzles ?? []);
    setPositions(initialPositions);
    setTargets(initialTargets);
    setisInitialized(true);
  }, [rowNum, colNum, tgtNums]);

  useEffect(() => {
    if (isInitialized) {
      if (placedPuzzles.length === rowNum * colNum) {
        Object.keys(targets).map((entry, idx) => {
          const targetRect = dropBoxRef.current[targets[entry]]!.getBoundingClientRect();
          const movingPiece = dragBoxRef.current[entry];
          if (movingPiece) {
            movingPiece.style.display = 'block';
            movingPiece.style.position = 'absolute';
            movingPiece.style.left = `${targetRect.left - movingPiece.offsetParent!.getBoundingClientRect().left}px`;
            movingPiece.style.top = `${targetRect.top - movingPiece.offsetParent!.getBoundingClientRect().top}px`;
          }
        });
      }
    }
  }, [isInitialized, placedPuzzles]);

  useEffect(() => {
    if (placedPuzzles.length === rowNum * colNum) {
      onFinish({
        placedPuzzles: placedPuzzles,
      });
    }
  }, [placedPuzzles]);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, pieceId: string) => {
    setDragging(pieceId);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      dragBoxRef.current[pieceId]!.style.display = 'none';
    }, 0);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>, pieceId: string) => {
    dragBoxRef.current[pieceId]!.style.display = 'block';
    setDragging(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (dragging && targets[dragging] === targetId) {
      setPlacedPuzzles(puzzles => {
        const newPuzzles = [...puzzles, Number(targetId.replace('target', ''))];
        return newPuzzles;
      });
      const movingPiece = dragBoxRef.current[dragging];
      if (movingPiece) {
        const targetRect = dropBoxRef.current[targetId]!.getBoundingClientRect();
        movingPiece.style.display = 'block';
        movingPiece.style.position = 'absolute';
        movingPiece.style.left = `${targetRect.left - movingPiece.offsetParent!.getBoundingClientRect().left}px`;
        movingPiece.style.top = `${targetRect.top - movingPiece.offsetParent!.getBoundingClientRect().top}px`;
      }
    }
    setDragging(null);
    e.currentTarget.style.backgroundColor = '';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'lightblue';
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '';
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <Style.PuzzleWrapper aria-label={ariaLabel}>
      <Style.DragAndDropWrapper>
        <Style.DropBoxWrapper colNum={colNum} backgroundImg={backgroudImgUrl}>
          {Object.keys(positions).map((_, index) => (
            <Style.DropBox
              className='target'
              colNum={colNum}
              key={`target${index}`}
              ref={element => {
                dropBoxRef.current[`target${index}`] = element;
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, `target${index}`)}
            >
              <Style.DropBoxSection colNum={colNum}>
                <Box justifyContent='center'>
                  <Style.DropBoxText colNum={colNum} lineYn={false}>
                    {eqNums[index] ? eqNums[index][0] : null}
                  </Style.DropBoxText>
                  <Style.DropBoxText colNum={colNum} lineYn={true}>
                    {eqNums[index] ? eqNums[index][1] : null}
                  </Style.DropBoxText>
                  <Style.DropBoxInput colNum={colNum} />
                </Box>
              </Style.DropBoxSection>
            </Style.DropBox>
          ))}
        </Style.DropBoxWrapper>
        {/* 수학 초등 3학년 StoryBoard 기준으로 화살표 없지만, 다시 적용이 되는 사항일 수도 있어서 주석 처리함.
        <Style.CenterArrowWrapper>
          <SvgIcon src={CenterArrow} draggable={false} height='100%' width='100%' />
        </Style.CenterArrowWrapper> */}
        <Style.DragBoxWrapper>
          {Object.keys(positions).map((pieceId, idx) => (
            <Style.DragBox
              colNum={colNum}
              imgUrl={imgUrls[idx] !== null ? imgUrls[idx] : ''}
              aria-label={imgAlts[idx] !== null ? imgAlts[idx] : ''}
              posL={positions[pieceId].left}
              posT={positions[pieceId].top}
              placed={tgtNums[idx] !== null ? placedPuzzles.includes(tgtNums[idx]) : true}
              key={pieceId}
              ref={element => {
                if (element) {
                  dragBoxRef.current[pieceId] = element;
                }
              }}
              draggable={tgtNums[idx] !== null ? !placedPuzzles.includes(tgtNums[idx]) : false}
              onDragStart={e => handleDragStart(e, pieceId)}
              onDragEnd={e => handleDragEnd(e, pieceId)}
            />
          ))}
        </Style.DragBoxWrapper>
      </Style.DragAndDropWrapper>
    </Style.PuzzleWrapper>
  );
};

export default Puzzle;
