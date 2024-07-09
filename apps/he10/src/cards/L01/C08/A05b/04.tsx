import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Typography,
  Image,
  IQuestionProps,
  Dropdown,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C08A05b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P04 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A05b);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setIsShow] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false]);

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
      ],
    },
  ];

  const dropdownList = ['inspiring', 'inspired'];
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Practice',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Choose the grammatically correct words.',
    mark: cardData.p04.isSubmitted ? (cardData.p04.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const submitBtnColor = cardData.p04.isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : isNotEmptyString(cardData.p04.answer)
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;
  const handleSubmit = () => {
    if (cardData.p04.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setIsCorrect(cardData.p04.answer.toLowerCase().trim() === cardData.p04.solution);
      setCardData(prev => ({
        ...prev,
        p04: { ...prev.p04, isSubmitted: true, isCorrect: cardData.p04.answer.toLowerCase().trim() === cardData.p04.solution },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p04.answer,
              isAnswer: true,
            },
          ],
          isCorrect: cardData.p04.answer.toLowerCase().trim() === cardData.p04.solution,
        },
      ];
      submitDataWithResult('P04', userSubmission, isCorrect);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    if (value !== undefined) {
      setOpenDropdown(openDropdown.map((val, idx) => idx + 1 === index));
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer: value } }));
      changeData('P04', 1, 1, value);
    }
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        handleSubmit();
      }}
      submitDisabled={cardData.p04.answer === ''}
      submitLabel={cardData.p04.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      bodyId='targetContainer'
    >
      <Box>
        <Box>
          <TextView title='보기'>
            <Image src={'/L01/C08/A05/HE1-L01-C08-A05.jpg'} width={'636px'} height='49px' alt='' ariaDescribedby={'img_desc'} />
            <Box type='hidden' id={'img_desc'}>
              (When) Paired with new partners, the chimpanzees usually failed to get the food. 빨간 색자 (When) Paired가 파란 색자 the chimpanzees와
              선으로 연결되어 있다.
            </Box>
          </TextView>
        </Box>
        <Box marginTop='20px' hAlign='flex'>
          <Typography>4. The students work hard to achieve their goals,</Typography>
          <Dropdown
            width='190px'
            selectedValue={cardData.p04.answer}
            dropdownList={dropdownList}
            isOpen={openDropdown[-1]}
            ariaLabel={'4번 문제의 답 선택란'}
            readOnly={cardData.p04.isSubmitted}
            isError={cardData.p04.isSubmitted && !cardData.p04.isCorrect}
            onClick={value => handleDropdownClick(0, value)}
          />
          <Typography>by</Typography>
        </Box>
        <Typography>their role models.</Typography>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box>
            <Typography>inspired</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P04;