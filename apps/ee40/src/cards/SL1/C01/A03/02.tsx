import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Classroom English', headerPattern: 'text' }}
      questionInfo={{ text: `찬트를 들으며, 교실 영어 표현을 익혀 봅시다.` }}
      videoInfo={{
        videoSrc: '/SL1/C01/A03/EE4-SL1--A03-P02.mp4',
        // srtFile:'/SL1/C01/A03/EE4-SL1-C01-A03-P02.srt',
        srtFile: '',
        width: '684px',
        height: '394px',
      }}
    />
  );
};

export default P02;
