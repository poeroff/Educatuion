import { Container, MathExpression } from '@maidt-cntn/ui/math';
import {
  Box,
  EStyleButtonTypes,
  Input,
  TMainHeaderInfoTypes,
  SvgIcon,
  Typography,
  Image,
  IQuestionProps,
  ESvgType,
  BottomSheet,
  ETagLine,
  Tag,
  Dialog,
  Carousel,
  InputStatus,
} from '@maidt-cntn/ui';
import star from '@/assets/icon/header_star.svg';
import { useEffect, useRef, useState } from 'react';
import empty_square from '@/assets/icon/math_empty_square.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import A03_0002_07 from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import Slider from 'react-slick';
const P01 = () => {
  const [isShow, setIsShow] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0002_07);
  const { userId } = useRecoilValue(studentAtom);

  const sliderRef = useRef<Slider>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const correctList = [
    { id: 1, page: 'C-EI31-03-0002-1001' },
    { id: 2, page: 'C-EI31-03-0002-1002' },
    { id: 3, page: 'C-EI31-03-0002-1003' },
  ];

  const inCorrectList = [
    { id: 1, page: 'C-EI31-03-0002-2001' },
    { id: 2, page: 'C-EI31-03-0002-2002' },
    { id: 3, page: 'C-EI31-03-0002-2003' },
  ];

  const onChangeSlide = (index: number) => {
    timerRef.current && clearTimeout(timerRef.current);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={star} size='36px' />
        <Box vAlign='center'>
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 수를 써넣으세요.
        </Box>
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isAllCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const questionListData = [
    {
      img: '/A03/0002/07/A-EM31-030002-0701.png',
      alt: '농구공 8개와 농구공을 담는 통이 4개 있음',
      question: '8÷4=',
    },
    {
      img: '/A03/0002/07/A-EM31-030002-0701-2.png',
      alt: '브로콜리 9개와 사람 3명이 있음',
      question: '9÷3=',
    },
    {
      img: '/A03/0002/07/A-EM31-030002-0701-3.png',
      alt: '색연필 10자루와 필통 5개',
      question: '10÷5=',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const isInputAnswerCorrect = (answerList: string[], solutionList: string[]) => {
    const incorrectPattern = /\d\s+\d/;
    return answerList.map((answer, index) => {
      if (incorrectPattern.test(answer)) {
        return false;
      }
      return isAnswer(answer, solutionList[index]);
    });
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect = isInputAnswerCorrect(cardData.p01.answer, cardData.p01.solution);
    const isAllCorrect = isCorrect.every(answer => answer);
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect, isAllCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer[0],
            isCorrect: isCorrect[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer[1],
            isCorrect: isCorrect[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer[2],
            isCorrect: isCorrect[2],
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P01', userSubmission, isAllCorrect);
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
            answer:
              [userSubmissionList[0].inputData[0]?.value, userSubmissionList[0].inputData[1]?.value, userSubmissionList[0].inputData[2]?.value] ||
              cardData.p01.answer,
            isCorrect:
              [
                userSubmissionList[0].inputData[0]?.isCorrect,
                userSubmissionList[0].inputData[1]?.isCorrect,
                userSubmissionList[0].inputData[2]?.isCorrect,
              ] || cardData.p01.isCorrect,
            isSubmitted,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (isNaN(Number(value))) {
      return;
    }
    const inputAnswer = [...cardData.p01.answer];
    inputAnswer[subKey] = value;
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: inputAnswer } }));
    changeData('P01', 1, subKey + 1, value);
  };

  const isInputAnswer = () => {
    const answerList = [...cardData.p01.answer];
    const hasEmptyValue = answerList.some(element => element === '');

    return !hasEmptyValue;
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isInputAnswer()}
      submitBtnColor={isInputAnswer() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      useLinkLabel={cardData.p01.isSubmitted}
      linkLabel='맞춤 학습하기'
      onLink={() => setIsShowDialog(true)}
      vAlign='start'
    >
      <Box hAlign='horizontal' gap={20}>
        {questionListData.map((value, index) => (
          <Box key={index}>
            <Box width='290px' height='216px' type='line' hAlign='center' useRound>
              <Image src={value?.img || ''} alt={value?.alt || '이미지가 없음'} width='223px' height='120px' />
            </Box>
            <Box width='290px' height='100px' type='dashed' hAlign='center' padding='20px 0' useRound marginTop='12px'>
              <Typography>{value?.question}</Typography>
              <Input
                name={'inputValue-' + index}
                width='150px'
                value={cardData.p01.answer[index]}
                onChange={e => handleChange(index, e.target.value)}
                ariaLabel='답 입력란'
                readOnly={cardData.p01.isSubmitted}
                status={
                  !cardData.p01.answer[index]
                    ? InputStatus.DEFAULT
                    : cardData.p01.isSubmitted && !cardData.p01.isCorrect[index]
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
              />
            </Box>
          </Box>
        ))}
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>2, 3, 2</Typography>
          </Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>8÷4=2</Typography>
            <Typography>9÷3=3</Typography>
            <Typography>10÷5=2</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={isShowDialog}
        useHeader
        width={1000}
        height={572}
        onClose={() => {
          setIsShowDialog(false);
        }}
      >
        <Box hAlign='center'>
          {cardData.p01.isAllCorrect ? (
            <Carousel
              data={correctList}
              slideWidth={829}
              slideHeight={346}
              dots={false}
              arrowGap={-10}
              arrowSize={40}
              ref={sliderRef}
              onChange={onChangeSlide}
              infinite={false}
            >
              {correctList.map((item, index) => (
                <Box key={index} hAlign='center'>
                  {item.page}
                </Box>
              ))}
            </Carousel>
          ) : (
            <Carousel
              data={inCorrectList}
              slideWidth={829}
              slideHeight={346}
              dots={false}
              arrowGap={-10}
              arrowSize={40}
              ref={sliderRef}
              onChange={onChangeSlide}
              infinite={false}
            >
              {inCorrectList.map((item, index) => (
                //
                <Box key={index} hAlign='center'>
                  {item.page}
                </Box>
              ))}
            </Carousel>
          )}
        </Box>
      </Dialog>
    </Container>
  );
};

export default P01;
