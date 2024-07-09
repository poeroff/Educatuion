import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P06 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Talk and Act',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '영상을 보며 루시, 루시 아빠, 그리고 점원이 어떤 대화를 나누고 있는지 확인해 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L08/C02/A04/EE4-L08-C02-A04-P06.mp4',
        srtFile: '',
        width: 684,
        height: 336,
      }}
    />
  );
};

export default P06;
