import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Act Out', headerPattern: 'text' }}
      questionInfo={{ text: '‘명탐정 셜록 홈스’ 영상을 다시 한번 봅시다.' }}
      videoInfo={{
        videoSrc: '/L06/C04/A03/EE4-L06-C04-A03-P01.mp4',
        // srtFile:'/L06/C04/A03/EE4-L06-C04-A03-P01.srt',
        srtFile: '',
      }}
    />
  );
};

export default P01;
