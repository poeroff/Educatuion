import { useEffect, useRef, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Carousel,
  Dialog,
  DotIndicator,
  EStyleButtonTypes,
  ESvgType,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import star from '../../../../assets/icon/header_star.svg';
import empty_square from '../../../../assets/icon/math_empty_square.svg';
import usePageData from '@/hooks/usePageData';
import { A05_0008_07 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import Slider from 'react-slick';
import P02 from './02';
import P03 from './03';
import P04 from './04';
import P05 from './05';
import P06 from './06';
import P07 from './07';
import P08 from './08';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A05_0008_07);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [isModalShow, setModalShow] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const onChangeSlide = (idx: number) => {
    const addIndex = cardData.p01.isCorrect ? 2 : 5;
    saveData(`P0${activeIndex + addIndex}`);
    setActiveIndex(idx);
  };

  const handleInputChangeEvent = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer6: value } }));
    } else if (subKey === 7) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer7: value } }));
    } else if (subKey === 8) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer8: value } }));
    } else if (subKey === 9) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer9: value } }));
    } else if (subKey === 10) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer10: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect3 = isAnswer(cardData.p01.answer3, cardData.p01.solution3);
      const isCorrect4 = isAnswer(cardData.p01.answer4, cardData.p01.solution4);
      const isCorrect5 = isAnswer(cardData.p01.answer5, cardData.p01.solution5);
      const isCorrect6 = isAnswer(cardData.p01.answer6, cardData.p01.solution6);
      const isCorrect7 = isAnswer(cardData.p01.answer7, cardData.p01.solution7);
      const isCorrect8 = isAnswer(cardData.p01.answer8, cardData.p01.solution8);
      const isCorrect9 = isAnswer(cardData.p01.answer9, cardData.p01.solution9);
      const isCorrect10 = isAnswer(cardData.p01.answer10, cardData.p01.solution10);

      const isCorrect =
        isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6 && isCorrect7 && isCorrect8 && isCorrect9 && isCorrect10;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer5,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer6,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer7,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer8,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer9,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer10,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p01.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p01.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p01.answer6,
            answer7: userSubmissionList[0].inputData[6]?.value || cardData.p01.answer7,
            answer8: userSubmissionList[0].inputData[7]?.value || cardData.p01.answer8,
            answer9: userSubmissionList[0].inputData[8]?.value || cardData.p01.answer9,
            answer10: userSubmissionList[0].inputData[9]?.value || cardData.p01.answer10,

            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
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
        {
          subKey: 9,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 10,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathCheck2',
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
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={onGrade}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.p01.answer1 &&
          cardData.p01.answer2 &&
          cardData.p01.answer3 &&
          cardData.p01.answer4 &&
          cardData.p01.answer5 &&
          cardData.p01.answer6 &&
          cardData.p01.answer7 &&
          cardData.p01.answer8 &&
          cardData.p01.answer9 &&
          cardData.p01.answer10
        )
      }
      submitBtnColor={
        !(
          cardData.p01.answer1 &&
          cardData.p01.answer2 &&
          cardData.p01.answer3 &&
          cardData.p01.answer4 &&
          cardData.p01.answer5 &&
          cardData.p01.answer6 &&
          cardData.p01.answer7 &&
          cardData.p01.answer8 &&
          cardData.p01.answer9 &&
          cardData.p01.answer10
        )
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      useRound
      vAlign='flex-start'
      linkLabel='맞춤 학습하기'
      useLinkLabel={cardData.p01.isSubmitted}
      onLink={() => {
        setModalShow(!isModalShow);
      }}
    >
      <Box vAlign='center'>
        <Typography>3분 10초+45초=</Typography>
        <Input
          marginLeft={8}
          type='number'
          width='98px'
          value={cardData.p01.answer1}
          onChange={e => handleInputChangeEvent(1, e.target.value)}
          maxLength={2}
          readOnly={cardData.p01.isSubmitted}
          ariaLabel='3분 10초 더하기 45초 했을 때 분을 입력하세요'
          status={
            !cardData.p01.isSubmitted
              ? !cardData.p01.answer1
              : !isAnswer(cardData.p01.answer1, cardData.p01.solution1)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        분
        <Input
          marginLeft={8}
          type='number'
          width='98px'
          value={cardData.p01.answer2}
          onChange={e => handleInputChangeEvent(2, e.target.value)}
          maxLength={2}
          readOnly={cardData.p01.isSubmitted}
          ariaLabel='3분 10초 더하기 45초 했을 때 초를 입력하세요'
          status={
            !cardData.p01.isSubmitted
              ? !cardData.p01.answer2
              : !isAnswer(cardData.p01.answer2, cardData.p01.solution2)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        초
      </Box>
      <Box vAlign='center' marginTop='24px'>
        <Typography>7분 35초-12초=</Typography>
        <Input
          marginLeft={8}
          type='number'
          width='98px'
          value={cardData.p01.answer3}
          onChange={e => handleInputChangeEvent(3, e.target.value)}
          maxLength={2}
          readOnly={cardData.p01.isSubmitted}
          ariaLabel='7분 35초 빼기 12초 했을 때 분을 입력하세요'
          status={
            !cardData.p01.isSubmitted
              ? !cardData.p01.answer3
              : !isAnswer(cardData.p01.answer3, cardData.p01.solution3)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        분
        <Input
          marginLeft={8}
          type='number'
          width='98px'
          value={cardData.p01.answer4}
          onChange={e => handleInputChangeEvent(4, e.target.value)}
          maxLength={2}
          readOnly={cardData.p01.isSubmitted}
          ariaLabel='7분 35초 빼기 12초 했을 때 분을 입력하세요'
          status={
            !cardData.p01.isSubmitted
              ? !cardData.p01.answer4
              : !isAnswer(cardData.p01.answer4, cardData.p01.solution4)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        초
      </Box>
      <Box vAlign='center' marginTop='24px'>
        <Typography>5시 13분 20초+29분 5초=</Typography>
        <Input
          marginLeft={8}
          type='number'
          width='98px'
          value={cardData.p01.answer5}
          onChange={e => handleInputChangeEvent(5, e.target.value)}
          maxLength={2}
          readOnly={cardData.p01.isSubmitted}
          ariaLabel='5시 13분 20초 더하기 29분 5초 했을 때 시를 입력하세요'
          status={
            !cardData.p01.isSubmitted
              ? !cardData.p01.answer5
              : !isAnswer(cardData.p01.answer5, cardData.p01.solution5)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        시
        <Input
          marginLeft={8}
          type='number'
          width='98px'
          value={cardData.p01.answer6}
          onChange={e => handleInputChangeEvent(6, e.target.value)}
          maxLength={2}
          readOnly={cardData.p01.isSubmitted}
          ariaLabel='5시 13분 20초 더하기 29분 5초 했을 때 분을 입력하세요'
          status={
            !cardData.p01.isSubmitted
              ? !cardData.p01.answer6
              : !isAnswer(cardData.p01.answer6, cardData.p01.solution6)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        분
        <Input
          marginLeft={8}
          type='number'
          width='98px'
          value={cardData.p01.answer7}
          onChange={e => handleInputChangeEvent(7, e.target.value)}
          maxLength={2}
          readOnly={cardData.p01.isSubmitted}
          ariaLabel='5시 13분 20초 더하기 29분 5초 했을 때 초를 입력하세요'
          status={
            !cardData.p01.isSubmitted
              ? !cardData.p01.answer7
              : !isAnswer(cardData.p01.answer7, cardData.p01.solution7)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        초
      </Box>
      <Box vAlign='center' marginTop='24px'>
        <Typography>12시 45분 53초-10분 45초=</Typography>
        <Input
          marginLeft={8}
          type='number'
          width='98px'
          value={cardData.p01.answer8}
          onChange={e => handleInputChangeEvent(8, e.target.value)}
          maxLength={2}
          readOnly={cardData.p01.isSubmitted}
          ariaLabel='12시 45분 53초 빼기 10분 45초 했을 때 시를 입력하세요'
          status={
            !cardData.p01.isSubmitted
              ? !cardData.p01.answer8
              : !isAnswer(cardData.p01.answer8, cardData.p01.solution8)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        시
        <Input
          marginLeft={8}
          type='number'
          width='98px'
          value={cardData.p01.answer9}
          onChange={e => handleInputChangeEvent(9, e.target.value)}
          maxLength={2}
          readOnly={cardData.p01.isSubmitted}
          ariaLabel='12시 45분 53초 빼기 10분 45초 했을 때 분을 입력하세요'
          status={
            !cardData.p01.isSubmitted
              ? !cardData.p01.answer9
              : !isAnswer(cardData.p01.answer9, cardData.p01.solution9)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        분
        <Input
          marginLeft={8}
          type='number'
          width='98px'
          value={cardData.p01.answer10}
          onChange={e => handleInputChangeEvent(10, e.target.value)}
          maxLength={2}
          readOnly={cardData.p01.isSubmitted}
          ariaLabel='12시 45분 53초 빼기 10분 45초 했을 때 초를 입력하세요'
          status={
            !cardData.p01.isSubmitted
              ? !cardData.p01.answer10
              : !isAnswer(cardData.p01.answer10, cardData.p01.solution10)
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
        />
        초
      </Box>

      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'5px'}>
              <Typography>3, 55</Typography>
              <Typography>7, 23</Typography>
              <Typography>5, 42, 25</Typography>
              <Typography>12, 35, 8</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'5px'}>
              <Typography>3분 10초+45초 = 3분 55초</Typography>
              <Typography>7분 35초-12초 = 7분 23초</Typography>
              <Typography>5시 13분 20초+29분 5초 = 5시 42분 25초</Typography>
              <Typography>12시 45분 53초-10분 45초 = 12시 35분 8초</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        isShow={isModalShow}
        useHeader
        width={981}
        height={572}
        onClose={() => {
          const addIndex = cardData.p01.isCorrect ? 2 : 5;
          saveData(`P0${activeIndex + addIndex}`);
          setActiveIndex(0);
          setModalShow(false);
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
                <DotIndicator length={cardData.p01.isCorrect ? 3 : 4} activeNumber={activeIndex} onClick={idx => goto(idx)} />
              </BoxWrap>
            )}
          >
            {cardData.p01.isCorrect
              ? [<P02 key={'P02'} />, <P03 key={'P03'} />, <P04 key={'P04'} />]
              : [<P05 key={'P05'} />, <P06 key={'P06'} />, <P07 key={'P07'} />, <P08 key={'P08'} />]}
          </Carousel>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P01;
