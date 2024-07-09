import HE00501, { IListenAndAnswer } from '@maidt-cntn/pages/HE-005-01';
import { IAudioPlayerProps, IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Listening',
  };

  const questionInfo: IQuestionProps = {
    text: 'Scripts',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L07/C12/A03/ME1-L07-C12-A03-P04.mp3',
  };

  const data: IListenAndAnswer[] = [
    {
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
      originText: (
        <>
          I saw the movie <span style={{ fontStyle: 'italic' }}>Moana</span> yesterday.
        </>
      ),
      translation: '나는 어제 영화 ‘모아나’를 봤어.',
    },
    { originText: 'It was amazing.', translation: '그건 멋졌어.', inLine: true },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: `Oh, really?  I know it's an animated movie.`,
      translation: '오, 정말? 나는 그것이 애니메이션 영화라고 알고 있어.',
    },
    {
      originText: `Can you tell me more about it?`,
      translation: '그것에 대해 내게 좀 더 말해 줄 수 있니?',
      inLine: true,
    },
    {
      label: 'G',
      labelColor: 'var(--color-yellow-100)',
      originText: 'It’s about a girl and her dream.',
      translation: '그건 한 소녀와 그 소녀의 꿈에 관한 거야.',
    },
    {
      originText: 'You should watch it!',
      translation: '너는 그것을 봐야 해!',
      inLine: true,
    },
    {
      label: 'B',
      labelColor: 'var(--color-blue-100)',
      originText: 'Okay, I will.',
      translation: '알겠어, 그럴게.',
    },
  ];

  return <HE00501 headerInfo={headerInfo} questionInfo={questionInfo} audioInfo={audioInfo} data={data} />;
};

export default P04;
