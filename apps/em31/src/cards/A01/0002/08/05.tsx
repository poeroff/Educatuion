import { TMainHeaderInfoTypes, SvgIcon, VideoPlayer, MainTitleHeader, Question, Scroll } from '@maidt-cntn/ui';
import headerIcon from '@/assets/icon/m_default_01.svg';
import { DialogContainer } from '@maidt-cntn/ui/math';

const P05 = () => {
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  return (
    <DialogContainer
      headerInfo={headerInfo}
      questionInfo={{
        text: (
          <>
            <SvgIcon src={headerIcon} size='36px' />
            &nbsp;배운 내용을 다시 한 번 살펴볼까요?
          </>
        ),
      }}
    >
      <VideoPlayer videoSrc='/C01/0002/20/EM311_2_기초(영상).mp4' srtFile={''} />
    </DialogContainer>
  );
};

export default P05;
