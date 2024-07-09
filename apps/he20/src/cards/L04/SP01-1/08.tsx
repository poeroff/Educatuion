import { TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import SP011HE00801 from './component/SP0110708';

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '주요 내용 이해하기',
  };

  const title = '의견 표현하기';
  const subtitle = 'I believe ~를 사용하여 의견을 표현할 수 있다. ';

  const data = [
    {
      label: 'A',
      labelColor: 'var(--color-blue-100)',
      originText: (
        <Typography>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            I believe
          </Typography>{' '}
          that white-hat hackers will be one of the most popular jobs in the future.{' '}
        </Typography>
      ),
      translation: '나는 화이트해커가 미래에 가장 인기 있는 직업 중 하나가 될 것으로 생각한다.',
      audioSrc: '/L04/SP01-1/HE2-L04-SP01-1-P08-01.mp3',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: (
        <Typography>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            I believe{' '}
          </Typography>{' '}
          AI will change the future of art in incredible ways.{' '}
        </Typography>
      ),
      translation: '나는 AI가 예술의 미래를 놀라운 방식으로 변화시킬 것이라고 믿는다.',
      audioSrc: '/L04/SP01-1/HE2-L04-SP01-1-P08-02.mp3',
    },
  ];

  return <SP011HE00801 headerInfo={headerInfo} title={title} subtitle={subtitle} data={data} />;
};

export default P08;
