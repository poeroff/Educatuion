import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import { getCorrectData, getDefaultData } from './pageData';
import EEL03C04A07P01 from '@/Pages/EEL03C04A07P01';
import { IImageProps, IPageInfo, IData } from '@/Pages/EEL03C04A07P01';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Review 4',
  };

  const questionInfo: IQuestionProps = {
    text: '그림 속 친구에게 운동을 제안하는 말을 골라 쓰고, 답을 추측하여 발표해 봅시다.',
  };

  const imageInfo: IImageProps = {
    src: '/L05/C04/A07/EE4-L05-C04-A07-P01.JPG',
    alt: '운동장에 여러 학생들이 있는 그림. 계단에서 아파서 쉬고 있는 학생, 배드민턴 채를 가방에 꽂고 다니는 학생, 운동복 차림으로 지나가는 학생, 책을 들고 지나가는 학생, 철봉을 하는 학생과 철봉 밑에서 발목이 아파 쉬고 있는 학생이 있다.',
    title: '운동장에 여러 학생들이 있는 그림. 계단에서 아파서 쉬고 있는 학생, 배드민턴 채를 가방에 꽂고 다니는 학생, 운동복 차림으로 지나가는 학생, 책을 들고 지나가는 학생, 철봉을 하는 학생과 철봉 밑에서 발목이 아파 쉬고 있는 학생이 있다.',
    width: '480px',
    height: '364px',
  };

  const pageInfo: IPageInfo = {
    pageNum: 1,
    mainKey: 1,
    subKey: 'TEXT-01',
  };

  const data: IData[] = [{ text: 'Let’s play badminton.' }, { text: 'Let’s play basketball.' }, { text: 'Let’s play soccer.' }, { text: 'Let’s play baseball.' }];

  return (
    <EEL03C04A07P01
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      data={data}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P01;
