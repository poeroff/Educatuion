import ME11302, { IME11302 } from '@maidt-cntn/pages/ME-113-02';

const P06 = () => {
  const data: IME11302[] = [
    {
      en: 'Are you a student?',
      ko: '너는 학생이니?',
      verbs: ['Are you'],
      answers: [
        { en: 'Yes, I am.', ko: '응, 맞아.' },
        { en: 'No, I’m not', ko: '아니, 아니야.' },
      ],
    },
    {
      en: 'Is she your sister?',
      ko: '그녀는 너의 여동생이니?',
      verbs: ['Is she'],
      answers: [
        { en: 'Yes, she is.', ko: '응, 맞아.' },
        { en: 'No, she isn’t.', ko: '아니, 아니야.' },
      ],
    },
    {
      en: 'Are they tall?',
      ko: '그들은 키가 크니?',
      verbs: ['Are they'],
      answers: [
        { en: 'Yes, they are.', ko: '응, 그래.' },
        { en: 'No, they aren’t', ko: '아니, 그렇지 않아.' },
      ],
    },
  ];

  return <ME11302 data={data} />;
};

export default P06;
