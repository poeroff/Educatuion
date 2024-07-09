import { useEffect, useMemo, useRef, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Scroll,
  Button,
  Input,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  Dialog,
  EStyleFontSizes,
  BottomSheet,
  SvgIcon,
  ESvgType,
  InputStatus,
  ETagLine,
  Tag,
  IQuestionProps,
  BoxWrap,
  TMarkType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { HE20L03C06A03aAtom } from './store';
import { getInputStatus, isAnswer, isNumber } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const currentPage = 'P02';
  const [openText, setOpenText] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(HE20L03C06A03aAtom);
  const [isShow, setIsShow] = useState<boolean>(false);

  const defaultSubmission: userSubmissionType<string>[] = [
    {
      mainKey: 1,
      inputData: [1, 2].map(subKey => ({
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
      setCardData(prev => ({ ...prev, [currentPage]: { ...prev[currentPage], isInited: true } }));
      if ((userSubmissionList?.length ?? 0) > 0) {
        setCardData(prev => {
          const questions =
            userSubmissionList?.[0].inputData.map((data, index) => {
              const solution = prev[currentPage].questions[index].solution;
              return {
                answer: data.value,
                solution,
                isCorrect: isAnswer(data.value ?? '', solution ?? ''),
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

  const submitAnswer = () => {
    if (cardData[currentPage].isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    setCardData(prev => ({ ...prev, [currentPage]: { ...prev[currentPage], isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: cardData[currentPage].questions.map((question, idx) => ({
          subKey: idx + 1,
          type: 'TEXT',
          value: question.answer,
          isAnswer: isAnswer(question.answer ?? '', question.solution ?? ''),
        })),
      },
    ];

    submitData(currentPage, userSubmission);
  };

  const handleChange = ({ subKey, value }: { subKey: number; value: string }) => {
    if (isNumber(value))
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
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'From Shadows to Spotlights (1)',
    headerPattern: 'text',
  };
  const markType: TMarkType = isSubmitted
    ? cardData[currentPage].questions.every(question => isAnswer(question.answer ?? '', question.solution ?? ''))
      ? 'correct'
      : 'incorrect'
    : 'none';
  const questionInfo: IQuestionProps = {
    text: 'Q1. Fill in the blanks to complete the sentences.',
    mark: markType,
  };

  const contents =
    'Welcome to the Dream Art Gallery! \n I’m Isabel Williams, the docent for the From Shadows to Spotlights exhibit. \n Today, you’re going to meet three amazing artists who never gave up on their art, despite challenges in their lives. \n Each artist has a unique painting style and story that has made their work highly valued. \n Let’s explore each artist’s life and artwork.';

  const bodyId = 'L03C06A03aP01';
  const submitLabel = isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';

  const status = cardData[currentPage].questions.map(question => {
    const isCorrect = isAnswer(question.answer ?? '', question.solution ?? '');
    const submittedStatus = getInputStatus(isCorrect, question.answer ?? '');
    const submitBeforeStatus = question.answer ? InputStatus.ENABLE : InputStatus.DEFAULT;
    const status = isSubmitted ? submittedStatus : submitBeforeStatus;
    return status;
  });
  const isValid = cardData[currentPage].questions.every((question, index) => {
    return question.answer !== undefined && question.answer !== '';
  });

  const [subKey1Value, subKey2Value] = useMemo(() => {
    return cardData[currentPage].questions.map(({ answer }) => `${answer ?? ''}`);
  }, [cardData]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      bodyId={bodyId}
      onSubmit={submitAnswer}
      submitLabel={submitLabel}
      submitDisabled={!isValid}
      submitBtnColor={isSubmitted ? (isShow ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign='flex-end'>
          <Button
            size={EStyleSizes.SMALL}
            color={EStyleButtonTypes.SECONDARY}
            label='지문보기'
            useRound
            tabIndex={101}
            onClick={() => {
              setOpenText(true);
            }}
          />
        </Box>
      </BoxWrap>
      {openText && (
        <Dialog
          width={893}
          height={458}
          topHeight={50}
          useHeader
          header={() => (
            <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
              <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
                From Shadows to Spotlights (1)
              </Typography>
            </Box>
          )}
          isShow={openText}
          onClose={() => setOpenText(false)}
          useFooter={true}
          closeLabel={'지문 닫기'}
        >
          <Typography tabIndex={101} useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            {contents}
          </Typography>
        </Dialog>
      )}
      <Box background={'white'} useRound>
        <Scroll height='100%'>
          What is the topic of today’s exhibition? <br />
          <StyledIcon src={RightArrowIcon} type={ESvgType.IMG} />
          <TextPartLeft>The exhibition is about </TextPartLeft>
          <Input
            value={subKey1Value}
            minWidth='259px'
            onChange={({ target: { value } }) => handleChange({ subKey: 1, value })}
            maxLength={33}
            inputRef={inputRef1}
            placeholder='내용을 넣어 주세요.'
            status={status[0]}
            inputSize='x-small'
            disabled={isSubmitted}
          />{' '}
          who never gave up on their art, despite{' '}
          <Input
            value={subKey2Value}
            minWidth='259px'
            maxLength={33}
            onChange={({ target: { value } }) => handleChange({ subKey: 2, value })}
            inputRef={inputRef2}
            placeholder='내용을 넣어 주세요.'
            status={status[1]}
            inputSize='x-small'
            disabled={isSubmitted}
          />{' '}
          in their lives.
        </Scroll>
      </Box>
      <BottomSheet bottomSheetTargetId={bodyId} height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' flexDirection='column' display='flex'>
            {cardData[currentPage].questions.map(({ solution }) => (
              <Typography useGap={false} key={solution} size={EStyleFontSizes.MEDIUM} usePre>
                {solution}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const TextPartLeft = styled.span`
  display: inline;
  padding-left: 12px;
`;

const StyledIcon = styled(SvgIcon)`
  vertical-align: middle;
  padding-right: 12px;
`;
