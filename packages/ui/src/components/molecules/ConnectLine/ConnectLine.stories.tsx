import styled from '@emotion/styled';
import type { Meta, StoryFn } from '@storybook/react';
import ConnectLine from './ConnectLine';

const meta = {
  title: 'Molecules/ConnectLine',
  component: ConnectLine,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConnectLine>;

export default meta;

const Template: StoryFn<{ direction: 'vertical' | 'horizontal' }> = ({ direction }) => {
  return (
    <ConnectLineContainer
      onConnect={props => {
        console.log('onConnect!', props);
      }}
      onDisConnect={props => {
        console.log('onDisConnect', props);
      }}
      direction={direction}
      connectLines={[{ from: { sideId: 'aSide', itemId: 'item1' }, to: { sideId: 'bSide', itemId: 'item6' } }]}
    >
      <ConnectLineSide direction={direction} sideId='aSide'>
        <ConnectLineItem width='100px' height='80px' isError value={'1+2'} itemId='item1' />
        <ConnectLineItem width='100px' height='80px' value={'3+4'} itemId='item2' />
      </ConnectLineSide>
      <ConnectLineSide direction={direction} sideId='bSide'>
        <ConnectLineItem width='100px' height='80px' itemId='item6' value='3' />
        <ConnectLineItem width='100px' height='80px' isError itemId='item7' value='7' />
      </ConnectLineSide>
    </ConnectLineContainer>
  );
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  direction: 'horizontal',
};

export const Vertical = Template.bind({});
Vertical.args = {
  direction: 'vertical',
};

const ConnectLineSide = styled(ConnectLine.Side)<{ direction: 'vertical' | 'horizontal' }>`
  height: 100%;
  display: flex;
  flex-direction: ${({ direction }) => (direction === 'horizontal' ? 'row' : 'column')};
  justify-content: space-between;
`;

const LabelBox = styled.span<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? 'rgba(30, 120, 255, 1)' : 'black')};
`;

const ConnectLineContainer = styled(ConnectLine)<{ direction: 'vertical' | 'horizontal' }>`
  display: flex;
  width: 700px;
  height: 400px;
  justify-content: space-between;
  flex-direction: ${({ direction }) => (direction === 'horizontal' ? 'column' : 'row')};
`;

const ConnectLineItem = styled(ConnectLine.Item)``;
