import { Container, TextBoard } from '@maidt-cntn/ui/en';
import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  BoxWrap,
  Input,
  Typography,
  List,
  EStyleFontSizes,
  InputStatus,
  IQuestionProps,
  BottomSheet,
  ETagLine,
  Tag,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L04C09A02 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L04C09A02);
  const [isShow, setShow] = useState(false);
  const pageNumber = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Analyze',
  };

  const questionInfo: IQuestionProps = {
    text: 'Read the description of the graph and complete the table.',
    size: 'medium',
    mark: cardData[pageNumber].isSubmitted ? (cardData[pageNumber].isCorrect ? 'correct' : 'incorrect') : 'none',
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
          [pageNumber]: {
            ...prev[pageNumber],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleOnSubmit = () => {
    if (cardData[pageNumber].isSubmitted) {
      setShow(show => !show);
    } else {
      const isCorrect = isAnswer(cardData[pageNumber].answer, cardData[pageNumber].solution);
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageNumber].answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], answer: value } }));
    changeData(pageNumber, 1, 1, value);
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
      submitLabel={cardData[pageNumber].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleOnSubmit}
      submitDisabled={!isNotEmptyString(cardData[pageNumber].answer)}
      submitBtnColor={
        isNotEmptyString(cardData[pageNumber].answer) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap height='calc(100% - 108px)'>
        <Box hAlign='center' useFull>
          <TextBoard color='var(--color-green-100)'>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM} weight='var(--font-weight-bold)'>
                Topic
              </Typography>
            </Box>
            <Box>
              <Typography useGap={false}>
                The graph on the left displays the recycling rates for four distinct material types in Korea in 2020: waste paper, glass, plastic, and
                metal.
              </Typography>
            </Box>
          </TextBoard>
        </Box>
        <Box display='flex' flexDirection='column' justifyContent='center' gap='12px' useFull>
          <Box display='flex' hAlign='center'>
            <Typography weight='var(--font-weight-bold)'>Topic</Typography>
          </Box>
          <Box hAlign='center' vAlign='flex-start'>
            <Box paddingLeft='48px'>
              <Typography>
                the recycling rates for distinct 1)&nbsp;
                <Input
                  width='245px'
                  value={cardData[pageNumber].answer}
                  onChange={e => handleChange(e.target.value)}
                  maxLength={Math.max(...cardData.wordArr.map(word => word.length)) + 3}
                  readOnly={cardData[pageNumber].isSubmitted}
                  placeholder='내용을 넣어 주세요.'
                  status={
                    cardData[pageNumber].isSubmitted && !cardData[pageNumber].isCorrect
                      ? InputStatus.ERROR
                      : isNotEmptyString(cardData[pageNumber].answer)
                      ? InputStatus.ENABLE
                      : InputStatus.DEFAULT
                  }
                  ariaLabel='1번 문제의 답란'
                />
                &nbsp;types in Korea in 2020
              </Typography>
            </Box>
          </Box>
        </Box>
      </BoxWrap>

      <Box>
        <TextView title='보기'>
          <List align='horizontal' data={cardData.wordArr} row={({ value }) => <Typography>{value}</Typography>} />
        </TextView>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>{cardData[pageNumber].solution}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
