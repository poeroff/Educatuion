import { ReactElement, SetStateAction, cloneElement, useEffect, useState } from 'react';

import { MathfieldElement } from 'mathlive';

import * as Style from './Keypad.styled';
import { CapitalButton, KeypadButton, LatexButton } from './Button.styled';

import { SvgIcon } from '@maidt-cntn/ui';
import Tooltip from './Tooltip';

import { ButtonDataList, InputterType, checkValidKey, getButtonList } from '../../static/LatexInputterData';

import KeypadOnIcon from '../../assets/icon/icon_keypad_on.svg';
import KeypadOffIcon from '../../assets/icon/icon_keypad_off.svg';

export default function Keypad(props: {
  school: 'em' | 'hm' | 'mm';
  handleClick: Function;
  tooltip: string;
  setTooltip: React.Dispatch<SetStateAction<string>>;
  mathfieldRef: MathfieldElement;
}) {
  const { school, handleClick, mathfieldRef, tooltip, setTooltip } = props;

  const [selected, setSelected] = useState<InputterType>('latex');

  const buttonList = getButtonList(school);

  return (
    <Style.ButtonWrapper
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {buttonList[selected].data.map((item, index) => {
        if (!checkValidKey(item)) return null;
        const { icon, latex, children } = ButtonDataList[item];
        return (
          <LatexButton
            className={`latex-inputter-button ${item} small`}
            title={item}
            aria-label={item}
            key={item + String(index)}
            onClick={e => {
              e.stopPropagation();
              if (!children) {
                handleClick(latex);
                setTooltip('');
                return;
              } else {
                setTooltip(tooltip === item ? '' : item);
              }
            }}
          >
            {/* tmp code */}
            {typeof icon === 'string' ? <SvgIcon src={icon} size={`${school === 'em' ? '50px' : '44px'}`} /> : icon}
            {tooltip === item && !!children && (
              <Tooltip handleSubmit={() => {}}>
                {cloneElement(children.component as ReactElement, {
                  mathfieldRef: mathfieldRef,
                  handleSubmit: () => {
                    setTooltip('');
                  },
                })}
              </Tooltip>
            )}
          </LatexButton>
        );
      })}
      {selected.includes('eng') && (
        <CapitalButton
          className={`latex-inputter-button large`}
          title={`${selected.includes('대문자') ? '소문자 입력' : '대문자 입력'}`}
          aria-label={`${selected.includes('대문자') ? '소문자 입력' : '대문자 입력'}`}
          $clicked={selected === 'eng_대문자'}
          $largeText={school === 'em'}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            if (selected === 'eng_소문자') setSelected('eng_대문자');
            else setSelected('eng_소문자');
          }}
        >
          대/소문자
        </CapitalButton>
      )}
      <KeypadButton
        className={`latex-inputter-button ${school === 'hm' ? 'small' : ` ${school === 'em' && !selected.includes('eng') ? 'small' : 'large'}`}`}
        $clicked={selected.includes('eng')}
        title={`${selected.includes('eng') ? '수식 입력' : '영문자 입력'}`}
        aria-label={`${selected.includes('eng') ? '수식 입력' : '영문자 입력'}`}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          if (selected.includes('eng')) setSelected('latex');
          else setSelected('eng_소문자');
        }}
      >
        <SvgIcon src={selected.includes('eng') ? KeypadOffIcon : KeypadOnIcon} size={`${school === 'em' ? '24px' : '22px'}`} />
      </KeypadButton>
    </Style.ButtonWrapper>
  );
}
