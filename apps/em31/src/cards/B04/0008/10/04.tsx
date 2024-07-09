import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  IQuestionProps,
  Label,
  Box,
  Typography,
  EStyleFontSizes,
  Input,
  InputStatus,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { B04_0008_10 } from './store';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P04 = () => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B04_0008_10);
  const { userId } = useRecoilValue(studentAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />
        <Box vAlign='center'>
          <Typography lineHeight='48px'>
            드론 비행에 사용할 드론이 500 대 있습니다. 드론 72 대로 로봇 모양 한 개를 만든다면 드론 500 대로는 로봇 모양을 몇 개까지 만들 수 있는지
            구해 보세요.
          </Typography>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p04.isSubmitted, cardData.p04.isCorrect),
  };

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
    },
  ];

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: value } }));
    changeData('P04', 1, 1, value);
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p04.answer1.trim() === cardData.p04.solution1;
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect: isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer1,
            isCorrect: isCorrect,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P04', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P04');
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
      onSubmit={cardData.p04.isSubmitted ? handleShowAnswer : handleSubmit}
      submitDisabled={!cardData.p04.answer1}
      submitLabel={cardData.p04.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!cardData.p04.answer1 ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      useRound
      vAlign='flex-start'
    >
      <Box vAlign='flex-start' marginBottom={20}>
        <Box display='flex' alignItems='center'>
          <Label value='ㄷ' lineColor='none' background='var(--color-grey-600)' color='var(--color-white)' marginRight={20} />
          <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
            어림으로 이용하여 문제를 어떻게 해결할 수 있을지 생각해 보세요.
          </Typography>
        </Box>
      </Box>

      <Box marginLeft={48}>
        <Typography>
          72를{' '}
          <Input
            type='number'
            value={cardData.p04.answer1}
            status={
              !isNotEmptyString(cardData.p04.answer1)
                ? InputStatus.DEFAULT
                : cardData.p04.isSubmitted && !isAnswer(cardData.p04.answer1, cardData.p04.solution1)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            onChange={e => handleInputChange(e.target.value)}
            ariaLabel='답란'
            maxLength={4}
            width='80px'
            readOnly={cardData.p04.isSubmitted}
          />
          으로 생각하여 만들 수 있는 로봇 모양 수만큼 곱해 봅니다.
        </Typography>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' show={showAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{cardData.p04.solution1}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='30px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>72 를 70 으로 생각하여 필요한 드론 수를 예상해 보고 곱셈을 하여 확인해 봅니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;
