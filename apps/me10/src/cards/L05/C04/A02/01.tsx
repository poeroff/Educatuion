import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Label,
  List,
  Radio,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C04A02 } from './store';

const P01 = () => {
  const pageNumber = 'P01';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L05C04A02);
  const { userId } = useRecoilValue(studentAtom);

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

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: -1,
          isCorrect: false,
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
            userInputNumber: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].userInputNumber,
            isSubmitted: isSubmitted,
            isCorrect: isAnswer(
              userSubmissionList[0].inputData[0]?.value + '' || cardData[pageNumber].userInputNumber + '',
              cardData[pageNumber].solutionNumber + '',
            ),
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData[pageNumber].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true } }));

      const isCorrect = isAnswer(cardData[pageNumber].userInputNumber + '', cardData[pageNumber].solutionNumber + '');
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData[pageNumber].userInputNumber,
              isCorrect: isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(pageNumber, userSubmission, isCorrect);
    }
  };

  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const isSubmittable = cardData[pageNumber].userInputNumber !== -1;

  const toggleAnswer = () => {
    setIsAnswerShow(prev => !prev);
  };

  const handleRadioOnChange = (value: number) => {
    setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInputNumber: value } }));
    changeData(pageNumber, 1, 1, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Green Volunteers: Step 1',
  };

  const questionInfo: IQuestionProps = {
    text: '사진을 보고, 어떤 봉사 활동에 관한 것인지 골라 봅시다.',
    mark: getMarking(cardData[pageNumber].isSubmitted, isAnswer(cardData[pageNumber].userInputNumber + '', cardData[pageNumber].solutionNumber + '')),
  };

  const data = [
    {
      text: 'cleaning up the field',
    },
    {
      text: 'planting trees in the park',
    },
    {
      text: 'writing cards for children in hospitals',
    },
  ];

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageNumber].isSubmitted ? (!isAnswerShow ? '답안보기' : '답안닫기') : '채점하기'}
      submitDisabled={!isSubmittable}
      submitBtnColor={
        !cardData[pageNumber].isSubmitted
          ? isSubmittable
            ? EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.SECONDARY
          : !isAnswerShow
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.GRAY
      }
      onSubmit={!cardData[pageNumber].isSubmitted ? handleSubmit : toggleAnswer}
    >
      <BoxWrap useFull>
        <Box width='317px' hAlign={'center'} useFull>
          <Image src={'/L05/C04/A02/ME1-L05-C04-A02-P01.jpg'} width='329px' height='207px' alt='학생들이 공원에 나무를 심는 봉사활동을 하고 있다.' />
        </Box>
        <Box hAlign={'center'} useFull>
          <List gap={24} data={data}>
            {({ value, index = 1 }) => (
              <Radio
                type={'box'}
                align='vertical'
                name={'radio-question-A'}
                label={value?.text}
                value={cardData[pageNumber].userInputNumber === index}
                defaultValue={cardData[pageNumber].userInputNumber === index}
                ariaLabel={`답안 ${index}번`}
                disabled={cardData[pageNumber].isSubmitted}
                isError={cardData[pageNumber].isSubmitted && cardData[pageNumber].userInputNumber !== cardData[pageNumber].solutionNumber}
                onClick={() => {
                  handleRadioOnChange(index);
                }}
              >
                <Box padding={'6px 0'} whiteSpace='nowrap'>
                  <Label value={index} />
                  <Typography>{value?.text}</Typography>
                </Box>
              </Radio>
            )}
          </List>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'답안'} />
          </Box>
          <Box marginTop='12px'>{cardData[pageNumber].solutionNumber}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
