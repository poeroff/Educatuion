import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ESvgType,
  ETagLine,
  Image,
  Input,
  InputStatus,
  IQuestionProps,
  PinchZoom,
  SvgIcon,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import { isAnswer, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L04C08A05 } from './store';
import { studentAtom } from '@/stores/student';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageNumber = 'P03';
  const pageKey = 'p03';
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C08A05);
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Combine the two sentences using the structure above.',
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
            <Image src={'/L04/C08/A05/HE2-L04-C08-A05-P01.jpg'} width={'636px'} alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>이미지에는 두 개의 문장이 퍼즐 조각처럼 나뉘어져 있다.</p>
              <p>첫 번째 조각: "There's a risk"는 "a risk"가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.</p>
              <p>두 번째 조각: "that"는 빨간색으로 강조되어 있다.</p>
              <p>
                세 번째 조각: "organizations could access personal data without permission."는 "organizations could access personal data without
                permission."가 파란색으로 강조되어 있으며 나머지는 검은색으로 표시되어 있다.
              </p>
            </Box>
          </PinchZoom>
        </TextView>
      </Box>
      <Box marginTop='24px'>
        <Box>
          <StyledTypography>3. The athlete recalled the last Olympic Games. He set a new world record at that time.</StyledTypography>
        </Box>
        <Box hAlign={'flex-start'}>
          <StyledTypography>
            <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
            <Input
              width={'500px'}
              textAlign='start'
              placeholder={'내용을 넣어 주세요.'}
              inputSize={'x-small'}
              value={cardData[pageKey].answer}
              onChange={event => handleChange(1, event.target.value)}
              maxLength={2000}
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
            <TextPartLeft>is widely accepted in many cultures.</TextPartLeft>
          </StyledTypography>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              The belief that honesty is the best policy
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const StyledTypography = styled(Typography)`
  display: block;
  position: relative;
  max-width: 100%;
`;
const TextPartLeft = styled.span`
  display: inline;
  padding-left: 12px;
`;
const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  padding-right: 12px;
`;
