import { IQuestionProps, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import EM00102 from '@maidt-cntn/math/pages/EM-001-02';

const P01 = () => {
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        만화를 보며 이 단원에서 배운 내용을 확인해 보세요.
      </>
    ),
  };

  return (
    <EM00102
      headerInfo={null}
      questionInfo={questionInfo}
      videoSrc={'/A03/0008/03/EM313_M_마무리만화.mp4'}
      // srtFile={'/A03/0008/03/EM313_M_마무리만화.srt'}
    />
  );
};

export default P01;
