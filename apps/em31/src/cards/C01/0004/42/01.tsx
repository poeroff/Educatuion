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
import { C01000442 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(C01000442);
  const [isShow, setIsShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathReview',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='1' type='icon' />
        <Box display='flex' flexWrap='wrap'>
          수 카드
          <Box borderRadius={5} useRound background='yellow' hAlign='center' width={'10px'} height={'50px'} marginRight={'5px'} marginLeft={'5px'}>
            4
          </Box>
          <Box borderRadius={5} background='yellow' hAlign='center' width={'10px'} height={'50px'} marginRight={'5px'}>
            5
          </Box>
          <Box borderRadius={5} background='yellow' hAlign='center' width={'10px'} height={'50px'} marginRight={'5px'}>
            7
          </Box>
          <span>을 한 번씩만 이용하여 세 자리 수를 만들려고</span> 합니다. 만들 수 있는 가장 큰 수와 가장 작은 수의 합을 구해 보세요 .
        </Box>
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
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
        },
      ],
    },
  ];

  const handleInputChange = (subkey: number, value: string) => {
    if (subkey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, value1: value } }));
    }
    changeData('P01', 1, subkey, value);
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect = isAnswer(cardData.p01.value1, cardData.p01.answer1);
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.value1,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isCorrect: isCorrect, isSubmitted: true } }));
    }
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
            value1: userSubmissionList[0].inputData[0]?.value || cardData.p01.value1,
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      useRound
      submitDisabled={!cardData.p01.value1}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitBtnColor={
        !isNotEmptyString(cardData.p01.value1) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW
      }
      vAlign='flex-start'
    >
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <Box display='flex'>
          <Box borderRadius={10} background='yellow' hAlign='center' width={'80px'} height={'100px'} marginRight={'20px'}>
            <Typography size={EStyleFontSizes.LARGE}>4</Typography>
          </Box>
          <Box borderRadius={10} background='yellow' hAlign='center' width={'80px'} height={'100px'} marginRight={'20px'}>
            <Typography size={EStyleFontSizes.LARGE}>5</Typography>
          </Box>
          <Box borderRadius={10} background='yellow' hAlign='center' width={'80px'} height={'100px'}>
            <Typography size={EStyleFontSizes.LARGE}>7</Typography>
          </Box>
        </Box>

        <Box marginTop='20px'>
          <Input
            width='263px'
            value={cardData.p01.value1}
            readOnly={cardData.p01.isSubmitted}
            onChange={e => handleInputChange(1, e.target.value)}
            ariaLabel='1번 답란'
            status={cardData.p01.isSubmitted && !cardData.p01.isCorrect ? InputStatus.ERROR : InputStatus.ENABLE}
          />
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>1211</Typography>
          </Box>

          <Box marginTop={'20px'}>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM}>만들 수 있는 가장 큰 세 자리 수는 754이고 가장 작은 세 자리 수는 457 입니다.</Typography>
            <Typography size={EStyleFontSizes.MEDIUM}>754 + 457 = 1211</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
