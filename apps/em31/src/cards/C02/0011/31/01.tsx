import { IQuestionProps, SvgIcon, TMainHeaderInfoTypes } from '@maidt-cntn/ui';
import headerIcon from '../../../../assets/icon/m_default_01.svg';
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
        각을 보고 □ 안에 알맞게 써넣으세요.
      </>
    ),
  };

  return <EM00102 headerInfo={headerInfo} questionInfo={questionInfo} videoSrc='' srtFile='' />;
};

export default P01;
