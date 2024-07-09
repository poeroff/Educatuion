import { ESvgType, Input, SvgIcon } from '@maidt-cntn/ui';
import Style from './Ruler.style';
import Ruler15SVG from '@maidt-cntn/assets/Ruler/ruler_15.svg';
import Ruler20SVG from '@maidt-cntn/assets/Ruler/ruler_20.svg';
import Ruler15SelectedSVG from '@maidt-cntn/assets/Ruler/ruler_15_selected.svg';
import Ruler20SelectedSVG from '@maidt-cntn/assets/Ruler/ruler_20_selected.svg';
import ProtractorSVG from '@maidt-cntn/assets/Ruler/protractor.svg';
import ProtractorSelectedSVG from '@maidt-cntn/assets/Ruler/protractor_selected.svg';
import TriangleRuler30SVG from '@maidt-cntn/assets/Ruler/triangle_ruler_30.svg';
import TriangleRuler30SelectedSVG from '@maidt-cntn/assets/Ruler/triangle_ruler_30_selected.svg';
import TriangleRuler45SVG from '@maidt-cntn/assets/Ruler/triangle_ruler_45.svg';
import TriangleRuler45SelectedSVG from '@maidt-cntn/assets/Ruler/triangle_ruler_45_selected.svg';
import RotateSVG from '@maidt-cntn/assets/Ruler/rotate.svg';
import CircleXFilledSVG from '@maidt-cntn/assets/Ruler/circle-x-filled.svg';
import { TBoundaryInfo, ToolDrag } from '../ToolDrag';
import { useState, SetStateAction, Dispatch, useEffect, useRef, RefObject, WheelEvent, useCallback, useLayoutEffect } from 'react';
import Draggable, { DraggableData } from 'react-draggable';

interface IRuler extends IBasicRuler {
  length?: 15 | 20;
}

interface ITriangleRuler extends IBasicRuler {
  angle?: 30 | 45;
}

interface IProtractor extends IBasicRuler {}

interface IBasicRuler {
  zIndex: number;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: () => void;
  onTypeChange?: () => void;
  isZoomable?: boolean;
  boundaryInfo?: TBoundaryInfo;
}

interface IRotateButton {
  zIndex: number;
  setRotation: Dispatch<SetStateAction<number>>;
  pivotRef: RefObject<HTMLDivElement>;
}

export const Ruler = ({ zIndex, length: defaultLength = 15, setShow, onClick }: IRuler) => {
  const [length, setLength] = useState(defaultLength);
  const BOUNDARY_INFO = { left: 0, top: 0, right: 700, bottom: 608 };
  const onTypeChange = () => {
    if (length === 15) setLength(20);
    else setLength(15);
  };
  return (
    <BasicRuler
      zIndex={zIndex}
      img={length === 15 ? Ruler15SVG : Ruler20SVG}
      imgSelected={length === 15 ? Ruler15SelectedSVG : Ruler20SelectedSVG}
      setShow={setShow}
      onClick={onClick}
      onTypeChange={onTypeChange}
      size={length === 15 ? { width: '518px', height: '77px' } : { width: '684px', height: '77px' }}
      boundaryInfo={BOUNDARY_INFO}
    />
  );
};

export const TriangleRuler = ({ zIndex, angle: defaultAngle = 30, setShow, onClick }: ITriangleRuler) => {
  const [angle, setAngle] = useState(defaultAngle);
  const onTypeChange = () => {
    if (angle === 45) setAngle(30);
    else setAngle(45);
  };
  return (
    <BasicRuler
      zIndex={zIndex}
      img={angle === 45 ? TriangleRuler45SVG : TriangleRuler30SVG}
      imgSelected={angle === 45 ? TriangleRuler45SelectedSVG : TriangleRuler30SelectedSVG}
      setShow={setShow}
      onClick={onClick}
      onTypeChange={onTypeChange}
      size={angle === 45 ? { width: '311px', height: '312px' } : { width: '208px', height: '353px' }}
    />
  );
};

export const Protractor = ({ zIndex, setShow, onClick }: IProtractor) => {
  return (
    <BasicRuler
      zIndex={zIndex}
      img={ProtractorSVG}
      imgSelected={ProtractorSelectedSVG}
      setShow={setShow}
      onClick={onClick}
      isZoomable
      size={{ width: '358px', height: '182px' }}
    />
  );
};

const BasicRuler = ({
  zIndex,
  img,
  imgSelected,
  setShow,
  onClick,
  onTypeChange,
  isZoomable = false,
  size,
  boundaryInfo,
}: IBasicRuler & { img: string; imgSelected: string; size: { width: string; height: string } }) => {
  const pivotRef = useRef<HTMLDivElement>(null);
  const rotatingRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isZoomButtonClicked, setIsZoomButtonClicked] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState('');
  const [isReset, setIsReset] = useState(false);
  const getTransformOrigin = useCallback(() => {
    const pivotRect = pivotRef.current?.getBoundingClientRect();
    const rotatingRect = rotatingRef.current?.getBoundingClientRect();

    if (!pivotRect || !rotatingRect) return '';

    const pivotCenterX = pivotRect.left + pivotRect.width / 2;
    const pivotCenterY = pivotRect.top + pivotRect.height / 2;
    const transformOriginX = pivotCenterX - rotatingRect.left;
    const transformOriginY = pivotCenterY - rotatingRect.top;

    return `${transformOriginX}px ${transformOriginY}px`;
  }, []);

  const getScaleInRange = (currentScale: number, delta: number) => {
    const newScale = currentScale + delta;
    if (newScale < MIN_SCALE || newScale > MAX_SCALE) return currentScale;
    return newScale;
  };

  const setScaleInRange = (newScale: number) => {
    if (newScale < MIN_SCALE || newScale > MAX_SCALE) setScale(1);
    else setScale(newScale);
  };

  const zoomIn = () => {
    setScale(prev => getScaleInRange(prev, SCALE_DELTA));
  };
  const zoomOut = () => {
    setScale(prev => getScaleInRange(prev, -SCALE_DELTA));
  };

  const onWheelZoom = (e: WheelEvent<HTMLButtonElement>) => {
    if (!isZoomButtonClicked) return;
    if (e.deltaY < 0) zoomOut();
    else if (e.deltaY > 0) zoomIn();
  };

  const onTypeChangeAndRotationReset = () => {
    onTypeChange && onTypeChange();
    setRotation(0);
    setIsReset(true);
  };

  useEffect(() => {
    setTransformOrigin(getTransformOrigin());
  }, [getTransformOrigin, size]);

  useEffect(() => {
    if (!isReset) return;
    setTransformOrigin(getTransformOrigin());
    setIsReset(false);
  }, [getTransformOrigin, isReset]);

  return (
    <ToolDrag zIndex={zIndex} cancelClassName={DRAG_CANCEL_CLASS_NAME} boundaryInfo={boundaryInfo}>
      <Style.RulerWrap
        onMouseDown={() => {
          setSelected(true);
        }}
        onMouseUp={() => {
          setSelected(false);
          if (onClick) onClick();
        }}
        onTouchStart={() => {
          setSelected(true);
        }}
        onTouchEnd={() => {
          setSelected(false);
          if (onClick) onClick();
        }}
      >
        <Style.ButtonList>
          <Style.DeleteButton
            onClick={() => {
              setShow(false);
            }}
            onTouchEnd={() => {
              setShow(false);
            }}
            $zIndex={zIndex + 1}
          >
            삭제
            <SvgIcon type={ESvgType.IMG} src={CircleXFilledSVG} draggable={false} />
          </Style.DeleteButton>
          {isZoomable && (
            <>
              <Style.Button
                onMouseDown={() => {
                  setIsZoomButtonClicked(true);
                }}
                onMouseUp={() => {
                  setIsZoomButtonClicked(false);
                }}
                onTouchStart={() => {
                  setIsZoomButtonClicked(true);
                }}
                onTouchEnd={() => {
                  setIsZoomButtonClicked(false);
                }}
                onWheel={onWheelZoom}
                $zIndex={zIndex + 1}
              >
                확대/축소
              </Style.Button>
              <Style.ZoomInputWrap $zIndex={zIndex + 1}>
                <Style.Button onMouseUp={zoomOut} onTouchEnd={zoomOut} $zIndex={zIndex + 1}>
                  -
                </Style.Button>
                <div>
                  <Style.NumberInput
                    min={MIN_SCALE * 100}
                    max={MAX_SCALE * 100}
                    type='number'
                    value={Math.round(scale * 100)}
                    onChange={e => {
                      setScale(Number(e.target.value) / 100);
                    }}
                    onBlur={e => {
                      const newScale = Number(e.target.value) / 100;
                      setScaleInRange(newScale);
                    }}
                  />
                  %
                </div>
                <Style.Button onMouseUp={zoomIn} onTouchEnd={zoomIn} $zIndex={zIndex + 1}>
                  +
                </Style.Button>
              </Style.ZoomInputWrap>
            </>
          )}
          {onTypeChange && (
            <Style.Button onMouseUp={onTypeChangeAndRotationReset} onTouchEnd={onTypeChangeAndRotationReset} $zIndex={zIndex + 1}>
              전환
            </Style.Button>
          )}
        </Style.ButtonList>
        <Style.RulerContainer ref={rotatingRef} $rotation={rotation} $transformOrigin={transformOrigin} $scale={scale} style={size}>
          <SvgIcon type={ESvgType.IMG} src={selected ? imgSelected : img} draggable={false} />
        </Style.RulerContainer>

        <RotateButton zIndex={zIndex + 1} setRotation={setRotation} pivotRef={pivotRef} />
      </Style.RulerWrap>
    </ToolDrag>
  );
};

const RotateButton = ({ zIndex, setRotation, pivotRef }: IRotateButton) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleRotation = (currentRotation: number, delta: number) => {
    const newRotation = currentRotation + delta;
    if (newRotation < -180 || newRotation > 180) return currentRotation;
    return newRotation;
  };

  const handleDrag = (data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
    const MULTIPLE = 1;
    if (data.deltaX < 0) setRotation(prev => handleRotation(prev, -MULTIPLE));
    else if (data.deltaX > 0) setRotation(prev => handleRotation(prev, MULTIPLE));
    else {
      if (data.x <= -ROTATE_BUTTON_X_RANGE) setRotation(prev => handleRotation(prev, -MULTIPLE));
      else if (data.x >= ROTATE_BUTTON_X_RANGE) setRotation(prev => handleRotation(prev, MULTIPLE));
    }
  };

  return (
    <Draggable
      bounds={{ left: -ROTATE_BUTTON_X_RANGE, right: ROTATE_BUTTON_X_RANGE, top: 0, bottom: 0 }}
      position={{ x: position.x, y: position.y }}
      onDrag={(_, data) => handleDrag(data)}
      onStop={() => {
        setPosition({ x: 0, y: 0 });
      }}
    >
      <Style.RotateButtonBoundary $zIndex={zIndex} ref={pivotRef}>
        <Style.RotateButton className={DRAG_CANCEL_CLASS_NAME}>
          <SvgIcon type={ESvgType.IMG} src={RotateSVG} draggable={false} />
        </Style.RotateButton>
      </Style.RotateButtonBoundary>
    </Draggable>
  );
};

const DRAG_CANCEL_CLASS_NAME = 'cancel';
const ROTATE_BUTTON_X_RANGE = 10;
const SCALE_DELTA = 0.1;
const MAX_SCALE = 5;
const MIN_SCALE = 0.25;
