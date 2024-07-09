import { getDefaultData, getCorrectData } from './pageData';
import EEL01C04A03P02 from '@/Pages/EEL01C04A03P02';
import { currentPageSubmittedData } from '@/stores';
import { useRecoilValue } from 'recoil';
const EE40L01C04A03P02 = () => {
  const ButtonColorIs = { default: ['#E2F2FF', '#FFF0CC'], press: ['#275CE7', '#996500'] };

  // const audioInfo = [
  //   '/L01/C04/A03/EE4-L01-C04-A03-P02-01.mp3',
  //   '/L01/C04/A03/EE4-L01-C04-A03-P02-02.mp3',
  //   '/L01/C04/A03/EE4-L01-C04-A03-P02-03.mp3',
  //   '/L01/C04/A03/EE4-L01-C04-A03-P02-04.mp3',
  // ];

  const pageInfo = {
    mainKey: 2,
    pageNumber: 2,
    headerText: 'Act Out',
    questionText: '첫 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  };

  const speechList = [
    {
      index: 1,
      name: '도로시',
      speech: 'Good morning. I’m Dorothy. How are you?',
      audio: '/L01/C04/A03/EE4-L01-C04-A03-P02-01.mp3',
      subKeyIs: 'RECORDER-0',
    },
    { index: 2, name: '허수아비', speech: 'Not so good. I can’t jump.', audio: '/L01/C04/A03/EE4-L01-C04-A03-P02-02.mp3', subKeyIs: 'RECORDER-1' },
    { index: 1, name: '도로시', speech: 'I have scissors.', audio: '/L01/C04/A03/EE4-L01-C04-A03-P02-03.mp3', subKeyIs: 'RECORDER-2' },
    { index: 2, name: '허수아비', speech: 'Thank you. Now I can jump!', audio: '/L01/C04/A03/EE4-L01-C04-A03-P02-04.mp3', subKeyIs: 'RECORDER-3' },
  ];

  const isSubmit = useRecoilValue(currentPageSubmittedData);

  return (
    <EEL01C04A03P02
      pageData={pageInfo}
      data={speechList}
      btnColor={ButtonColorIs}
      submitIs={isSubmit}
      getDefaultData={getDefaultData}
      getCorrectData={getCorrectData}
    />
  );
};

export default EE40L01C04A03P02;
