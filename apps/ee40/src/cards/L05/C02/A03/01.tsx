import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Story 2',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '노래를 따라 부르며 익혀 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L05/C02/A03/EE4-L05-C02-A03-P01.mp4',
        // srtFile: '/L05/C02/A03/EE4-L05-C02-A03-P01.srt',
        srtFile: '',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P01;
