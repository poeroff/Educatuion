import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Story 1',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '영상을 보며 엘라의 가족들이 무엇을 하고 있는지 확인해 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L07/C01/A05/EE4-L07-C01-A05-P02.mp4',
        srtFile: '',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P02;
