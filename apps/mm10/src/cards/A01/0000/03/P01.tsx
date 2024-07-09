import useCurrentPageData from '@/hooks/useCurrentPageData';
import { pageDataAtom, studentAtom } from '@/stores';
import { ICommonInfo, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { postVideoPlayed, postVideoPaused, postVideoMuted, postVideoTimeUpdated, postVideoSkipped, postVideoCompleted } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const P01 = () => {
  const studentState = useRecoilValue(studentAtom);
  const pageMeta = useRecoilValue(pageDataAtom);
  const [commonInfo, setCommonInfo] = useState<ICommonInfo>();

  useCurrentPageData({});

  useEffect(() => {
    if (!studentState || !pageMeta) return;
    setCommonInfo({
      accessToken: studentState.lrsAccessToken,
      siteId: 'STATIC_VALUE',
      homepage: 'STATIC_VALUE',
      userId: studentState.userId,
      sessionId: studentState.sessionId,
    });
  }, [studentState, pageMeta]);

  return (
    <Container headerInfo={{}} questionInfo={{ type: 'text', text: '지구가 더워지는 이유는?' }}>
      <VideoPlayer
        videoSrc={FILE_URL}
        srtFile=''
        width={920}
        height={424}
        cardPageId={pageMeta.selectedPageId}
        commonInfo={commonInfo}
        postVideoPlayed={postVideoPlayed}
        postVideoPaused={postVideoPaused}
        postVideoMuted={postVideoMuted}
        postVideoTimeUpdated={postVideoTimeUpdated}
        postVideoSkipped={postVideoSkipped}
        postVideoCompleted={postVideoCompleted}
      />
    </Container>
  );
};

export default P01;

const FILE_URL = '/A01/0000/03/A-MM1-0100-03-01.mp4';
