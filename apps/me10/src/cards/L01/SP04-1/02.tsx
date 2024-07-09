import ME11302, { IME11302 } from '@maidt-cntn/pages/ME-113-02';

const P02 = () => {
  const data: IME11302[] = [
    {
      en: 'I am nervous. = I’m nervous.',
      ko: '나는 긴장된다.',
      verbs: ['am', '’m'],
    },
    {
      en: 'You are my best friend. = You’re my best friend.',
      ko: '너는 내 가장 친한 친구이다.',
      verbs: ['are', '’re'],
    },
    {
      en: 'He [She] is a teacher. = He’s [She’s] a teacher.',
      ko: '그는[그녀는] 선생님이다.',
      verbs: ['is', '’s'],
    },
    {
      en: 'We [They] are students. = We’re [They’re] students.',
      ko: '우리는[그들은] 학생이다.',
      verbs: ['are', '’re'],
    },
  ];

  return <ME11302 data={data} />;
};

export default P02;
