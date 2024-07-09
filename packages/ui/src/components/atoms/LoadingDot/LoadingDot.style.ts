import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { css, keyframes } from '@emotion/react';

const dotSpinner1 = () => keyframes`
  0%{
    bottom: 5px;
  }
  25%{
    bottom: 0px;
  }
  50%{
    bottom: -5px;
  }
  75%{
    bottom: 0;
  }
  100%{
    bottom: 5px;
  }
`;
const dotSpinner2 = () => keyframes`
  0%{
    bottom: 0;
  }
  25%{
    bottom: 5px;
  }
  50%{
    bottom: 0;
  }
  75%{
    bottom: -5px;
  }
  100%{
    bottom: 0;
  }
`;
const dotSpinner3 = () => keyframes`
  0%{
    bottom: -5px;
  }
  25%{
    bottom: 0;
  }
  50%{
    bottom: 5px;
  }
  75%{
    bottom: 0;
  }
  100%{
    bottom: -5px;
  }
`;

export const SpinnerWrapper = styled(motion.div)<{}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

export const DotSpinner = styled(motion.div)<{
  order: number;
  dotColor: string;
}>`
  position: relative;
  width: 22px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: ${({ order }) => (order === 1 ? `-15px` : order === 2 ? `0` : `15px`)};
  background-color: ${({ dotColor }) => dotColor};
  border-radius: 50%;
  animation: ${({ order }) =>
    order === 1
      ? css`
          ${dotSpinner1()} 1000ms linear infinite both
        `
      : order === 2
      ? css`
          ${dotSpinner2()} 1000ms linear infinite forwards
        `
      : css`
          ${dotSpinner3()} 1000ms linear infinite forwards
        `};
`;
