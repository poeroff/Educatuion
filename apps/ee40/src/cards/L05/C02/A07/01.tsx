import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Culture',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '영상을 보며 빅민턴과 뉴스포츠에 대해 알아 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L05/C02/A07/EE4-L05-C02-A07-P01.mp4',
        // srtFile: '/L05/C02/A07/EE4-L05-C02-A07-P01.srt',
        srtFile: '',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P01;
