import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { TMainHeaderInfoTypes, IAudioPlayerProps } from '@maidt-cntn/ui';

const P02 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L02/C02/A03/HE1-L02-C02-A03-01.mp3',
    captionSrc: '/L02/C02/A03/HE1-L02-C02-A03-01.srt',
  };

  const labelG = {
    label: 'G',
    labelColor: 'var(--color-yellow-100)',
  };

  const labelM = {
    label: 'M',
    labelColor: 'var(--color-blue-100)',
  };

  const data: IListenAndAnswer[] = [
    {
      ...labelG,
      originText: 'Good afternoon, Mr. Song.',
      translation: '안녕하세요, 송 선생님.',
    },
    {
      inLine: true,
      originText: 'May I borrow Space Invasion, please?',
      translation: '<Space Invasion> 좀 빌릴 수 있을까요?',
    },
    {
      ...labelM,
      originText: 'Hi, Judy! I didn’t know you were interested in science fiction.',
      translation: '안녕, Judy! SF에 관심이 있는지 몰랐구나.',
    },
    {
      inLine: true,
      originText: 'Let me check. [typing sound]',
      translation: '확인해 볼게.',
    },
    {
      inLine: true,
      originText: 'Oh, I’m sorry, but it’s already been checked out.',
      translation: '아, 미안하지만 그 책은 이미 대출되었어.',
    },
    {
      ...labelG,
      originText: 'That’s a shame.',
      translation: '아쉽네요.',
    },
    {
      inLine: true,
      originText: 'Do you know when it’s due to be returned?',
      translation: '언제쯤 반납이 되는지 아시나요?',
    },
    {
      inLine: true,
      originText: 'One second... This Thursday.',
      translation: '잠시만. 이번 주 목요일이야.',
    },
    {
      inLine: true,
      originText: 'Why don’t you borrow Lost Cities instead?',
      translation: '대신 <Lost Cities>를 빌려보는 건 어떨까?',
    },
    {
      ...labelG,
      originText: 'I’ve already read that one.',
      translation: '그 책은 이미 읽었어요.',
    },
    {
      inLine: true,
      originText: 'Could you please check if The Martian’s Return is available?',
      translation: '<The Martian’s Return>이 가능한지 확인해 주시겠어요?',
    },
    {
      inLine: true,
      originText: 'I’ve been looking forward to reading that one, too.',
      translation: '저도 그 책을 읽기를 고대하고 있었어요.',
    },
    {
      ...labelM,
      originText: 'Of course.',
      translation: '물론이지.',
    },
    {
      inLine: true,
      originText: 'Let me look it up for you. [typing sound] ',
      translation: '찾아볼게.',
    },
    {
      inLine: true,
      originText: 'Yes, it’s available!',
      translation: '응, 이용 가능하구나!',
    },
    {
      inLine: true,
      originText: 'You can find it in section D.',
      translation: 'D 코너에 가면 있어.',
    },
    {
      ...labelG,
      originText: 'Great!',
      translation: '좋아요!',
    },
    {
      inLine: true,
      originText: 'Thank you, Mr. Song.',
      translation: '감사합니다. 송 선생님.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P02;
