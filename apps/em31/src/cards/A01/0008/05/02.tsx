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
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A01_0008_05 } from './store';

const P02 = () => {
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
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        영상 체험관의 남은 자리는 몇 개 쯤일지 어림하는 식을 쓰고 어림셈을 해 보세요.
      </>
    ),
  };

  const contents: string[] = [
    `3학년 학생이 모두 영상 체험관에서 영상을 보기로 했어.`,
    `영상 체험관의 자리는 700개이고 지금까지 입장한 사람은 198명이야.`,
    `3학년 학생 모두 영상 체험관에 들어갈 수 있을까?`,
  ];

  const exampleAnswer = `700, 200, 500`;
  const exampleAnswerDesc: string[] = [
    `지금까지 입장한 사람 수를 198을 200으로 생각하면 어림하는 식은 \n700-200=500이고 남은 자리는 500개쯤 입니다.`,
  ];

  const isSubmittable = cardData.p02.userInputs.every(val => isNotEmptyString(val));

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

  const handleInputOnChange = (value: string, index: number) => {
    setCardData(prev => {
      const newUserInputs = [...prev.p02.userInputs].map((v, i) => (i === index ? value : v));
      return { ...prev, p02: { ...prev.p02, userInputs: newUserInputs } };
    });
    changeData('P02', 1, index + 1, value);
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      setCardData(prev => ({
        ...prev,
        p02: {
          ...prev.p02,
          isSubmitted: true,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: cardData.p02.userInputs.map((value, index) => ({ subKey: index + 1, type: 'TEXT', value: value })),
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId || 2;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            userInputs: userSubmissionList[0].inputData.map((v: any, i: number) => v.value || cardData.p02.userInputs[i]),
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      submitLabel={!cardData.p02.isSubmitted ? '완료하기' : !isShowAnswer ? '답안 보기' : '답안 닫기'}
      submitDisabled={!isSubmittable}
      submitBtnColor={!isSubmittable ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      vAlign='start'
      useRound
    >
      {contents.map((content, index) => (
        <Typography key={index} size={EStyleFontSizes.MEDIUM}>
          {content}
        </Typography>
      ))}

      <Box hAlign='center' marginTop='24px'>
        <Input
          readOnly={cardData.p02.isSubmitted}
          title='답 입력란1'
          width='130px'
          value={cardData.p02.userInputs[0]}
          onChange={e => handleInputOnChange(e.target.value, 0)}
        />
        <Typography size={EStyleFontSizes.MEDIUM}>-</Typography>
        <Input
          readOnly={cardData.p02.isSubmitted}
          title='답 입력란2'
          width='130px'
          value={cardData.p02.userInputs[1]}
          onChange={e => handleInputOnChange(e.target.value, 1)}
        />
        <Typography size={EStyleFontSizes.MEDIUM}>=</Typography>
        <Input
          readOnly={cardData.p02.isSubmitted}
          title='답 입력란3'
          width='130px'
          value={cardData.p02.userInputs[2]}
          onChange={e => handleInputOnChange(e.target.value, 2)}
        />
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding={'24px'}>
          <Box marginBottom={'12px'}>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box>
            <Typography>{exampleAnswer}</Typography>
          </Box>
          <Box marginTop={'40px'}>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            {exampleAnswerDesc.map((desc, idx) => (
              <Typography key={idx} usePre>
                {desc}
              </Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
