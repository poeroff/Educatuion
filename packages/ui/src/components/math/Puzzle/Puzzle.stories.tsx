import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Puzzle, { IPuzzle } from './Puzzle';

const meta = {
  title: 'Math/Puzzle',
  component: Puzzle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Puzzle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rowNum: 3,
    colNum: 3,
    ariaLabel: 'Puzzle Default AriaLabel',
    imgUrls: [
      'https://i.postimg.cc/yNH8d0hk/8-548.png',
      'https://i.postimg.cc/3JkRb8JJ/10-870.png',
      'https://i.postimg.cc/bYCrTDPB/9-338.png',
      'https://i.postimg.cc/Hx3xFjyj/6-537.png',
      'https://i.postimg.cc/T3WKhRZH/2-1008.png',
      'https://i.postimg.cc/ncrjbKTx/4-154.png',
      'https://i.postimg.cc/kMf6pYQw/5-391.png',
      'https://i.postimg.cc/XYTygZfb/7-394.png',
      'https://i.postimg.cc/qMvnBHJ9/3-1043.png',
    ],
    imgAlts: [
      '이미지 1번 설명의 이미지',
      '이미지 2번 설명의 이미지',
      '이미지 3번 설명의 이미지',
      '이미지 4번 설명의 이미지',
      '이미지 5번 설명의 이미지',
      '이미지 6번 설명의 이미지',
      '이미지 7번 설명의 이미지',
      '이미지 8번 설명의 이미지',
      '이미지 9번 설명의 이미지',
    ],
    eqNums: [
      ['435', '+435'],
      ['742', '+266'],
      ['379', '+664'],
      ['593', '-439'],
      ['287', '+104'],
      ['741', '-214'],
      ['701', '-307'],
      ['901', '-353'],
      ['551', '-213'],
    ],
    tgtNums: [7, 0, 8, 5, 1, 3, 4, 6, 2],
    onFinish: () => {
      console.log('Default Puzzle finished!');
    },
  },
};

const Template: StoryFn<typeof Puzzle> = ({ rowNum, ariaLabel, ...args }: IPuzzle) => {
  return <Puzzle rowNum={rowNum} ariaLabel={ariaLabel} {...args} />;
};

export const TwoByTwo: StoryFn<typeof Puzzle> = Template.bind({});
TwoByTwo.args = {
  rowNum: 2,
  colNum: 2,
  ariaLabel: 'Puzzle TwoByTwo AriaLabel',
  imgUrls: [
    'https://i.postimg.cc/90bcrkpM/row-1-column-2-1.png',
    'https://i.postimg.cc/Xv53wq8t/row-1-column-3-1.png',
    'https://i.postimg.cc/SNKhgDd6/row-1-column-2-2.png',
    'https://i.postimg.cc/wjydpMS3/row-1-column-3-2.png',
  ],
  imgAlts: ['이미지 1번 설명의 이미지', '이미지 2번 설명의 이미지', '이미지 3번 설명의 이미지', '이미지 4번 설명의 이미지'],
  eqNums: [
    ['1번', '자리'],
    ['2번', '자리'],
    ['3번', '자리'],
    ['4번', '자리'],
  ],
  tgtNums: [0, 1, 2, 3],
  onFinish: () => {
    console.log('TwoByTwo Puzzle finished!');
  },
};

export const FourByFour: StoryFn<typeof Puzzle> = Template.bind({});
FourByFour.args = {
  rowNum: 4,
  colNum: 4,
  ariaLabel: 'Puzzle FourByFour AriaLabel',
  imgUrls: [
    'https://i.postimg.cc/6qg4yDqK/row-1-column-1.png',
    'https://i.postimg.cc/SR2JFDrv/row-1-column-2.png',
    'https://i.postimg.cc/NjwLS8rd/row-1-column-3.png',
    'https://i.postimg.cc/Sx7jhX6k/row-1-column-4.png',
    'https://i.postimg.cc/mkBbZ47J/row-1-column-1-1.png',
    'https://i.postimg.cc/90bcrkpM/row-1-column-2-1.png',
    'https://i.postimg.cc/Xv53wq8t/row-1-column-3-1.png',
    'https://i.postimg.cc/PxzjR704/row-1-column-4-1.png',
    'https://i.postimg.cc/6qWXJ0XN/row-1-column-1-2.png',
    'https://i.postimg.cc/SNKhgDd6/row-1-column-2-2.png',
    'https://i.postimg.cc/wjydpMS3/row-1-column-3-2.png',
    'https://i.postimg.cc/XYR673bL/row-1-column-4-2.png',
    'https://i.postimg.cc/tgFQsfRj/row-1-column-1-3.png',
    'https://i.postimg.cc/qBNfnzvw/row-1-column-2-3.png',
    'https://i.postimg.cc/K864XdsS/row-1-column-3-3.png',
    'https://i.postimg.cc/N0xy1db3/row-1-column-4-3.png',
  ],
  imgAlts: [
    '이미지 1번 설명의 이미지',
    '이미지 2번 설명의 이미지',
    '이미지 3번 설명의 이미지',
    '이미지 4번 설명의 이미지',
    '이미지 5번 설명의 이미지',
    '이미지 6번 설명의 이미지',
    '이미지 7번 설명의 이미지',
    '이미지 8번 설명의 이미지',
    '이미지 9번 설명의 이미지',
    '이미지 10번 설명의 이미지',
    '이미지 11번 설명의 이미지',
    '이미지 12번 설명의 이미지',
    '이미지 13번 설명의 이미지',
    '이미지 14번 설명의 이미지',
    '이미지 15번 설명의 이미지',
    '이미지 16번 설명의 이미지',
  ],
  eqNums: [
    ['1번', '자리'],
    ['2번', '자리'],
    ['3번', '자리'],
    ['4번', '자리'],
    ['5번', '자리'],
    ['6번', '자리'],
    ['7번', '자리'],
    ['8번', '자리'],
    ['9번', '자리'],
    ['10번', '자리'],
    ['11번', '자리'],
    ['12번', '자리'],
    ['13번', '자리'],
    ['14번', '자리'],
    ['15번', '자리'],
    ['16번', '자리'],
  ],
  tgtNums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  onFinish: () => {
    console.log('FourByFour Puzzle finished!');
  },
};

export const FourByThree: StoryFn<typeof Puzzle> = Template.bind({});
FourByThree.args = {
  rowNum: 4,
  colNum: 3,
  ariaLabel: 'Puzzle FourByThree AriaLabel',
  imgUrls: [
    'https://i.postimg.cc/6qg4yDqK/row-1-column-1.png',
    'https://i.postimg.cc/SR2JFDrv/row-1-column-2.png',
    'https://i.postimg.cc/NjwLS8rd/row-1-column-3.png',
    'https://i.postimg.cc/Sx7jhX6k/row-1-column-4.png',
    'https://i.postimg.cc/mkBbZ47J/row-1-column-1-1.png',
    'https://i.postimg.cc/90bcrkpM/row-1-column-2-1.png',
    'https://i.postimg.cc/Xv53wq8t/row-1-column-3-1.png',
    'https://i.postimg.cc/PxzjR704/row-1-column-4-1.png',
    'https://i.postimg.cc/6qWXJ0XN/row-1-column-1-2.png',
    'https://i.postimg.cc/SNKhgDd6/row-1-column-2-2.png',
    'https://i.postimg.cc/wjydpMS3/row-1-column-3-2.png',
    'https://i.postimg.cc/XYR673bL/row-1-column-4-2.png',
  ],
  imgAlts: [
    '이미지 1번 설명의 이미지',
    '이미지 2번 설명의 이미지',
    '이미지 3번 설명의 이미지',
    '이미지 4번 설명의 이미지',
    '이미지 5번 설명의 이미지',
    '이미지 6번 설명의 이미지',
    '이미지 7번 설명의 이미지',
    '이미지 8번 설명의 이미지',
    '이미지 9번 설명의 이미지',
    '이미지 10번 설명의 이미지',
    '이미지 11번 설명의 이미지',
    '이미지 12번 설명의 이미지',
  ],
  eqNums: [
    ['1번', '자리'],
    ['2번', '자리'],
    ['3번', '자리'],
    ['4번', '자리'],
    ['5번', '자리'],
    ['6번', '자리'],
    ['7번', '자리'],
    ['8번', '자리'],
    ['9번', '자리'],
    ['10번', '자리'],
    ['11번', '자리'],
    ['12번', '자리'],
  ],
  tgtNums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  onFinish: () => {
    console.log('FourByThree Puzzle finished!');
  },
};

export const ThreeByFour: StoryFn<typeof Puzzle> = Template.bind({});
ThreeByFour.args = {
  rowNum: 3,
  colNum: 4,
  ariaLabel: 'Puzzle ThreeByFour AriaLabel',
  imgUrls: [
    'https://i.postimg.cc/6qg4yDqK/row-1-column-1.png',
    'https://i.postimg.cc/SR2JFDrv/row-1-column-2.png',
    'https://i.postimg.cc/NjwLS8rd/row-1-column-3.png',
    'https://i.postimg.cc/Sx7jhX6k/row-1-column-4.png',
    'https://i.postimg.cc/mkBbZ47J/row-1-column-1-1.png',
    'https://i.postimg.cc/90bcrkpM/row-1-column-2-1.png',
    'https://i.postimg.cc/Xv53wq8t/row-1-column-3-1.png',
    'https://i.postimg.cc/PxzjR704/row-1-column-4-1.png',
    'https://i.postimg.cc/6qWXJ0XN/row-1-column-1-2.png',
    'https://i.postimg.cc/SNKhgDd6/row-1-column-2-2.png',
    'https://i.postimg.cc/wjydpMS3/row-1-column-3-2.png',
    'https://i.postimg.cc/XYR673bL/row-1-column-4-2.png',
  ],
  imgAlts: [
    '이미지 1번 설명의 이미지',
    '이미지 2번 설명의 이미지',
    '이미지 3번 설명의 이미지',
    '이미지 4번 설명의 이미지',
    '이미지 5번 설명의 이미지',
    '이미지 6번 설명의 이미지',
    '이미지 7번 설명의 이미지',
    '이미지 8번 설명의 이미지',
    '이미지 9번 설명의 이미지',
    '이미지 10번 설명의 이미지',
    '이미지 11번 설명의 이미지',
    '이미지 12번 설명의 이미지',
  ],
  eqNums: [
    ['1번', '자리'],
    ['2번', '자리'],
    ['3번', '자리'],
    ['4번', '자리'],
    ['5번', '자리'],
    ['6번', '자리'],
    ['7번', '자리'],
    ['8번', '자리'],
    ['9번', '자리'],
    ['10번', '자리'],
    ['11번', '자리'],
    ['12번', '자리'],
  ],
  tgtNums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  onFinish: () => {
    console.log('ThreeByFour Puzzle finished!');
  },
};
