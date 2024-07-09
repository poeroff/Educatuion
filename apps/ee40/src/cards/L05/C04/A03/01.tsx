import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Act Out',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '‘내 이름은 삐삐 롱스타킹‘ 영상을 다시 한번 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L05/C04/A03/EE4-L05-C04-A03-P01.mp4',
        // srtFile: '/L05/C04/A03/EE4-L05-C04-A03-P01.srt',
        srtFile: '',
        width: '684px',
        height: '394px',
      }}
    />
  );
};

export default P01;
