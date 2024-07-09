import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0008_05 } from './store';

const P01 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0008_05);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  /* 컨텐츠 상수 */
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '뺄셈의 어림셈으로 문제를 해결하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' color='var(--color-white)' background='#969590' />
        이전에서 구한 3학년 학생은 모두 몇 명인가요?
      </>
    ),
  };

  const contents: string[] = [
    `3학년 학생이 모두 영상 체험관에서 영상을 보기로 했어.`,
    `영상 체험관의 자리는 700개이고 지금까지 입장한 사람은 198명이야.`,
    `3학년 학생 모두 영상 체험관에 들어갈 수 있을까?`,
  ];

  const exampleAnswer = `412`;

  const isSubmittable = cardData.p01.userInputs !== '';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
      ],
      isCorrect: false,
    },
  ];

  const handleInputOnChange = (value: string) => {
    setCardData(prev => {
      return { ...prev, p01: { ...prev.p01, userInputs: value } };
    });
    changeData('P01', 1, 1, value);
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
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.userInputs,
            },
          ],
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
            userInputs: userSubmissionList[0].inputData.map((v: any, i: number) => v.value || cardData.p01.userInputs),
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={!cardData.p01.isSubmitted ? '완료하기' : !isShowAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!isSubmittable}
      submitBtnColor={!isSubmittable ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      useRound
      vAlign='start'
    >
      {contents.map((content, idx) => (
        <Typography key={idx} size={EStyleFontSizes.MEDIUM}>
          {content}
        </Typography>
      ))}

      <Box hAlign='center' marginTop='60px'>
        <Input
          readOnly={cardData.p01.isSubmitted}
          width='130px'
          value={cardData.p01.userInputs}
          onChange={e => handleInputOnChange(e.target.value)}
          title='답 입력란'
        />
        <Typography size={EStyleFontSizes.MEDIUM}>명</Typography>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='50%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box marginBottom={'12px'}>
            <Tag type={ETagLine.GREEN} label='예시답안' />
          </Box>
          <Box>
            <Typography>{exampleAnswer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
