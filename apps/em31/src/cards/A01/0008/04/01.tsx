import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Input,
  IQuestionProps,
  Label,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0008_04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0008_04);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '덧셈의 어림셈으로 문제를 해결하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        3학년 학생은 모두 몇 명쯤일지 어림하는 식을 쓰고 어림셈을 해 보세요.
      </>
    ),
  };
  const contentText = `우리 학교 3학년 학생은 남학생 195명, 여학생 217명이야.\n진로 체험관은 400명이 넘으면 입장료 단체 할인을 받을 수 있대.\n3학년 학생은 단체 할인을 받을 수 있을까?`;
  const exampleAnswer = '200, 200, 400';
  const exampleCommentary =
    '- 남학생 수 195를 200으로, 여학생 수 217을 200으로 생각하면 어림하는 식은 200+200=400이고 3학년 학생은 모두 400명쯤입니다.';

  const isAllAnswerFilled = cardData.p01.userInputs.every(v => isNotEmptyString(v));

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
      isCorrect: false,
    },
  ];

  const handleChange = (value: string, index: number) => {
    setCardData(prev => {
      const newUserInputs = [...prev.p01.userInputs].map((v, i) => (i === index ? value : v));
      return { ...prev, p01: { ...prev.p01, userInputs: newUserInputs } };
    });
    changeData('P01', 1, index + 1, value);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      setCardData(prev => ({
        ...prev,
        p01: {
          ...prev.p01,
          isSubmitted: true,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: cardData.p01.userInputs.map((value, index) => ({ subKey: index + 1, type: 'TEXT', value: value })),
        },
      ];
      submitData('P01', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId || 1;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            userInputs: userSubmissionList[0].inputData.map((v: any, i: number) => v.value || cardData.p01.userInputs[i]),
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
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

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      bodyId='targetContainer'
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!isAllAnswerFilled}
      submitBtnColor={!isAllAnswerFilled ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      useRound
      vAlign='start'
    >
      <Typography size={EStyleFontSizes.MEDIUM} usePre lineHeight='50px'>
        {contentText}
      </Typography>

      <Box hAlign='center' marginTop='24px'>
        <Input width='130px' value={cardData.p01.userInputs[0]} onChange={e => handleChange(e.target.value, 0)} readOnly={cardData.p01.isSubmitted} />
        <Typography size={EStyleFontSizes.MEDIUM}>+</Typography>
        <Input width='130px' value={cardData.p01.userInputs[1]} onChange={e => handleChange(e.target.value, 1)} readOnly={cardData.p01.isSubmitted} />
        <Typography size={EStyleFontSizes.MEDIUM}>=</Typography>
        <Input width='130px' value={cardData.p01.userInputs[2]} onChange={e => handleChange(e.target.value, 2)} readOnly={cardData.p01.isSubmitted} />
      </Box>

      <BottomSheet
        height={'50%'}
        show={isShowAnswer}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShowAnswer(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px'>
              <Typography>{exampleAnswer}</Typography>
            </Box>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box marginTop='12px'>
              <Typography lineHeight='40px'>{exampleCommentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P01;
