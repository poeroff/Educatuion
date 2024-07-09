import type { Meta, StoryObj } from '@storybook/react';
import Scroll from './Scroll';

const meta = {
  title: 'Atoms/Scroll',
  component: Scroll,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Scroll>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    height: '200px',
    children: `It is commonly believed that conflict within a team only has negative impacts. For this reasom, when (1) including / included in a team, you
        are often advised to avoid conflic at all costs. While this suggestion seems to make sense, it may not be helpful for your team's grouwth. (2)
        Embracing / Embraced disagreements and differences, team members can generate more ideas and It is commonly believed that conflict within a
        team only has negative impacts. For this reasom, when (1) including / included in a team, you are often advised to avoid conflic at all costs.
        While this suggestion seems to make sense, it may not be helpful for your team's grouwth. (2) Embracing / Embraced disagreements and
        differences, team members can generate more ideas and It is commonly believed that conflict within a team only has negative impacts. For this
        reasom, when (1) including / included in a team, you are often advised to avoid conflic at all costs. While this suggestion seems to make
        sense, it may not be helpful for your team's grouwth. (2) Embracing / Embraced disagreements and differences, team members can generate more
        ideas and It is commonly believed that conflict within a team only has negative impacts. For this reasom, when (1) including / included in a
        team, you are often advised to avoid conflic at all costs. While this suggestion seems to make sense, it may not be helpful for your team's
        grouwth. (2) Embracing / Embraced disagreements and differences, team members can generate more ideas and`,
  },
};
