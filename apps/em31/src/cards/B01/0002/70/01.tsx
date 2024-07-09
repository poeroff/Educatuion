import { Box, IQuestionProps, Input, Label, EStyleButtonTypes, Typography, SvgIcon, BottomSheet, Tag, ETagLine, InputStatus } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import headerIcon from '../../../../assets/icon/m_default_01.svg';
import { B01000270 } from './store';
import { checkExpression, removeSpaces } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B01000270);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />두 수를 골라 합이 가장 큰 덧셈식을 만들고 계산해 보세요.
      </>
    ),
  };

  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState(false);
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

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect1 = checkExpression(cardData.p01.solution1, cardData.p01.answer1);
    const isCorrect2 = cardData.p01.answer2 === cardData.p01.solution2;
    const isCorrect = isCorrect1 && isCorrect2;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect, isCorrect1, isCorrect2 } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer1,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer2,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p01.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p01.isCorrect2,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const _value = removeSpaces(value);
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: _value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: _value } }));
    }
    changeData('P01', 1, subKey, _value);
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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 && cardData.p01.answer2)}
      onSubmit={submitAnswer}
      submitBtnColor={
        !(cardData.p01.answer1 && cardData.p01.answer2) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW
      }
      vAlign='flex-start'
    >
      <Box display='flex'>
        <Box useFull type='dashed' borderRadius='16px' padding='24px'>
          <Box background='yellow' textAlign='center' useRound marginBottom={36}>
            <Box padding='8px 12px' lineHeight='54px' fontSize='36px' whiteSpace='nowrap'>
              <Typography>215</Typography>
              <Typography>324</Typography>
              <Typography>123</Typography>
            </Box>
          </Box>
          <Box display='flex' justifyContent='center'>
            <Box>
              <Box>
                <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
                <Input
                  minWidth='296px'
                  marginLeft={12}
                  textAlign='center'
                  value={cardData.p01.answer1}
                  onChange={event => handleChange(1, event.target.value)}
                  ariaLabel='식을 적어주세요.'
                  maxLength={20}
                  readOnly={cardData.p01.isSubmitted}
                  status={cardData.p01.isSubmitted && !cardData.p01.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
                />
              </Box>
              <Box marginTop='8px'>
                <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
                <Input
                  width='124px'
                  marginLeft={12}
                  textAlign='center'
                  value={cardData.p01.answer2}
                  onChange={event => handleChange(2, event.target.value)}
                  ariaLabel='답을 적어주세요.'
                  readOnly={cardData.p01.isSubmitted}
                  status={cardData.p01.isSubmitted && !cardData.p01.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <BottomSheet height={'50%'} show={isShow} bottomSheetTargetId={'targetContainer'}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>324+215=539 또는 215+324=539, 539</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box marginTop='12px'>
              <Typography>{'합이 가장 큰 덧셈식을 만들려면 가장 큰 수와 두 번째로 큰 수를 더해야 합니다.'}</Typography>
            </Box>
            <Box marginTop='12px'>
              <Typography>{'324>215>123이므로 가장 큰 수는 324, 두 번째로 큰 수는 215입니다.'}</Typography>
            </Box>
            <Box marginTop='12px'>
              <Typography>{'➨ 324+215=539'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
