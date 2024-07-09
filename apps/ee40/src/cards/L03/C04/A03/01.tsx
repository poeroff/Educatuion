import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Act Out', headerPattern: 'text' }}
      questionInfo={{ text: '‘피노키오’ 영상을 다시 한번 봅시다.' }}
      videoInfo={{
        videoSrc: '/L03/C04/A03/EE4-L03-C04-A03-P01.mp4',
        // srtFile: '/L03/C04/A03/EE4-L03-C04-A03-P01.srt',
        srtFile: '',
      }}
    />
  );
};

export default P01;