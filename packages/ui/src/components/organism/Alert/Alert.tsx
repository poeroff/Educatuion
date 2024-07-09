import React, { useMemo } from 'react';
import Style from './Alert.style';
import Dialog from '../../molecules/Dialog/Dialog';
import SvgIcon from '../../atoms/SvgIcon/SvgIcon';

import alartCrcle from '../../../assets/icons/alert_circle.svg';
import icNoFile from '../../../assets/icons/icNoFile.svg';

export interface IAlertProps {
  width?: number;
  height?: number;
  isShow?: boolean;
  message?: string;
  subMessage?: string;
  description?: string;
  iconType?: 'info' | 'no-file' | 'none';
  closeLabel?: string;
  useFooter?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<IAlertProps> = ({
  width,
  height,
  isShow,
  iconType = 'info',
  message,
  subMessage,
  description,
  closeLabel,
  useFooter = true,
  children,
  onClose,
}) => {
  const state = useMemo(() => {
    return isShow;
  }, [isShow]);

  const alertIcon = useMemo(() => {
    switch (iconType) {
      case 'no-file':
        return <SvgIcon src={icNoFile} width='84px' height='78px' style={{ marginBottom: '20px' }} />;
      case 'info':
        return <SvgIcon src={alartCrcle} size='40px' style={{ marginBottom: '16px' }} />;
      default:
        return <></>;
    }
  }, [iconType]);

  return (
    <Dialog
      isShow={state}
      width={width}
      height={height}
      useFooter={useFooter}
      background='transparent'
      onClose={() => onClose?.()}
      closeLabel={closeLabel}
    >
      <Style.Content>
        {alertIcon}
        {message && <Style.Message dangerouslySetInnerHTML={{ __html: message }}></Style.Message>}
        {subMessage && <Style.SubMessage dangerouslySetInnerHTML={{ __html: subMessage }}></Style.SubMessage>}
        {description && <Style.Description dangerouslySetInnerHTML={{ __html: description }}></Style.Description>}
        {children}
      </Style.Content>
    </Dialog>
  );
};

export default Alert;
