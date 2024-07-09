import HE01602, { IHE01602Info } from '@maidt-cntn/pages/HE-016-02';
import { IQuestionProps, TMainHeaderInfoTypes, Typography } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Fun with Grammar',
  };
  const questionInfo: IQuestionProps = {
    text: 'Read the advertisement.',
  };

  const text = (
    <>
      Try this baking set. You
      <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-700)'>
        may have noticed
      </Typography>
      that all the famous baking shows use our products. I strongly
      <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-700)'>
        suggest
      </Typography>
      that you
      <Typography weight={'var(--font-weight-bold)'} color='var(--color-blue-700)'>
        order
      </Typography>
      it right away!
    </>
  );

  const info: IHE01602Info = {
    text,
    altText: '여자가 Happy Baker set이라고 쓰이고 베이킹 도구들 사진이 있는 판을 들고 말하고 있다.',
    imageSrc: '/L02/C08/A07/HE2-L02-C08-A07-01.jpg',
  };

  return <HE01602 headerInfo={headerInfo} questionInfo={questionInfo} info={info} />;
};

export default P01;
