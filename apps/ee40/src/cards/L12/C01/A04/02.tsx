import EEL01C01A04P02 from '@/Pages/EEL01C01A04P02';

const P02 = () => {
  return (
    <EEL01C01A04P02
      headerInfo={{ headerText: 'Phrases', headerPattern: 'text' }}
      questionInfo={{ text: `찬트를 들으며, 어구를 익혀 봅시다.` }}
      videoInfo={{
        videoSrc: '/L12/C01/A04/EE4-L12-C01-A04-P02.mp4',
        srtFile: '',
      }}
    />
  );
};

export default P02;
