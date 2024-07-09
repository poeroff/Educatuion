import { Button, EStyleFontSizes, ICommonInfo, SvgIcon, Typography, VideoPlayer } from '@maidt-cntn/ui';
import styled from 'styled-components';
import TitleIcon from '@/assets/A01/0001/02/title.svg';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { pageDataAtom, studentAtom } from '@/stores';
import { useRecoilValue } from 'recoil';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { postVideoPlayed, postVideoPaused, postVideoMuted, postVideoTimeUpdated, postVideoSkipped, postVideoCompleted } from '@maidt-cntn/api';

const P01 = () => {
  const [showAnswer, setShowAnswer] = useState(false);
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
      headerInfo={null}
      questionInfo={{
        type: 'number',
        number: '1',
        text: '소수란 무엇일까?',
      }}
      useExtend
    >
      <ContentsContainer>
        <IconContainer>
          <SvgIcon src={TitleIcon} width='140px' height='56px' />
        </IconContainer>
        <ItemContainer>
          <VideoPlayer
            height={196}
            videoSrc={FILE_URL}
            srtFile=''
            cardPageId={pageMeta.selectedPageId}
            commonInfo={commonInfo}
            postVideoPlayed={postVideoPlayed}
            postVideoPaused={postVideoPaused}
            postVideoMuted={postVideoMuted}
            postVideoTimeUpdated={postVideoTimeUpdated}
            postVideoSkipped={postVideoSkipped}
            postVideoCompleted={postVideoCompleted}
          />
          <Typography>
            <span style={{ fontFamily: 'NOTO' }}>7</span>과 같이 <span style={{ fontFamily: 'NOTO' }}>1</span>과 자기 자신만을 약수로 갖는 수를 말해
            보자.
          </Typography>
          <AnswerContainer>
            <Button
              label='예시'
              width='63px'
              height='42px'
              style={{ fontSize: '20px', borderRadius: '22px', backgroundColor: 'var(--color-blue-500)' }}
              onClick={() => setShowAnswer(prev => !prev)}
            />
            {showAnswer && (
              <Typography size={EStyleFontSizes['X-MEDIUM']}>
                <span style={{ fontFamily: 'NOTO' }}>2, 3, 5</span> 등
              </Typography>
            )}
          </AnswerContainer>
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
};

const ContentsContainer = styled.div`
  height: 100%;

  padding-top: 48px;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 16px;
`;

const IconContainer = styled.div`
  width: 100%;
  height: 29px;

  border-top: 3px solid #fdd361;
  border-right: 3px solid #fdd361;
  border-top-right-radius: 22px;

  position: relative;

  span {
    position: absolute;

    top: -29px;
  }
`;

const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AnswerContainer = styled.div`
  display: flex;
  justify-content: baseline;
`;

export default P01;

const FILE_URL = '/A01/0001/02/A-MM1-0101-02-01.mp4';
