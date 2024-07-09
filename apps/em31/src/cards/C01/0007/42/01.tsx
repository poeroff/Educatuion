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
  SvgIcon,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { checkExpression, isAnswer, isNotEmptyString, removeSpaces } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { C01_0007_42 } from '../42/store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01_0007_42);
  const [isShow, setIsShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        3장의 카드에 쓰인 수 중에서 두 수를 골라 차가 가장 큰 뺄셈식을 만들고 계산해 보세요.
      </>
    ),
    mark: cardData.P01.isSubmitted ? (cardData.P01.isCorrect ? 'correct' : 'incorrect') : 'none',
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
      setCardData(prev => ({ ...prev, P01: { ...prev.P01, value1: value } }));
    } else if (subkey === 2) {
      setCardData(prev => ({ ...prev, P01: { ...prev.P01, value2: value } }));
    }
    changeData('P01', 1, subkey, value);
  };

  const handleSubmit = () => {
    if (cardData.P01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect1 = checkExpression(removeSpaces(cardData.P01.value1), cardData.P01.answer1);
      const isCorrect2 = isAnswer(cardData.P01.value2, cardData.P01.answer2);
      const isCorrect = isCorrect1 && isCorrect2;

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.P01.value1,
              isCorrect: isAnswer(cardData.P01.value1, cardData.P01.answer1),
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.P01.value2,
              isCorrect: isAnswer(cardData.P01.value2, cardData.P01.answer2),
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
      setCardData(prev => ({
        ...prev,
        P01: { ...prev.P01, isCorrect: isCorrect, isCorrect1: isCorrect1, isCorrect2: isCorrect2, isSubmitted: true },
      }));
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P01: {
            ...prev.P01,
            value1: userSubmissionList[0].inputData[0]?.value || cardData.P01.value1,
            value2: userSubmissionList[0].inputData[1]?.value || cardData.P01.value2,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.P01.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.P01.isCorrect2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      submitDisabled={!cardData.P01.value1 || !cardData.P01.value2}
      submitLabel={cardData.P01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitBtnColor={
        !isNotEmptyString(cardData.P01.value1) || !isNotEmptyString(cardData.P01.value2)
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
              <List gap={24} data={[534, 712, 197]} align='horizontal' row={({ value, index = 1 }) => <Typography>{value}</Typography>} />
            </Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              readOnly={cardData.P01.isSubmitted}
              maxLength={50}
              minWidth='296px'
              marginLeft={12}
              textAlign='center'
              value={cardData.P01.value1}
              onChange={e => {
                handleInputChange(1, e.target.value);
              }}
              ariaLabel='식을 적어주세요.'
              status={cardData.P01.isSubmitted && !cardData.P01.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type='number'
              readOnly={cardData.P01.isSubmitted}
              maxLength={50}
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData.P01.value2}
              onChange={e => {
                handleInputChange(2, e.target.value);
              }}
              ariaLabel='답을 적어주세요.'
              status={cardData.P01.isSubmitted && !cardData.P01.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
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
            <Typography size={EStyleFontSizes.MEDIUM}>
              {cardData.P01.answer1}, {cardData.P01.answer2}
            </Typography>
          </Box>
          <Box marginTop='20px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>{cardData.P01.commentary}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
