import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P12 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Activity 1_교실 노래자랑', headerPattern: 'text' }}
      questionInfo={{ text: '12단원의 <Story Song>을 들으며 따라 불러 봅시다.' }}
      videoInfo={{
        videoSrc: '/SL2/C01/A02/EE4-SL2-C01-A02-P12.mp4',
        // srtFile: '/SL2/C01/A05/EE4-L01-C02-A03-P12.srt',
        srtFile: '',
        width: '684px',
        height: '394px',
      }}
    />
  );
};

export default P12;
