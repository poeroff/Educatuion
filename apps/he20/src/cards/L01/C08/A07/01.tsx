import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { Box, IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Fun with Grammar',
  };
  const questionInfo: IQuestionProps = {
    text: 'Read the travel experience.',
  };

  const text = (
    <>
      This summer, I went to Busan with my family. I heard it
      <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-700)'>
        had rained
      </Typography>
      for three days, but when we arrived at Busan Station, the sun was shining brightly. First, we went swimming at Haeundae Beach. Then, after
      eating street food at Gukje Market, we visited Busan Tower. It was so much fun, and I
      <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-700)'>
        expect Busan to become
      </Typography>
      a more popular tourist attraction!
      <Box type='hidden'>My Last Trip to Busan Swim at Haeundae Beach eat street food at Gukje Market visit Busan Tower</Box>
    </>
  );

  const info: IHE01602Info = {
    text,
    altText: '부산 해운대와 국제시장 전경',
    imageSrc: '/L01/C08/A07/HE2-L01-C08-A07-01.jpg',
  };

  return <HE01602 headerInfo={headerInfo} questionInfo={questionInfo} info={info} />;
};

export default P01;
