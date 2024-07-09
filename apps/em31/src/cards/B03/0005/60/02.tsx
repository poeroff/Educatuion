//C-EM31-03-0005-2003
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
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
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { B03_0005_60 } from './store';

const P02 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(B03_0005_60);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathFoundation',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={2} />
        나눗셈의 몫을 구해 보세요.
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

  const isAnswerUnfilled = () => {
    let flag = false;
    cardData.p02.answer.forEach(ans => {
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
    if (cardData.p02.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p02.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect1 = cardData.p02.answer[0] === cardData.p02.solution[0];
    const isCorrect2 = cardData.p02.answer[1] === cardData.p02.solution[1];
    const isCorrect3 = cardData.p02.answer[2] === cardData.p02.solution[2];
    const isAllCorrect = isCorrect1 && isCorrect2 && isCorrect3;

    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
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
            value: cardData.p02.answer[0],
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer[1],
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer[2],
            isCorrect: isCorrect3,
          },
        ],
        isCorrect: isAllCorrect,
      },
    ];

    submitDataWithResult('P02', userSubmission, isAllCorrect);
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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const answerList = [...cardData.p02.answer];
    answerList[subKey - 1] = value;

    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: answerList } }));
    changeData('P02', 1, subKey, value);
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
    <Container
      bodyId='targetContainer7'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      vAlign='flex-start'
      background={'var(--color-white)'}
      useRound
    >
      <Box vAlign='center' marginTop={30}>
        <Typography>18÷6=</Typography>
        <Input
          ariaLabel='답을 입력해주세요.'
          marginLeft={8}
          maxLength={2}
          type='number'
          status={
            !cardData.p02.answer[0]
              ? InputStatus.DEFAULT
              : cardData.p02.isSubmitted && cardData.p02.answer[0] !== cardData.p02.solution[0]
              ? InputStatus.ERROR
              : InputStatus.ENABLE
          }
          readOnly={cardData.p02.isSubmitted}
          value={cardData.p02.answer[0]}
          onChange={e => handleChange(1, e.target.value)}
          width='98px'
        />
        <Box marginLeft={50}>
          <Typography>28÷7=</Typography>
          <Input
            ariaLabel='답을 입력해주세요.'
            marginLeft={8}
            maxLength={2}
            type='number'
            status={
              !cardData.p02.answer[1]
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && cardData.p02.answer[1] !== cardData.p02.solution[1]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p02.isSubmitted}
            value={cardData.p02.answer[1]}
            onChange={e => handleChange(2, e.target.value)}
            width='98px'
          />
        </Box>
        <Box marginLeft={50}>
          <Typography>48÷8=</Typography>
          <Input
            ariaLabel='답을 입력해주세요.'
            marginLeft={8}
            maxLength={2}
            type='number'
            status={
              !cardData.p02.answer[2]
                ? InputStatus.DEFAULT
                : cardData.p02.isSubmitted && cardData.p02.answer[2] !== cardData.p02.solution[2]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            readOnly={cardData.p02.isSubmitted}
            value={cardData.p02.answer[2]}
            onChange={e => handleChange(3, e.target.value)}
            width='98px'
          />
        </Box>
      </Box>

      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer7'}
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
              <Typography>3, 4, 6</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>6×3=18이므로 18÷6=3입니다.</Typography>
              <Typography>7×4=28이므로 28÷7=4입니다.</Typography>
              <Typography>8×6=48이므로 48÷8=6입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

export const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 65px;
`;
