import { IQuestionProps, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import EM00102 from '@maidt-cntn/math/pages/EM-001-02';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {};

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        수학에 관련된 재미있는 이야기를 더 알아보세요.
      </>
    ),
  };

  return (
    <EM00102
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      videoSrc='/B04/0009/20/EM314_M_(기본)_수학더알기.mp4'
      srtFile='/B04/0009/20/EM314_M_(기본)_수학더알기.srt'
    />
  );
};

export default P01;
