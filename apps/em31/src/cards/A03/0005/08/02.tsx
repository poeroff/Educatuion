import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';
import { checkAnswers, getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A03_0005_08 } from './store';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';

const P02 = () => {
  const [isShow, setIsShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0005_08);
  const { userId } = useRecoilValue(studentAtom);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };
  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={1} size='small' />
        <Box vAlign='center' marginTop={'5px'}>
          <Typography fontSize='30px'> 몫이 큰 것부터 차례로 1, 2, 3을 써 보세요.</Typography>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
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
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isAnswer = checkAnswers(cardData.p02.answer, cardData.p02.solution);
    const isCorrect = isAnswer.every(answer => answer);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer[2],
          },
        ],
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P02', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer:
              [userSubmissionList[0].inputData[0]?.value, userSubmissionList[0].inputData[1]?.value, userSubmissionList[0].inputData[2]?.value] ||
              cardData.p02.answer,

            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (index: number, value: string) => {
    const inputAnswer = [...cardData.p02.answer];
    inputAnswer[index] = value;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: inputAnswer } }));
    changeData('P02', 1, index + 1, value);
  };

  const handleInputStatus = (index: number): InputStatus => {
    return !isNotEmptyString(cardData.p02.answer[index])
      ? InputStatus.DEFAULT
      : cardData.p02.isSubmitted && !(cardData.p02.answer[index] === cardData.p02.solution[index])
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const isInputAnswer = () => {
    const answerList = [...cardData.p02.answer];

    const hasEmptyValue = answerList.some(element => element === '');

    return !hasEmptyValue;
  };
  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <DialogContainer
      bodyId='targetContainer2'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isInputAnswer()}
      submitBtnColor={isInputAnswer() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      vAlign='start'
    >
      <Box marginTop='15px' display='flex' alignItems='center' flexDirection='column'>
        <Box padding='20px' useRound display='flex' justifyContent='space-around' width='682px'>
          <Box width='180px' height='60px' background='green' vAlign='center' hAlign='center' textAlign='center' useRound>
            16÷4
          </Box>
          <Box width='180px' height='60px' background='green' vAlign='center' hAlign='center' textAlign='center' useRound>
            27÷9
          </Box>
          <Box width='180px' height='60px' background='green' vAlign='center' hAlign='center' textAlign='center' useRound>
            40÷8
          </Box>
        </Box>
        <Box marginTop='10px' useRound display='flex' justifyContent='space-around' width='682px'>
          <Box>
            <Input
              type='number'
              width='50px'
              value={cardData.p02.answer[0]}
              onChange={e => handleChange(0, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(0)}
              maxLength={1}
              ariaLabel='답을 입력하세요'
            />
          </Box>
          <Box>
            <Input
              type='number'
              width='50px'
              value={cardData.p02.answer[1]}
              onChange={e => handleChange(1, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(1)}
              maxLength={1}
              ariaLabel='답을 입력하세요'
            />
          </Box>
          <Box>
            <Input
              type='number'
              width='50px'
              value={cardData.p02.answer[2]}
              onChange={e => handleChange(2, e.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={handleInputStatus(2)}
              maxLength={1}
              ariaLabel='답을 입력하세요'
            />
          </Box>
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer2' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>2, 3, 1</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>16÷4=4, 27÷9=3, 40÷8=5이므로 몫이 큰 것부터 차례로 쓰면 40÷8, 16÷4, 27÷9입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};
export default P02;
