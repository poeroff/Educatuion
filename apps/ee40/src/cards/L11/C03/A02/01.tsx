import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P01 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{
        headerText: 'Sounds and Letters 1',
        headerPattern: 'text',
      }}
      questionInfo={{
        text: 'cl의 소리에 집중하여 찬트를 들어 봅시다.',
      }}
      videoInfo={{
        videoSrc: '/L11/C03/A02/EE4-L11-C03-A02-P01.mp4',
        srtFile: '',
        width: 684,
        height: 394,
      }}
    />
  );
};

export default P01;
