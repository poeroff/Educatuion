import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Culture', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보며 세계의 다양한 벽화에 대해 알아 봅시다.' }}
      videoInfo={{
        videoSrc: '/L06/C02/A07/EE4-L06-C02-A07-P01.mp4',
        // srtFile: '/L06/C02/A07/EE4-L06-C02-A07-P01.srt',
        srtFile: '',
      }}
    />
  );
};

export default P01;
