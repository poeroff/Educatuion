import ME11302, { IME11302 } from '@maidt-cntn/pages/ME-113-02';

const P04 = () => {
  const data: IME11302[] = [
    {
      en: 'I am not nervous',
      ko: '나는 긴장되지 않는다.',
      verbs: ['am not'],
    },
    {
      en: 'She is not my teacher. = She isn’t a teacher.',
      ko: '그녀는 나의 선생님이 아니다.',
      verbs: ['is not', 'isn’t'],
    },
    {
      en: 'They are not sweet. = They aren’t sweet.',
      ko: '그것들은 달콤하지 않다.',
      verbs: ['are not', 'aren’t'],
    },
  ];

  return <ME11302 data={data} />;
};

export default P04;
