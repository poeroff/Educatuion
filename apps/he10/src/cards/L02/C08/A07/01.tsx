import HE01603, { IHE01603Info } from '@maidt-cntn/pages/HE-016-03';
import { IQuestionProps, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import { contentInfo } from './contentInfo';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: `Fun with Grammer`,
  };

  const questionInfo: IQuestionProps = {
    text: 'Read the quotes below.',
    size: 'medium',
  };

  const HE01603Info: IHE01603Info[] = [
    {
      id: 'P1',
      altText: [contentInfo.P01.image[0].alt],
      text: [''],
      styledText: contentInfo.P01.text[0],
      imageSrc: [contentInfo.P01.image[0].src],
      imagePosition: 'before',
      imageWidth: '300px',
    },
    {
      id: 'P2',
      altText: [contentInfo.P01.image[1].alt],
      text: [''],
      styledText: contentInfo.P01.text[1],
      imageSrc: [contentInfo.P01.image[1].src],
      imagePosition: 'before',
      imageWidth: '300px',
    },
  ];
  return <HE01603 headerInfo={headerInfo} title={''} questionInfo={questionInfo} info={HE01603Info} />;
};

export default P01;
