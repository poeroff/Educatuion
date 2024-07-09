import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';
import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
interface IProps {
  headerInfo: TMainHeaderInfoTypes;
  audioInfo: IAudioPlayerProps;
}

const P02 = ({ headerInfo, audioInfo }: IProps) => {
  const questionInfo = {
    text: 'Scripts',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Hey, Noah. Have you heard about World Bee Day?',
      translation: '안녕, Noah. 세계 꿀벌의 날에 대해 들어봤어?',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'World Bee Day?',
      translation: '세계 꿀벌의 날?',
    },
    {
      inLine: true,
      originText: 'No, I haven’t.',
      translation: '아니, 못 들었어.',
    },
    {
      inLine: true,
      originText: 'What’s that?',
      translation: '그게 뭔데?',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'It’s a special day celebrated every year on May 20th.',
      translation: '매년 5월 20일에 기념하는 특별한 날이야.',
    },
    {
      inLine: true,
      originText: 'The United Nations created the day to recognize the essential roles that bees play in maintaining our ecosystem.',
      translation: 'UN은 꿀벌이 생태계를 유지하는 데 필수적인 역할을 한다는 사실을 알리기 위해 이 날을 만들었어.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'Oh, I had no idea there was such a day!',
      translation: '그런 날이 있는 줄 몰랐어!',
    },
    {
      inLine: true,
      originText: 'But I read somewhere that bees are endangered.',
      translation: '하지만 어디선가 꿀벌이 멸종 위기에 처해 있다고 읽었어.',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Unfortunately, that’s true.',
      translation: '안타깝게도 사실이야.',
    },
    {
      inLine: true,
      originText:
        'The decreasing number of bees is a serious problem, especially because about a third of the world’s food production depends on them.',
      translation: '특히 전 세계 식량 생산의 약 3분의 1이 꿀벌에 의존하고 있기 때문에 꿀벌의 개체 수 감소는 심각한 문제지.',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: 'Oh, no! I’m so worried about what will happen if the bee population continues to decrease.',
      translation: '오, 안 돼! 꿀벌 개체수가 계속 줄어들면 어떻게 될지 너무 걱정돼.',
    },
    {
      label: 'G',
      labelColor: 'var(--color-blue-100)',
      originText: 'Me, too.',
      translation: '나도 그래.',
    },
    {
      inLine: true,
      originText: 'Let’s just hope that people become more aware of the problem thanks to World Bee Day.',
      translation: '세계 꿀벌의 날을 계기로 사람들이 이 문제에 대해 더 많이 인식했으면 좋겠다.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
