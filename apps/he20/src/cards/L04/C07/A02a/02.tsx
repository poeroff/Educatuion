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
} from '@maidt-cntn/ui';
import { dialogContentA02a, imgContentA02aP02, titleA02a } from './commonData';
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
const { imgSrc, imgAlt } = imgContentA02aP02;

const P02 = () => {
  const { changeData, initData, saveData, submitDataWithResult } = usePageData();
  const [isTextOpen, setIsTextOpen] = useState(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C07A02a);
  const currentPage = 'P02';

  const data = { value: '', answer: 'ervous', answer2: 'nervous' };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted: userSubmissionList[0].inputData[0]?.isAnswer || cardData.p02.isSubmitted,
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
          value: cardData.p02.answer,
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const handleInputChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: e.target.value } }));
    changeData(currentPage, 1, 1, e.target.value);
  };

  const handleButtonClick = () => {
    setIsTextOpen(true);
  };

  const handleTextClose = () => {
    setIsTextOpen(false);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = isAnswer(cardData.p02.answer, data.answer) || isAnswer(cardData.p02.answer, data.answer2);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer,
            isAnswer: true,
            isCorrect: cardData.p02.isCorrect,
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
  }, [data.value]);

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
    mark: cardData.p02.isSubmitted
      ? isAnswer(cardData.p02.answer, data.answer) || isAnswer(cardData.p02.answer, data.answer2)
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={cardData.p02.answer === ''}
      submitBtnColor={cardData.p02.answer !== '' ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <Box hAlign='right'>
        <Button minWidth='118px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={handleButtonClick} />
      </Box>
      <BoxWrap useFull>
        <Box width={'350px'} useFull>
          <PinchZoom>
            <Image
              width='350px'
              height='100%'
              alt='1 AI-Powered Neural Implants에 관한 인포그래픽
                    medical devices which can be
                    implanted in the 1 n 빈칸 system 
                    인공지능을 가진 사람 얼굴 형태
                    '
              src={imgSrc}
            />
          </PinchZoom>
        </Box>
        <Box useFull>
          <Scroll height='100%'>
            <Box hAlign='center' paddingBottom={'10px'}>
              <Typography weight={'var(--font-weight-bold)'}>1. AI-Powered Neural Implants</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>medical devices which can be implanted</Typography>
            </Box>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>in the</Typography>
              <Typography weight={'var(--font-weight-bold)'}>1) n</Typography>
              <Input
                value={cardData.p02.answer}
                minWidth='259px'
                onChange={handleInputChangeEvent}
                maxLength={33}
                inputRef={inputRef1}
                placeholder='내용을 넣어 주세요.'
                status={
                  cardData.p02.answer !== ''
                    ? cardData.p02.isSubmitted && !(isAnswer(cardData.p02.answer, data.answer) || isAnswer(cardData.p02.answer, data.answer2))
                      ? InputStatus.ERROR
                      : InputStatus.DEFAULT
                    : InputStatus.ENABLE
                }
                inputSize='x-small'
                disabled={cardData.p02.isSubmitted}
                ariaLabel='1번 답란'
              />
              <Typography>system</Typography>
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
              1){data.answer} (nervous도 정답 인정)
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
      <ShowText title={titleA02a} content={dialogContentA02a} isTextOpen={isTextOpen} handleTextClose={handleTextClose} />
    </Container>
  );
};

export default P02;
