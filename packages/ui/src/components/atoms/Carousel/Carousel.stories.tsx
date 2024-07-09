import type { Meta, StoryFn } from '@storybook/react';
import Carousel, { ICarouselProps } from './Carousel';
import Image, { IImage } from '../Image/Image';
import Box from '../Box/Box';
import Typography from '../Typography/Typography';
import { ETypographyTypes } from '../../../styles/types';

const meta = {
  title: 'Atoms/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;

const mockImage: IImage[] = [
  {
    src: '/images/ME1-L1-C02-P01.png',
    alt: '1번 샘플이미지 입니다.',
  },
  {
    src: '/images/HE1-L01-C07-A02-P01.jpg',
    alt: '2번 샘플이미지 입니다.',
  },
  {
    src: '/images/ME1-L1-C02-P01.png',
    alt: '3번 샘플이미지 입니다.',
  },
];

interface IMockCard {
  title: string;
  content: string;
}
const mock: IMockCard[] = [
  {
    title: '1번 제목입니다.',
    content: '1번 내용입니다.',
  },
  {
    title: '2번 제목입니다.',
    content: '2번 내용입니다.',
  },
  {
    title: '3번 제목입니다.',
    content: '3번 내용 입니다.',
  },
];

const mockMix = [
  {
    type: 'card',
    title: '1번 제목입니다.',
    content: '1번 내용입니다.',
    src: '',
    alt: '',
  },
  {
    type: 'image',
    src: '/images/HE1-L01-C07-A02-P01.jpg',
    alt: '2번 샘플이미지 입니다.',
  },
  {
    type: 'card',
    title: '3번 제목입니다.',
    content: '3번 내용 입니다.',
    src: '',
    alt: '',
  },
];

const TemplateImageSlider: StoryFn<typeof Carousel> = ({ data, ...args }: ICarouselProps<any>) => {
  return (
    <Carousel data={data} {...args}>
      {({ value, index = 0 }) => {
        const item = value as IImage;
        return <Image key={index} src={item.src} alt={item.alt} />;
      }}
    </Carousel>
  );
};

export const ImageChildren: StoryFn<typeof Carousel> = TemplateImageSlider.bind({});
ImageChildren.args = {
  data: mockImage,
};

const TemplateBoxSlider: StoryFn<typeof Carousel> = ({ data, ...args }: ICarouselProps<any>) => {
  return (
    <Carousel data={data} {...args}>
      {({ value, index = 0 }) => {
        const item = value as IMockCard;
        return (
          <div>
            <Typography styleType={ETypographyTypes.TITLE}>{item.title}</Typography>
            <Box key={index}>
              <Typography>{item.content}</Typography>
            </Box>
          </div>
        );
      }}
    </Carousel>
  );
};

export const BoxChildren: StoryFn<typeof Carousel> = TemplateBoxSlider.bind({});
BoxChildren.args = {
  data: mock,
  slideWidth: 400,
  slideHeight: 200,
};

const TemplateMixSlider: StoryFn<typeof Carousel> = ({ data, ...args }: ICarouselProps<any>) => {
  return (
    <Carousel data={data} {...args}>
      {mockMix.map((item, index) => {
        return item.type === 'image' ? (
          <Image key={index} src={item.src} alt={item.alt} />
        ) : (
          <div>
            <Typography styleType={ETypographyTypes.TITLE}>{item.title}</Typography>
            <Box key={index}>
              <Typography>{item.content}</Typography>
            </Box>
          </div>
        );
      })}
    </Carousel>
  );
};

export const MixChildren: StoryFn<typeof Carousel> = TemplateMixSlider.bind({});
MixChildren.args = {
  data: mockMix,
};
