import { ICommonInfo, SvgIcon, VideoPlayer } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import styled from 'styled-components';
import OpenThinkingIcon from '@/assets/A01/0002/02/openThinking.svg';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { pageDataAtom, studentAtom } from '@/stores';
import { postVideoPlayed, postVideoPaused, postVideoMuted, postVideoTimeUpdated, postVideoSkipped, postVideoCompleted } from '@maidt-cntn/api';
import useCurrentPageData from '@/hooks/useCurrentPageData';

const P01 = () => {
  const [answerOpened, setAnswerOpened] = useState<boolean>(false);
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
    <Container
      useExtend
      vAlign='start'
      headerInfo={{}}
      questionInfo={{
        text: (
          <Header>
            <span>1</span>거듭제곱이란 무엇일까?
          </Header>
        ),
      }}
    >
      <div style={{ width: '1000px', height: '56px', margin: '20px 0' }}>
        <SvgIcon src={OpenThinkingIcon} height='56px' width='1000px' />
      </div>
      <VideoPlayer
        videoSrc={FILE_URL}
        srtFile=''
        width={1000}
        height={196}
        cardPageId={pageMeta.selectedPageId}
        commonInfo={commonInfo}
        postVideoPlayed={postVideoPlayed}
        postVideoPaused={postVideoPaused}
        postVideoMuted={postVideoMuted}
        postVideoTimeUpdated={postVideoTimeUpdated}
        postVideoSkipped={postVideoSkipped}
        postVideoCompleted={postVideoCompleted}
      />
      <QuestionWrapper>
        <p>
          미생물 <span>1</span>마리가 <span>5</span>일 후에는 모두 몇 마리가 되는지 식으로 나타내 보자.
        </p>
        <AnswerChipWrapper>
          <AnswerChip onClick={() => setAnswerOpened(prev => !prev)}>{answerOpened ? '정답 닫기' : '정답 보기'}</AnswerChip>
          {answerOpened && (
            <p>
              <span>(2×2×2×2×2)</span>마리
            </p>
          )}
        </AnswerChipWrapper>
      </QuestionWrapper>
    </Container>
  );
};
export default P01;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  font-family: 'SUIT';
  font-size: 36px;
  font-weight: 600;
  line-height: 54px;
  color: var(--color-grey-900);

  span {
    font-weight: 800;
    line-height: 58px;
    color: var(--color-yellow-700);
  }
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 20px;

  font-size: 28px;
  font-weight: 600;
  line-height: 42px;
  p {
    padding: 4px 12px;
  }
  span {
    font-family: 'NOTO';
    font-weight: 400;
  }
`;

const AnswerChip = styled.button`
  width: 103px;
  height: 42px;
  border-radius: 22px;
  background-color: var(--color-blue-500);
  color: var(--color-white);
  font-weight: 700;
  font-size: 20px;
  line-height: 42px;
  text-align: center;
`;

const AnswerChipWrapper = styled.div`
  display: flex;
  gap: 20px;
  height: 42px;
  align-items: center;
`;

const FILE_URL = '/A01/0002/02/A-MM1-0102-02-01.mp4';
