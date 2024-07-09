import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import {
  Box,
  List,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Label,
  Image,
  Input,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  InputStatus,
} from '@maidt-cntn/ui';
import { checkAnswers, getMarking } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { A03_0003_04 } from './store';

const P02 = () => {
  const [isShow, setIsShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0003_04);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '필요한 봉투 수 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        달걀 10개를 2개씩 덜어 내면 몇 번 덜어 낼 수 있는지 뺄셈식으로 알아보세요.
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isAllCorrect),
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

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect = checkAnswers(cardData.p02.answer, cardData.p02.solution);
    const isAllCorrect = isCorrect.every(answer => answer);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect, isAllCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p02.answer[0],
            isCorrect: isCorrect[0],
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p02.answer[1],
            isCorrect: isCorrect[1],
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p02.answer[2],
            isCorrect: isCorrect[2],
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p02.answer[3],
            isCorrect: isCorrect[3],
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p02.answer[4],
            isCorrect: isCorrect[4],
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
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
                userSubmissionList[0].inputData[4]?.value,
              ] || cardData.p02.answer,
            isCorrect:
              [
                userSubmissionList[0].inputData[0]?.isCorrect,
                userSubmissionList[0].inputData[1]?.isCorrect,
                userSubmissionList[0].inputData[2]?.isCorrect,
                userSubmissionList[0].inputData[3]?.isCorrect,
                userSubmissionList[0].inputData[4]?.isCorrect,
              ] || cardData.p02.isCorrect,
            isSubmitted,
            isAllCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (isNaN(Number(value))) {
      return;
    }
    const inputAnswer = [...cardData.p02.answer];
    inputAnswer[subKey] = value;
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: inputAnswer } }));
    changeData('P02', 1, subKey + 1, value);
  };

  const isAnswer = () => {
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
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isAnswer()}
      submitBtnColor={isAnswer() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
      vAlign='flex-start'
      useRound
    >
      <Image src='/A03/0003/04/MC31308.png' alt='달걀이 10개 있으며 첫번째 두번째 달걀은 묶음으로 표시.' />
      <Box useFull position='relative'>
        <Box vAlign='center' whiteSpace='noWrap' position='absolute' bottom='35px' left='18px'>
          <Typography>10</Typography>
          <List
            data={cardData.p02.answer}
            align='horizontal'
            gap={0}
            children={({ value, index = 1 }) => (
              <Box vAlign='flex'>
                <Box hAlign='center' width='55px'>
                  <Typography>-</Typography>
                </Box>
                <Box hAlign='center' width='98px'>
                  <Box position='absolute' zIndex={1}>
                    <Image src='/A03/0003/04/MC31309.png' alt='봉투 이미지' width='90px' height='90px' />
                  </Box>
                  <Box zIndex={2}>
                    <Input
                      type='number'
                      maxLength={1}
                      name={'inputValue-' + (index - 1)}
                      width='52px'
                      value={cardData.p02.answer[index - 1]}
                      onChange={e => handleChange(index - 1, e.target.value)}
                      ariaLabel={value + '번째 답을 입력하세요'}
                      readOnly={cardData.p02.isSubmitted}
                      status={
                        !cardData.p02.answer[index - 1]
                          ? InputStatus.DEFAULT
                          : cardData.p02.isSubmitted && !cardData.p02.isCorrect[index - 1]
                          ? InputStatus.ERROR
                          : InputStatus.ENABLE
                      }
                    />
                  </Box>
                </Box>
              </Box>
            )}
          />
          <Typography>= 0</Typography>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography>2, 2, 2, 2, 2</Typography>
          </Box>
          <Box>
            <br />
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>10-2-2-2-2-2=0입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
