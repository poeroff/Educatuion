import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useEffect } from 'react';
import ArrowLine, { IArrowLineProps } from './ArrowLine';
import styled from '@emotion/styled';
import { Typography } from '@maidt-cntn/ui';

const meta: Meta<typeof ArrowLine> = {
  title: 'English/ArrowLine',
  component: ArrowLine,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<IArrowLineProps>;

const Template: React.FC<IArrowLineProps> = args => {
  const startRef2 = useRef<HTMLSpanElement>(null);
  const endRef2 = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Ensure the coordinates update correctly after initial render
    const handleResize = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const event = new Event('resize');
          window.dispatchEvent(event);
        });
      });
    };

    handleResize();
  }, []);

  return (
    <StyledTypography>
      <HighlightedWord ref={startRef2} color='green'>
        Waiting
      </HighlightedWord>{' '}
      for our bus in the morning,{' '}
      <HighlightedWord ref={endRef2} color='blue'>
        we
      </HighlightedWord>{' '}
      saw a fire in the building across the street.
      <ArrowLine startRef={startRef2} endRef={endRef2} color='gray' startArrow={false} endArrow={false} vLineLength={15} thickness={2} offsetY={9} />
    </StyledTypography>
  );
};

const StyledTypography = styled(Typography)`
  display: block;
  max-width: 100%;
`;

const HighlightedWord = styled.span<{ color: string }>`
  font-weight: var(--font-weight-bold);
  color: ${({ color }) => color};
  display: inline-block;
  position: relative;
`;

export const Default: Story = {
  render: args => <Template {...args} />,
  args: {
    color: 'red',
    startArrow: true,
    endArrow: true,
    thickness: 2,
    offsetX: 0,
    offsetY: 0,
    vLineLength: 10,
  },
};

export const ThickLine: Story = {
  render: args => <Template {...args} />,
  args: {
    color: 'blue',
    startArrow: true,
    endArrow: true,
    thickness: 5,
    offsetX: 0,
    offsetY: 0,
    vLineLength: 20,
  },
};

export const NoArrows: Story = {
  render: args => <Template {...args} />,
  args: {
    color: 'green',
    startArrow: false,
    endArrow: false,
    thickness: 3,
    offsetX: 0,
    offsetY: 0,
    vLineLength: 15,
  },
};
