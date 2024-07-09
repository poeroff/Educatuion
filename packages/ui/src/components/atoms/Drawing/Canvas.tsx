import { useState, useRef, useEffect, forwardRef, useImperativeHandle, RefObject } from 'react';
import styled from '@emotion/styled';
import { handleDownload, handleUploadByPath, makeFilePath } from '@maidt-cntn/util/FileUtil';
import { fulfillWithTimeLimit, dataURLToBlob, blobToDataURL } from '@maidt-cntn/util/CommonUtil';
import penCursor from '@maidt-cntn/assets/cursor/drawing_cursor.svg';
import eraserCursor from '@maidt-cntn/assets/cursor/eraser_cursor.svg';

interface ICanvasProps {
  width?: number;
  height?: number;
  useBorder?: boolean;
  canvasActive: boolean;
  cursorType: string;
  mode: string;
  penSize: number;
  penColor: string;
  isLine: boolean;
  eraserSize: number;
  isClearAll: boolean;
  disabled?: boolean;
  tmpSave?: () => void;
  handelClearAll: (clearAll: boolean) => void;
  handelIsExistDrawing: (isExistDrawing: boolean) => void;
}

interface IUploadCanvasImageFunctionProps {
  subjectCode: 'HE10' | 'HE20' | 'EM31';
  cardPath: string;
  canvasIndex: number;
  page: string;
  userId: number;
}
interface IUploadCanvasImageWithPathFunctionProps {
  subjectCode: 'HE10' | 'HE20' | 'EM31';
  path: string;
}

interface ISettingCanvasImageFunctionProps {
  subjectCode: 'HE10' | 'HE20' | 'EM31';
  uploadPath: string;
}

export interface ICanvasFunction {
  getRef: () => RefObject<HTMLCanvasElement> | null;
  getValue: () => string;
  getBlobs: () => Blob | null;
  getPath: (props: IUploadCanvasImageFunctionProps) => string;
  isCanvasBlank: () => boolean;
  uploadCanvasImage: (props: IUploadCanvasImageFunctionProps) => Promise<string>;
  uploadCanvasImageWithPath: (props: IUploadCanvasImageWithPathFunctionProps) => Promise<void>;
  settingCanvasImage: (props: ISettingCanvasImageFunctionProps) => void;
  settingCanvasImageWithBlobs: (canvasBlobs: Blob) => void;
}

export const Canvas = forwardRef<ICanvasFunction, ICanvasProps>(
  (
    {
      width,
      height,
      useBorder = true,
      canvasActive,
      cursorType,
      mode,
      penSize,
      penColor,
      isLine,
      eraserSize,
      isClearAll,
      tmpSave,
      handelClearAll,
      handelIsExistDrawing,
      disabled = false,
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawingRef = useRef(false);
    const modeRef = useRef('pen');
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const snapshotRef = useRef<ImageData | null>(null);

    const penSizeRef = useRef(penSize);
    const penColorRef = useRef(penColor);
    const isLineRef = useRef(isLine);

    const eraserSizeRef = useRef(eraserSize);
    const [isExistDrawing, setIsExistDrawing] = useState(!!canvasRef.current);

    useImperativeHandle(ref, () => ({
      getRef() {
        if (canvasRef.current) return canvasRef;
        else return null;
      },
      getValue() {
        if (canvasRef.current) return canvasRef.current.toDataURL('image/png');
        else return '';
      },
      getBlobs() {
        const dataURL = canvasRef.current?.toDataURL('image/png');
        if (dataURL) {
          return dataURLToBlob(dataURL);
        } else {
          return null;
        }
      },
      getPath(props: IUploadCanvasImageFunctionProps) {
        return makeFilePath({
          cardPath: props.cardPath,
          fileType: 'image',
          index: props.canvasIndex,
          page: props.page.toUpperCase(),
          userId: props.userId,
        });
      },
      isCanvasBlank() {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
          if (ctx) {
            const pixelBuffer = new Uint32Array(ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height).data.buffer);
            return !pixelBuffer.some(color => color !== 0);
          } else {
            return true;
          }
        } else {
          return true;
        }
      },
      async uploadCanvasImage(props: IUploadCanvasImageFunctionProps) {
        const path = makeFilePath({
          cardPath: props.cardPath,
          fileType: 'image',
          index: props.canvasIndex,
          page: props.page.toUpperCase(),
          userId: props.userId,
        });
        const dataURL = canvasRef.current?.toDataURL('image/png');
        if (dataURL) {
          const canvasImgBlob = dataURLToBlob(dataURL);
          const file = new File([canvasImgBlob], 'canvas-image.png', { type: 'image/png' });
          await handleUploadByPath(file, props.subjectCode, path);
        }
        return path;
      },
      async uploadCanvasImageWithPath(props: IUploadCanvasImageWithPathFunctionProps) {
        const dataURL = canvasRef.current?.toDataURL('image/png');
        if (dataURL) {
          const canvasImgBlob = dataURLToBlob(dataURL);
          const file = new File([canvasImgBlob], 'canvas-image.png', { type: 'image/png' });
          await handleUploadByPath(file, props.subjectCode, props.path);
        }
      },
      async settingCanvasImage(props: ISettingCanvasImageFunctionProps) {
        const downloadResult = await fulfillWithTimeLimit(1000, 5, handleDownload(props.subjectCode, props.uploadPath));
        if (downloadResult !== 'TIMEOUT') {
          blobToDataURL(downloadResult as Blob, (dataURL: string) => {
            loadImageData(dataURL);
            setIsExistDrawing(true);
          });
        }
      },
      async settingCanvasImageWithBlobs(canvasBlobs: Blob) {
        blobToDataURL(canvasBlobs, (dataURL: string) => {
          loadImageData(dataURL);
          setIsExistDrawing(true);
        });
      },
    }));

    const loadImageData = (imageData: string) => {
      const image = new Image();
      image.onload = () => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            canvasRef.current.width = image.width;
            canvasRef.current.height = image.height;
            ctx.drawImage(image, 0, 0);
          }
        }
      };
      image.src = imageData;
    };

    useEffect(() => {
      modeRef.current = mode;
    }, [mode]);

    useEffect(() => {
      penSizeRef.current = penSize;
    }, [penSize]);

    useEffect(() => {
      penColorRef.current = penColor;
    }, [penColor]);

    useEffect(() => {
      isLineRef.current = isLine;
    }, [isLine]);

    useEffect(() => {
      eraserSizeRef.current = eraserSize;
    }, [eraserSize]);

    useEffect(() => {
      handelIsExistDrawing(isExistDrawing);
    }, [isExistDrawing]);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpi = window.devicePixelRatio || 1;
      canvas.width = width ? width : canvas.offsetWidth * dpi;
      canvas.height = height ? height : canvas.offsetHeight * dpi;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(dpi, dpi);
      ctx.lineCap = 'round';

      const startDrawing = (e: MouseEvent) => {
        isDrawingRef.current = true;
        const { offsetX, offsetY } = e;
        startXRef.current = offsetX;
        startYRef.current = offsetY;
        snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
        if (!isLineRef.current) {
          ctx.beginPath();
          ctx.moveTo(offsetX, offsetY);
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        e.stopPropagation();
        if (!isDrawingRef.current) return;
        const { offsetX, offsetY } = e;
        if (modeRef.current === 'pen') {
          if (isLineRef.current) {
            ctx.putImageData(snapshotRef.current!, 0, 0); // 이전 이미지 복원
            ctx.beginPath();
            ctx.moveTo(startXRef.current, startYRef.current);
            ctx.lineTo(offsetX, offsetY);
            ctx.strokeStyle = penColorRef.current;
            ctx.lineWidth = penSizeRef.current;
            ctx.stroke();
          } else {
            ctx.strokeStyle = penColorRef.current;
            ctx.lineWidth = penSizeRef.current;
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
          }
          setIsExistDrawing(true);
        } else if (modeRef.current === 'eraser') {
          const eraserWidth = eraserSizeRef.current;
          ctx.clearRect(offsetX - eraserWidth / 2, offsetY - eraserWidth / 2, eraserWidth, eraserWidth);
        }
      };

      const stopDrawing = () => {
        isDrawingRef.current = false;
        tmpSave?.();
      };

      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);

      if (isClearAll) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handelClearAll(false);

        setIsExistDrawing(false);
      }

      return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);
      };
    }, [isClearAll]);

    return (
      <CanvasWrapper useBorder={useBorder} isActive={canvasActive}>
        <CanvasArea disabled={disabled} ref={canvasRef} cursorType={cursorType} isActive={canvasActive} />
      </CanvasWrapper>
    );
  },
);

const CanvasWrapper = styled.div<{ useBorder?: boolean; isActive: boolean }>`
  ${({ useBorder, isActive }) =>
    useBorder &&
    `
    border: ${isActive ? '2px solid var(--color-blue-500)' : '1px solid var(--color-blue-200)'};
    border-radius: 8px;
  `}
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
`;

const CanvasArea = styled.canvas<{ cursorType: string; isActive: boolean; disabled?: boolean }>`
  width: 100%;
  height: 100%;
  cursor: ${props => {
    if (props.isActive)
      switch (props.cursorType) {
        case 'pen':
          return `url(${penCursor}) 20 15, auto`;
        case 'eraser':
          return `url(${eraserCursor})20 15, auto`;
        default:
          return 'default';
      }
  }};
  z-index: ${props => (props.isActive ? 2 : 0)};
  ${({ disabled }) => disabled && { pointerEvents: 'none' }}
`;

export default Canvas;
