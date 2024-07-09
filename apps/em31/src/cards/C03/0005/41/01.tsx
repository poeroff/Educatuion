import headerIcon from '@/assets/icon/m_default_01.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Input, InputStatus, Label, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { C03_0005_41 } from './store';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [cardData, setCardData] = useRecoilState(C03_0005_41);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        야구공 45개를 바구니 한 개에 5개씩 나누어 담으려고 합니다. 필요한 바구니는 몇 개인가요?
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
    const isAllCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;

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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box marginTop={40}>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              status={
                !cardData.p01.answer[0]
                  ? 'default'
                  : cardData.p01.isSubmitted && cardData.p01.answer[0] !== cardData.p01.solution[0]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              width='100px'
              readOnly={cardData.p01.isSubmitted}
              type='number'
              marginLeft={12}
              maxLength={2}
              textAlign='center'
              value={cardData.p01.answer[0]}
              onChange={e => handleChange(1, e.target.value)}
              ariaLabel='식을 적어주세요.'
            />
            <Typography>÷</Typography>
            <Input
              status={
                !cardData.p01.answer[1]
                  ? 'default'
                  : cardData.p01.isSubmitted && cardData.p01.answer[1] !== cardData.p01.solution[1]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              width='100px'
              readOnly={cardData.p01.isSubmitted}
              type='number'
              marginLeft={12}
              maxLength={2}
              textAlign='center'
              value={cardData.p01.answer[1]}
              onChange={e => handleChange(2, e.target.value)}
              ariaLabel='식을 적어주세요.'
            />
            <Typography>=</Typography>
            <Input
              status={
                !cardData.p01.answer[2]
                  ? 'default'
                  : cardData.p01.isSubmitted && cardData.p01.answer[2] !== cardData.p01.solution[2]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              width='100px'
              readOnly={cardData.p01.isSubmitted}
              type='number'
              marginLeft={12}
              maxLength={2}
              textAlign='center'
              value={cardData.p01.answer[2]}
              onChange={e => handleChange(3, e.target.value)}
              ariaLabel='식을 적어주세요.'
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              status={
                !cardData.p01.answer[3]
                  ? 'default'
                  : cardData.p01.isSubmitted && cardData.p01.answer[3] !== cardData.p01.solution[3]
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              readOnly={cardData.p01.isSubmitted}
              width='124px'
              marginLeft={12}
              textAlign='center'
              type='number'
              value={cardData.p01.answer[3]}
              onChange={e => handleChange(4, e.target.value)}
              ariaLabel='답을 적어주세요.'
            />
            <Typography>개</Typography>
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
              <Typography>45, 5, 9, 9</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>(전체 야구공 수)÷(바구니 한 개에 담는 야구공 수)=45÷5=9(개)</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
