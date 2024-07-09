import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'culture', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보며 나라마다 다른 전통 의상을 알아 봅시다.' }}
      videoInfo={{
        videoSrc: '/L02/C01/A08/EE4-L02-C01-A08-P01.mp4',
        // srtFile: '/L02/C01/A08/EE4-L02-C01-A08-P01.srt',
        srtFile: '',
        height: '394px',
        width: '684px',
      }}
    />
  );
};

export default P01;
