import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Label,
  List,
  Radio,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { pageIdsAtom } from '@/stores/page';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03SP04_1 } from './store';

const P11 = ({ _page = 'P11' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03SP04_1);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: '[Write] 확인문제',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <Typography>
        3. 다음 중 어법상 <Typography textDecoration={'underline'}>틀린</Typography> 것을 고르시오.
      </Typography>
    ),
    mark: cardData.p11.isSubmitted ? (cardData.p11.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const data = [
    {
      text: '(1)',
    },
    {
      text: '(2)',
    },
    {
      text: '(3)',
    },
    {
      text: '(4)',
    },
    {
      text: '(5)',
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p11.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p11.answer === cardData.p11.solution;
      setCardData(prev => ({ ...prev, p11: { ...prev.p11, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'NUMBER',
              value: cardData.p11.answer,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(_page, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p11: {
            ...prev.p11,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p11.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getButtonColor = () => {
    const { answer, isSubmitted } = cardData.p11;

    if (!isSubmitted) {
      return answer ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    } else {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleChange = (index: number) => {
    setCardData(prev => ({ ...prev, p11: { ...prev.p11, answer: index } }));
    changeData(_page, 1, 1, index);
    if (index !== 0) {
      setIsSubmittable(true);
    }
  };

  useEffect(() => {
    return () => {
      saveData(_page);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p11.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p11.isSubmitted && cardData.p11.answer === 0}
      submitBtnColor={getButtonColor()}
      onSubmit={submitAnswer}
    >
      <BoxWrap>
        <Box width='460px'>
          <Box height='380px' background='white' lineHeight='48px' useRound paddingRight='10px'>
            <Scroll height='100%' tabIndex={0}>
              <BoxWrap>
                <Typography>
                  &nbsp;&nbsp;I experienced a special moment last Sunday,
                  <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                    <span style={{ fontWeight: 800 }}>(1)</span> which
                  </u>{' '}
                  I first met my cat, Fluffy. On that day, I found him in a box near my home,{' '}
                  <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                    <span style={{ fontWeight: 800 }}>(2)</span> which
                  </u>{' '}
                  surprised me.
                  <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                    <span style={{ fontWeight: 800 }}>(3)</span> Although
                  </u>{' '}
                  I wasn’t sure if my family would allow me to take care of him, I brought him inside.
                  <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                    <span style={{ fontWeight: 800 }}>(4)</span> While
                  </u>{' '}
                  he rested in my room, I planned to ask my family
                  <u style={{ textUnderlinePosition: 'under', textUnderlineOffset: '1px' }}>
                    <span style={{ fontWeight: 800 }}>(5)</span> if
                  </u>{' '}
                  he could stay with us.
                </Typography>
              </BoxWrap>
            </Scroll>
          </Box>
        </Box>
        <Box useFull flex='1'>
          <Scroll height='398px' tabIndex={0}>
            <List
              gap={10}
              data={data}
              row={({ value, index = 1 }) => (
                <Radio
                  type={'square'}
                  align='vertical'
                  name={'radio-question-A'}
                  label={value?.text}
                  value={index === cardData.p11.answer}
                  onClick={() => handleChange(index)}
                  readOnly={cardData.p11.isSubmitted}
                  isError={cardData.p11.isSubmitted && cardData.p11.answer !== cardData.p11.solution}
                >
                  <BoxWrap alignItems='baseline'>
                    <Label value={index} />
                    <Typography>{value?.text}</Typography>
                  </BoxWrap>
                </Radio>
              )}
            />
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>{cardData.p11.solution}</Typography>
          </Box>

          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              which 다음에 완전한 절이 오기 때문에 관계대명사가 아닌 관계부사를 써야 하며, 선행사 last Sunday가 시간을 나타내기 때문에 which를
              when으로 고쳐야 한다.
            </Typography>
          </Box>
          <Box marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해석' />
          </Box>
          <Box marginTop='22px'>
            <Typography>
              나는 지난주 일요일에 특별한 경험을 했는데, 그때 나는 나의 고양이 Fluffy를 처음 만났다. 그날 나는 우리 집 근처 상자에서 그를 발견했고,
              이는 나를 놀라게 했다. 우리 가족이 내가 그를 돌보도록 허락해 줄지 확실하지 않았음에도 불구하고, 나는 그를 안으로 데리고 갔다. 그가 내
              방에서 쉬는 동안에, 나는 그가 우리와 함께 있어도 되는지 가족에게 물어볼 계획을 세웠다.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P11;
