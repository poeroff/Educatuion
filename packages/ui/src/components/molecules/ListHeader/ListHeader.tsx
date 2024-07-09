import { IWAI } from '@emotion/react';
import Style from './ListHeader.style';
import { Property } from 'csstype';

interface IListHeaderProps extends IWAI {
  align?: Property.AlignContent;
  children?: React.ReactNode;
  fontSize?: string;
}

export const ListHeader = ({ align = 'flex-end', children, fontSize }: IListHeaderProps) => {
  return <Style.ListHeader style={{ justifyContent: align, fontSize: fontSize }}>{children}</Style.ListHeader>;
};

export default ListHeader;
