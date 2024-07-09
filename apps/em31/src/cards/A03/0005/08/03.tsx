import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import {
  BottomSheet,
  Box,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { getMarking, isExpressionCorrect, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { A03_0005_08 } from './store';

const P03 = () => {
  const [isShow, setIsShow] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0005_08);
  const { userId } = useRecoilValue(studentAtom);
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathBasic',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label type='icon' value={2} size='small' />
        <Box vAlign='center' marginTop={'5px'}>
          <Typography fontSize='30px'>
            {' '}
            주이는 다 읽은 책 36권을 나눔 장터에서 팔려고 합니다. 책을 한 줄에 9권씩 정리할 때 몇 줄로 놓을 수 있나요?
          </Typography>
        </Box>
      </>
    ),
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
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
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect1 = isExpressionCorrect(cardData.p03.answer1, cardData.p03.solution1);
    const isCorrect2 = cardData.p03.answer2 === cardData.p03.solution2;
    const isCorrect = isCorrect1 && isCorrect2;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p03.answer1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p03.answer2,
          },
        ],
        isCorrect: isCorrect,
      },
    ];

    submitDataWithResult('P03', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: value } }));
    }
    changeData('P03', 1, subKey, value);
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
    <DialogContainer
      bodyId='targetContainer3'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p03.answer1 && cardData.p03.answer2)}
      submitBtnColor={
        cardData.p03.answer1 && cardData.p03.answer2 ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <Box display='flex' justifyContent='center'>
        <Box>
          <Box>
            <Label value='식' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              minWidth='296px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p03.answer1}
              onChange={e => handleChange(1, e.target.value)}
              readOnly={cardData.p03.isSubmitted}
              status={
                !isNotEmptyString(cardData.p03.answer1)
                  ? InputStatus.DEFAULT
                  : cardData.p03.isSubmitted && !isExpressionCorrect(cardData.p03.answer1, cardData.p03.solution1)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='식을 적어주세요.'
            />
          </Box>
          <Box marginTop='8px'>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />
            <Input
              type='number'
              width='124px'
              marginLeft={12}
              textAlign='center'
              value={cardData.p03.answer2}
              onChange={e => handleChange(2, e.target.value)}
              readOnly={cardData.p03.isSubmitted}
              status={
                !isNotEmptyString(cardData.p03.answer2)
                  ? InputStatus.DEFAULT
                  : cardData.p03.isSubmitted && !(cardData.p03.answer2 === cardData.p03.solution2)
                  ? InputStatus.ERROR
                  : InputStatus.ENABLE
              }
              ariaLabel='답을 적어주세요.'
            />
            <Typography>줄</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer3' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>36÷9=4 또는 36÷9, 4</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>(전체 책 수)÷(한 줄에 정리할 책 수)=36÷9=4(줄)</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P03;
