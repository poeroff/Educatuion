import { useEffect, useRef, useState } from 'react';
import { Scroll } from '@maidt-cntn/ui';
import Style, { IDropdownStyle } from './Dropdown.style';

type DropdownType = 'up' | 'down';

export interface IDropdownProps extends IDropdownStyle {
  type?: DropdownType;
  dropdownList?: string[];
  selectedValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  tabIndex?: number;
  ariaLabel?: string;
  onClick?: (value?: string) => void;
  isError?: boolean;
  isInline?: boolean;
}

interface IListProps {
  value: string;
  index: number;
}

export const Dropdown = ({
  type = 'down',
  tabIndex,
  dropdownList = [],
  selectedValue,
  width = '225px',
  marginLeft = '0px',
  ariaLabel = '',
  disabled = false,
  readOnly = false,
  isOpen = false,
  onClick,
  isError,
  isInline,
}: IDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>(selectedValue ? selectedValue : '선택하세요.');
  const [clickedState, setClickedState] = useState<boolean[]>(Array(dropdownList.length).fill(false));
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const listRefs = useRef<(HTMLLIElement | null)[]>([]);
  const optionRef = useRef<HTMLUListElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [top, setTop] = useState<number>(0);

  const handleButtonClick = () => {
    if (readOnly) return;
    setClickedState(Array(dropdownList.length).fill(false));
    setIsDropdownOpen(!isDropdownOpen);
    onClick?.();
    if (!isDropdownOpen) {
      setFocusedIndex(0);
    }
  };

  const handleListClick = ({ value, index }: IListProps) => {
    if (readOnly) {
      setIsDropdownOpen(!isDropdownOpen);
      return;
    }
    setButtonText(value);
    setClickedState(clickedState.map((item, idx) => (idx === index ? !item : false)));
    setIsDropdownOpen(!isDropdownOpen);
    onClick?.(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleButtonClick();
    }
  };

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        setFocusedIndex(prevIndex => (prevIndex + 1) % dropdownList.length);
        break;
      case 'ArrowUp':
        setFocusedIndex(prevIndex => (prevIndex - 1 + dropdownList.length) % dropdownList.length);
        break;
      case 'Enter':
        handleListClick({ value: dropdownList[focusedIndex], index: focusedIndex });
        break;
    }
  };

  const placeholderColor = (buttonText: string) => {
    return isError ? '#EB1807' : buttonText === '선택하세요.' ? 'var(--color-grey-700)' : 'var(--color-grey-900)';
  };

  useEffect(() => {
    if (focusedIndex >= 0 && isDropdownOpen) {
      listRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, isDropdownOpen]);

  useEffect(() => {
    setIsDropdownOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (selectedValue) setButtonText(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (optionRef.current && type === 'up') {
      setTop(optionRef.current?.offsetHeight + 8);
    }
  }, [isDropdownOpen, type]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAriaLabel = (ariaLabel: string) => {
    if (isError) {
      if (ariaLabel.length > 0) {
        ariaLabel = ariaLabel + ', 틀림';
      } else {
        ariaLabel = '틀림';
      }
    }

    return ariaLabel;
  };

  return (
    <Style.Wrap
      ref={dropdownRef}
      isError={isError}
      isInline={isInline}
      marginLeft={marginLeft}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      aria-haspopup='listbox'
      aria-expanded={isDropdownOpen}
      aria-label={handleAriaLabel(ariaLabel)}
    >
      <Style.Button
        isError={isError}
        type='button'
        onKeyDown={handleKeyDown}
        onClick={handleButtonClick}
        isOpen={isDropdownOpen}
        width={width}
        disabled={disabled}
      >
        <Style.ButtonText style={{ color: placeholderColor(buttonText) }}>{buttonText}</Style.ButtonText>
      </Style.Button>
      {isDropdownOpen && (
        <Style.Container width={width} role='listbox' ref={optionRef} top={top}>
          <Scroll maxHeight='180px'>
            {dropdownList.map((value, index) => (
              <Style.List
                role='option'
                key={index}
                width={width}
                clicked={clickedState[index]}
                onKeyDown={handleListKeyDown}
                onClick={() => handleListClick({ value, index })}
                aria-selected={clickedState[index]}
                tabIndex={0}
                ref={el => (listRefs.current[index] = el)}
              >
                {value}
              </Style.List>
            ))}
          </Scroll>
        </Style.Container>
      )}
    </Style.Wrap>
  );
};
