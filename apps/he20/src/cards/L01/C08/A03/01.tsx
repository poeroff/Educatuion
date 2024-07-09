import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Image,
  Input,
  InputStatus,
  IQuestionProps,
  PinchZoom,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L01C08A03 } from './store';
import { studentAtom } from '@/stores/student';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageNumber = 'P01';
  const pageKey = 'p01';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A03);
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Write the given words in the correct order.',
    mark: cardData[pageKey].isSubmitted ? (cardData[pageKey].isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onGrade = () => {
    if (cardData[pageKey].isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = isAnswer(cardData[pageKey].answer, cardData[pageKey].solution);
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].answer,
              isAnswer: true,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const truncateValue = truncateToMaxBytes(value);
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: truncateValue } }));
    changeData(pageNumber, 1, subKey, truncateValue);
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={!cardData[pageKey].answer}
      onSubmit={onGrade}
      submitBtnColor={!cardData[pageKey].answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <Box>
        <TextView title='보기'>
          <PinchZoom>
            <Image src={'/L01/C08/A03/HE2-L01-C08-A03-P01.jpg'} width={'736px'} alt='' ariaDescribedby='imgDesc' />
            <Box type='hidden' id='imgDesc'>
              <p>이 이미지는 퍼즐 조각 모양으로 나뉜 텍스트를 보여준다. 각 조각은 다음과 같은 문장을 구성한다:</p>
              <p>첫 번째 조각: "Molly seems to be adapting well,"</p>
              <p>두 번째 조각: "and"</p>
              <p>세 번째 조각: "I expect" (expect는 빨간색 글씨로 작성됨)</p>
              <p>네 번째 조각: "her" (her는 초록색 글씨로 작성됨)</p>
              <p>다섯 번째 조각: "to get better soon." (to get은 파란색 글씨로 작성됨)</p>
              <p>이 조각들이 합쳐져서 "Molly seems to be adapting well, and I expect her to get better soon."라는 문장이 된다.</p>
            </Box>
          </PinchZoom>
        </TextView>
      </Box>
      <Box marginTop='24px'>
        <Box hAlign={'flex-start'}>
          <StyledTypography>
            <TextPartRight>1. The building manager</TextPartRight>
            <Input
              width={'400px'}
              textAlign='start'
              inputSize={'x-small'}
              placeholder={'내용을 넣어 주세요.'}
              maxLength={2000}
              value={cardData[pageKey].answer}
              onChange={event => handleChange(1, event.target.value)}
              readOnly={cardData[pageKey].isSubmitted}
              ariaLabel='답란'
              status={
                cardData[pageKey].isSubmitted && !cardData[pageKey].isCorrect
                  ? InputStatus.ERROR
                  : !isNotEmptyString(cardData[pageKey].answer)
                  ? InputStatus.DEFAULT
                  : InputStatus.ENABLE
              }
            />
            <TextPartLeft>the noise down at night.</TextPartLeft>
          </StyledTypography>
        </Box>
      </Box>

      <Box hAlign='flex-start' backgroundColor='var(--color-blue-50)' border='transparent' useRound height='48px' marginTop='24px' paddingLeft='20px'>
        <Typography useGap={false} color='var(--color-blue-800)' style={{ fontSize: '24px' }}>
          제시어: keep / to / the residents / asked
        </Typography>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              asked the residents to keep
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

const StyledTypography = styled(Typography)`
  display: block;
  position: relative;
  max-width: 100%;
`;
const TextPartRight = styled.span`
  display: inline;
  padding-right: 12px;
`;
const TextPartLeft = styled.span`
  display: inline;
  padding-left: 12px;
`;
