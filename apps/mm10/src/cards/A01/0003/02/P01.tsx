import styled from 'styled-components';
import { Container } from '@maidt-cntn/ui/math';
import { Button, ICommonInfo, SvgIcon, VideoPlayer } from '@maidt-cntn/ui';
import TitleIcon from '@/assets/A01/0003/02/title.svg';
import ArrowIcon from '@/assets/A01/0003/02/arrow.svg';
import { useEffect, useState } from 'react';
import { postVideoPlayed, postVideoPaused, postVideoMuted, postVideoTimeUpdated, postVideoSkipped, postVideoCompleted } from '@maidt-cntn/api';
import { useRecoilValue } from 'recoil';
import { pageDataAtom, studentAtom } from '@/stores';
import useCurrentPageData from '@/hooks/useCurrentPageData';

function P01() {
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
    <Container headerInfo={null} useExtend>
      <ContentsContainer>
        <Title>
          <span>1</span> 소인수분해를 이용하여 최대공약수를 어떻게 구할까?
        </Title>
        <IconContainer>
          <SvgIcon src={TitleIcon} width='140px' height='56px' />
        </IconContainer>
        <ItemContainer>
          <VideoPlayer
            videoSrc={FILE_URL}
            srtFile=''
            width={870}
            height={240}
            cardPageId={pageMeta.selectedPageId}
            commonInfo={commonInfo}
            postVideoPlayed={postVideoPlayed}
            postVideoPaused={postVideoPaused}
            postVideoMuted={postVideoMuted}
            postVideoTimeUpdated={postVideoTimeUpdated}
            postVideoSkipped={postVideoSkipped}
            postVideoCompleted={postVideoCompleted}
          />
          <Text>
            <SvgIcon src={ArrowIcon} size='38px' />
            <p>이 놀이를 할 수 있는 사람은 최대 몇 명인지 말해 보자.</p>
          </Text>
          <AnswerContainer>
            <Button
              label='정답 보기'
              width='103px'
              height='42px'
              style={{ fontSize: '20px', borderRadius: '22px', backgroundColor: 'var(--color-blue-500)' }}
              onClick={() => setShowAnswer(prev => !prev)}
            />
            {showAnswer && (
              <Text>
                <p>
                  <span>12</span> 명
                </p>
              </Text>
            )}
          </AnswerContainer>
        </ItemContainer>
      </ContentsContainer>
    </Container>
  );
}

const ContentsContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  gap: 16px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;

  gap: 14px;

  font-weight: 600;
  font-size: 36px;
  line-height: 54px;

  span {
    font-weight: 800;
    font-size: 36px;
    line-height: 58px;
    color: var(--color-yellow-700);

    position: relative;
  }
`;

const IconContainer = styled.div`
  width: 100%;
  height: 29px;

  margin-top: 48px;

  border-top: 3px solid #fdd361;
  border-right: 3px solid #fdd361;
  border-top-right-radius: 22px;

  position: relative;

  span {
    position: absolute;

    top: -29px;
  }
`;

const Text = styled.div`
  height: 42px;

  display: flex;
  align-items: center;

  gap: 12px;

  p {
    font-size: 28px;
    font-weight: 600;
    line-height: 36px;
  }

  span {
    font-family: NOTO;
    font-weight: 400;
  }
`;

const ItemContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 12px;

  img {
    width: 871px;
    align-self: center;
  }
`;

const AnswerContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;

  padding-left: 42px;
`;

export default P01;

const FILE_URL = '/A01/0003/02/A-MM1-0103-02-01.mp4';
