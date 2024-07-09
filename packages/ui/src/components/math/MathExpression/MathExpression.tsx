import styled from '@emotion/styled';
import { MathJax, MathJaxContext, MathJaxContextProps } from 'better-react-mathjax';

const mathJaxConfig: MathJaxContextProps['config'] = {
  loader: {
    load: ['input/tex', 'output/chtml'],
  },
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
  },
};

interface IMathExpression {
  equation: string;
}

export const MathExpression = ({ equation }: IMathExpression) => (
  <StyleWrapper>
    <MathJaxContext config={mathJaxConfig} hideUntilTypeset='first'>
      <MathJax inline>{equation}</MathJax>
    </MathJaxContext>
  </StyleWrapper>
);

const StyleWrapper = styled.span`
  display: inline-flex;
  align-items: center;

  mjx-container {
    font-family: var(--font-family-math-ex) !important;
    font-size: 1em !important;

    * {
      font-family: var(--font-family-math-ex) !important;
      font-style: normal !important;
    }

    mjx-sqrt {
      mjx-c::before {
        padding-right: 0.5em !important;
        padding-top: 0.9em !important;
      }

      mjx-box {
        padding-top: 0em !important;
      }
    }
  }
`;

export default MathExpression;
