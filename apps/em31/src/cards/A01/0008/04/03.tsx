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
import { A01_0008_04 } from './store';

const P03 = () => {
  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0008_04);
  const { userId } = useRecoilValue(studentAtom);

  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  /* 컨텐츠 상수 */
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '덧셈의 어림셈으로 문제를 해결하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄷ' color='var(--color-white)' background='#969590' />
        3학년 학생은 모두 몇 명인지 구하고 단체 할인을 받을 수 있는지 확인해 보세요.
      </>
    ),
  };

  const contents: string[] = [
    `우리 학교 3학년 학생은 남학생 195명, 여학생 217명이야.`,
    `진로 체험관은 400명이 넘으면 입장료 단체 할인을 받을 수 있대.`,
    `3학년 학생은 단체 할인을 받을 수 있을까?`,
  ];

  const exampleAnswer = `195, 217, 412`;
  const exampleAnswerDesc: string[] = [`- 195+217=412이므로 412명입니다.`, `- 3학년 학생은 400명이 넘으므로 단체 할인을 받을 수 있습니다.`];

  const isSubmittable = cardData.p03.userInputs.every(val => isNotEmptyString(val));

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
      const newUserInputs = [...prev.p03.userInputs].map((v, i) => (i === index ? value : v));
      return { ...prev, p03: { ...prev.p03, userInputs: newUserInputs } };
    });
    changeData('P03', 1, index + 1, value);
  };

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          isSubmitted: true,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: cardData.p03.userInputs.map((value, index) => ({ subKey: index + 1, type: 'TEXT', value: value })),
        },
      ];
      submitData('P03', userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId || 3;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            userInputs: userSubmissionList[0].inputData.map((v: any, i: number) => v.value || cardData.p03.userInputs[i]),
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      submitLabel={!cardData.p03.isSubmitted ? '완료하기' : !isShowAnswer ? '답안 보기' : '답안 닫기'}
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
          readOnly={cardData.p03.isSubmitted}
          title='답 입력란1'
          width='130px'
          value={cardData.p03.userInputs[0]}
          onChange={e => handleInputOnChange(e.target.value, 0)}
        />
        <Typography size={EStyleFontSizes.MEDIUM}>+</Typography>
        <Input
          readOnly={cardData.p03.isSubmitted}
          title='답 입력란2'
          width='130px'
          value={cardData.p03.userInputs[1]}
          onChange={e => handleInputOnChange(e.target.value, 1)}
        />
        <Typography size={EStyleFontSizes.MEDIUM}>=</Typography>
        <Input
          readOnly={cardData.p03.isSubmitted}
          title='답 입력란3'
          width='130px'
          value={cardData.p03.userInputs[2]}
          onChange={e => handleInputOnChange(e.target.value, 2)}
        />
      </Box>

      <BottomSheet
        bottomSheetTargetId='targetContainer'
        height='50%'
        show={isShowAnswer}
        closeOption={{
          useYn: true,
          onClose: () => {
            setIsShowAnswer(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
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
              <Typography key={idx}>{desc}</Typography>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
