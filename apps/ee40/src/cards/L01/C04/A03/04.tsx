import { getDefaultData, getCorrectData } from './pageData';
import EEL01C04A03P02 from '@/Pages/EEL01C04A03P02';
import { currentPageSubmittedData } from '@/stores';
import { useRecoilValue } from 'recoil';
const EE40L01C04A03P04 = () => {
  const ButtonColorIs = { default: ['#E2F2FF', '#FFECF1'], press: ['#275CE7 ', '#E71C2C'] };

  const speechList = [
    {
      index: 1,
      name: '도로시',
      speech: 'Good morning. I’m Dorothy. How are you?',
      audio: '/L01/C04/A03/EE4-L01-C04-A03-P04-01.mp3',
      subKeyIs: 'RECORDER-0',
    },
    {
      index: 2,
      name: '사자',
      speech: 'I’m good. Oh, no! I don’t like dogs.',
      audio: '/L01/C04/A03/EE4-L01-C04-A03-P04-02.mp3',
      subKeyIs: 'RECORDER-1',
    },
    { index: 1, name: '도로시', speech: 'Toto, sit down. I’m sorry.', audio: '/L01/C04/A03/EE4-L01-C04-A03-P04-03.mp3', subKeyIs: 'RECORDER-2' },
    { index: 2, name: '사자', speech: 'That’s okay.', audio: '/L01/C04/A03/EE4-L01-C04-A03-P04-04.mp3', subKeyIs: 'RECORDER-3' },
  ];

  // const audioInfo = [
  //   '/L01/C04/A03/EE4-L01-C04-A03-P04-01.mp3',
  //   '/L01/C04/A03/EE4-L01-C04-A03-P04-02.mp3',
  //   '/L01/C04/A03/EE4-L01-C04-A03-P04-03.mp3',
  //   '/L01/C04/A03/EE4-L01-C04-A03-P04-04.mp3',
  // ];

  const pageInfo = {
    mainKey: 4,
    pageNumber: 4,
    headerText: 'Act Out',
    questionText: '세 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  };

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

export default EE40L01C04A03P04;
