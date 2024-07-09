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

const P02 = () => {
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
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
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

  const solutionText = `1) ${cardData.p02.solution1} \n 2) ${cardData.p02.solution2}`;

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2)
          ? EStyleButtonTypes.SECONDARY
          : isShowAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      useExtend
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
          />
        </Box>
        <Box padding='20px 0'>
          <Box hAlign='start'>
            <Box padding='19px 11px'>
              <Label value={3} />
            </Box>
            <Balloon place='right' backgroundColor='var(--color-blue-100)' ariaLabel='' isShadow>
              <Typography>I have some candy. They are</Typography>
              <Input
                value={cardData.p02.answer1}
                onChange={e => handleChange(1, e.target.value)}
                status={getButtonStatus(cardData.p02.answer1, cardData.p02.solution1, cardData.p02.isSubmitted)}
                minWidth='243px'
                placeholder='내용을 넣어 주세요'
                ariaLabel='3번 답 입력란'
                readOnly={cardData.p02.isSubmitted}
                maxLength={100}
              />
              <Typography>, like your smiles.</Typography>
            </Balloon>
          </Box>

          <Box hAlign='start' marginTop={48}>
            <Box padding='19px 11px'>
              <Label value={4} />
            </Box>
            <Balloon place='right' backgroundColor='var(--color-yellow-100)' ariaLabel='' isShadow>
              <Typography>I hold a ball</Typography>
              <Input
                value={cardData.p02.answer2}
                onChange={e => handleChange(2, e.target.value)}
                status={getButtonStatus(cardData.p02.answer2, cardData.p02.solution2, cardData.p02.isSubmitted)}
                minWidth='243px'
                placeholder='내용을 넣어 주세요'
                ariaLabel='4번 답 입력란'
                readOnly={cardData.p02.isSubmitted}
                maxLength={100}
              />
              <Typography>and my stress goes away.</Typography>
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

export default P02;
