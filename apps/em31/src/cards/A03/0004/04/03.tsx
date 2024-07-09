import arrow from '@/assets/icon/v_arrow.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A03_0004_04 } from './store';

const P03 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(A03_0004_04);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    headerText: '곱셈과 나눗셈의 관계 알아보기',
    iconType: 'search',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' type='paint' background='#969590' color='var(--color-white)' />
        나눗셈식을 곱셈식 2개로 나타내 보세요.
      </>
    ),
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
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
      ],
    },
  ];

  const isAnswerUnfilled = () => {
    let flag = false;
    cardData.p03.answer.forEach(ans => {
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
    if (cardData.p03.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p03.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect1 = cardData.p03.answer[0] === cardData.p03.solution[0];
    const isCorrect2 = cardData.p03.answer[1] === cardData.p03.solution[2];
    const isCorrect3 = cardData.p03.answer[2] === cardData.p03.solution[1];
    const isCorrect4 = cardData.p03.answer[3] === cardData.p03.solution[2];

    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        isCorrect: isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4,
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
            value: cardData.p03.answer[0],
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.answer[1],
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p03.answer[2],
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p03.answer[3],
            isCorrect: isCorrect4,
          },
        ],
        isCorrect: isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4,
      },
    ];

    submitDataWithResult('P03', userSubmission, isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer:
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
              ] || cardData.p03.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const answerList = [...cardData.p03.answer];
    answerList[subKey - 1] = value;

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: answerList } }));
    changeData('P03', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P03');
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
      vAlign='start'
    >
      <Box display='flex' hAlign='center'>
        <Box background='yellow' minWidth='329px' useRound hAlign='center'>
          <MathExpression equation={`$20\\div5=4$`} />
        </Box>

        <SvgIcon src={arrow} width='140px' height='124px' />

        <Box>
          <Box type='dashed' useRound hAlign='center' padding='24px'>
            <MathExpression equation={'$5\\times$'} />
            <Input
              width='121px'
              maxLength={1}
              type='number'
              status={
                !cardData.p03.answer[0]
                  ? InputStatus.DEFAULT
                  : cardData.p03.isSubmitted && cardData.p03.answer[0] !== cardData.p03.solution[0]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p03.isSubmitted}
              value={cardData.p03.answer[0]}
              onChange={e => handleChange(1, e.target.value)}
              ariaLabel='답을 입력해주세요.'
            />
            <Typography>=</Typography>
            <Input
              width='121px'
              maxLength={2}
              type='number'
              status={
                !cardData.p03.answer[1]
                  ? InputStatus.DEFAULT
                  : cardData.p03.isSubmitted && cardData.p03.answer[1] !== cardData.p03.solution[2]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p03.isSubmitted}
              value={cardData.p03.answer[1]}
              onChange={e => handleChange(2, e.target.value)}
              ariaLabel='답을 입력해주세요.'
            />
          </Box>
          <Box type='dashed' useRound hAlign='center' padding='24px' marginTop='44px'>
            <MathExpression equation={'$4\\times$'} />
            <Input
              width='121px'
              maxLength={1}
              type='number'
              status={
                !cardData.p03.answer[2]
                  ? InputStatus.DEFAULT
                  : cardData.p03.isSubmitted && cardData.p03.answer[2] !== cardData.p03.solution[1]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p03.isSubmitted}
              value={cardData.p03.answer[2]}
              onChange={e => handleChange(3, e.target.value)}
              ariaLabel='답을 입력해주세요.'
            />
            <Typography>=</Typography>
            <Input
              width='121px'
              maxLength={2}
              type='number'
              status={
                !cardData.p03.answer[3]
                  ? InputStatus.DEFAULT
                  : cardData.p03.isSubmitted && cardData.p03.answer[3] !== cardData.p03.solution[2]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p03.isSubmitted}
              value={cardData.p03.answer[3]}
              onChange={e => handleChange(4, e.target.value)}
              ariaLabel='답을 입력해주세요.'
            />
          </Box>
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
              <Typography>4, 20, 5, 20</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>나눗셈식 20÷5=4를 곱셈식 2개로 나타내면 5×4=20, 4×5=20입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
