import {
  BottomSheet,
  Box,
  BoxWrap,
  Carousel,
  Dialog,
  DotIndicator,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  SvgIcon,
  TD,
  TMainHeaderInfoTypes,
  TR,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useRef, useState } from 'react';
import { A03_0005_08 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import star from '@/assets/icon/header_star.svg';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import Slider from 'react-slick';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P05 from './05';
import P06 from './06';
import P07 from './07';
import P08 from './08';
const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0005_08);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowCarousel, setIsShowCarousel] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const onChangeSlide = (idx: number) => {
    timerRef.current && clearTimeout(timerRef.current);
    setActiveIndex(idx);
  };
  const renderDigits = (number: number, maxLength: number) => {
    const digits = number.toString().split('').reverse();
    const addDigits = [...digits, ...Array(maxLength - digits.length).fill('')];
    return addDigits.map((digit, index) => <TD key={index}>{digit}</TD>);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck2',
    headerText: '문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={star} size='36px' />
        이번 시간에 공부한 내용을 문제를 풀며 확인해 보세요.{' '}
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isAllCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const submitBtnColor = cardData.p01.isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : cardData.p01.answer1.value && cardData.p01.answer2.value && cardData.p01.answer3.value && cardData.p01.answer4.value
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;
  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: { ...prev.p01.answer1, value } } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: { ...prev.p01.answer2, value } } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: { ...prev.p01.answer3, value } } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: { ...prev.p01.answer4, value } } }));
    }

    changeData('P01', 1, subKey, value);
  };
  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const correct1 = cardData.p01.answer1.value.trim() === cardData.p01.answer1.solution;
      const correct2 = cardData.p01.answer2.value.trim() === cardData.p01.answer2.solution;
      const correct3 = cardData.p01.answer3.value.trim() === cardData.p01.answer3.solution;
      const correct4 = cardData.p01.answer4.value.trim() === cardData.p01.answer4.solution;
      const isAllCorrect = correct1 && correct2 && correct3 && correct4;
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          answer1: {
            ...cardData.p01.answer1,
            isCorrect: correct1,
          },
          answer2: {
            ...cardData.p01.answer2,
            isCorrect: correct2,
          },
          answer3: {
            ...cardData.p01.answer3,
            isCorrect: correct3,
          },
          answer4: {
            ...cardData.p01.answer4,
            isCorrect: correct4,
          },
          isSubmitted: true,
          isAllCorrect: isAllCorrect,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1.value,
              isCorrect: correct1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2.value,
              isCorrect: correct2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3.value,
              isCorrect: correct3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4.value,
              isCorrect: correct4,
            },
          ],
          isCorrect: isAllCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isAllCorrect);
    }
  };
  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
      ],
    },
  ];
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0] || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1] || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2] || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3] || cardData.p01.answer4,
            isSubmitted,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
  useEffect(() => {
    console.log('cardData.p01', cardData.p01);
  }, [cardData.p01]);
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      onSubmit={() => {
        handleSubmit();
      }}
      submitDisabled={!(cardData.p01.answer1.value && cardData.p01.answer2.value && cardData.p01.answer3.value && cardData.p01.answer4.value)}
      useRound
      vAlign='start'
      bodyId='targetContainer'
      useLinkLabel={cardData.p01.isSubmitted}
      linkLabel='맞춤 학습하기'
      onLink={() => {
        setIsShowCarousel(!isShowCarousel);
      }}
    >
      <Box display='grid'>
        <Box display='flex' justifyContent='center'>
          <Box type='dashed' padding={'20px 44px'} useRound>
            36 ÷ 9 ={' '}
            <Input
              type='number'
              width='48px'
              readOnly={cardData.p01.isSubmitted}
              maxLength={3}
              value={cardData.p01.answer1.value}
              status={
                !cardData.p01.isSubmitted
                  ? cardData.p01.answer1.value.trim() === ''
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                  : cardData.p01.answer1.value.trim() === ''
                  ? InputStatus.ENABLE
                  : cardData.p01.isSubmitted && !cardData.p01.answer1.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='1번째 빈칸의 값'
              onChange={e => handleChange(1, e.target.value)}
            />
          </Box>
          <Box type='dashed' padding={'20px 44px'} marginLeft={'40px'} useRound>
            21 ÷ 3 ={' '}
            <Input
              type='number'
              width='48px'
              readOnly={cardData.p01.isSubmitted}
              maxLength={3}
              value={cardData.p01.answer2.value}
              status={
                !cardData.p01.isSubmitted
                  ? cardData.p01.answer2.value.trim() === ''
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                  : cardData.p01.answer2.value.trim() === ''
                  ? InputStatus.ENABLE
                  : cardData.p01.isSubmitted && !cardData.p01.answer2.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='2번째 빈칸의 값'
              onChange={e => handleChange(2, e.target.value)}
            />
          </Box>
        </Box>
        <Box margin={'40px 40px 0px 0px'} display='flex' justifyContent='center'>
          <Box type='dashed' padding={'20px 44px'} marginLeft={'40px'} useRound>
            48 ÷ 6 ={' '}
            <Input
              type='number'
              width='48px'
              readOnly={cardData.p01.isSubmitted}
              maxLength={3}
              value={cardData.p01.answer3.value}
              status={
                !cardData.p01.isSubmitted
                  ? cardData.p01.answer3.value.trim() === ''
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                  : cardData.p01.answer3.value.trim() === ''
                  ? InputStatus.ENABLE
                  : cardData.p01.isSubmitted && !cardData.p01.answer3.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='3번째 빈칸의 값'
              onChange={e => handleChange(3, e.target.value)}
            />
          </Box>
          <Box type='dashed' padding={'20px 44px'} marginLeft={'40px'} useRound>
            81 ÷ 9 ={' '}
            <Input
              type='number'
              width='48px'
              readOnly={cardData.p01.isSubmitted}
              maxLength={3}
              value={cardData.p01.answer4.value}
              status={
                !cardData.p01.isSubmitted
                  ? cardData.p01.answer4.value.trim() === ''
                    ? InputStatus.DEFAULT
                    : InputStatus.ENABLE
                  : cardData.p01.answer4.value.trim() === ''
                  ? InputStatus.ENABLE
                  : cardData.p01.isSubmitted && !cardData.p01.answer4.isCorrect
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='4번째 빈칸의 값'
              onChange={e => handleChange(4, e.target.value)}
            />
          </Box>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            4, 7<br />
            8, 9
          </Box>
          <Box marginTop={32}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>36÷9＝4, 21÷3＝7</Typography>
            <br />
            <Typography>48÷6＝8, 81÷9＝8</Typography>
          </Box>
        </Box>
      </BottomSheet>
      <Dialog
        isShow={isShowCarousel}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setIsShowCarousel(false);
          setIsShow(false);
          setActiveIndex(0);
        }}
        onConfirm={() => {
          setIsShowCarousel(false);
        }}
      >
        <Box hAlign='center'>
          <Carousel
            slideWidth={930}
            slideHeight={576}
            infinite={false}
            arrowGap={0}
            arrowSize={40}
            ref={sliderRef}
            onChange={onChangeSlide}
            dots={false}
            controller={({ goto }) => (
              <BoxWrap justifyContent='center' alignItems='center'>
                <DotIndicator length={cardData.p01.isAllCorrect ? 3 : 4} activeNumber={activeIndex} onClick={idx => goto(idx)} />
              </BoxWrap>
            )}
          >
            {cardData.p01.isAllCorrect
              ? [<P02 key={'P02'} />, <P03 key={'P03'} />, <P04 key={'P04'} />]
              : [<P05 key={'P05'} />, <P06 key={'P06'} />, <P07 key={'P07'} />, <P08 key={'P08'} />]}
          </Carousel>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P01;
