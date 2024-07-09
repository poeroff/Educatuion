import * as Style from './Numpad.styled';
import { DeleteButton, LatexButton } from './Button.styled';

import { SvgIcon } from '@maidt-cntn/ui';

import DeleteIcon from '../../assets/icon/icon_delete.svg';

import { ButtonDataList, checkValidKey, getButtonList } from '../../static/LatexInputterData';

export default function Numpad(props: { school: 'em' | 'mm' | 'hm'; handleMouseOver: Function; handleClick: Function; handleDelete: Function }) {
  const { school, handleClick, handleMouseOver, handleDelete } = props;

  const buttonList = getButtonList(school).number;

  const layout = school === 'mm' ? 'grid' : 'flex';

  return (
    <Style.ButtonWrapper
      $layout={layout}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {buttonList.data.map((item, index) => {
        if (!checkValidKey(item)) return null;
        const { icon, latex } = ButtonDataList[item];
        return (
          <LatexButton
            onMouseOver={e => {
              handleMouseOver();
            }}
            title={item}
            aria-label={item}
            className={`latex-inputter-button ${item} small`}
            key={item + String(index)}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(e, latex);
            }}
          >
            {/* tmp code */}
            {typeof icon === 'string' ? <SvgIcon src={icon} size={`${school === 'em' ? '50px' : '44px'}`} /> : icon}
          </LatexButton>
        );
      })}
      <DeleteButton
        aria-label='지우기'
        title='지우기'
        className={`latex-inputter-button ${school === 'em' ? 'small' : 'large'}`}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handleDelete();
        }}
        onMouseOver={e => {
          e.preventDefault();
          e.stopPropagation();
          handleMouseOver();
        }}
      >
        <SvgIcon src={DeleteIcon} size={`${school === 'em' ? '28px' : '24px'}`} />
      </DeleteButton>
    </Style.ButtonWrapper>
  );
}
