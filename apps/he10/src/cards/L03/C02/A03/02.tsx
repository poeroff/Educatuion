import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import { useState } from 'react';

const P02 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/HE1-L03-C02-A03-01.mp3',
    captionSrc: '/L03/C02/A03/HE1-L03-C02-A03-01.srt',
  };

  const labelG = {
    label: 'G',
    labelColor: 'var(--color-blue-100)',
  };

  const labelB = {
    label: 'B',
    labelColor: 'var(--color-yellow-100)',
  };

  const data: IListenAndAnswer[] = [
    {
      ...labelG,
      originText: 'Hi, Steve.',
      translation: '안녕, Steve.',
    },
    {
      originText: 'Did you do anything interesting yesterday?',
      translation: '어제 재미있는 일 좀 했어?',
      inLine: true,
    },
    {
      ...labelB,
      originText: 'Yes, I went to Cafe Grande with a few friends and saw something pretty cool there.',
      translation: '응, 친구들과 Cafe Grande에 갔는데 거기서 꽤 멋진 것을 봤어.',
    },
    {
      ...labelG,
      originText: 'Really?',
      translation: '정말?',
    },
    {
      originText: 'The last time I went there, I didn’t notice anything special.',
      translation: '지난번에 내가 갔을 때는 특별한 걸 못 느꼈는데.',
      inLine: true,
    },
    {
      ...labelB,
      originText: 'Well, my drink had a big ice ball in it.',
      translation: '글쎄, 내가 마신 음료에 큰 얼음 덩어리가 들어있었거든.',
    },
    {
      originText: 'I wonder why people use such a huge, sphere-shaped piece of ice.',
      translation: '사람들이 왜 그렇게 큰 구 모양의 얼음을 사용하는지 궁금해.',
      inLine: true,
    },
    {
      ...labelG,
      originText: 'That’s a good question.',
      translation: '그거 좋은 질문이다.',
    },
    {
      originText: 'As far as I know, it can keep the drink cool for a longer time because that shape lasts longer than other shapes.',
      translation: '내가 알기로는 그 모양이 다른 모양보다 더 오래 지속되기 때문에 음료를 더 오래 시원하게 유지할 수 있다고 하더라고.',
      inLine: true,
    },
    {
      ...labelB,
      originText: 'Come to think of it, the ice in my drink melted much slower than regular ice cubes.',
      translation: '그러고 보니 내 음료의 얼음이 일반 얼음보다 훨씬 느리게 녹았어.',
    },
    {
      ...labelG,
      originText: 'That’s because a sphere has the least surface area for a given volume.',
      translation: '구는 주어진 부피에 비해 표면적이 가장 적기 때문이야.',
    },
    {
      ...labelB,
      originText: 'You mean because it has less surface area, sphere-shaped ice melts more slowly?',
      translation: '표면적이 적기 때문에 구 모양의 얼음이 더 천천히 녹는다는 뜻이야?',
    },
    {
      ...labelG,
      originText: 'Exactly!',
      translation: '그렇지!',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
