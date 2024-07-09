import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleFontSizes,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  Label,
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import arrow from '@/assets/icon/arrow_fat_right.svg';

import { B02_0008_10 } from './store';

const P04 = ({ _page = 'P04' }) => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B02_0008_10);
  const { userId } = useRecoilValue(studentAtom);
  const [showAnswer, setShowAnswer] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const pageIds = useRecoilValue(pageIdsAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        현오가 박물관에서 본 목걸이를 떠올리며 규칙에 따라 원을 점점 크게 그리려고 합니다. 네 번째에 그릴 원의 반지름을 구해 보세요.
      </>
    ),
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: 0,
        },
      ],
    },
  ];

  const onSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }

    const isCorrect: boolean = cardData.p04.answer === cardData.p04.solution;

    setCardData(prev => ({
      ...prev,
      p04: {
        ...prev.p04,
        isCorrect: isCorrect,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData.p04.answer,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(_page, userSubmission, isCorrect);
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === _page)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer: userSubmissionList[0].inputData[0]?.value || 0,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData(_page, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const getButtonStatus = (answer: number, solution: number) => {
    if (!cardData.p04.isSubmitted) {
      return '';
    }
    return answer !== solution ? 'error' : 'enable';
  };

  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: Number(event.target.value) } }));
    changeData(_page, 1, 1, event.target.value);

    if (Number(event.target.value) === 0) {
      setSubmittable(false);
    } else {
      setSubmittable(true);
    }
  };

  const getSubmitBtnColor = () => {
    if (cardData.p04.isSubmitted) {
      return showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW;
    } else {
      return submittable ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY;
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      vAlign='start'
      submitLabel={cardData.p04.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={getSubmitBtnColor()}
      onSubmit={onSubmit}
    >
      <BoxWrap>
        <Box useFull>
          <Box display='flex'>
            <Box paddingTop='4px'>
              <Label value='ㄷ' lineColor='none' background='#969590' color='var(--color-white)' />
            </Box>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM}>
                첫 번째 원의 반지름은 5 cm, 두 번째 원의 반지름은 10 cm, 세 번째 원의 반지름은 20 cm입니다. 빈칸에 알맞은 수를 써넣으세요
              </Typography>
            </Box>
          </Box>
          <Box display='flex' margin='16px 0 0 0' hAlign='center'>
            <Box hAlign='center'>
              <SvgIcon src={arrow} size='32px' />
            </Box>
            <Box>
              <Typography size={EStyleFontSizes.MEDIUM}>
                {`앞 원의 반지름의 `}
                <Input
                  type='number'
                  width='80px'
                  value={String(cardData.p04.answer === 0 ? '' : cardData.p04.answer)}
                  status={getButtonStatus(cardData.p04.answer, cardData.p04.solution)}
                  onChange={e => setValue(e)}
                  readOnly={cardData.p04.isSubmitted}
                  ariaLabel=''
                />
                {` 배가 다음 원의 반지름입니다.`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' gap='8px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>2</Typography>
          </Box>
          <Box marginTop='12px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography>앞 원의 반지름의 2배가 다음 원의 반지름입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
