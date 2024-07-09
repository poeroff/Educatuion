import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'View',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: '영상을 보며 다른 나라 친구들은 어떤 운동을 하는지 확인해 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/LK2/C02/A02/EE4-LK2-C02-A02-P02.mp4',
        srtFile: '',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P02;
