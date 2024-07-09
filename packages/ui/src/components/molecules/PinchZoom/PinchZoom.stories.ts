import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PinchZoom from './PinchZoom';

import sample_image from '../../../assets/images/ME1-L1-C02-P01.png';

const meta: Meta<typeof PinchZoom> = {
  title: 'Molecules/PinchZoom',
  component: PinchZoom,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pinchType: 'image',
    children: React.createElement('img', {
      src: sample_image,
      width: '450px',
      height: '280px',
      alt: '교실에 농구공을 가지고 있는 남학생, 과자를 먹으며 즐겁게 이야기를 나누고 있는 여학생 3명, 헤드폰을 끼고 음악을 듣고 있는 여학생, 안경을 끼고 책을 읽고 있는 여학생이 앉아 있는 그림',
      title:
        '교실에 농구공을 가지고 있는 남학생, 과자를 먹으며 즐겁게 이야기를 나누고 있는 여학생 3명, 헤드폰을 끼고 음악을 듣고 있는 여학생, 안경을 끼고 책을 읽고 있는 여학생이 앉아 있는 그림',
    }),
  },
};

export const Default_video: Story = {
  args: {
    pinchType: 'video',
    children: React.createElement('img', {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8S5iOlKesFPgXhprE8-Y9peKq-r_Xdq9pHHpDMtUrnA&s',
      width: '450px',
      height: '280px',
      alt: '비디오 썸네일',
    }),
  },
};
