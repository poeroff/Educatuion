import { forwardRef, useEffect, useRef, useState } from 'react';
import { Canvas, IDrawingProps, ICanvasFunction, ToolButton } from '@maidt-cntn/ui';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';
import { tokenAtom } from '@maidt-cntn/stores/token';
import drawingIconSrc from '@maidt-cntn/assets/icons/drawing/drawing.svg';
import Style from './Drawing.style';
import { useRecoilState } from 'recoil';

export const Drawing = forwardRef<ICanvasFunction, IDrawingProps>(
  ({ image, width = '100%', height = '100%', useBorder, tmpSave, disabled, ariaLabel = '' }, ref) => {
    const [active, setIsActive] = useState(false);
    const [cursorType, setCursorType] = useState('pen');
    const [mode, setMode] = useState('pen');

    const [penSize, setPenSize] = useState(5);
    const [penColor, setPenColor] = useState('#47494D');
    const [isLine, setIsLine] = useState(false);
    const [eraserSize, setEraserSize] = useState(5);
    const [clearAll, setClearAll] = useState(false);

    const [isExistDrawing, setIsExistDrawing] = useState(false);

    const drawingRef = useRef<HTMLDivElement>(null);

    const prefix = import.meta.env.VITE_CDN_PATH;
    const [imageSrcHref, setImageSrcHref] = useState<string>('');
    const [{ accessToken }] = useRecoilState(tokenAtom);

    useEffect(() => {
      const clickEvent = (e: MouseEvent) => {
        if (drawingRef.current && drawingRef.current.contains(e.target as Node)) {
          setIsActive(true);
        }
      };
      document.addEventListener('mousedown', clickEvent);
      return () => {
        document.removeEventListener('mousedown', clickEvent);
      };
    }, [drawingRef, disabled]);

    useEffect(() => {
      if (accessToken && image) {
        setImageSrcHref(getFileFromCDNWithToken(prefix + image.src, accessToken));
        return;
      }
      setImageSrcHref(prefix + image?.src);
    }, [accessToken]);

    return (
      <Style.Container width={width} height={height} aria-label={ariaLabel}>
        <Style.ToolBar>
          <ToolButton
            setCursor={setCursorType}
            setMode={setMode}
            setIsActive={setIsActive}
            handelPenSize={setPenSize}
            penSize={penSize}
            handelPenColor={setPenColor}
            penColor={penColor}
            handelIsLine={setIsLine}
            isLine={isLine}
            handelEraserSize={setEraserSize}
            eraserSize={eraserSize}
            isExistDrawing={isExistDrawing}
            handelClearAll={setClearAll}
            disabled={disabled}
          />
        </Style.ToolBar>
        <Style.DrawingArea ref={drawingRef}>
          {!active && !disabled && <Style.DrawingImage src={drawingIconSrc} alt='' />}
          <Canvas
            ref={ref}
            useBorder={useBorder}
            canvasActive={active && !disabled}
            cursorType={cursorType}
            mode={mode}
            penSize={penSize}
            penColor={penColor}
            isLine={isLine}
            eraserSize={eraserSize}
            handelIsExistDrawing={setIsExistDrawing}
            isClearAll={clearAll}
            handelClearAll={setClearAll}
            disabled={disabled}
            tmpSave={tmpSave}
          />
          {image && <Style.BackgroundImage src={imageSrcHref} alt={image.alt} />}
        </Style.DrawingArea>
      </Style.Container>
    );
  },
);

export default Drawing;
