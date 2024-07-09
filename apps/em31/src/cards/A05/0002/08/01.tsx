import star from '@/assets/icon/header_star.svg';
import empty_square from '@/assets/icon/math_empty_square.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  Carousel,
  Dialog,
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
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A05_0002_08 } from './store';
import Slider from 'react-slick';

const P01 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(A05_0002_08);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const [isShowDialog, setIsShowDialog] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const correctList = [
    { id: 1, page: 'C-EI31-05-0002-1001' },
    { id: 2, page: 'C-EI31-05-0002-1002' },
    { id: 3, page: 'C-EI31-05-0002-1003' },
  ];

  const inCorrectList = [
    { id: 1, page: 'C-EI31-05-0002-2001' },
    { id: 2, page: 'C-EI31-05-0002-2002' },
    { id: 3, page: 'C-EI31-05-0002-2003' },
  ];

  const onChangeSlide = (index: number) => {
    timerRef.current && clearTimeout(timerRef.current);
  };

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
    const isAllCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5;

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
      useRound
      vAlign='flex-start'
      useLinkLabel={cardData.p01.isSubmitted}
      linkLabel='맞춤 학습하기'
      onLink={() => setIsShowDialog(true)}
    >
      <Box vAlign='center' marginTop={30}>
        <Typography>1cm =</Typography>
        <Input
          ariaLabel='답을 입력해주세요.'
          marginLeft={8}
          maxLength={2}
          type='number'
          status={
            !cardData.p01.answer[0]
              ? InputStatus.DEFAULT
              : cardData.p01.isSubmitted && cardData.p01.answer[0] !== cardData.p01.solution[0]
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
          readOnly={cardData.p01.isSubmitted}
          value={cardData.p01.answer[0]}
          onChange={e => handleChange(1, e.target.value)}
          width='98px'
        />
        &nbsp;mm
        <Box marginLeft={150}>
          <Typography>81mm =</Typography>
          <Input
            ariaLabel='답을 입력해주세요.'
            marginLeft={8}
            maxLength={2}
            type='number'
            status={
              !cardData.p01.answer[1]
                ? InputStatus.DEFAULT
                : cardData.p01.isSubmitted && cardData.p01.answer[1] !== cardData.p01.solution[1]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer[1]}
            onChange={e => handleChange(2, e.target.value)}
            width='98px'
          />
          &nbsp;cm
          <Input
            ariaLabel='답을 입력해주세요.'
            marginLeft={8}
            maxLength={2}
            type='number'
            status={
              !cardData.p01.answer[2]
                ? InputStatus.DEFAULT
                : cardData.p01.isSubmitted && cardData.p01.answer[2] !== cardData.p01.solution[2]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer[2]}
            onChange={e => handleChange(3, e.target.value)}
            width='98px'
          />
          &nbsp;mm
        </Box>
      </Box>

      <Box vAlign='center' marginTop={50}>
        <Typography>5cm 3mm = </Typography>
        <Input
          ariaLabel='답을 입력해주세요.'
          marginLeft={8}
          maxLength={2}
          type='number'
          status={
            !cardData.p01.answer[3]
              ? InputStatus.DEFAULT
              : cardData.p01.isSubmitted && cardData.p01.answer[3] !== cardData.p01.solution[3]
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
          readOnly={cardData.p01.isSubmitted}
          value={cardData.p01.answer[3]}
          onChange={e => handleChange(4, e.target.value)}
          width='98px'
        />
        &nbsp;mm
        <Box marginLeft={83}>
          <Typography>700 mm =</Typography>
          <Input
            ariaLabel='답을 입력해주세요.'
            marginLeft={8}
            maxLength={2}
            type='number'
            status={
              !cardData.p01.answer[4]
                ? InputStatus.DEFAULT
                : cardData.p01.isSubmitted && cardData.p01.answer[4] !== cardData.p01.solution[4]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p01.isSubmitted}
            value={cardData.p01.answer[4]}
            onChange={e => handleChange(5, e.target.value)}
            width='98px'
          />
          &nbsp;cm
        </Box>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
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
              <Typography>10, 8, 1, 53, 70</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>1 cm=10 mm</Typography>
              <Typography>81 mm=8 cm 1 mm</Typography>
              <Typography>5cm 3 mm=53 mm</Typography>
              <Typography>700 mm=70 cm</Typography>
            </Box>
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
          {cardData.p01.isCorrect ? (
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

export const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 65px;
`;
