import ME11302, { IME11302 } from '@maidt-cntn/pages/ME-113-02';

const P08 = () => {
  const data: IME11302[] = [
    {
      en: 'He likes cookies.',
      ko: '그는 쿠키를 좋아한다.',
      verbs: ['likes'],
    },
    {
      en: 'He has some candies.',
      ko: '그는 몇 개의 사탕을 가지고 있다.',
      verbs: ['has'],
    },
    {
      en: 'She loves math.',
      ko: '그녀는 수학을 좋아한다.',
      verbs: ['loves'],
    },
    {
      en: 'I drink milk. Dad drinks orange juice.',
      ko: '나는 우유를 마신다. 아빠는 오렌지 주스를 마신다.',
      verbs: ['drink', 'drinks'],
    },
  ];

  return <ME11302 data={data} />;
};

export default P08;
