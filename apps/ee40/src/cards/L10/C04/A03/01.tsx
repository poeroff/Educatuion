import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Act Out',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '‘신데렐라‘ 영상을 다시 한번 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L10/C04/A03/EE4-L10-C04-A03-P01.mp4',
        srtFile: '/L10/C04/A03/EE4-L10-C04-A03-P01.srt',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P01;
