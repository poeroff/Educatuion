import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'View', headerPattern: 'text' }}
      questionInfo={{ text: `영상을 보며 다른 나라에는 어떤 시장이 있는지 확인해 봅시다.` }}
      videoInfo={{
        videoSrc: '/LK3/C02/A02/EE4-LK3-C02-A02-P02.mp4',
        // srtFile:'/LK3/C02/A02/EE4-LK3-C02-A02-P02.srt',
        srtFile: '',
        height: 336,
      }}
    />
  );
};

export default P02;
