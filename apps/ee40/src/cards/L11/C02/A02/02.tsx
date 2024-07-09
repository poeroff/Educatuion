import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Story 2',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '영상을 보며 친구들은 방과 후에 무엇을 하고 있는지 확인해봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L11/C02/A02/EE4-L11-C02-A02-P02.mp4',
        srtFile: '',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P02;
