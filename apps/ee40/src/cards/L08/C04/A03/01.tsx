import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Act Out',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '‘80일간의 세계 일주’ 영상을 다시 한번 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L08/C04/A03/EE4-L08-C04-A03-P01.mp4',
        srtFile: '',
        width: '684px',
        height: '394px',
      }}
    />
  );
};

export default P01;
