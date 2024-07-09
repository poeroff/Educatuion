import HE01801 from '@maidt-cntn/pages/HE-018-01';
import { textContentA02, imgContentA02P01 } from './commonData';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Check out the structure before summarizing the main text.',
  };

  const dialogInfo = {
    textTitle: textContentA02.title,
    textContent: textContentA02.content,
    subtitleIndexes: textContentA02.subTitleIndexes,
  };

  const imgInfo = {
    imgSrc: imgContentA02P01.imgSrc,
    imgAlt: imgContentA02P01.imgAlt,
    imgHeight: '352px',
  };

  return (
    <>
      <HE01801 headerInfo={headerInfo} questionInfo={questionInfo} dialogInfo={dialogInfo} imgInfo={imgInfo} />
    </>
  );
};

export default P01;
