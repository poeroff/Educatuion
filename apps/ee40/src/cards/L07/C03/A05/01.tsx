import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { getCorrectData, getDefaultData } from './pageData';
import EEL07C03A05P06 from '@/Pages/EEL07C03A05P06';
import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { IListenAndAnswer } from '@/Pages/EEL07C03A05P06';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 1',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: '어구를 하나씩 잘 듣고, 따라 말해 봅시다.',
    size: 'large',
  };

  const imgInfo = {
    src: '/L07/C03/A05/EE4-L07-C03-A05-P01.JPG',
    alt: '5개의 모습이 시간의 흐름대로 ‘ㄷ‘자 모양으로 이어져 있는 그림. 오전 7시 30분에 아침을 먹는 아이의 모습과 그 아래 쓰여 있는 time for  breakfast, 오전 8시 30분에 학교를 가는 아이의 모습과 그 아래 쓰여 있는 time for school, 오전 12시에 점심을 먹는 아이의 모습과 그 아래 쓰여 있는 time for lunch, 오후 6시에 저녁을 먹는 아이의 모습과 그 아래 쓰여 있는 time for dinner, 오후 9시 30분에 잠에 드는 아이의 모습과 그 아래 쓰여 있는 time for bed3개의 그림이 이어져 있는 이미지. 첫 번째 그림은 morning이라고 쓰여 있고, good이라는 단어가 위에 쓰여 있는여자아이가 산을 오르고 있고 산에는 해님이 떠오르고 있는 모습. 두 번째 그림은 afternoon이라고 쓰여 있고, great이라는 단어가 위에 쓰여 있는 여자아이가 산 정상에 올라있고 해님과 인사 하고 있는 모습. 세 번째 그림은 evening이라고 쓰여 있고, 여자아이가 산에서 내려가고 있고 해님도 산 뒤로 지고 있는 모습.',
    width: '360px',
    height: '274px',
  };

  const pageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'RECORDER-01',
  };

  const data: IListenAndAnswer[] = [
    {
      content: 'time for breakfast',
      audioSrc: '/L07/C03/A05/EE4-L07-C03-A05-P01-01.mp3',
    },
    {
      content: 'time for school',
      audioSrc: '/L07/C03/A05/EE4-L07-C03-A05-P01-02.mp3',
    },
    {
      content: 'time for lunch',
      audioSrc: '/L07/C03/A05/EE4-L07-C03-A05-P01-03.mp3',
    },
    {
      content: 'afternoon',
      audioSrc: '/L07/C03/A05/EE4-L07-C03-A05-P01-04.mp3',
    },
    {
      content: 'time for dinner',
      audioSrc: '/L07/C03/A05/EE4-L07-C03-A05-P01-05.mp3',
    },
    {
      content: 'time for bed',
      audioSrc: '/L07/C03/A05/EE4-L07-C03-A05-P01-06.mp3',
    },
  ];

  return (
    <EEL07C03A05P06
      imageInfo={imgInfo}
      headerInfo={headerInfo}
      pageInfo={pageInfo}
      getCorrectData={getCorrectData}
      questionInfo={questionInfo}
      getDefaultData={getDefaultData}
      data={data}
    />
  );
};

export default P01;