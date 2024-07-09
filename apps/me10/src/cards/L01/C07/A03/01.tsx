import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TMainHeaderInfoTypes,
  IQuestionProps,
  EStyleSizes,
  EStyleButtonTypes,
  Button,
  Input,
  Label,
  BottomSheet,
  Tag,
  ETagLine,
  InputStatus,
} from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';
import { L01C07A03, getDialogText } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C07A03);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowAnswer, setShowAnswer] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'readAndWrite',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: '빈칸에 알맞은 말을 본문에서 찾아 등장인물이 한 말을 완성해 봅시다.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const solutionText = `1) ${cardData.p01.solution1} \n 2) ${cardData.p01.solution2}`;

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const getButtonStatus = (answer: string, solution: string, isSubmitted: boolean) => {
    if (!isSubmitted) {
      return '';
    }

    return !isAnswer(answer, solution) ? InputStatus.ERROR : InputStatus.ENABLE;
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2)}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2)
          ? EStyleButtonTypes.SECONDARY
          : isShowAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <Box useFull>
        <Box hAlign='flex-end'>
          <Button
            tabIndex={101}
            minWidth='96px'
            size={EStyleSizes.SMALL}
            color={EStyleButtonTypes.SECONDARY}
            label='지문 보기'
            useRound
            onClick={() => setIsShowDialog(!isShowDialog)}
          />{' '}
        </Box>
        <Box padding='20px 0'>
          <Box hAlign='start'>
            <Box padding='19px 11px'>
              <Label value={1} />
            </Box>
            <Balloon place='right' backgroundColor='var(--color-pink-100)' ariaLabel='' isShadow>
              <Typography>I</Typography>
              <Input
                value={cardData.p01.answer1}
                onChange={e => handleChange(1, e.target.value)}
                status={getButtonStatus(cardData.p01.answer1, cardData.p01.solution1, cardData.p01.isSubmitted)}
                minWidth='243px'
                placeholder='내용을 넣어 주세요'
                ariaLabel='1번 답 입력란'
                readOnly={cardData.p01.isSubmitted}
                maxLength={100}
              />
              <Typography>my students' names with sticky notes.</Typography>
            </Balloon>
          </Box>

          <Box hAlign='start' marginTop={48}>
            <Box padding='19px 11px'>
              <Label value={2} />
            </Box>
            <Balloon place='right' backgroundColor='var(--color-purple-100)' ariaLabel='' isShadow>
              <Typography>With a Band-Aid, I'm</Typography>
              <Input
                value={cardData.p01.answer2}
                onChange={e => handleChange(2, e.target.value)}
                status={getButtonStatus(cardData.p01.answer2, cardData.p01.solution2, cardData.p01.isSubmitted)}
                minWidth='243px'
                placeholder='내용을 넣어 주세요'
                ariaLabel='2번 답 입력란'
                readOnly={cardData.p01.isSubmitted}
                maxLength={100}
              />
              <Typography>.</Typography>
            </Balloon>
          </Box>
        </Box>
      </Box>

      {getDialogText(isShowDialog, () => setIsShowDialog(!isShowDialog))}

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{solutionText}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
