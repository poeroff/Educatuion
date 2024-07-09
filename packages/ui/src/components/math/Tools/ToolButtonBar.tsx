import { PropsWithChildren } from 'react';
import Style from './ToolButtonBar.style';
import { SvgIcon } from '@maidt-cntn/ui';
import DeleteSVG from './assets/delete.svg';

interface IToolButtonBarProps {
  onDelete: () => void;
}

export const ToolButtonBar = ({ onDelete, children }: PropsWithChildren<IToolButtonBarProps>) => {
  return (
    <Style.ToolButtonBarContainer>
      <Style.DeleteButton onClick={onDelete}>
        <SvgIcon src={DeleteSVG} width='20px' height='20px' />삭제
      </Style.DeleteButton>
      {children}
    </Style.ToolButtonBarContainer>
  );
};
