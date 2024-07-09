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
        만화를 보며 이번 단원에서 배운 내용을 확인해 보세요.
      </>
    ),
  };

  return (
    <EM00102
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      videoSrc='/B04/0009/30/EM314_M_(기본)_마무리만화2.mp4'
      srtFile='/B04/0009/30/EM314_M_(기본)_마무리만화2.srt'
    />
  );
};

export default P01;
