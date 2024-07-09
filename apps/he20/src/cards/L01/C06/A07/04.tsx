import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Volunteering at an Animal Sanctuary (5)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Translations',
  };

  const data: IListenAndAnswer[] = [
    {
      originText: 'August 1, Thursday',
      translation: '8월 1일 목요일',
    },
    {
      originText: 'On the last day, we were called to the rescue center due to a sudden emergency.',
      translation: '마지막 날에 우리는 갑작스러운 응급상황 때문에 응급센터로 불려 가게 되었다. ',
    },
    {
      originText: 'Some dehydrated birds had fallen out of the sky in the city and were brought to the center.',
      translation: '탈수가 된 새들이 도시의 하늘로부터 떨어져서 센터로 데려오게 된 것이다.',
    },
    {
      originText:
        'Following the veterinarian’s guidance, we provided water to the birds while the vets treated their broken wings and legs and injected them with vitamins for a speedy recovery.',
      translation:
        '수의사의 지시를 따라서 수의사가 새들의 부러진 다리를 치료하고 빠른 회복을 위해 비타민을 주입하는 동안 우리는 새들에게 물을 주었다.',
    },
    {
      originText: 'It was shocking that this type of accident happens every year since the high temperatures dry up water sources in the city.',
      translation: '도시에서 고온이 동물이 먹을 수 있는 물을 말려버려 이런 종류의 사건이 매해 일어나고 있다는 것은 참으로 충격이었다.',
    },
    {
      originText: 'Caring for the birds, I couldn’t help but reflect on the impact of human activities on climate change and how it harms animals.',
      translation: '새들을 돌보는 동안 인간의 행동이 기후 변화에 미치는 영향과 이것이 동물들에 미치는 영향을 생각해 볼 수밖에 없었다.',
    },
    {
      originText: 'Saying goodbye to the animals and staff, I felt grateful for the opportunity to volunteer.',
      translation: '동물들과 직원들에게 작별인사를 하면서 나는 이런 자원봉사를 하게 될 수 있는 기회를 갖을 수 있다는 것에 너무 감사했다.',
    },
    {
      originText: 'From this experience, I learned the importance of treating animals with respect and care.',
      translation: '이번 경험으로부터 나는 존중과 보살핌으로 동물들을 대해야 하는 것의 중요성을 알게 되었다.',
    },
    {
      originText: 'I also came to realize that humans are just another kind of animal and share the Earth with all other living creatures.',
      translation: '또한 인간도 그저 동물이며 다른 동식물들과 지구를 공유하고 있다는 사실을 깨달았다.',
    },
    {
      originText: 'To improve animal welfare, I’ll work hard with Care for Animals members.',
      translation: '동물의 복지를 위해서 나는 Care for Animals 멤버들과 노력할 것이다.',
    },
    {
      originText: 'Hopefully, I’ll have the chance to volunteer at another sanctuary next summer.',
      translation: '바라건데 내년에도 다른 sanctuary에서 자원봉사할 수 있는 기회를 갖게 되면 좋겠다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} data={data} />;
};

export default P04;
