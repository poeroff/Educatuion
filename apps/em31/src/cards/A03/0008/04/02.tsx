import { ChangeEvent, useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import {
  Image,
  Box,
  BoxWrap,
  Input,
  Typography,
  Label,
  IQuestionProps,
  List,
  TextView,
  BottomSheet,
  ETagLine,
  Tag,
  EStyleButtonTypes,
  InputStatus,
} from '@maidt-cntn/ui';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { A03000804 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03000804);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='2' type='icon' />
        <Typography>그림을 보고 곱셈식과 나눗셈식으로 나타내 보세요.</Typography>
      </>
    ),
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const data = [8, 4];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', '', '', '', '', ''],
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p02.answer.every((value, index) => value === cardData.p02.solution[index]);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p02.answer,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setCardData(prev => {
      const newAnswer = [...prev.p02.answer];
      newAnswer[index] = value;
      return { ...prev, p02: { ...prev.p02, answer: newAnswer } };
    });
  };

  const handleInputStatus = (index: number) => {
    if (cardData.p02.isSubmitted) {
      if (cardData.p02.answer[index] === cardData.p02.solution[index]) {
        return InputStatus.ENABLE;
      } else {
        return InputStatus.ERROR;
      }
    } else {
      if (cardData.p02.answer[index]) {
        return InputStatus.ENABLE;
      } else {
        return InputStatus.DEFAULT;
      }
    }
  };

  useEffect(() => {
    changeData('P02', 1, 1, cardData.p02.answer);
  }, [cardData.p02.answer]);

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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 열기') : '채점하기'}
      onSubmit={submitAnswer}
      submitDisabled={!cardData.p02.answer.every(value => isNotEmptyString(value))}
      submitBtnColor={
        cardData.p02.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.YELLOW
          : cardData.p02.answer.every(value => isNotEmptyString(value))
          ? EStyleButtonTypes.YELLOW
          : EStyleButtonTypes.SECONDARY
      }
      useRound
    >
      <BoxWrap useFull>
        <Box type='line' useFull useRound hAlign='center'>
          <Image src={'/A03/0008/04/MC31306.png'} alt='사탕이 8개씩 4줄로 32개가 있습니다.' width='382px' height='271px' />
        </Box>
        <Box useFull flexDirection='row'>
          <Box vAlign='center' alignItems='center' flexDirection='column'>
            <TextView title='곱셈식'>
              <Box padding='8px 20px'>
                <List data={data}>
                  {({ value, index }) => (
                    <Box hAlign='center' key={'multBox' + index}>
                      <Typography>{value}×</Typography>
                      <Input
                        type={'number'}
                        width='76px'
                        value={cardData.p02.answer[(index as number) * 2 - 2]}
                        onChange={e => handleChange(e, (index as number) * 2 - 2)}
                        status={handleInputStatus((index as number) * 2 - 2)}
                        readOnly={cardData.p02.isSubmitted}
                      />
                      <Typography>=</Typography>
                      <Input
                        type={'number'}
                        width='76px'
                        value={cardData.p02.answer[(index as number) * 2 - 1]}
                        onChange={e => handleChange(e, (index as number) * 2 - 1)}
                        status={handleInputStatus((index as number) * 2 - 1)}
                        readOnly={cardData.p02.isSubmitted}
                      />
                    </Box>
                  )}
                </List>
              </Box>
            </TextView>
          </Box>
          <Box display='flex' flexDirection='column' marginTop='24px' alignItems='center'>
            <TextView title='나눗셈식'>
              <Box padding='8px 20px'>
                <List data={data}>
                  {({ value, index }) => (
                    <Box hAlign='center' key={'divBox' + index}>
                      <Input
                        type={'number'}
                        width='76px'
                        value={cardData.p02.answer[(index as number) * 2 + 2]}
                        onChange={e => handleChange(e, (index as number) * 2 + 2)}
                        status={handleInputStatus((index as number) * 2 + 2)}
                        readOnly={cardData.p02.isSubmitted}
                      />
                      <Typography>÷{value}</Typography>
                      <Typography>=</Typography>
                      <Input
                        type={'number'}
                        width='76px'
                        value={cardData.p02.answer[(index as number) * 2 + 3]}
                        onChange={e => handleChange(e, (index as number) * 2 + 3)}
                        status={handleInputStatus((index as number) * 2 + 3)}
                        readOnly={cardData.p02.isSubmitted}
                      />
                    </Box>
                  )}
                </List>
              </Box>
            </TextView>
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>4, 32 / 32, 4 / 8, 32 / 32, 8</Typography>
            </Box>
          </Box>

          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>사탕이 8개씩 4줄이므로 8×4=32입니다.</Typography>
              <Typography>사탕이 4개씩 8줄이므로 4×8=32입니다.</Typography>
              <Typography>사탕 32개를 8개씩 묶으면 4묶음이므로 32÷8=4입니다.</Typography>
              <Typography>사탕 32개를 4개씩 묶으면 8묶음이므로 32÷4=8입니다.</Typography>
            </Box>
          </Box>

          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='힌트' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>사탕을 4개 또는 8개씩 묶어 보고 곱셈식과 나눗셈식으로 나타내 보세요.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
