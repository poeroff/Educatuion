import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Act Out', headerPattern: 'text' }}
      questionInfo={{ text: `‘곰돌이 푸’ 영상을 다시 한번 봅시다.` }}
      videoInfo={{
        videoSrc: '/L12/C04/A03/EE4-L12-C04-A03-P01.mp4',
        // srtFile:'/L12/C04/A03/EE4-L12-C04-A03-P01.srt',
        srtFile: '',
        height: '394px',
        width: 'auto',
      }}
    />
  );
};

export default P01;
