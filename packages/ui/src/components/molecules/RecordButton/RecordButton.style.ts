import styled from '@emotion/styled';

namespace StyleRecordButton {
  export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  export const Label = styled.span<{ isIcon: boolean }>`
    margin-left: ${props => (props.isIcon ? '8px' : '0px')};
    font-size: 16px;
    font-weight: var(--font-weight-bold);
    color: inherit;
    line-height: 24px;
    white-space: nowrap;
  `;

  const baseButtonStyle = {
    borderRadius: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '44px',
  } as const;

  export const buttonStyleMap = {
    start: {
      ...baseButtonStyle,
      background: 'var(--color-pink-500)',
      color: 'var(--color-white)',
      padding: '10px 20px 10px 16px',
      minWidth: '120px',
    },
    listen: {
      ...baseButtonStyle,
      background: 'var(--color-white)',
      color: '#9747FF',
      border: '1.5px solid #9747FF',
      padding: '10px 20px 10px 16px',
      minWidth: '104px',
    },
    simpleListen: {
      background: 'var(--color-white)',
      color: '#9747FF',
    },
    speak: {
      ...baseButtonStyle,
      background: 'var(--color-white)',
      color: 'var(--color-pink-500)',
      border: '1.5px solid #FE5663',
      padding: '10px 20px 10px 16px',
      minWidth: '104px',
    },
    stop: {
      ...baseButtonStyle,
      background: 'var(--color-pink-500)',
      color: 'var(--color-white)',
      padding: '10px 20px 10px 20px',
      minWidth: '120px',
    },
    wait: {
      ...baseButtonStyle,
      background: 'var(--color-white)',
      color: '#9747FF',
      border: '1.5px solid #9747FF',
      padding: '10px 20px',
      minWidth: '120px',
    },
    simpleWait: {
      background: 'var(--color-white)',
      color: '#1E78FF',
    },
    myAnswer: {
      ...baseButtonStyle,
      background: 'var(--color-white)',
      color: 'var(--color-grey-500)',
      border: '1.5px solid #B0B6C0',
      padding: '10px 20px 10px 20px',
      minWidth: '118px',
    },
    reset: {
      ...baseButtonStyle,
      background: 'var(--color-white)',
      color: 'var(--color-blue-500)',
      border: '1.5px solid var(--color-blue-500)',
      padding: '10px 20px 10px 16px',
      minWidth: '104px',
    },
  };

  const baseIconStyle = {
    width: '20px',
    height: '20px',
  } as const;

  export const iconStyleMap = {
    start: {
      ...baseIconStyle,
    },
    listen: {
      ...baseIconStyle,
    },
    simpleListen: {
      ...baseIconStyle,
      width: '44px',
      height: '44px',
    },
    speak: {
      ...baseIconStyle,
    },
    stop: {
      ...baseIconStyle,
    },
    wait: {
      ...baseIconStyle,
    },
    simpleWait: {
      ...baseIconStyle,
      width: '44px',
      height: '44px',
    },
    myAnswer: {
      ...baseIconStyle,
    },
    reset: {
      ...baseIconStyle,
    },
  };
}

export default StyleRecordButton;
