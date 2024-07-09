import { TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';
import SP011HE00801 from './component/SP011HE00801';

const P08 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'listenAndSpeakENG',
    headerText: '주요 내용 이해하기',
  };

  const title = '좋아하는 것 묻고 답하기';
  const subtitle =
    '상대방에게 가장 좋아하는 것을 묻기 위해 What’s your favorite ~?을 사용할 수 있습니다. 혹은 어떤 대상을 좋아하는지의 여부를 묻기 위해 Do you like ~?을 사용할 수 있습니다. ';

  const data = [
    {
      label: 'A',
      labelColor: 'var(--color-blue-100)',
      originText: (
        <Typography>
          <Typography useGap={false} weight={'var(--font-weight-bold)'}>
            What’s your favorite
          </Typography>{' '}
          subject?
        </Typography>
      ),
      translation: '네가 가장 좋아하는 과목은 뭐니?',
      audioSrc: '/L01/SP01-1/ME1-L01-SP01-1-P08-01.mp3',
    },
    {
      label: 'B',
      labelColor: 'var(--color-yellow-100)',
      originText: <Typography>My favorite subject is P.E.</Typography>,
      translation: '내가 가장 좋아하는 과목은 체육이야',
      audioSrc: '/L01/SP01-1/ME1-L01-SP01-1-P08-02.mp3',
    },
  ];

  return <SP011HE00801 headerInfo={headerInfo} title={title} subtitle={subtitle} data={data} />;
};

export default P08;
