import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  List,
  Tag,
  Typography
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A05001204_Atom } from './store';
  
  const P05 = () => {
    const { changeData, initData, submitDataWithResult, saveData } = usePageData();
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [cardData, setCardData] = useRecoilState(A05001204_Atom);
    const pageIds = useRecoilValue(pageIdsAtom);
    const { userId } = useRecoilValue(studentAtom);
  
    const questionInfo: IQuestionProps = {
      type: 'icon',
      text: (
        <>
          <Label value='5' type='icon' />
          길이의 단위를 잘못 사용한 문장을 모두 찾아 기호를 써 보세요.
        </>
      ),
      mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : 'none',
    };
  
    const questionListData = [
      {
        number: 'ㄱ',
        question: '줄넘기의 길이는 약 200 m입니다.',
      },
      {
        number: 'ㄴ',
        question: '수학책 긴 쪽의 길이는 약 28 cm입니다.',
      },
      {
        number: 'ㄷ',
        question: '실내화의 길이는 약 220 mm입니다.',
      },
      {
        number: 'ㄹ',
        question: '칠판의 길이는 약 5 km입니다.',
      },
    ];
  
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
  
    const init = async () => {
      const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
      if (pageId) {
        const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
        if (userSubmissionList.length > 0) {
          setCardData(prev => ({
            ...prev,
            p05: {
                ...prev.p05,
                answer1: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer1,
                answer2: userSubmissionList[0].inputData[1]?.value || cardData.p05.answer2,
                isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p05.isCorrect1,
                isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p05.isCorrect2,
                isSubmitted,
                isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            },
          }));
        }
        initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
      }
    };
  
    const handleSubmit = () => {
      if (cardData.p05.isSubmitted) {
        setShowAnswer(!showAnswer);
      } else {
        const isCorrect1 = isAnswer(cardData.p05.answer1, cardData.p05.solution);
        const isCorrect2 = (cardData.p05.answer1 !== cardData.p05.answer2 && isAnswer(cardData.p05.answer2, cardData.p05.solution));
        const isCorrect = isCorrect1 && isCorrect2;
        setCardData(prev => ({ ...prev, p05: { ...prev.p05, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2 } }));
        const userSubmission: userSubmissionType[] = [
          {
            mainKey: 1,
            inputData: [
                {
                subKey: 1,
                type: 'TEXT',
                value: cardData.p05.answer1,
                isAnswer: true,
                isCorrect: isCorrect1,
                },
                {
                subKey: 2,
                type: 'TEXT',
                value: cardData.p05.answer2,
                isAnswer: true,
                isCorrect: isCorrect2,
                },
            ],
            isCorrect,
          },
        ];
        submitDataWithResult('P05', userSubmission, isCorrect);
      }
    };
  
    const handleChange = (subKey: number, value: string) => {
        if(!(value==='ㄱ'||value==='ㄴ'||value==='ㄷ'||value==='ㄹ'||value==='')){
          return;
        }
        if (subKey === 1) {
          setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer1: value } }));
        } else if (subKey === 2) {
          setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer2: value } }));
        }
        changeData('P05', 1, subKey, value);
      };
  
    useEffect(() => {
      return () => {
        saveData('P05');
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
        onSubmit={handleSubmit}
        submitLabel={!cardData.p05.isSubmitted ? '채점하기' : !showAnswer ? '답안 보기' : '답안 닫기'}
        submitDisabled={!(
            cardData.p05.answer1 &&
            cardData.p05.answer2
          )}
        submitBtnColor={
            !(
                cardData.p05.answer1 &&
                cardData.p05.answer2
              )
            ? EStyleButtonTypes.SECONDARY
            : !cardData.p05.isSubmitted || !showAnswer
            ? EStyleButtonTypes.YELLOW
            : EStyleButtonTypes.DEFAULT
        }
        useRound
        vAlign='start'
      >
        <Box display='flex' alignItems='center' flexDirection='column'>
        <Box type='dashed' padding='8px 24px' useRound width='690px'>
          {questionListData.map(value => (
            <Box vAlign='center' key={value.number}>
              <Label value={value?.number} />
              <Typography weight='var(--font-weight-bold)' lineHeight='48px'>
                {value?.question}
              </Typography>
            </Box>
          ))}
        </Box>
          <Box marginTop='24px'>
            <List align='horizontal' gap={0} data={questionListData}>
              <Input
                name='value'
                value={cardData.p05.answer1}
                width='52px'
                maxLength={1}
                placeholder=''
                onChange={event => handleChange(1, event.target.value)}
                status={
                  !isNotEmptyString(cardData.p05.answer1)
                    ? InputStatus.DEFAULT
                    : cardData.p05.isSubmitted && !(isAnswer(cardData.p05.answer1, cardData.p05.solution))
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p05.isSubmitted}
                ariaLabel='첫번째 답란'
              />
              <Typography>,</Typography>
              <Input
                name='value'
                value={cardData.p05.answer2}
                width='52px'
                maxLength={1}
                placeholder=''
                onChange={event => handleChange(2, event.target.value)}
                status={
                  !isNotEmptyString(cardData.p05.answer2)
                    ? InputStatus.DEFAULT
                    : cardData.p05.isSubmitted && !(cardData.p05.answer1 !== cardData.p05.answer2 && isAnswer(cardData.p05.answer2, cardData.p05.solution))
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p05.isSubmitted}
                ariaLabel='두번째 답란'
              />
            </List>
          </Box>
        </Box>
        <BottomSheet height={'50%'} show={showAnswer} bottomSheetTargetId={'targetContainer'}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
            <Box>
              <Tag type={ETagLine.GREEN} label='답안' />
              <Box marginTop='12px' gap={'20px'}>
                <Typography>
                {'ㄱ, ㄹ'}
                </Typography>
              </Box>
            </Box>
            <Box position='relative' marginTop='40px'>
              <Tag type={ETagLine.GREEN} label='풀이' />
              <Box marginTop='12px' gap={'20px'}>
                <Typography>
                  <Label value='ㄱ' />줄넘기의 길이는 약 200 cm입니다.<br/> <Label value='ㄹ' />칠판의 길이는 약 5 m입니다.
                </Typography>
              </Box>
            </Box>
          </Box>
        </BottomSheet>
      </Container>
    );
  };
  
  export default P05;
  