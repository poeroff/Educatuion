import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Act Out', headerPattern: 'text' }}
      questionInfo={{ text: '‘피노키오’ 영상을 다시 한번 봅시다.' }}
      videoInfo={{
        videoSrc: '/L02/C04/A03/EE4-L02-C04-A03-P01.mp4',
        // srtFile: '/L02/C04/A03/EE4-L02-C04-A03-P01.srt',
        srtFile: '',
        width: '684px',
        height: '363px',
      }}
    />
  );
};

export default P01;
