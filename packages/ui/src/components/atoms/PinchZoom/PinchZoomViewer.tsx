import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { TransformWrapper, TransformComponent, useControls } from 'react-zoom-pan-pinch';
import Style from './PinchZoomViewer.style';
import zoomInSvg from '@maidt-cntn/assets/zoomIn.svg';
import zoomOutSvg from '@maidt-cntn/assets/zoomOut.svg';

export interface PinchZoomViewerProps {
  onClose: () => void;
  children: React.ReactNode;
}

const PinchZoomViewer = ({ onClose, children }: PinchZoomViewerProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const zoomInButtonRef = useRef<HTMLButtonElement>(null);
  const zoomOutButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      if (document.activeElement === closeButtonRef.current) {
        zoomInButtonRef.current?.focus();
      } else if (document.activeElement === zoomInButtonRef.current) {
        zoomOutButtonRef.current?.focus();
      } else if (document.activeElement === zoomOutButtonRef.current) {
        closeButtonRef.current?.focus();
      }
    }
  };

  const Controls = () => {
    const { zoomIn, zoomOut } = useControls();

    return (
      <Style.ZoomControllerWrapper>
        <Style.ZoomControlBtn
          tabIndex={1}
          type='button'
          aria-label='ZoomIn'
          onClick={() => zoomIn()}
          ref={zoomInButtonRef}
          onKeyDown={handleKeyDown}
          zoomInSvg={zoomInSvg}
          zoomOutSvg={zoomOutSvg}
        >
          확대하기
        </Style.ZoomControlBtn>
        <Style.ZoomControlBtn
          tabIndex={2}
          type='button'
          aria-label='ZoomOut'
          onClick={() => zoomOut()}
          ref={zoomOutButtonRef}
          onKeyDown={handleKeyDown}
          zoomInSvg={zoomInSvg}
          zoomOutSvg={zoomOutSvg}
        >
          축소하기
        </Style.ZoomControlBtn>
      </Style.ZoomControllerWrapper>
    );
  };

  return ReactDOM.createPortal(
    <Style.HiddenImageWrapper>
      <Style.GnbWrapper>
        <button type='button' tabIndex={0} aria-label='close' onClick={onClose} ref={closeButtonRef} onKeyDown={handleKeyDown}>
          닫기
        </button>
      </Style.GnbWrapper>
      <Style.ContentWrap>
        <TransformWrapper centerOnInit={true} initialScale={1} initialPositionX={0} initialPositionY={0} minScale={1} maxScale={4}>
          <TransformComponent wrapperStyle={{ width: '100%', height: 'calc(100% - 35px)' }}>
            <Style.ZoomImageBox>{children}</Style.ZoomImageBox>
          </TransformComponent>
          <Controls />
        </TransformWrapper>
      </Style.ContentWrap>
    </Style.HiddenImageWrapper>,
    document.body,
  );
};

export default PinchZoomViewer;
