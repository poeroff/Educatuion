import { useEffect, useState } from 'react';

import {
  Box,
  Input,
  Label,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Image,
  EStyleButtonTypes,
  InputStatus,
  BottomSheet,
  ETagLine,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';

import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { userSubmissionType, getUserSubmission } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { A03_0005_08 } from './store';

const P04 = () => {
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
        <Label type='icon' value={3} size='small' />
        <Box vAlign='center' marginTop={'5px'}>
          <Typography fontSize='30px'>나눗셈이 적힌 종이에 얼룩이 생겨 나누는 수가 보이지 않습니다. 나 누는 수는 얼마인가요?</Typography>
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

  const handleSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setIsShow(!isShow);
      return;
    }
    const isCorrect = cardData.p04.answer === cardData.p04.solution;

    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true, isCorrect } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }

      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (value: string) => {
    setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: value } }));
    changeData('P04', 1, 1, value);
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
    <DialogContainer
      bodyId='targetContainer4'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p04.answer}
      submitBtnColor={cardData.p04.answer ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      onSubmit={handleSubmit}
    >
      <Box useFull hAlign='start' justifyContent='flex-start' flexDirection='column'>
        <Image src={'/C03/0005/10/EC31310.png'} alt='얼룩이 묻어서 72÷□=9의 □가 보이지 않는 그림입니다.' size='200px' />
        <Box marginTop='-30px'>
          <Input
            type='number'
            width='100px'
            value={cardData.p04.answer}
            onChange={e => handleChange(e.target.value)}
            readOnly={cardData.p04.isSubmitted}
            status={
              !isNotEmptyString(cardData.p04.answer)
                ? InputStatus.DEFAULT
                : cardData.p04.isSubmitted && !(cardData.p04.answer === cardData.p04.solution)
                ? InputStatus.ERROR
                : InputStatus.ENABLE
            }
            ariaLabel='답을 입력하세요'
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer4' show={isShow} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography>8</Typography>
          </Box>
          <Box>
            <Tag type={ETagLine.GREEN} label='풀이' />
          </Box>
          <Box marginTop='10px'>
            <Typography>나누는 수를 □라고 하면 72÷□=9입니다.</Typography>
            <Typography>따라서 □=72÷9=8입니다.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P04;
