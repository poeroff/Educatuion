import { Radio, Button, Label } from '@maidt-cntn/ui';
import styled from 'styled-components';

export const RadioBox = styled(Radio)<{ isLine?: boolean; isCorrect?: boolean | null }>`
  & {
    display: none;
  }
  & + div {
    border: 2px solid transparent;
  }
  & + * {
    box-sizing: border-box;
  }

  ${props => {
    if (props.isLine) {
      return `
      & + div {
        padding: 12px;
      }
      &:checked + * {
        background: #f4f8ff !important;
        border: 2px solid #75c2ff !important;
        color: #000 !important;
    
        & > * {
          filter: none !important;
          -webkit-filter: none !important;
          filter: none !important;
        }
      }
      `;
    }
  }}

  ${props => {
    if (props.isCorrect !== null) {
      return (
        !props.isCorrect &&
        `
        &:checked + * {
          background: #fff4f3 !important;
          border: 2px solid #eb1807 !important;
          color: #000 !important;

          & > * {
            filter: none !important;
            -webkit-filter: none !important;
            filter: none !important;
          }

          & > span {
            border: 1px solid #eb1807 !important;
          }
        }
      `
      );
    }
  }}
`;

export const RadioBrdN = styled(Radio)<{ isCorrect?: boolean | null }>`
  & + div {
    border: 1px solid transparent;
    padding: 5px 12px;
  }
  ${props => {
    if (props.isCorrect !== null) {
      return (
        !props.isCorrect &&
        `
        &:checked + * {
          background: #fff4f3 !important;
          border: 1px solid #eb1807 !important;
          color: #000;

          & > * {
            filter: none !important;
            -webkit-filter: none !important;
            filter: none !important;
          }

          & > span {
            color: #eb1807 !important;
            &:first-child {
              border: 1px solid #eb1807 !important;
            }
            
          }
        }
      `
      );
    }
  }}
`;

export const ListBox = styled.div<{ align?: string; gap?: number }>`
  > span {
    margin: 0 0 10px 0;
    + div {
      display: inline-block;
      & button {
        position: relative;
        top: -5px;
        margin: 0 0 0 10px;
      }
    }
  }
  li {
    margin-top: ${({ gap }) => (gap ? String(gap) + 'px' : '0')};
    &:first-child {
      margin: 10px 0 0 0;
    }
    > span:first-child {
      margin: 0 10px 0 0;
    }
  }
  text-align: ${({ align }) => (align ? align : 'left')};
`;

export const ButtonTypes = styled(Button)<{ backgroundSrc?: string; type?: string; gap?: number }>`
  background: #0091ff !important;
  width: 190px !important;
  height: 48px !important;
  border-radius: 44px !important;
  font-size: 32px !important;
  font-family: 'SUIT';
  font-weight: 600;
  ${props => {
    if (props.type === 'materials') {
      return `
        padding-left: 43px !important;
        background: url(${props.backgroundSrc}) no-repeat #9747ff 23px 12px !important;
        background-size: inherit !important;
      `;
    }
  }}
  margin-left: ${({ gap }) => (gap ? String(gap) + 'px' : '0')};
`;

export const LabelTypes = styled(Label)<{ fontSize?: number; info?: string }>`
  ${props => {
    if (props.info === 'title') {
      return `
      height: 48px !important;
      padding: 0 17px;
      min-width: 190px !important;
    `;
    }
    if (props.info === 'circle') {
      return `
      min-width:inherit !important;
      min-height:inherit !important;
      width:36px !important;
      height:36px !important;
      font-family:S-Core Dream;
      font-weight:600;
    `;
    }
    if (props.info === 'circle02') {
      return `
      position:relative;
      top:-5px;
      min-width:inherit !important;
      min-height:inherit !important;
      width:12px !important;
      height:12px !important;
    `;
    }
  }}
  ${({ fontSize }) => fontSize && 'font-size:' + String(fontSize) + 'px !important'};
`;

export const RadioTextBox = styled(Radio)<{ isCorrect?: boolean | null }>`
  & + div {
    border: 2px solid transparent;
    padding: 6px;
    font-size: 32px;
    font-weight: 500;
  }
  & + * {
    box-sizing: border-box;
  }

  &:checked + * {
    background: #1e78ff !important;
    color: #ffffff;

    & span {
      border: 1px solid #ffffff !important;
    }

    & > * {
      filter: none !important;
      -webkit-filter: none !important;
      filter: none !important;
    }
  }

  ${props => {
    if (props.isCorrect !== null) {
      return (
        !props.isCorrect &&
        `
        &:checked + * {
          background: #fff4f3 !important;
          border: 2px solid #EB1807 !important;
          color: #C11D00 !important;

          & span {
            border: 1px solid #EB1807 !important;
          }
        }
      `
      );
    }
  }}
`;

export const SolutionBox = styled.div`
  width: 952px;
  height: 442px;
  background: rgba(239, 240, 242, 0.3);
  border: 1px solid #e0e2e6;
  border-radius: 12px;
  padding: 28px;

  div {
    margin-bottom: 22px;
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
      border-radius: 30px;
      background: #e5f4ea;
      border: 2px solid #1eaa58;
      color: #007637;
      text-align: center;
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
      width: 79px;
      font-weight: bold;
      font-size: 22px;
    }
    p {
      color: var(--color-grey-900);
      font-size: 28px;
      font-weight: bold;
      padding-left: 10px;
    }
  }
`;
