import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Label, { ILabelProps } from './Label';
import Typography from '../Typography/Typography';
import BoxWrap, { Box } from '../Box/Box';

import headset from '@maidt-cntn/assets/icons/headset.svg';
import icAimActive from '@maidt-cntn/assets/icons/icAimActive.svg';
import icAimStudy from '@maidt-cntn/assets/icons/icAimStudy.svg';
import icBasic from '@maidt-cntn/assets/icons/icBasic.svg';
import icDevelop from '@maidt-cntn/assets/icons/icDevelop.svg';

import icExample from '@maidt-cntn/assets/icons/icExample.svg';
import icPredicate from '@maidt-cntn/assets/icons/icPredicate.svg';
import icReference from '@maidt-cntn/assets/icons/icReference.svg';
import icStandard from '@maidt-cntn/assets/icons/icStandard.svg';
import icThinkOpen from '@maidt-cntn/assets/icons/icThinkOpen.svg';
import SvgIcon, { ESvgType } from '../SvgIcon/SvgIcon';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template: StoryFn<typeof Label> = ({ ...args }: ILabelProps) => {
  return (
    <>
      {/* <SvgIcon src='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' /> */}
      <Label value={headset} />
      <br />

      <BoxWrap marginTop='20px'>
        <Label type='arrow' value={'TEXT'} title='오른쪽 화살표' direction='up' background='blue' />
        <br />
        <Label type='arrow' value={'TEXT'} title='오른쪽 화살표' direction='down' background='blue' />
        <br />
        <Label type='arrow' value={'TEXT'} title='오른쪽 화살표' direction='left' background='blue' />
        <br />
        <Label type='arrow' value={'TEXT'} title='아래 화살표' direction='right' background='blue' />
      </BoxWrap>

      <BoxWrap marginTop='20px' alignItems='flex-start' boxGap={10}>
        <Box>
          <SvgIcon src={icAimActive} type={ESvgType.IMG} alt='활동목표' />
        </Box>
        <Box>
          TEXT
          <br />
          TEXT
        </Box>
      </BoxWrap>

      <BoxWrap marginTop='20px'>
        <SvgIcon src={icAimStudy} type={ESvgType.IMG} alt='학습목료' />
        <Typography>TEXT</Typography>
      </BoxWrap>

      <BoxWrap marginTop='20px'>
        <SvgIcon src={icBasic} type={ESvgType.IMG} alt='기본' />
        <Typography>TEXT</Typography>
      </BoxWrap>

      <BoxWrap marginTop='20px'>
        <SvgIcon src={icDevelop} type={ESvgType.IMG} alt='발전' />
        <Typography>TEXT</Typography>
      </BoxWrap>

      <BoxWrap marginTop='20px'>
        <SvgIcon src={icStandard} type={ESvgType.IMG} alt='표준' />
        <Typography>TEXT</Typography>
      </BoxWrap>

      <BoxWrap marginTop='20px'>
        <SvgIcon src={icExample} type={ESvgType.IMG} alt='보기' />
        <Typography>TEXT</Typography>
      </BoxWrap>

      <BoxWrap marginTop='20px'>
        <SvgIcon src={icPredicate} type={ESvgType.IMG} alt='서숦형' />
        <Typography>TEXT</Typography>
      </BoxWrap>

      <BoxWrap marginTop='20px'>
        <SvgIcon src={icReference} type={ESvgType.IMG} alt='참고' />
        <Typography>TEXT</Typography>
      </BoxWrap>

      <BoxWrap marginTop='20px'>
        <SvgIcon src={icThinkOpen} type={ESvgType.IMG} alt='생각열기' />
        <Typography>TEXT</Typography>
      </BoxWrap>
    </>
  );
};

export const iconLabel: StoryFn<typeof Label> = Template.bind({});
iconLabel.args = {
  value: headset,
};

export const Default: Story = {
  args: {
    value: '1',
  },
};

export const textLabel: Story = {
  args: {
    value: '식',
  },
};

export const textLabel2: Story = {
  args: {
    value: 'ㄱ',
  },
};

export const numberLabel: Story = {
  args: {
    value: 1,
  },
};

export const paintBlueLabel: Story = {
  args: {
    value: 'A',
    type: 'paint',
    background: 'var(--color-blue-100)',
  },
};

export const paintRedLabel: Story = {
  args: {
    value: 'B',
    type: 'paint',
    background: 'var(--color-yellow-100)',
  },
};

export const paintShadowLabel: Story = {
  args: {
    value: 'ABCDEFGH',
    type: 'paint',
    color: 'var(--color-white)',
    background: 'var(--color-blue-500)',
    useShadow: true,
  },
};
