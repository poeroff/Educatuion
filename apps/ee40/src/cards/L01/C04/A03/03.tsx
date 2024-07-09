import { getDefaultData, getCorrectData } from './pageData';
import EEL01C04A03P02 from '@/Pages/EEL01C04A03P02';
import { currentPageSubmittedData } from '@/stores';
import { useRecoilValue } from 'recoil';

const EE40L01C04A03P03 = () => {
  // const audioInfo = ['/L01/C04/A03/EE4-L01-C04-A03-P03-01.mp3', '/L01/C04/A03/EE4-L01-C04-A03-P03-02.mp3', '/L01/C04/A03/EE4-L01-C04-A03-P03-03.mp3'];

  const ButtonColorIs = { default: ['#E5F4EA', '#E2F2FF'], press: ['#007637', '#275CE7'] };

  const pageInfo = {
    mainKey: 3,
    pageNumber: 3,
    headerText: 'Act Out',
    questionText: '두 번째 장면에서 원하는 역할을 골라 역할놀이를 해봅시다.',
  };

  const speechList = [
    { index: 1, name: '양철나무꾼', speech: 'I’m hungry.', audio: '/L01/C04/A03/EE4-L01-C04-A03-P03-01.mp3', subKeyIs: 'RECORDER-0' },
    { index: 2, name: '도로시', speech: 'Here you are.', audio: '/L01/C04/A03/EE4-L01-C04-A03-P03-02.mp3', subKeyIs: 'RECORDER-1' },
    { index: 1, name: '양철나무꾼', speech: 'Thank you.', audio: '/L01/C04/A03/EE4-L01-C04-A03-P03-03.mp3', subKeyIs: 'RECORDER-2' },
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

export default EE40L01C04A03P03;
