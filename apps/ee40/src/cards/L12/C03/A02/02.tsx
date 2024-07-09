import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Sounds and Letters 1', headerPattern: 'text' }}
      questionInfo={{ text: `th의 소리에 집중하여 큰 소리로 찬트를 따라 불러 봅시다.` }}
      videoInfo={{
        videoSrc: '/L12/C03/A02/EE4-L12-C03-A02-P02.mp4',
        srtFile: '',
      }}
    />
  );
};

export default P02;
