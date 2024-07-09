import React, { FC, useMemo, useEffect, useRef, useState } from 'react';
import Portal from '../../atoms/Portal/Portal';
import { Typography } from '@maidt-cntn/ui';
import { Button, EStyleButtonTypes, EStyleSizes } from '@maidt-cntn/ui';
import Style from './Dialog.style';

export interface IDialog<T> {
  bodyId?: string;
  isShow?: boolean;
  title?: string;
  width?: number;
  height?: number;
  topHeight?: number;
  background?: string;
  children?: React.ReactNode;
  useHeader?: boolean;
  useFooter?: boolean;
  header?: React.ComponentType<T | {}>;
  footer?: React.ComponentType<T | {}>;
  value?: T;
  closeLabel?: string;
  confirmLabel?: string;
  tabIndex?: number;
  tabIndexCount?: number;
  onClose?: () => void;
  onConfirm?: () => void;
}

export interface IDialogHeader {
  title?: React.ReactNode;
  onClose?: () => void;
}

export interface IDialogFooter {
  closeLabel?: string;
  confirmLabel?: string;
  tabIndex?: number;
  onClose?: () => void;
  onConfirm?: () => void;
}

export const HeaderContents: React.FC<IDialogHeader> = ({ title, onClose }) => {
  return (
    <Style.Header>
      <Typography>{title}</Typography>

      <Style.HeaderCloseBtn type='button' onClick={() => onClose?.()}>
        닫기
      </Style.HeaderCloseBtn>
    </Style.Header>
  );
};

export const FooterContents: React.FC<IDialogFooter> = ({ confirmLabel = '예', closeLabel = '아니오', tabIndex, onClose, onConfirm }) => {
  return (
    <>
      {onConfirm && (
        <Button label={confirmLabel} color={EStyleButtonTypes.DEFAULT} size={EStyleSizes['SMALL']} onClick={onConfirm} tabIndex={tabIndex} />
      )}
      {onClose && <Button label={closeLabel} color={EStyleButtonTypes.PRIMARY} size={EStyleSizes['SMALL']} onClick={onClose} tabIndex={tabIndex} />}
    </>
  );
};

export function Dialog<T>({
  bodyId,
  isShow = false,
  title = '',
  width = 320,
  height,
  topHeight = 0,
  background,
  useHeader = false,
  useFooter = false,
  header,
  footer,
  value,
  closeLabel,
  confirmLabel,
  tabIndex,
  tabIndexCount,
  children,
  onClose,
  onConfirm,
}: IDialog<T>) {
  const [footerClientH, setFooterClientH] = useState(0);

  const dialogContentRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const Header: React.ComponentType<T | {}> | FC<IDialogHeader> = useMemo(() => {
    return header || HeaderContents;
  }, [header]);

  const Footer: React.ComponentType<T | {}> | FC<IDialogFooter> = useMemo(() => {
    return footer || FooterContents;
  }, [footer]);

  const headerHeight = useMemo(() => {
    if (useHeader) {
      return topHeight || 36;
    }
    return topHeight;
  }, [useHeader, topHeight]);

  const footerHeight = useMemo(() => {
    if (useFooter) {
      return footerClientH || 88;
    }
    return 0;
  }, [useFooter]);

  useEffect(() => {
    const clientHeight = ref.current?.clientHeight ?? 0;
    setFooterClientH(clientHeight);
  }, [useFooter, footer, ref.current?.clientHeight]);

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        dialogContentRef.current?.focus();
      }, 0);
    }
  }, [isShow, dialogContentRef]);

  return (
    <Portal isShow={isShow}>
      <Style.Wrap background={background} onClick={onClose}>
        <Style.Container width={width} height={height} onClick={e => e.stopPropagation()}>
          {useHeader && <Header {...value} title={title} onClose={onClose} />}
          <Style.Content
            width={width}
            headerHeight={headerHeight}
            footerHeight={footerHeight}
            tabIndex={tabIndex ? tabIndex : undefined}
            ref={dialogContentRef}
            id={bodyId}
          >
            {children}
          </Style.Content>
          {useFooter && (
            <Style.Footer ref={ref}>
              <Footer
                {...value}
                closeLabel={closeLabel}
                confirmLabel={confirmLabel}
                onClose={onClose}
                onConfirm={onConfirm}
                tabIndex={tabIndex && tabIndexCount ? tabIndex + tabIndexCount + 1 : tabIndex ? tabIndex + 1 : undefined}
              />
            </Style.Footer>
          )}
        </Style.Container>
      </Style.Wrap>
    </Portal>
  );
}

export default Dialog;
