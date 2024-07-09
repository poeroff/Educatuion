import headerIcon from '@/assets/icon/m_default_01.svg';
import EM00102 from '@maidt-cntn/math/pages/EM-001-02';
import { IQuestionProps, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: '단원 도입 영상',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        만화를 보며 이 단원에서 배우는 내용을 살펴보세요.
      </>
    ),
  };

  const videoSrc = '/A03/0001/02/EM313_0_도입만화.mp4';
  const srtFile = '/A03/0001/02/EM313_0_도입만화.srt';

  return <EM00102 headerInfo={headerInfo} questionInfo={questionInfo} videoSrc={videoSrc} srtFile={srtFile} />;
};

export default P01;
