import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'View', headerPattern: 'text' }}
      questionInfo={{ text: `영상을 보며 다른 나라에는 어떤 기념일이 있는지 확인해 봅시다.` }}
      videoInfo={{
        videoSrc: '/LK4/C02/A02/EE4-LK4-C02-A02-P02.mp4',
        // srtFile:'/LK4/C02/A02/EE4-LK4-C02-A02-P02.srt',
        srtFile: '',
        height: 336,
      }}
    />
  );
};

export default P02;
