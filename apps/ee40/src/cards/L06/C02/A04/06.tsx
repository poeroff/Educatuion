import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P06 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Talk and Act', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보며 하준과 루시가 어떤 대화를 나누고 있는지 확인해 봅시다.' }}
      videoInfo={{
        videoSrc: '/L06/C02/A04/EE4-L06-C02-A04-P06.mp4',
        // srtFile: /L06/C02/A04/EE4-L06-C02-A04-P06.srt',
        srtFile: '',
      }}
    />
  );
};

export default P06;
