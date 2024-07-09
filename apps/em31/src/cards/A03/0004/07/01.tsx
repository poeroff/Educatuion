import empty_square from '@/assets/icon/math_empty_square.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Carousel,
  Dialog,
  DotIndicator,
  EStyleButtonTypes,
  EStyleFontSizes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  Question,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A03_0004_07 } from './store';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P05 from './05';
import P06 from './06';
import P07 from './07';

const P01 = () => {
  const [isShow, setShow] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(A03_0004_07);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sliderRef = useRef<Slider>(null);

  const onChangeSlide = (idx: number) => {
    const addIndex = !cardData.p01.isCorrect ? 2 : 5;
    saveData(`P0${activeIndex + addIndex}`);
    setActiveIndex(idx);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathStar',
    headerText: '이번 시간에 공부한 내용을 문제를 풀며 확인해 보세요.',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Question type='dot' size='medium' />
        <Box display='flex' alignItems='center'>
          <SvgIcon type={ESvgType.IMG} alt='빈칸' src={empty_square} size='43px' />
          &nbsp;안에 알맞은 수를 써넣으세요.
        </Box>
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

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
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 7,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 8,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const isAnswerUnfilled = () => {
    let flag = false;
    cardData.p01.answer.forEach(ans => {
      if (!isNotEmptyString(ans)) {
        flag = true;
      }
    });
    return flag;
  };

  const setSubmitBtnColor = () => {
    if (isAnswerUnfilled()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (isShow) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p01.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p01.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect1 = cardData.p01.answer[0] === cardData.p01.solution[0];
    const isCorrect2 = cardData.p01.answer[1] === cardData.p01.solution[1];
    const isCorrect3 = cardData.p01.answer[2] === cardData.p01.solution[2];
    const isCorrect4 = cardData.p01.answer[3] === cardData.p01.solution[3];
    const isCorrect5 = cardData.p01.answer[4] === cardData.p01.solution[4];
    const isCorrect6 = cardData.p01.answer[5] === cardData.p01.solution[5];
    const isCorrect7 = cardData.p01.answer[6] === cardData.p01.solution[6];
    const isCorrect8 = cardData.p01.answer[7] === cardData.p01.solution[7];
    const isAllCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6 && isCorrect7 && isCorrect8;

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        isCorrect: isAllCorrect,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer[0],
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer[1],
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer[2],
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer[3],
            isCorrect: isCorrect4,
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p01.answer[4],
            isCorrect: isCorrect5,
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.p01.answer[5],
            isCorrect: isCorrect6,
          },
          {
            subKey: 7,
            type: 'TEXT',
            value: cardData.p01.answer[6],
            isCorrect: isCorrect7,
          },
          {
            subKey: 8,
            type: 'TEXT',
            value: cardData.p01.answer[7],
            isCorrect: isCorrect8,
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
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
                userSubmissionList[0].inputData[4]?.value,
                userSubmissionList[0].inputData[5]?.value,
                userSubmissionList[0].inputData[6]?.value,
                userSubmissionList[0].inputData[7]?.value,
              ] || cardData.p01.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const answerList = [...cardData.p01.answer];
    answerList[subKey - 1] = value;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: answerList } }));
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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useLinkLabel={cardData.p01.isSubmitted}
      linkLabel='맞춤 학습하기'
      onLink={() => setShowModal(true)}
      useRound
      vAlign='flex-start'
    >
      <BoxWrap useFull>
        <Box type='line' useFull useRound hAlign='center'>
          <Image src={'/A03/0004/07/A-EM31-030004-0701.png'} alt='당근이 24개 놓여져 있습니다.' width='382px' height='271px' />
        </Box>
        <Box useFull>
          <Box display='flex' alignItems='center' flexDirection='column'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>곱셈식</Typography>
            <Box type='dashed' useRound padding='8px 20px' width='100%'>
              <Box hAlign='center'>
                <Typography>6×</Typography>
                <Input
                  width='100%'
                  status={
                    !cardData.p01.answer[0]
                      ? InputStatus.DEFAULT
                      : cardData.p01.isSubmitted && cardData.p01.answer[0] !== cardData.p01.solution[0]
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  type='number'
                  value={cardData.p01.answer[0]}
                  readOnly={cardData.p01.isSubmitted}
                  onChange={e => handleChange(1, e.target.value)}
                  maxLength={2}
                  ariaLabel={'답을 입력해 주세요.'}
                />
                <Typography>=</Typography>
                <Input
                  width='100%'
                  status={
                    !cardData.p01.answer[1]
                      ? InputStatus.DEFAULT
                      : cardData.p01.isSubmitted && cardData.p01.answer[1] !== cardData.p01.solution[1]
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  type='number'
                  value={cardData.p01.answer[1]}
                  readOnly={cardData.p01.isSubmitted}
                  onChange={e => handleChange(2, e.target.value)}
                  maxLength={2}
                  ariaLabel={'답을 입력해 주세요.'}
                />
              </Box>
              <Box hAlign='center'>
                <Typography>4×</Typography>
                <Input
                  width='100%'
                  status={
                    !cardData.p01.answer[2]
                      ? InputStatus.DEFAULT
                      : cardData.p01.isSubmitted && cardData.p01.answer[2] !== cardData.p01.solution[2]
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  type='number'
                  value={cardData.p01.answer[2]}
                  readOnly={cardData.p01.isSubmitted}
                  onChange={e => handleChange(3, e.target.value)}
                  maxLength={2}
                  ariaLabel={'답을 입력해 주세요.'}
                />
                <Typography>=</Typography>
                <Input
                  width='100%'
                  status={
                    !cardData.p01.answer[3]
                      ? InputStatus.DEFAULT
                      : cardData.p01.isSubmitted && cardData.p01.answer[3] !== cardData.p01.solution[3]
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  type='number'
                  value={cardData.p01.answer[3]}
                  readOnly={cardData.p01.isSubmitted}
                  onChange={e => handleChange(4, e.target.value)}
                  maxLength={2}
                  ariaLabel={'답을 입력해 주세요.'}
                />
              </Box>
            </Box>
          </Box>
          <Box display='flex' alignItems='center' flexDirection='column' marginTop='24px'>
            <Typography size={EStyleFontSizes['X-MEDIUM']}>나눗셈식</Typography>
            <Box type='dashed' useRound padding='8px 20px' width='100%'>
              <Box hAlign='center'>
                <Input
                  width='100%'
                  status={
                    !cardData.p01.answer[4]
                      ? InputStatus.DEFAULT
                      : cardData.p01.isSubmitted && cardData.p01.answer[4] !== cardData.p01.solution[4]
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  type='number'
                  value={cardData.p01.answer[4]}
                  readOnly={cardData.p01.isSubmitted}
                  onChange={e => handleChange(5, e.target.value)}
                  maxLength={2}
                  ariaLabel={'답을 입력해 주세요.'}
                />
                <Typography>÷6=</Typography>
                <Input
                  width='100%'
                  status={
                    !cardData.p01.answer[5]
                      ? InputStatus.DEFAULT
                      : cardData.p01.isSubmitted && cardData.p01.answer[5] !== cardData.p01.solution[5]
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  type='number'
                  value={cardData.p01.answer[5]}
                  readOnly={cardData.p01.isSubmitted}
                  onChange={e => handleChange(6, e.target.value)}
                  maxLength={2}
                  ariaLabel={'답을 입력해 주세요.'}
                />
              </Box>
              <Box hAlign='center'>
                <Input
                  width='100%'
                  status={
                    !cardData.p01.answer[6]
                      ? InputStatus.DEFAULT
                      : cardData.p01.isSubmitted && cardData.p01.answer[6] !== cardData.p01.solution[6]
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  type='number'
                  value={cardData.p01.answer[6]}
                  readOnly={cardData.p01.isSubmitted}
                  onChange={e => handleChange(7, e.target.value)}
                  maxLength={2}
                  ariaLabel={'답을 입력해 주세요.'}
                />
                <Typography>÷4=</Typography>
                <Input
                  width='100%'
                  status={
                    !cardData.p01.answer[7]
                      ? InputStatus.DEFAULT
                      : cardData.p01.isSubmitted && cardData.p01.answer[7] !== cardData.p01.solution[7]
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  type='number'
                  value={cardData.p01.answer[7]}
                  readOnly={cardData.p01.isSubmitted}
                  onChange={e => handleChange(8, e.target.value)}
                  maxLength={2}
                  ariaLabel={'답을 입력해 주세요.'}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        marginTop={200}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>4, 24, 6, 24, 24, 4, 24, 6</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>6×4=24</Typography>
              <Typography>4×6=24</Typography>
              <Typography>24÷6=4</Typography>
              <Typography>24÷4=6</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={showModal}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          setActiveIndex(0);
          setShowModal(false);
        }}
      >
        <Box hAlign='center'>
          <Carousel
            slideWidth={930}
            infinite={false}
            arrowGap={0}
            arrowSize={40}
            ref={sliderRef}
            onChange={onChangeSlide}
            dots={false}
            controller={({ goto }) => (
              <BoxWrap justifyContent='center' alignItems='center' position='absolute' left={0} right={0} bottom={0}>
                <DotIndicator length={3} activeNumber={activeIndex} onClick={idx => goto(idx)} />
              </BoxWrap>
            )}
          >
            {cardData.p01.isCorrect
              ? [<P02 key={'P02'} />, <P03 key={'P03'} />, <P04 key={'P04'} />]
              : [<P05 key={'P05'} />, <P06 key={'P06'} />, <P07 key={'P07'} />]}
          </Carousel>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P01;