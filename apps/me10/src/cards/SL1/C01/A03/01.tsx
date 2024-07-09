import HE01603, { IHE01603Info } from '@maidt-cntn/pages/HE-016-03';
import { IAudioPlayerProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The World of Picasso (전체 읽기)',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/SL1/C01/A03/ME1-SL1-C01-A03-P01.mp3',
    captionSrc: '/SL1/C01/A03/ME1-SL1-C01-A03-P01.srt',
  };

  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      altText: ['피카소가 사실적으로 그린 그림을 둔 노란 방 안에 이젤 앞에 앉아 있다.'],
      text: [],
      styledText: [
        {
          text: `\u00A0\u00A0\u00A0\u00A0Pablo Picasso was born in Spain in 1881. His father was an artist,`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `too. But young Picasso could paint better than his father. Picasso `,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `painted his mother when he was 14 years old. The painting was so `,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `good, and it looked real. This time is his `,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `Realistic Period`,
          color: 'var(--color-green-600)',
          usePre: false,
          useGap: true,
          weight: 'var(--font-weight-bold)',
        },
        {
          text: `.`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
      ],
      imageSrc: ['/SL1/C01/A03/ME1-SL1-C01-A03-1.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P2',
      altText: ['어두워 보이는 파란 방 안에 우울해 보이는 피카소가 푸른 계열의 그림을 그리고 있다.'],
      text: [],
      styledText: [
        {
          text: `\n\u00A0\u00A0\u00A0\u00A0When Picasso was 20 years old, he moved to Paris. Then one of`,
          color: 'var(--color-black)',
          usePre: true,
          useGap: false,
        },
        {
          text: `his friends died. He was very sad. He started painting in blue. He  `,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `painted sad, lonely, and poor people, like the old guitar player on the`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `street. This time is his`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `Blue Period`,
          color: 'var(--color-blue-600)',
          usePre: false,
          useGap: true,
          weight: 'var(--font-weight-bold)',
        },
        {
          text: `(1901-1904).`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
      ],
      imageSrc: ['/SL1/C01/A03/ME1-SL1-C01-A03-2.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P3',
      altText: ['분홍색 방 안에 행복해 보이는 피카소가 붉은 색 계열의 색이 더 많아진 그림을 그리고 있다.'],
      text: [],
      styledText: [
        {
          text: `\n\u00A0\u00A0\u00A0\u00A0Later, Picasso found happiness. He started using the colors pink`,
          color: 'var(--color-black)',
          usePre: true,
          useGap: false,
        },
        {
          text: `and orange more. This time is his`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `Rose Period`,
          color: 'var(--color-m-en-default)',
          usePre: false,
          useGap: true,
          weight: 'var(--font-weight-bold)',
        },
        {
          text: `(1904-1906). A few `,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `years later, he also got interested in African art.`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
      ],
      imageSrc: ['/SL1/C01/A03/ME1-SL1-C01-A03-3.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P4',
      altText: ['피카소의 입체주의 대표작인 우는 여인을 그리는 피카소'],
      text: [],
      styledText: [
        {
          text: `\n\u00A0\u00A0\u00A0\u00A0Finally, Picasso began a new art style,\u00A0`,
          color: 'var(--color-black)',
          usePre: true,
          useGap: false,
        },
        {
          text: `C`,
          color: 'var(--color-m-en-default)',
          usePre: false,
          useGap: false,
          weight: 'var(--font-weight-bold)',
        },
        {
          text: `u`,
          color: 'var(--color-blue-600)',
          usePre: false,
          useGap: false,
          weight: 'var(--font-weight-bold)',
        },
        {
          text: `b`,
          color: 'var(--color-pink-700)',
          usePre: false,
          useGap: false,
          weight: 'var(--font-weight-bold)',
        },
        {
          text: `i`,
          color: 'var(--color-green-600)',
          usePre: false,
          useGap: false,
          weight: 'var(--font-weight-bold)',
        },
        {
          text: `s`,
          color: 'var(--color-red-800)',
          usePre: false,
          useGap: false,
          weight: 'var(--font-weight-bold)',
        },
        {
          text: `m`,
          color: 'var(--color-purple-600)',
          usePre: false,
          useGap: false,
          weight: 'var(--font-weight-bold)',
        },
        {
          text: `. He liked painting`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `faces from the front and from the side. So he started painting a face`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `from the front and the side`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `AT THE SAME TIME!`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: true,
          weight: 'var(--font-weight-bold)',
        },
        {
          text: `He became very`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `famous.`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
      ],
      imageSrc: ['/SL1/C01/A03/ME1-SL1-C01-A03-4.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P5',
      altText: ['자신이 좋아하는 스타일의 줄무늬 바지를 입고 그림을 그리는 노인 피카소'],
      text: [],
      styledText: [
        {
          text: `\n\u00A0\u00A0\u00A0\u00A0Picasso saw things differently. Even his fashion style was different.`,
          color: 'var(--color-black)',
          usePre: true,
          useGap: false,
        },
        {
          text: `He wanted to buy this style of trousers, but he couldn’t find any.`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `Everyone said, “When you wear them, you look short and fat.” So he`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
        {
          text: `had to make a special order.`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
      ],
      imageSrc: ['/SL1/C01/A03/ME1-SL1-C01-A03-5.jpg'],
      imagePosition: 'after',
    },
    {
      id: 'P6',
      text: [],
      styledText: [
        {
          text: `\n\u00A0\u00A0\u00A0\u00A0Picasso died at the age of 91, and until then he never stopped`,
          color: 'var(--color-black)',
          usePre: true,
          useGap: false,
        },
        {
          text: `trying new things. He showed us the world in a special way.`,
          color: 'var(--color-black)',
          usePre: false,
          useGap: false,
        },
      ],
      imagePosition: '',
    },
  ];

  return <HE01603 headerInfo={headerInfo} audioInfo={audioInfo} title={''} info={HE01603Info} />;
};

export default P01;
