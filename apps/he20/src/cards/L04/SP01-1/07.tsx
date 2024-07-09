import { TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import SP011HE00801 from './component/SP0110708';

const P07 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '주요 내용 이해하기',
  };

  const title = '매체 사용하기';
  const subtitle = 'Can you show me how to~?를 사용하여 매체 사용법을 물을 수 있다. ';

  const data = [
    {
      label: 'A',
      labelColor: 'var(--color-blue-100)',
      originText: (
        <Typography>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            Can you show me how to
          </Typography>{' '}
          mute myself during an online meeting?{' '}
        </Typography>
      ),
      translation: '온라인 회의 중에 음소거하는 방법을 알려줄 수 있니?',
      audioSrc: '/L04/SP01-1/HE2-L04-SP01-1-P07-01.mp3',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: (
        <Typography>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            Can you show me how to{' '}
          </Typography>{' '}
          scan a QR code with a phone?{' '}
        </Typography>
      ),
      translation: '휴대전화로 QR코드를 스캔하는 방법을 알려줄 수 있니?',
      audioSrc: '/L04/SP01-1/HE2-L04-SP01-1-P07-02.mp3',
    },
  ];

  return <SP011HE00801 headerInfo={headerInfo} title={title} subtitle={subtitle} data={data} />;
};

export default P07;
