import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
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
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C08A03b } from './store';

const page = 'P01';
const pageKey = 'p01';

const P01 = ({ imgSrc, imgAlt }: { imgSrc: string; imgAlt: string }) => {
  const [isShow, setShow] = useState<boolean>(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A03b);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { answer, solution, isSubmitted, isCorrect } = cardData[pageKey];
  const isDisabled = !isNotEmptyString(answer);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Point 1 : Practice',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks with the correct forms of the given words.',
    mark: getMarking(isSubmitted, isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(p => p.page === page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = isAnswer(answer, solution);
      setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(page, userSubmission, isCorrect);
    }
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], answer: value } }));
    changeData(page, 1, 1, value);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(page);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isDisabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isDisabled}
      onSubmit={handleSubmit}
    >
      <Box>
        <TextView title='보기'>
          <Image src={imgSrc} width={'100%'} />
          <Box type='hidden'>{imgAlt}</Box>
        </TextView>
      </Box>
      <Box marginTop='24px'>
        <Box hAlign={'flex-start'}>
          <StyledTypography>
            <TextPartRight>1. The building manager asked the residents</TextPartRight>
            <Input
              width={'320px'}
              textAlign='start'
              value={answer}
              onChange={e => handleInputChange(e.target.value)}
              maxLength={70}
              placeholder={'내용을 넣어 주세요.'}
              aria-label='답란'
              status={isSubmitted && !isCorrect ? InputStatus.ERROR : isNotEmptyString(answer) ? InputStatus.ENABLE : InputStatus.DEFAULT}
              inputSize={'x-small'}
              readOnly={isSubmitted}
            />
            <TextPartLeft>the noise down at night.</TextPartLeft>
          </StyledTypography>
        </Box>
      </Box>
      <Box hAlign='flex-start' background='blue' border='transparent' useRound height='48px' marginTop='24px' paddingLeft='20px'>
        <Typography useGap={false} color='var(--color-blue-800)' style={{ fontSize: '24px' }}>
          제시어 : keep
        </Typography>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {solution}
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
  padding-left: 24px;
`;
