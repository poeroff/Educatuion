import { IQuestionProps, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import EM00102 from '@maidt-cntn/math/pages/EM-001-02';

const P01 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: undefined,
    iconType: undefined,
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        배운 내용을 다시 한 번 살펴볼까요?
      </>
    ),
  };

  const videoSrc = '/B01/0007/40/EM311_7_기초(영상).mp4';
  const srtFile = '/B01/0007/40/em311_7_기초영상.srt';

  return <EM00102 headerInfo={headerInfo} questionInfo={questionInfo} videoSrc={videoSrc} srtFile={srtFile} />;
};

export default P01;
