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
        직각삼각형을 그리려고 할 때 이어야 할 점은 어느 것인가요?
      </>
    ),
  };

  return <EM00102 headerInfo={headerInfo} questionInfo={questionInfo} videoSrc='' srtFile='' />;
};

export default P01;
