import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The World of Picasso (2)',
  };
  const questionInfo = {
    text: '해석을 확인해 봅시다.',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'When Picasso was 20 years old, he moved to Paris.',
      translation: '피카소가 20살이었을 때, 그는 파리로 이사했습니다.',
      inLine: true,
    },
    {
      originText: 'Then one of his friends died.',
      translation: '그때 그의 친구 중 한 명이 사망했습니다.',
    },
    {
      originText: 'He was very sad.',
      translation: '그는 매우 슬펐습니다.',
    },
    {
      originText: 'He started painting in blue.',
      translation: '그는 파란색으로 그림을 그리기 시작했습니다.',
    },
    {
      originText: 'He painted sad, lonely, and poor people, like the old guitar player on the street.',
      translation: '그는 거리의 나이 든 기타 연주자처럼 슬프고, 외롭고, 가난한 사람들을 그렸습니다.',
    },
    {
      originText: 'This time is his Blue Period (1901-1904).',
      translation: '이 시기는 그의 ‘청색 시대(1901-1904)’입니다.',
    },
    {
      originText: 'Later, Picasso found happiness.',
      translation: '후에, 피카소는 행복을 찾았습니다.',
      inLine: true,
    },
    {
      originText: 'He started using the colors pink and orange more.',
      translation: '그는 분홍색과 주황색을 더 사용하기 시작했습니다.',
    },
    {
      originText: 'This time is his Rose Period (1904-1906).',
      translation: '이 시기는 그의 ‘장밋빛 시대(1904-1906)’입니다.',
    },
    {
      originText: 'A few years later, he also got interested in African art.',
      translation: '몇 년 후에, 그는 또한 아프리카의 예술에 관심이 생겼습니다.',
    },
  ];
  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};
export default P02;
