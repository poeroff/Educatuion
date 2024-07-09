import styled from '@emotion/styled';
import { OverlayTooltip, Symbol, TSymbolType } from '@maidt-cntn/ui';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface ISymbolTooltipProps {
  toolTipId: string;
  isTooltipOpen?: boolean;
  tooltipPlace?: 'top' | 'bottom';
  onOpenChange?: (isOpen: boolean) => void;
  onClickSymbol?: (type: TSymbolType) => void;
  symbols?: Array<TSymbolType>;
}

export const SymbolTooltip = ({
  toolTipId,
  isTooltipOpen = false,
  tooltipPlace = 'top',
  symbols = [],
  onOpenChange,
  onClickSymbol,
}: ISymbolTooltipProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleOnClick = (symbol: TSymbolType) => {
    onClickSymbol?.(symbol);
    onOpenChange?.(false);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onOpenChange?.(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <OverlayTooltip id={toolTipId} isShow={isTooltipOpen} openOnClick place={tooltipPlace === 'top' ? 'bottom' : 'top'}>
        <SignWrap ref={ref}>
          {symbols.map((symbol, idx) => {
            return (
              <Symbol
                key={idx}
                type={symbol}
                onClick={() => handleOnClick(symbol)}
                cssStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: idx === symbols.length - 1 ? '0' : '14px',
                  cursor: 'pointer',
                }}
              />
            );
          })}
        </SignWrap>
      </OverlayTooltip>
    </>
  );
};

const SignWrap = styled.div`
  display: flex;

  & > button {
    margin-right: 14px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export default SymbolTooltip;
