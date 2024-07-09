import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  ETagLine,
  Input,
  InputStatus,
  Scroll,
  TMainHeaderInfoTypes,
  TMarkType,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { L02C06A07Content } from '.';
import { HE20L02C06A07Atom } from './store';

const P02 = () => {
  const currentPage = 'P02';
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(HE20L02C06A07Atom);
  const { userId } = useRecoilValue(studentAtom);

  const solutions = ['ban', 'dark', 'patterns'];
  const defaultSubmission: userSubmissionType<string>[] = [
    {
      mainKey: 1,
      inputData: [1, 2, 3].map(subKey => ({
        subKey,
        type: 'TEXT',
        value: '',
        isAnswer: true,
      })),
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission<string>(userId, pageId);
      if ((userSubmissionList?.length ?? 0) > 0) {
        setCardData(prev => {
          const questions =
            userSubmissionList?.[0].inputData.map(({ value, isCorrect }, index) => {
              return {
                answer: value,
                isCorrect,
              };
            }) ?? [];
          return {
            ...prev,
            [currentPage]: {
              ...prev[currentPage],
              isSubmitted,
              questions,
            },
          };
        });
      }
      initData(currentPage, userSubmissionList!, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const handleSubmit = () => {
    if (cardData[currentPage].isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    setCardData(prev => ({ ...prev, [currentPage]: { ...prev[currentPage], isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: cardData[currentPage].questions.map((question, idx) => ({
          subKey: idx + 1,
          type: 'NUMBER',
          value: question.answer,
          isAnswer: true,
          isCorrect: isAnswer(question.answer ?? '', solutions[idx]),
        })),
      },
    ];
    submitData(currentPage, userSubmission);
  };

  const handleChange = ({ subKey, value }: { subKey: number; value: string }) => {
    setCardData(prev => {
      const newQuestions = prev[currentPage].questions.map((question, idx) => {
        if (idx === subKey - 1) {
          return { ...question, answer: value };
        }
        return question;
      });
      return {
        ...prev,
        [currentPage]: {
          ...prev[currentPage],
          questions: newQuestions,
        },
      };
    });
    changeData(currentPage, 1, subKey, value);
  };
  const { isSubmitted } = cardData[currentPage];

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const isValid = cardData[currentPage].questions.every(({ answer }) => !!answer);
  const isCorrect = cardData[currentPage].questions.every(({ answer }, idx) => isAnswer(answer ?? '', solutions[idx]));
  const markType: TMarkType = isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none';
  const submitLabel = isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitButtonColor = isSubmitted
    ? isShowAnswer
      ? EStyleButtonTypes.DEFAULT
      : EStyleButtonTypes.PRIMARY
    : isValid
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;
  const bodyId = 'H20-L02-C06-A07-P02';

  const [values, status] = useMemo(() => {
    const values = cardData[currentPage].questions.map(item => item.answer);

    const status = cardData[currentPage].questions.map((question, index) => {
      const submittedStatus = question.answer === solutions[index] ? InputStatus.ENABLE : InputStatus.ERROR;
      const submitBeforeStatus = question.answer ? InputStatus.ENABLE : InputStatus.DEFAULT;
      const status = isSubmitted ? submittedStatus : submitBeforeStatus;
      return status;
    });

    return [values, status] as [string[], InputStatus[]];
  }, [cardData, isSubmitted, solutions]);

  const headerText = 'Light Up Dark Patterns (5)';
  const headerInfo: TMainHeaderInfoTypes = {
    headerText,
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Q4. Fill in the blanks to complete the sentences.',
    mark: markType,
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      bodyId={bodyId}
      onSubmit={handleSubmit}
      submitDisabled={!isSubmitted && !isValid}
      submitLabel={submitLabel}
      submitBtnColor={submitButtonColor}
    >
      <Box width={'100%'} hAlign='flex-end' marginBottom={20}>
        <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} minWidth='132px' useRound onClick={openModal}>
          지문 보기
        </Button>
      </Box>
      <Box background={'white'} useRound>
        <Scroll height='300px'>
          <Box>
            What is the purpose of the EU’s Digital Service Act?
            <br />
            <ArrawContainer>→</ArrawContainer> The purpose of the EU’s Digital Service Act is to
            <Input
              inputSize='x-small'
              placeholder='내용을 넣어 주세요.'
              marginLeft={8}
              maxLength={50}
              value={values[0]}
              status={status[0]}
              minWidth='212px'
              width='212px'
              onChange={event =>
                handleChange({
                  subKey: 1,
                  value: event.target.value,
                })
              }
              readOnly={isSubmitted}
              aria-label='1번 답을 입력하세요.'
            />
            <Input
              inputSize='x-small'
              placeholder='내용을 넣어 주세요.'
              marginLeft={8}
              maxLength={50}
              value={values[1]}
              status={status[1]}
              minWidth='212px'
              width='212px'
              onChange={event =>
                handleChange({
                  subKey: 2,
                  value: event.target.value,
                })
              }
              readOnly={isSubmitted}
              aria-label='2번 답을 입력하세요.'
            />
            <Input
              inputSize='x-small'
              placeholder='내용을 넣어 주세요.'
              marginLeft={8}
              maxLength={50}
              value={values[2]}
              status={status[2]}
              minWidth='212px'
              width='212px'
              onChange={event =>
                handleChange({
                  subKey: 3,
                  value: event.target.value,
                })
              }
              readOnly={isSubmitted}
              aria-label='3번 답을 입력하세요.'
            />{' '}
            on online platforms.
          </Box>
        </Scroll>
      </Box>
      <BottomSheet bottomSheetTargetId={bodyId} height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px' display='flex' flexDirection='column'>
            {solutions.map((val, idx) => (
              <Typography key={'answer-' + (idx + 1)} useGap={false} usePre>
                ({idx + 1}) {val}
                {idx < solutions.length - 1 ? '\n' : null}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        width={921}
        height={500}
        isShow={isShowModal}
        closeLabel='확인'
        tabIndex={102}
        onClose={closeModal}
        useFooter={true}
        confirmLabel='확인'
      >
        <Box height={'15%'} background={'gray'} marginBottom={8} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
          <Typography weight={'bold'} size={EStyleFontSizes.MEDIUM}>
            {headerText}
          </Typography>
        </Box>
        <Typography>
          <L02C06A07Content />
        </Typography>
      </Dialog>
    </Container>
  );
};

const ArrawContainer = styled.span`
  font-family: none;
`;

export default P02;
