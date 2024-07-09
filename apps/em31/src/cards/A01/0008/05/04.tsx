import {
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  IQuestionProps,
  ETagLine,
  Label,
  Input,
  TMainHeaderInfoTypes,
  Typography,
  BottomSheet,
  Tag,
  InputStatus,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState, useMemo, ChangeEvent, useEffect } from 'react';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { A01_0008_05 } from './store';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, removeSpaces, getMarking } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(A01_0008_05);

  const currentPage = 'P04';

  const isDisabled = useMemo(() => Object.keys(cardData.p04.answers).some((key: any) => !cardData.p04.answers[key]), [cardData]);

  const isNumber = (value: string) => {
    return /^\d*$/.test(value);
  };

  const commentary = (
    <>
      <Typography>- 700-198=502이므로 502개입니다.</Typography>
      <Typography>- 남은 자리 수 502가 3학년 학생 수 412보다 크므로 모두 들어갈 수 있습니다.</Typography>
    </>
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '뺄셈의 어림셈으로 문제를 해결하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄹ' color='var(--color-white)' background='#969590' />
        영상 체험관의 남은 자리는 몇 개인지 구하고 3학년 학생 모두 들어갈 수 있는지 확인해 보세요.
      </>
    ),
    mark: getMarking(cardData.p04.isSubmitted, cardData.p04.isCorrect),
  };

  const contents = (
    <>
      <Typography>3학년 학생이 모두 영상 체험관에서 영상을 보기로 했어. </Typography>
      <Typography>영상 체험관의 자리는 700개이고 지금까지 입장한 사람은 198명이야.</Typography>
      <Typography>3학년 학생 모두 영상 체험관에 들어갈 수 있을까?</Typography>
    </>
  );

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
          isCorrect: false,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInputs = {
      ...cardData.p04.answers,
      [name]: value,
    };
    if (isNumber(value)) {
      setCardData(prev => ({
        ...prev,
        p04: {
          ...prev.p04,
          answers: userInputs,
        },
      }));
      changeData(currentPage, 1, Number(name.slice(-1)), userInputs);
    }
  };

  const submitAnswer = (isCorrect: boolean, isCorrectArr?: { [key: string]: boolean }) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect, isCorrectArr: isCorrectArr } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p04.answers,
            isAnswer: true,
            isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

  const isCorrectAnswer = (inputs: { [key: string]: string }, answers: { [key: string]: string }) => {
    return [answers].some(answer => {
      return Object.keys(inputs).every(key => isAnswer(removeSpaces(inputs[key]), removeSpaces(answer[key])));
    });
  };

  const handleSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setShow(show => !show);
    } else {
      submitAnswer && submitAnswer(isCorrectAnswer(cardData.p04.answers, cardData.p04.solutions));
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answers: userSubmissionList[0].inputData[0]?.value || cardData.p04.answers,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isDisabled ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isDisabled}
      onSubmit={() => {
        handleSubmit();
      }}
      useRound
    >
      <Box useFull>
        <Box display='flex' flexDirection='column'>
          <Typography size={EStyleFontSizes.MEDIUM}>{contents}</Typography>
        </Box>
        <Box hAlign='center' marginTop='24px'>
          <Input
            width='130px'
            name={'value1'}
            value={cardData.p04.answers.value1}
            onChange={handleInputChangeEvent}
            title='영상 체험관의 자리 개수'
            readOnly={cardData.p04.isSubmitted}
            status={
              cardData.p04.isSubmitted && cardData.p04.answers.value1 !== '700'
                ? InputStatus.ERROR
                : !isNotEmptyString(cardData.p04.answers.value1)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            maxLength={3}
          />
          <Typography size={EStyleFontSizes.MEDIUM}>-</Typography>
          <Input
            width='130px'
            name={'value2'}
            value={cardData.p04.answers.value2}
            onChange={handleInputChangeEvent}
            title='입장한 사람 수'
            readOnly={cardData.p04.isSubmitted}
            status={
              cardData.p04.isSubmitted && cardData.p04.answers.value2 !== '198'
                ? InputStatus.ERROR
                : !isNotEmptyString(cardData.p04.answers.value2)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            maxLength={3}
          />
          <Typography size={EStyleFontSizes.MEDIUM}>=</Typography>
          <Input
            width='130px'
            name={'value3'}
            value={cardData.p04.answers.value3}
            onChange={handleInputChangeEvent}
            title='정답'
            readOnly={cardData.p04.isSubmitted}
            status={
              cardData.p04.isSubmitted && cardData.p04.answers.value3 !== '502'
                ? InputStatus.ERROR
                : !isNotEmptyString(cardData.p04.answers.value3)
                ? InputStatus.ENABLE
                : InputStatus.DEFAULT
            }
            maxLength={3}
          />
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
              <Typography>700, 198, 502</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <BoxWrap>
              <Box flexDirection='column' useRound useFull>
                {commentary}
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
