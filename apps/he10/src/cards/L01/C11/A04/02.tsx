import {
  Input,
  InputStatus,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Scroll,
  BottomSheet,
  Typography,
  List,
  Question,
  ETagLine,
  Tag,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';

import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C11A04 } from './store';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

interface IQuestionAndAnswer {
  num: string;
  studentAnswer: string;
  answer: string;
}

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C11A04);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };

  const [isShow, setShow] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  const initialData: IQuestionAndAnswer[] = [
    { num: '(A)', studentAnswer: '', answer: 'had' },
    { num: '(B)', studentAnswer: '', answer: 'that' },
    { num: '(C)', studentAnswer: '', answer: 'allowing' },
  ];
  const questionInfo = {
    text: `2. Choose the grammatically correct words for (A) - (C).`,
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };
  const [data, setData] = useState(initialData);

  const { userId } = useRecoilValue(studentAtom);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect3 = isAnswer(cardData.p02.answer3, cardData.p02.solution3);
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  const getValue = (index: number) => {
    if (index === 1) {
      return cardData.p02.answer1;
    } else if (index === 2) {
      return cardData.p02.answer2;
    } else if (index === 3) {
      return cardData.p02.answer3;
    }
  };

  const getStatus = (index: number) => {
    if (index === 1) {
      return !cardData.p02.answer1
        ? InputStatus.DEFAULT
        : cardData.p02.isSubmitted && cardData.p02.answer1.trim() !== cardData.p02.solution1
        ? InputStatus.ERROR
        : InputStatus.ENABLE;
    } else if (index === 2) {
      return !cardData.p02.answer2
        ? InputStatus.DEFAULT
        : cardData.p02.isSubmitted && cardData.p02.answer2.trim() !== cardData.p02.solution2
        ? InputStatus.ERROR
        : InputStatus.ENABLE;
    } else if (index === 3) {
      return !cardData.p02.answer3
        ? InputStatus.DEFAULT
        : cardData.p02.isSubmitted && cardData.p02.answer3.trim() !== cardData.p02.solution3
        ? InputStatus.ERROR
        : InputStatus.ENABLE;
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
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      submitDisabled={!cardData.p02.isSubmitted && !(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)}
      onSubmit={onGrade}
    >
      <BoxWrap>
        <Box height='340px' width='488px' background='white' lineHeight='48px' useRound paddingRight='10px'>
          <Scroll height='100%' tabIndex={0}>
            <Typography useGap={false}>
              &nbsp;&nbsp;&nbsp;Now let's turn our attention to ourselves,{' '}
              <Typography useGap={false} style={{ fontStyle: 'italic' }}>
                Homo sapiens
              </Typography>
              . How have we managed to survive for so long? Neanderthals existed together with
              <Typography useGap={false} style={{ fontStyle: 'italic' }}>
                Homo sapiens
              </Typography>{' '}
              until about 40,000 years ago, and they were known to be intelligent and physically superior to{' '}
              <Typography useGap={false} style={{ fontStyle: 'italic' }}>
                Homo sapiens
              </Typography>
              . Neanderthals were able to make tools and fire and{' '}
              <Typography useGap={false} weight='var(--font-weight-bold)' textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
                (A) had / having
              </Typography>{' '}
              strong bodies with well-developed muscles and broad shoulders. Despite these attributes, however, it was{' '}
              <Typography useGap={false} style={{ fontStyle: 'italic' }}>
                Homo sapiens
              </Typography>{' '}
              who ultimately survived and thrived. One possible explanation is that our ancestors lived in larger communities{' '}
              <Typography useGap={false} weight='var(--font-weight-bold)' textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
                (B) that / what
              </Typography>{' '}
              promoted cooperation and the free exchange of knowledge, while Neanderthals tended to live in smaller groups. These social differences
              may have given{' '}
              <Typography useGap={false} style={{ fontStyle: 'italic' }}>
                Homo sapiens
              </Typography>{' '}
              a competitive advantage over Neanderthals,{' '}
              <Typography useGap={false} weight='var(--font-weight-bold)' textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
                (C) allowed / allowing
              </Typography>{' '}
              them to adapt to an ever-changing environment.
            </Typography>
          </Scroll>
        </Box>

        <Box vAlign='center'>
          <List<IQuestionAndAnswer> data={data}>
            {({ value, index = 1 }) => (
              <Box vAlign='center'>
                <Box width={'60px'}>
                  <Question type='text' size='small'>
                    {value?.num}
                  </Question>
                </Box>
                <Input
                  width='396px'
                  placeholder='내용을 넣어 주세요.'
                  value={getValue(index)}
                  ariaLabel={index + '번 답란'}
                  onChange={event => handleChange(index, event.target.value)}
                  status={getStatus(index)}
                  readOnly={cardData.p02.isSubmitted}
                ></Input>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='container' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>(A) had (B) that (C) allowing</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
