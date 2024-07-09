import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  List,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { C01_0007_10 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0007_10);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' size='small' value={3} />두 수를 골라 차가 가장 큰 뺄셈식을 만들고 계산해 보세요.
      </>
    ),
    mark: cardData.P03.isSubmitted ? (cardData.P03.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isCorrect: false,
        },
      ],
    },
  ];

  const handleInputChange = (subkey: number, value: string) => {
    if (subkey === 1) {
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, value1: value } }));
    } else if (subkey === 2) {
      setCardData(prev => ({ ...prev, P03: { ...prev.P03, value2: value } }));
    }
    changeData('P03', 1, subkey, value);
  };

  const handleSubmit = () => {
    if (cardData.P03.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.P03.value1, cardData.P03.answer1);
      const isCorrect2 = isAnswer(cardData.P03.value2, cardData.P03.answer2);
      const isCorrect = isCorrect1 && isCorrect2;

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.P03.value1,
              isCorrect: isAnswer(cardData.P03.value1, cardData.P03.answer1),
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.P03.value2,
              isCorrect: isAnswer(cardData.P03.value2, cardData.P03.answer2),
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
      setCardData(prev => ({
        ...prev,
        P03: { ...prev.P03, isCorrect: isCorrect, isCorrect1: isCorrect1, isCorrect2: isCorrect2, isSubmitted: true },
      }));
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P03: {
            ...prev.P03,
            value1: userSubmissionList[0].inputData[0]?.value || cardData.P03.value1,
            value2: userSubmissionList[0].inputData[1]?.value || cardData.P03.value2,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.P03.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.P03.isCorrect2,
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
      useRound
      submitDisabled={!cardData.P03.value1 || !cardData.P03.value2}
      submitLabel={cardData.P03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitBtnColor={
        !isNotEmptyString(cardData.P03.value1) || !isNotEmptyString(cardData.P03.value2)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Box background='yellow' useRound textAlign='center' marginBottom='36px' padding='16px 0'>
              <List gap={24} data={[582, 467, 803]} align='horizontal' row={({ value, index = 1 }) => <Typography>{value}</Typography>} />
            </Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              readOnly={cardData.P03.isSubmitted}
              maxLength={50}
              minWidth='296px'
              marginLeft={12}
              textAlign='center'
              value={cardData.P03.value1}
              onChange={e => {
                handleInputChange(1, e.target.value);
              }}
              ariaLabel='식을 적어주세요.'
              status={cardData.P03.isSubmitted && !cardData.P03.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type='number'
              readOnly={cardData.P03.isSubmitted}
              maxLength={50}
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData.P03.value2}
              onChange={e => {
                handleInputChange(2, e.target.value);
              }}
              ariaLabel='답을 적어주세요.'
              status={cardData.P03.isSubmitted && !cardData.P03.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
            />
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>803-467=336, 336</Typography>
          </Box>
          <Box marginTop='20px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.P03.commentary}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
