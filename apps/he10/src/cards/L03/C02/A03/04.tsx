import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import {
  Scroll,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  List,
  ListHeader,
  Typography,
  Label,
  ToggleButton,
  IAudioPlayerProps,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useState } from 'react';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C02/A03/HE1-L03-C02-A03-02.mp3',
  };

  const labelW = {
    label: 'W',
    labelColor: 'var(--color-yellow-100)',
  };

  const labelB = {
    label: 'B',
    labelColor: 'var(--color-blue-100)',
  };

  const data: IListenAndAnswer[] = [
    {
      ...labelW,
      originText: 'Hi, Ms. Smith. Can I ask you a question?',
      translation: '안녕하세요, Smith 씨. 뭐 하나 물어봐도 될까요?',
    },
    {
      ...labelB,
      originText: 'Of course. What’s on your mind?',
      translation: '물론이지. 무슨 생각인데?',
    },
    {
      ...labelW,
      originText: 'Well, this may sound silly, but I wonder why we have two holes in our noses.',
      translation: '바보 같게 들릴지 모르겠지만 왜 우리 코에 구멍이 두 개나 있는지 궁금해요.',
    },
    {
      ...labelB,
      originText: 'Oh, that’s not silly at all.',
      translation: '전혀 바보 같지 않아.',
    },
    {
      originText: 'Those two openings in our noses actually have some important functions.',
      translation: '우리 코에 있는 두 개의 구멍에는 실제로 중요한 기능이 있어.',
      inLine: true,
    },
    {
      originText: 'They help us breathe and improve our sense of smell.',
      translation: '숨을 쉬고 후각을 향상시키는 데 도움이 돼.',
      inLine: true,
    },
    {
      ...labelW,
      originText: 'But why do we need two holes?',
      translation: '그런데 왜 두 개의 구멍이 필요한가요?',
    },
    {
      originText: 'Wouldn’t it be better to have one big hole in the middle of our nose?',
      translation: '코 한가운데에 큰 구멍이 하나만 있으면 더 좋지 않을까요?',
      inLine: true,
    },
    {
      ...labelB,
      originText: 'That’s an interesting thought!',
      translation: '흥미로운 생각이네!',
    },
    {
      originText: 'The two holes do a lot of things like filtering the air and sending smell signals to the brain, so they take turns.',
      translation: '두 개의 구멍은 공기를 걸러내고 냄새 신호를 뇌로 보내는 등 많은 일을 하기 때문에 번갈아 가며 역할을 하지.',
      inLine: true,
    },
    {
      originText: 'While one opening is active, the other one rests.',
      translation: '한 쪽 구멍이 활동하는 동안 다른 쪽 구멍은 쉬는 거야.',
      inLine: true,
    },
    {
      ...labelW,
      originText: 'What do you mean?',
      translation: '무슨 뜻이죠?',
    },
    {
      originText: 'I don’t really notice them taking turns.',
      translation: '교대하는 것 같지는 않아요.',
      inLine: true,
    },
    {
      originText: 'It feels like both of them are active right now.',
      translation: '지금은 둘 다 활동하는 것 같아요.',
      inLine: true,
    },
    {
      ...labelB,
      originText: 'I mean, one of the openings rests, but not fully.',
      translation: '한쪽이 쉬고 있지만 완전히 쉬고 있지는 않다는 뜻이야.',
    },
    {
      originText: 'So, it keeps doing essential functions even while resting.',
      translation: '그래서 쉬는 동안에도 필수적인 기능은 계속 수행하지.',
      inLine: true,
    },
    {
      ...labelW,
      originText: 'Oh, I got it.',
      translation: '아, 알겠어요.',
    },
    {
      originText: 'That makes sense now.',
      translation: '이제 이해가 되네요.',
      inLine: true,
    },
    {
      originText: 'Thank you for the explanation.',
      translation: '설명해 주셔서 감사합니다.',
      inLine: true,
    },
    {
      ...labelB,
      originText: 'You’re welcome.',
      translation: '천만에.',
    },
    {
      originText: 'It’s wonderful to have a curious student like you.',
      translation: '너처럼 호기심 많은 학생을 만나니 정말 좋구나.',
      inLine: true,
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
