import { TMainHeaderInfoTypes, IQuestionProps } from '@maidt-cntn/ui';
import useFile from '@/utils/fileDownLoad';
import EEL11C03A07P02 from '@/Pages/EEL11C03A07P02';
import { getCorrectData, getDefaultData } from './pageData';
import { Card, IImageProps, IPageInfo, Num, Content } from '@/Pages/EEL11C03A07P02';

const P04 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Words and Sentences 3',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고 알맞은 문장을 골라 빈칸에 넣고, 직접 써봅시다.',
    // size: 'large',
    markSize: 'middle',
  };

  const pageInfo: IPageInfo = {
    pageNum: 4,
    mainKey: 4,
    subKey: 'TEXT-0',
  };

  const cards: Card[] = [{ text: 'It’s Wednesday.' }, { text: 'It’s Monday.' }, { text: 'It’s Saturday.' }, { text: 'It’s Friday' }];
  const number: Num = { num: 3 };
  const content: Content = { content: '10월 5일' };
  const imageInfo: IImageProps = {
    src: '/L11/C03/A07/EE4-L11-C03-A07-P04.JPG',
    alt: '10월 첫째 주의 달력, 월요일은 1일, 화요일은 2일, 수요일은 3일, 목요일은 4일, 금요일은 5일, 토요일은 6일 표시가 되어 있는 그림',
    title: '10월 첫째 주의 달력, 월요일은 1일, 화요일은 2일, 수요일은 3일, 목요일은 4일, 금요일은 5일, 토요일은 6일 표시가 되어 있는 그림',
    width: '620px',
    height: '173px',
  };

  return (
    <EEL11C03A07P02
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      cards={cards}
      number={number}
      content={content}
      imageInfo={imageInfo}
      pageInfo={pageInfo}
      getCorrectData={getCorrectData}
      getDefaultData={getDefaultData}
    />
  );
};

export default P04;
