import ME11302, { IME11302 } from '@maidt-cntn/pages/ME-113-02';

const P12 = () => {
  const data: IME11302[] = [
    {
      en: 'Do you like music?',
      ko: '너는 음악을 좋아하니?',
      verbs: ['Do', 'like'],
      answers: [
        { en: 'Yes, I do.', ko: '응, 좋아해.' },
        { en: 'No, don’t', ko: '아니, 안 좋아해.' },
      ],
    },
    {
      en: 'Does she have a brother?',
      ko: '그녀는 남동생이 있니?',
      verbs: ['Does', 'have'],
      answers: [
        { en: 'Yes, she does.', ko: '응, 있어.' },
        { en: 'No, she doesn’t.', ko: '아니, 없어.' },
      ],
    },
  ];

  return <ME11302 data={data} />;
};

export default P12;
