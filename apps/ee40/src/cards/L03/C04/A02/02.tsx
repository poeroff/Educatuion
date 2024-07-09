import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Class Theater', headerPattern: 'text' }}
      questionInfo={{ text: '영상을 보며 이야기의 줄거리를 확인해 봅시다.' }}
      videoInfo={{
        videoSrc: '/L03/C04/A02/EE4-L03-C04-A02-P02.mp4',
        // srtFile: '/L03/C04/A02/EE4-L03-C04-A02-P02.srt',
        srtFile: '',
        width: '684px',
        height: '394px',
      }}
    />
  );
};

export default P02;
