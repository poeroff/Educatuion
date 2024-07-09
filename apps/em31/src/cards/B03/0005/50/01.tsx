import { useEffect, useMemo, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import { BottomSheet, Box, BoxWrap, EStyleButtonTypes, ETagLine, Input, IQuestionProps, Label, SvgIcon, Tag, Typography } from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { B03_0005_50 } from './store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { isNumber, isValidString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const PAGE_NUMBER = 'P01';
  const [isShow, setShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(B03_0005_50);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.answer1.trim() === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2.trim() === cardData.p01.solution2;
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: true,
              isCorrect,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

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
      ],
    },
  ];

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
    };
  }, []);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={1} />
        빈칸에 알맞은 수를 써넣으세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const handleInputChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    }
    changeData(PAGE_NUMBER, 1, subKey, value);
  };

  const isValid: boolean = useMemo(() => {
    if (isValidString(cardData.p01.answer1) && isValidString(cardData.p01.answer2)) {
      return isNumber(cardData.p01.answer1) && isNumber(cardData.p01.answer2);
    }
    return false;
  }, [cardData.p01.answer1, cardData.p01.answer2]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={{}}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!isValid ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      submitDisabled={!isValid}
      onSubmit={onGrade}
      useRound
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box type='dashed' useRound padding='20px'>
          <Box background='yellow' useRound textAlign='center' marginBottom='36px' padding='16px 0'>
            <Typography>18÷6</Typography>
          </Box>
          <Box display='flex' vAlign='center'>
            <Box display='flex'>
              <Typography>6×</Typography>
              <Input
                type='number'
                textAlign='start'
                width='80px'
                title='답 입력란'
                value={cardData.p01.answer1}
                maxLength={2}
                onChange={e => handleInputChange(1, e.target.value)}
                readOnly={cardData.p01.isSubmitted}
                status={!isValid ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect ? 'error' : 'enable'}
              />
              <Typography>=18</Typography>
            </Box>
            <SvgIcon src={arrow_right} size='34px' />
            <Box display='flex'>
              <Typography>18÷6=</Typography>
              <Input
                type='number'
                textAlign='start'
                width='80px'
                title='답 입력란'
                value={cardData.p01.answer2}
                onChange={e => handleInputChange(2, e.target.value)}
                readOnly={cardData.p01.isSubmitted}
                status={!isValid ? 'default' : cardData.p01.isSubmitted && !cardData.p01.isCorrect ? 'error' : 'enable'}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>3, 3</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap>
              <Box flexDirection='column'>
                <Typography>6과 곱해서 18이 되는 수는 3이므로 18÷6의 몫은 3입니다.</Typography>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
