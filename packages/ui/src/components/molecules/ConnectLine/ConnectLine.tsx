import React, { Children, MouseEventHandler, ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import { CanvasSVG, Circle, ConnectLineWrapper, ItemContainer, Line, LineButton, SideWrapper } from './ConnectLine.style';

const makeCircleId = ({ itemId, sideId }: { sideId: string; itemId: string }) => {
  return `ConnectLine-${sideId}-${itemId}-circle`;
};
interface ConnectLineProps {
  children:
    | ReactElement<
        ISideProps & {
          disabled?: boolean;
          handleItemClick?: THandleItemClick;
          progressItemId?: string;
          setErrorItems?: (props: ISetErrorItem) => void;
        }
      >[]
    | ReactElement<
        ISideProps & {
          disabled?: boolean;
          handleItemClick?: THandleItemClick;
          progressItemId?: string;
          setErrorItems?: (props: ISetErrorItem) => void;
        }
      >;
  className?: string;
  id?: string;
  onConnect?: (connection: IConnectEventProps) => void;
  onDisConnect?: (connection: IConnectEventProps) => void;
  disabled?: boolean;
  connectLines?: IConnectEventProps[];
  targetRef?: RefObject<HTMLElement>;
  direction?: 'horizontal' | 'vertical';
  itemGap?: string;
  useFull?: boolean;
  useItemFull?: boolean;
}

interface IConnectEventProps {
  from: {
    sideId: string;
    itemId: string;
  };
  to: {
    sideId: string;
    itemId: string;
  };
}

interface ISetErrorItem {
  itemId: string;
  isError: boolean;
}

interface ISideProps {
  children:
    | ReactElement<
        ItemProps & {
          disabled?: boolean;
          sideId?: string;
          handleItemClick?: THandleItemClick;
          progressItemId?: string;
          setErrorItems?: (props: ISetErrorItem) => void;
        }
      >[]
    | ReactElement<
        ItemProps & {
          disabled?: boolean;
          sideId?: string;
          handleItemClick?: THandleItemClick;
          progressItemId?: string;
          setErrorItems?: (props: ISetErrorItem) => void;
        }
      >;
  sideId: string;
  id?: string;
  className?: string;
  bgColor?: string;
}

interface ItemProps {
  itemId: string;
  className?: string;
  value?: string;
  content?: React.ReactNode;
  ariaLabel?: string;
  isError?: boolean;
  width?: string;
  height?: string;
  bgColor?: string;
}

interface CompleteLine {
  from: {
    top: number;
    left: number;
    sideId: string;
    itemId: string;
  };
  to: {
    top: number;
    left: number;
    sideId: string;
    itemId: string;
  };
}

type THandleItemClick = (props: { sideId: string; itemId: string } & Position) => void;

type Position = {
  top: number;
  left: number;
};

export const ConnectLine: React.FC<ConnectLineProps> & { Side: React.FC<ISideProps>; Item: React.FC<ItemProps> } = ({
  children,
  className,
  onConnect,
  onDisConnect,
  disabled,
  connectLines,
  targetRef,
  direction,
  itemGap,
  useFull,
  useItemFull,
}) => {
  const [drawingLineStartPosition, setDrawingLineStartPosition] = useState<Position & { sideId: string; itemId: string }>({
    top: 0,
    left: 0,
    sideId: '',
    itemId: '',
  });
  // const [drawingLineRealTimePosition, setDrawingLineRealTimePosition] = useState<Position>({ top: 0, left: 0 });
  const [drawingSide, setIsDrawingSide] = useState<string>('');
  const [completeLine, setCompleteLine] = useState<CompleteLine[]>([]);
  const [errorItems, setErrorItems] = useState<string[]>([]);

  const lineInit = () => {
    setIsDrawingSide('');
    setDrawingLineStartPosition({ top: 0, left: 0, sideId: '', itemId: '' });
    // setDrawingLineRealTimePosition({ top: 0, left: 0 });
  };

  const alreadyExistLine = (itemId: string) => {
    return completeLine.find(line => line.from.itemId === itemId || line.to.itemId === itemId);
  };

  const removeLine = (itemId: string) => {
    return completeLine.filter(line => line.from.itemId !== itemId && line.to.itemId !== itemId);
  };

  const handleItemClick: THandleItemClick = ({ itemId, left, sideId, top }) => {
    const existLine = alreadyExistLine(itemId);
    if (existLine) {
      if (drawingSide) {
        return;
      } else {
        const removedLines = removeLine(itemId);
        setCompleteLine(removedLines);
        onDisConnect?.({
          from: { sideId: existLine.from.sideId, itemId: existLine.from.itemId },
          to: { sideId: existLine.to.sideId, itemId: existLine.to.itemId },
        });

        return;
      }
    }

    if (!drawingSide) {
      setDrawingLineStartPosition({ top: top, left: left, sideId, itemId });
      setIsDrawingSide(sideId);
    } else if (sideId != drawingSide) {
      setCompleteLine(lines => [
        ...lines,
        {
          from: {
            top: drawingLineStartPosition.top,
            left: drawingLineStartPosition.left,
            sideId: drawingLineStartPosition.sideId,
            itemId: drawingLineStartPosition.itemId,
          },
          to: { top, left, sideId, itemId },
        },
      ]);

      onConnect?.({ from: { sideId: drawingLineStartPosition.sideId, itemId: drawingLineStartPosition.itemId }, to: { sideId, itemId } });
      lineInit();
    }
  };

  // const onBoxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const { clientX, clientY } = e.nativeEvent;
  //   setDrawingLineRealTimePosition({ top: clientY, left: clientX });
  // };

  const onBoxMouseClick = () => {
    if (!drawingSide) {
      return;
    }
    lineInit();
  };

  const handleSetErrorItems = ({ isError, itemId }: ISetErrorItem) => {
    if (isError) {
      setErrorItems(prev => [...new Set([...prev, itemId])]);
    } else {
      setErrorItems(prev => prev.filter(element => element !== itemId));
    }
  };

  const calLineRectToCompleteLine = (line: IConnectEventProps) => {
    const fromCircleId = makeCircleId({ itemId: line.from.itemId, sideId: line.from.sideId });
    const toCircleId = makeCircleId({ itemId: line.to.itemId, sideId: line.to.sideId });
    const fromDocument = document.getElementById(fromCircleId);
    const toDocument = document.getElementById(toCircleId);

    return {
      from: {
        itemId: line.from.itemId,
        sideId: line.from.sideId,
        left: (fromDocument?.offsetLeft ?? 0) + (fromDocument?.offsetWidth ?? 0) / 2,
        top: (fromDocument?.offsetTop ?? 0) + (fromDocument?.offsetHeight ?? 0) / 2,
      },
      to: {
        itemId: line.to.itemId,
        sideId: line.to.sideId,
        left: (toDocument?.offsetLeft ?? 0) + (toDocument?.offsetWidth ?? 0) / 2,
        top: (toDocument?.offsetTop ?? 0) + (toDocument?.offsetHeight ?? 0) / 2,
      },
    };
  };

  useEffect(() => {
    const newConnectLines: CompleteLine[] = [];
    connectLines?.forEach(line => {
      if (alreadyExistLine(line.from.itemId) || alreadyExistLine(line.to.itemId)) return;

      newConnectLines.push(calLineRectToCompleteLine(line));
    });

    setCompleteLine(prev => [...prev, ...newConnectLines]);
  }, [connectLines]);

  useEffect(() => {
    const reRocateLine = () => {
      setCompleteLine(line => line.map(value => calLineRectToCompleteLine(value)));
    };

    if (!targetRef?.current) return;

    targetRef.current.addEventListener('scroll', reRocateLine);
    const observer = new MutationObserver(reRocateLine);
    observer.observe(targetRef?.current, { attributes: true, childList: true, subtree: true });

    return () => {
      targetRef?.current?.removeEventListener('scroll', reRocateLine);
      observer.disconnect();
    };
  }, [completeLine]);

  return (
    <ConnectLineWrapper
      onClick={onBoxMouseClick}
      className={className}
      direction={direction}
      itemGap={itemGap}
      useFull={useFull}
      useItemFull={useItemFull}
    >
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          handleItemClick: handleItemClick,
          progressItemId: drawingLineStartPosition.itemId,
          setErrorItems: handleSetErrorItems,
          disabled,
        });
      })}
      <CanvasSVG>
        {/* {drawingSide && (
          <Line
            x1={drawingLineStartPosition.left}
            x2={drawingLineRealTimePosition.left || drawingLineStartPosition.left}
            y1={drawingLineStartPosition.top}
            y2={drawingLineRealTimePosition.top || drawingLineStartPosition.top}
            status='drawing'
          />
        )} */}
        {completeLine.map((line, index) => {
          return (
            <Line
              key={index}
              x1={line.from.left}
              x2={line.to.left}
              y1={line.from.top}
              y2={line.to.top}
              status={errorItems.includes(line.from.itemId) || errorItems.includes(line.to.itemId) ? 'error' : 'complete'}
            />
          );
        })}
      </CanvasSVG>
    </ConnectLineWrapper>
  );
};

const Side: React.FC<ISideProps> = ({
  children,
  progressItemId,
  className,
  sideId,
  handleItemClick,
  setErrorItems,
  disabled,
  bgColor,
}: ISideProps & {
  disabled?: boolean;
  handleItemClick?: THandleItemClick;
  progressItemId?: string;
  setErrorItems?: (props: ISetErrorItem) => void;
}) => {
  return (
    <SideWrapper className={className} bgColor={bgColor}>
      {Children.map(children, (child, index) => {
        return React.cloneElement(child, { key: index, sideId, handleItemClick, progressItemId, setErrorItems, disabled });
      })}
    </SideWrapper>
  );
};

const Item: React.FC<ItemProps> = ({
  value,
  content,
  progressItemId,
  className,
  isError,
  sideId,
  itemId,
  handleItemClick,
  setErrorItems,
  disabled,
  height,
  width,
  ariaLabel,
  bgColor,
}: ItemProps & {
  disabled?: boolean;
  sideId?: string;
  handleItemClick?: THandleItemClick;
  progressItemId?: string;
  setErrorItems?: (props: ISetErrorItem) => void;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const onClickItem: MouseEventHandler<HTMLDivElement> = event => {
    const rect = itemRef?.current?.getBoundingClientRect();

    if (!rect) return;

    handleItemClick?.({
      itemId,
      sideId: sideId!,
      top: (itemRef.current?.offsetTop ?? 0) + (itemRef.current?.offsetHeight ?? 0) / 2,
      left: (itemRef.current?.offsetLeft ?? 0) + (itemRef.current?.offsetWidth ?? 0) / 2,
    });
  };

  useEffect(() => {
    if (isError !== undefined) {
      setErrorItems?.({ itemId: itemId, isError: isError });
    }
  }, [isError]);

  return (
    <ItemContainer bgColor={bgColor} disabled={disabled} className={className} onClick={onClickItem}>
      <LineButton isError={isError} type='button' aria-label={ariaLabel || value} isClick={progressItemId === itemId} width={width} height={height}>
        {content || value}
      </LineButton>
      <Circle id={makeCircleId({ itemId, sideId: sideId! })} isError={isError} isClick={progressItemId === itemId} ref={itemRef} />
    </ItemContainer>
  );
};

ConnectLine.Side = Side;
ConnectLine.Item = Item;

export default ConnectLine;
