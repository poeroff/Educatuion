import { BoxWrap, Input, Image, PinchZoom, Scroll, Typography, Tag, ETagLine, Question } from '@maidt-cntn/ui';
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
} from '@maidt-cntn/ui';
import { dialogContentA02a, imgContentA02aP06, titleA02a } from './commonData';
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
const { imgSrc, imgAlt } = imgContentA02aP06;

type TAnswers = { value: string; answer: string; answer2: string };

const P06 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const [isTextOpen, setIsTextOpen] = useState(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C07A02a);
  const currentPage = 'P06';

  const data = [{ value: '', answer: 'rior', answer2: 'prior' }];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p06: {
            ...prev.p06,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p06.answer,
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p06.isSubmitted,
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
          value: cardData.p06.answer,
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const handleInputChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p06: { ...prev.p06, answer: e.target.value } }));
    changeData(currentPage, 1, 1, e.target.value);
  };

  const handleButtonClick = () => {
    setIsTextOpen(true);
  };

  const handleTextClose = () => {
    setIsTextOpen(false);
  };

  const handleSubmit = () => {
    if (cardData.p06.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = isAnswer(cardData.p06.answer, data[0].answer) || isAnswer(cardData.p06.answer, data[0].answer2);
    setCardData(prev => ({ ...prev, p06: { ...prev.p06, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p06.answer,
            isAnswer: true,
            isCorrect: cardData.p06.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };
  useEffect(() => {
    if (inputRef1.current) {
      inputRef1.current.style.width = `${inputRef1.current.scrollWidth}px`;
      inputRef1.current.style.maxWidth = '350px';
    }
  }, [data[0].value]);

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
    mark: cardData.p06.isSubmitted
      ? isAnswer(cardData.p06.answer, data[0].answer) || isAnswer(cardData.p06.answer, data[0].answer2)
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
      submitLabel={cardData.p06.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={cardData.p06.answer === ''}
      submitBtnColor={cardData.p06.answer !== '' ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <Box hAlign='right'>
        <Button minWidth='118px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={handleButtonClick} />
      </Box>
      <BoxWrap useFull>
        <Box width={'350px'} useFull>
          <PinchZoom>
            <Image width='350px' height='100%' ariaDescribedby='imgDesc' alt='' src={imgSrc} />
            <Box type='hidden' id='imgDesc'>
              <p tabIndex={101}>5 Solutions에 관한 인포그래픽</p>
              <p tabIndex={102}>carefully consider neuroethics establish a 8 p 빈칸 review process</p>
              <p tabIndex={103}>보드판 앞에 서서 이야기하고 있는 세 사람</p>
            </Box>
          </PinchZoom>
        </Box>
        <Box useFull>
          <Scroll height='100%'>
            <Box hAlign='center' paddingBottom={'10px'}>
              <Typography weight={'var(--font-weight-bold)'}>5. solutions</Typography>
            </Box>
            <Box>
              <Question type='dot' size='small'>
                carefully consider neuroethics
              </Question>
            </Box>
            <Box display='flex' whiteSpace='nowrap'>
              <Question type='dot' size='small'>
                establish a
              </Question>
              <Typography weight={'var(--font-weight-bold)'}>8) p</Typography>
              <Input
                value={cardData.p06.answer}
                minWidth='259px'
                onChange={handleInputChangeEvent}
                maxLength={33}
                inputRef={inputRef1}
                placeholder='내용을 넣어 주세요.'
                status={
                  cardData.p06.answer !== ''
                    ? cardData.p06.isSubmitted && !(isAnswer(cardData.p06.answer, data[0].answer) || isAnswer(cardData.p06.answer, data[0].answer2))
                      ? InputStatus.ERROR
                      : InputStatus.DEFAULT
                    : InputStatus.ENABLE
                }
                inputSize='x-small'
                disabled={cardData.p06.isSubmitted}
                ariaLabel='8번 답란'
              />
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Question size='small'>review process</Question>
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
              <p>8) rior (prior도 정답 인정) </p>
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
      <ShowText title={titleA02a} content={dialogContentA02a} isTextOpen={isTextOpen} handleTextClose={handleTextClose} />
    </Container>
  );
};

export default P06;
