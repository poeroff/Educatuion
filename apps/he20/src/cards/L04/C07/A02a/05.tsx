import { BoxWrap, Input, Image, PinchZoom, Scroll, Typography, Tag, ETagLine } from '@maidt-cntn/ui';
import {
  Box,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  TMainHeaderInfoTypes,
  IQuestionProps,
  InputStatus,
  BottomSheet,
  EStyleFontSizes,
  Question,
} from '@maidt-cntn/ui';
import { dialogContentA02a, imgContentA02aP05, titleA02a } from './commonData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState, useRef } from 'react';
import ShowText from './ShowText';
import { Container } from '@maidt-cntn/ui/en';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C07A02a } from './store';
import usePageData from '@/hooks/usePageData';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const { imgSrc, imgAlt } = imgContentA02aP05;

type TAnswers = { value: string; answer: string; answer2: string };

const P05 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const [isTextOpen, setIsTextOpen] = useState(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C07A02a);
  const currentPage = 'P05';

  const data = [
    { value: '', answer: 'dentity', answer2: 'identity' },
    { value: '', answer: 'nequality', answer2: 'inequality' },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p05.answer2,
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p05.isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: cardData.p05.answer1,
          isAnswer: false,
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: cardData.p05.answer2,
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const handleButtonClick = () => {
    setIsTextOpen(true);
  };

  const handleTextClose = () => {
    setIsTextOpen(false);
  };

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer2: value } }));
    }
    changeData('P05', 1, subKey, value);
  };

  const handleSubmit = () => {
    if (cardData.p05.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }

    const isCorrect1 = isAnswer(cardData.p05.answer1, data[0].answer) || isAnswer(cardData.p05.answer1, data[0].answer2);
    const isCorrect2 = isAnswer(cardData.p05.answer2, data[1].answer) || isAnswer(cardData.p05.answer2, data[1].answer2);
    const isCorrect = isCorrect1 && isCorrect2;
    setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p05.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p05.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Read and Complete',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks to summarize the main text.',
    mark: cardData.p05.isSubmitted
      ? (isAnswer(cardData.p05.answer1, data[0].answer) || isAnswer(cardData.p05.answer1, data[0].answer2)) &&
        (isAnswer(cardData.p05.answer2, data[1].answer) || isAnswer(cardData.p05.answer2, data[1].answer2))
        ? 'correct'
        : 'incorrect'
      : 'none',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      onSubmit={handleSubmit}
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={cardData.p05.answer1 === '' || cardData.p05.answer2 === ''}
      submitBtnColor={
        cardData.p05.answer2 !== '' && cardData.p05.answer1 !== ''
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
    >
      <Box hAlign='right'>
        <Button minWidth='118px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={handleButtonClick} />
      </Box>
      <BoxWrap useFull>
        <Box width={'350px'} useFull>
          <PinchZoom>
            <Image width='350px' height='100%' ariaDescribedby='imgDesc' alt='' src={imgSrc} />
            <Box type='hidden' id='imgDesc'>
              <p tabIndex={101}>4 Ethical Concerns에 관한 인포그래픽</p>
              <p tabIndex={102}>
                6 i 빈칸 confusion: questioning our own humanity privacy worries: risks of illegal access and controlling our thoughts and emotions
                social 7 i 빈칸 : intensifying the social division due to the high cost
              </p>
              <p tabIndex={103}>의자에 앉아 노트북을 보고 있는 사람</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull>
          <Scroll height='100%'>
            <Box hAlign='center' paddingBottom={'10px'}>
              <Typography weight={'var(--font-weight-bold)'}>4. Ethical Concerns</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question type='dot' size='small'>
                confusion:
              </Question>
              <Typography weight={'var(--font-weight-bold)'}>6) i</Typography>
              <Input
                value={cardData.p05.answer1}
                minWidth='259px'
                onChange={event => handleInputChangeEvent(1, event.target.value)}
                maxLength={33}
                inputRef={inputRef2}
                placeholder='내용을 넣어 주세요.'
                status={
                  cardData.p05.answer1 !== ''
                    ? cardData.p05.isSubmitted && !(isAnswer(cardData.p05.answer1, data[0].answer) || isAnswer(cardData.p05.answer1, data[0].answer2))
                      ? InputStatus.ERROR
                      : InputStatus.DEFAULT
                    : InputStatus.ENABLE
                }
                inputSize='x-small'
                disabled={cardData.p05.isSubmitted}
                ariaLabel='6번 답란'
              />
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question size='small'>questioning our own humanity</Question>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question type='dot' size='small'>
                privacy worries: risks of illegal access and
              </Question>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question size='small'>controlling our thoughts and emotions</Question>
            </Box>

            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question type='dot' size='small'>
                social
              </Question>
              <Typography weight={'var(--font-weight-bold)'}>7) i</Typography>
              <Input
                value={cardData.p05.answer2}
                minWidth='259px'
                onChange={event => handleInputChangeEvent(2, event.target.value)}
                maxLength={33}
                inputRef={inputRef2}
                placeholder='내용을 넣어 주세요.'
                status={
                  cardData.p05.answer2 !== ''
                    ? cardData.p05.isSubmitted && !(isAnswer(cardData.p05.answer2, data[1].answer) || isAnswer(cardData.p05.answer2, data[1].answer2))
                      ? InputStatus.ERROR
                      : InputStatus.DEFAULT
                    : InputStatus.ENABLE
                }
                inputSize='x-small'
                disabled={cardData.p05.isSubmitted}
                ariaLabel='7번 답란'
              />
            </Box>
            <Box hAlign='flex'>
              <Question size='small'> : intensifying the social division due to the high cost</Question>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' flexDirection='column' display='flex'>
            <Typography useGap={false} size={EStyleFontSizes.MEDIUM} usePre>
              <p>6) dentity (identity도 정답 인정) </p>
              <p>7) nequality (inequality도 정답 인정)</p>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
      <ShowText title={titleA02a} content={dialogContentA02a} isTextOpen={isTextOpen} handleTextClose={handleTextClose} />
    </Container>
  );
};

export default P05;
