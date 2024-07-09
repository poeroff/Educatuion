import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  TMainHeaderInfoTypes,
  Typography,
  PinchZoom,
  EImageType,
  Image,
  Scroll,
  BottomSheet,
  Tag,
  ETagLine,
  Input,
  InputStatus,
  EStyleButtonTypes,
  Button,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L03C07A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Paragraph } from './01';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const PAGE_NUMBER = 'P03';
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C07A02a);
  const { userId } = useRecoilValue(studentAtom);
  const [isAnswerShow, setIsAnswerShow] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: cardData.headerText,
  };

  const questionInfo = {
    text: cardData.questionText,
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
      ],
    },
  ];

  const altText = `글의 구조가 보이는 인포그래픽
제목How Noise-Cancellation Works
소제목 Scientific Principle
내용 Constructive Interference와 3 D 빈칸 Interference에 관한 문장`;

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAnswers = userSubmissionList[0].inputData?.map((data: { value: string }) => data.value) || cardData.p03.answers;
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answers: newAnswers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData.p03.isSubmitted) {
      const { answers } = cardData.p03;
      const isCorrectAll = answers.every((answer, index) => isAnswer(answer, [cardData.p03.solutions[index], cardData.p03.solutions2[index]]));
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrectAll } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answers[0],
              isAnswer: true,
              isCorrect: isAnswer(answers[0], [cardData.p03.solutions[0], cardData.p03.solutions2[0]]),
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answers[1],
              isAnswer: true,
              isCorrect: isAnswer(answers[1], [cardData.p03.solutions[1], cardData.p03.solutions2[1]]),
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p03.answers[2],
              isAnswer: true,
              isCorrect: isAnswer(answers[2], [cardData.p03.solutions[2], cardData.p03.solutions2[2]]),
            },
          ],
          isCorrect: isCorrectAll,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrectAll);
    } else {
      setIsAnswerShow(isAnswerShow => !isAnswerShow);
    }
  };

  const getButtonColor = () => {
    const { answers, isSubmitted } = cardData.p03;

    if (!isSubmitted) {
      return !answers.some(answers => answers === '') ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isAnswerShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleChangeAnswer = (i: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const { answers } = cardData.p03;
    const newAnswers = [...answers];
    newAnswers[i] = event.target.value;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answers: newAnswers } }));
    changeData(PAGE_NUMBER, 1, i + 1, event.target.value);
  };

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
      submitLabel={cardData.p03.isSubmitted ? (isAnswerShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={(cardData.p03.isSubmitted || cardData.p03.answers.some(answer => answer === '')) && !cardData.p03.isSubmitted && !isAnswerShow}
      submitBtnColor={getButtonColor()}
      onSubmit={handleSubmit}
    >
      <Box display='flex' gap={'8px'}>
        <Box hAlign='center'>
          <PinchZoom pinchType={'image'}>
            <Image type={EImageType.IMG} src={'/L03/C07/A02/HE1-L03-C07-A02a-P03.jpg'} width='320px' height='378px' alt={altText} />
          </PinchZoom>
        </Box>

        <Box width={'100%'} display='flex' flexDirection='column'>
          <Box hAlign='right'>
            <Button
              minWidth='96px'
              size={EStyleSizes.SMALL}
              color={EStyleButtonTypes.SECONDARY}
              label='지문보기'
              ariaLabel='지문보기'
              onClick={handleButtonClick}
              useRound
            />
          </Box>
          <Scroll>
            <Box width='100%' flexDirection='column' vAlign='center' gap={'12px'}>
              <Box padding={'8px, 12px, 8px, 12px'}>
                <Typography weight={'var(--font-weight-bold)'} fontSize='var(--font-size-32)' lineHeight='40px'>
                  3) D
                  <Input
                    value={cardData.p03.answers[0]}
                    onChange={handleChangeAnswer(0!)}
                    maxLength={100}
                    ariaLabel={`서술 답안 입력란 3`}
                    status={
                      cardData.p03.isSubmitted
                        ? !isAnswer(cardData.p03.answers[0], [cardData.p03.solutions[0], cardData.p03.solutions2[0]])
                          ? InputStatus.ERROR
                          : InputStatus.DEFAULT
                        : InputStatus.ENABLE
                    }
                    readOnly={cardData.p03.isSubmitted}
                    width='180px'
                  />{' '}
                  Interference
                </Typography>
              </Box>

              <Box gap={'6px'} display='flex'>
                <Typography lineHeight='40px'>
                  The peak of one sound wave overlaps with the{' '}
                  <Typography weight={'var(--font-weight-bold)'} useGap={false}>
                    4)
                  </Typography>{' '}
                  v
                  <Input
                    value={cardData.p03.answers[1]}
                    onChange={handleChangeAnswer(1!)}
                    maxLength={100}
                    ariaLabel={`서술 답안 입력란 4`}
                    status={
                      cardData.p03.isSubmitted
                        ? !isAnswer(cardData.p03.answers[1], [cardData.p03.solutions[1], cardData.p03.solutions2[1]])
                          ? InputStatus.ERROR
                          : InputStatus.DEFAULT
                        : InputStatus.ENABLE
                    }
                    readOnly={cardData.p03.isSubmitted}
                    width='180px'
                  />{' '}
                  of another wave, which results in a{' '}
                  <Typography weight={'var(--font-weight-bold)'} useGap={false}>
                    5)
                  </Typography>{' '}
                  q
                  <Input
                    value={cardData.p03.answers[2]}
                    onChange={handleChangeAnswer(2!)}
                    maxLength={100}
                    ariaLabel={`서술 답안 입력란 5`}
                    status={
                      cardData.p03.isSubmitted
                        ? !isAnswer(cardData.p03.answers[2], [cardData.p03.solutions[2], cardData.p03.solutions2[2]])
                          ? InputStatus.ERROR
                          : InputStatus.DEFAULT
                        : InputStatus.ENABLE
                    }
                    readOnly={cardData.p03.isSubmitted}
                    width='180px'
                  />{' '}
                  sound silence.
                </Typography>
              </Box>
            </Box>
          </Scroll>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} usePre>
              {cardData.p03.solutions.map((solution, index) => (
                <Box key={solution + index}>
                  <Typography>
                    {index + 3}) {solution}
                    {cardData.p03.solutions2[index] && `(${cardData.p03.solutions2[index]}도 정답 인정)`}
                  </Typography>
                </Box>
              ))}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Paragraph isOpen={isDialogOpen} handleClose={handleDialogClose} />
    </Container>
  );
};

export default P03;
