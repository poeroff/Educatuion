import EM00102 from '@maidt-cntn/math/pages/EM-001-02';
import { IQuestionProps, SvgIcon } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';

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
  const videoSrc = '/A01/0011/03/EM311_M_마무리만화.mp4';
  const srtFile = ''; // '/A01/0011/03/EM311_11_M_마무리만화.srt';

  return <EM00102 headerInfo={{}} questionInfo={questionInfo} videoSrc={videoSrc} srtFile={srtFile} />;
};

export default P01;
