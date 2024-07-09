import { TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import SP011HE00801 from './component/SP011HE00801';

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '주요 내용 이해하기',
  };

  const title = '자기소개하기';
  const subtitle =
    "상대방에게 자기를 소개할 때 'I'm ~.' 또는 'My name is ~.'을 활용할 수 있습니다. 반가움을 나타내기 위해 Nice to meet you.를 추가하여 말해보세요. ";

  const data = [
    {
      label: 'A',
      labelColor: 'var(--color-blue-100)',
      originText: (
        <Typography>
          Hi.{' '}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            I'm
          </Typography>{' '}
          Sua.{' '}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            Nice to meet you
          </Typography>
          .
        </Typography>
      ),
      translation: '안녕. 나는 수아야. 만나서 반가워.',
      audioSrc: '/L01/SP01-1/ME1-L01-SP01-1-P07-01.mp3',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: (
        <Typography>
          Hi.{' '}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            My name is{' '}
          </Typography>{' '}
          Dennis.{' '}
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            Nice to meet you
          </Typography>
          , too.
        </Typography>
      ),
      translation: '안녕. 내 이름은 Dennis야. 나도 만나서 반가워.',
      audioSrc: '/L01/SP01-1/ME1-L01-SP01-1-P07-02.mp3',
    },
  ];

  return <SP011HE00801 headerInfo={headerInfo} title={title} subtitle={subtitle} data={data} />;
};

export default P07;
