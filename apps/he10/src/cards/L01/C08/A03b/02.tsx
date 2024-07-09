import { pageIdsAtom } from '@/stores/page';
import {
  BottomSheet,
  Box,
  Dropdown,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  Image,
  IQuestionProps,
  Tag,
  TextView,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C08A03b } from './store';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A03b);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const updatedAnswers = cardData.p02.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData('P02', 1, 1, updatedAnswers);
  };

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect = cardData.p02.answer.every((a, idx = 0) => a === cardData.p02.solution[idx]);
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT_LIST',
              value: cardData.p02.answer,
              isAnswer: true,
              isCorrect,
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

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [''],
        },
      ],
    },
  ];

  const isActive = () => {
    return !cardData.p02.answer.some(each => each === '' || each === undefined || each === null);
  };

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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Practice',
  };
  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks with who(m) or which.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onGrade}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!isActive()}
      submitBtnColor={isActive() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
    >
      <Box>
        <Box gap={'10px'}>
          <TextView title='보기'>
            <Image src={'/L01/C08/A03/HE1-L01-C08-A03.jpg'} width={'636px'} height='49px' alt='' ariaDescribedby='img_desc' />
            <Box type='hidden' id='img_desc'>
              <p>They set up a device which required two individuals to pull both ends of a rope at the same time.</p>
              <p>빨간 색자 which가 이끄는 절이 which 앞의 파란 색자 a device를 수식하는 모습을 나타낸다.</p>
            </Box>
          </TextView>
        </Box>
        <Box marginTop='24px' display='flex' flexDirection='column' gap={'10px'}>
          <Box paddingLeft={'10px'}>
            <Box hAlign='flex' whiteSpace='nowrap'>
              <Typography>2. Anyone</Typography>
              <Dropdown
                width='200px'
                dropdownList={cardData.p02.dropArr}
                selectedValue={cardData.p02.answer[0]}
                onClick={value => handleDropdownClick(0, value)}
                readOnly={cardData.p02.isSubmitted}
                isError={cardData.p02.isSubmitted && cardData.p02.answer[0] !== cardData.p02.solution[0]}
              />
              <Typography>loves to sing can take part in the singing</Typography>
            </Box>
            <Typography>contest.</Typography>
          </Box>
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              who
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
