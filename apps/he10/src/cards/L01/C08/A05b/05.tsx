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

const P05 = () => {
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

  const dropdownList = ['Locating', 'Located'];
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Practice',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Choose the grammatically correct words.',
    mark: cardData.p05.isSubmitted ? (cardData.p05.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };
  const submitBtnColor = cardData.p05.isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : isNotEmptyString(cardData.p05.answer)
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;
  const handleSubmit = () => {
    if (cardData.p05.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setIsCorrect(cardData.p05.answer.toLowerCase().trim() === cardData.p05.solution);
      setCardData(prev => ({
        ...prev,
        p05: { ...prev.p05, isSubmitted: true, isCorrect: cardData.p05.answer.toLowerCase().trim() === cardData.p05.solution },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p05.answer,
              isAnswer: true,
            },
          ],
          isCorrect: cardData.p05.answer.toLowerCase().trim() === cardData.p05.solution,
        },
      ];
      submitDataWithResult('P05', userSubmission, isCorrect);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    if (value !== undefined) {
      setOpenDropdown(openDropdown.map((val, idx) => idx + 1 === index));
      setCardData(prev => ({ ...prev, p05: { ...prev.p05, answer: value } }));
      changeData('P05', 1, 1, value);
    }
  };
  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P05')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p05: {
            ...prev.p05,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p05.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P05', userSubmissionList, defaultSubmission, isSubmitted);
    }
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        handleSubmit();
      }}
      submitDisabled={cardData.p05.answer === ''}
      submitLabel={cardData.p05.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
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
          <Typography>5.</Typography>
          <Dropdown
            width='190px'
            selectedValue={cardData.p05.answer}
            dropdownList={dropdownList}
            isOpen={openDropdown[-1]}
            ariaLabel={'5번 문제의 답 선택란'}
            readOnly={cardData.p05.isSubmitted}
            isError={cardData.p05.isSubmitted && !cardData.p05.isCorrect}
            onClick={value => handleDropdownClick(0, value)}
          />
          <Typography>about 1,900 meters above sea level, the peak of </Typography>
        </Box>
        <Typography>Mt. Halla offers a scenic view of Jeju.</Typography>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box>
            <Typography>Located</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P05;
