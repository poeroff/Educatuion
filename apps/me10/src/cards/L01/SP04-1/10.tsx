import ME11302, { IME11302 } from '@maidt-cntn/pages/ME-113-02';

const P10 = () => {
  const data: IME11302[] = [
    {
      en: 'I do not like basketball. = I don’t like basketball.',
      ko: '나는 농구를 좋아하지 않는다.',
      verbs: ['do not', 'don’t'],
    },
    {
      en: 'He does not play soccer. = He doesn’t play soccer.',
      ko: '그는 축구를 하지 않는다.',
      verbs: ['does not', 'doesn’t'],
    },
    {
      en: 'Dad does not eat tomatoes. = Dad doesn’t eat tomatoes.',
      ko: '아빠는 토마토를 먹지 않는다.',
      verbs: ['does not', 'doesn’t'],
    },
  ];

  return <ME11302 data={data} />;
};

export default P10;
