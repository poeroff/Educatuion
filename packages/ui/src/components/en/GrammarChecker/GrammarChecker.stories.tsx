import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import GrammarChecker from './GrammarChecker';
import { useRef } from 'react';

const meta = {
  title: 'English/GrammarChecker',
  component: GrammarChecker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GrammarChecker>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: StoryFn<typeof GrammarChecker> = () => {
  const startRef1 = useRef<HTMLSpanElement>(null);
  const endRef1 = useRef<HTMLSpanElement>(null);

  return (
    <GrammarChecker startRef={startRef1} endRef={endRef1}>
      <span ref={startRef1}>The athlete</span>{' '}
      <span ref={endRef1}>
        who <span>(=that)</span>
      </span>{' '}
      broke the world record has inspired other players.
    </GrammarChecker>
  );
};

export const Default: StoryFn<typeof GrammarChecker> = Template.bind({});
Default.args = {};
