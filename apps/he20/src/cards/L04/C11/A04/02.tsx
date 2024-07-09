import {
  Box,
  BoxWrap,
  List,
  Scroll,
  TMainHeaderInfoTypes,
  Dropdown,
  Question,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { L04C11A04 } from './store';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [isShow, setShow] = useState(false);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L04C11A04);
  const { userId } = useRecoilValue(studentAtom);

  const PAGE_ID = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
    headerPattern: 'text',
  };

  const questionInfo = {
    text: '2. Choose the grammatically correct words for (A) ~ (C).',
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  const text = (
    <>
      &nbsp;&nbsp; Before we can fully embrace the era of AI-powered neural implants,
      <Typography type='blank' width='400px' title='빈칸' boxColor='var(--color-black)'></Typography>. The integration of AI technology with the human
      brain{' '}
      <Typography textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
        <Typography useGap={false} weight={'var(--font-weight-bold) '} textDecoration={'underline'}>
          (A)
        </Typography>{' '}
        raises / rises
      </Typography>
      &nbsp; concerns about what it means to be human. Our brains are believed to be central to our identity, existence, and value as human beings.
      However, an over-reliance on technology may delay our natural development and
      <Typography textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
        <Typography useGap={false} weight={'var(--font-weight-bold) '} textDecoration={'underline'}>
          (B)
        </Typography>{' '}
        create / creating
      </Typography>
      &nbsp; confusion about whether we are human, AI, or something in between. Another critical issue is privacy. There’s a risk
      <Typography textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
        <Typography useGap={false} weight={'var(--font-weight-bold) '} textDecoration={'underline'}>
          (C)
        </Typography>{' '}
        that / which
      </Typography>
      &nbsp; organizations or hackers could access personal data without permission through AI-connected implants. This means that our thoughts,
      emotions, and behaviors could be controlled by hackers.
    </>
  );

  const data = [
    { num: '(A)', dropdownList: ['raises', 'rises'] },
    { num: '(B)', dropdownList: ['create', 'creating'] },
    { num: '(C)', dropdownList: ['that', 'which'] },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      return;
    }
    const isCorrect = cardData.p02.values.every((val, idx) => val === cardData.p02.solution[idx]);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.values,
            isAnswer: true,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(PAGE_ID, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_ID)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            values: userSubmissionList[0].inputData[0]?.value || cardData.p02.values,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_ID, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(PAGE_ID);
    };
  }, []);

  const handleDropdownClick = (index: number, newValue: string | undefined) => {
    const originalValue = cardData.p02.values;
    const newValues = [...originalValue];
    if (newValue !== undefined) {
      newValues[index - 1] = newValue;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, values: newValues } }));
    }
    changeData(PAGE_ID, 1, 1, newValues);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p02.values.every(val => val)}
      submitBtnColor={
        cardData.p02.isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : !cardData.p02.values.every(val => val)
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
    >
      <BoxWrap useFull>
        <Box useFull useRound lineHeight='48px' paddingRight='16px' marginRight='24px' background='white'>
          <Scroll>
            <Box padding='4px 22px 4px 12px'>{text}</Box>
          </Scroll>
        </Box>
        <Box>
          <List data={data}>
            {({ index = 0, value }) => (
              <Box hAlign='center' marginBottom='10px' padding='10px'>
                <Question type='text' size='small'>
                  {value?.num}
                </Question>
                <Dropdown
                  width='225px'
                  marginLeft='10px'
                  dropdownList={value?.dropdownList}
                  onClick={newValue => handleDropdownClick(index, newValue)}
                  selectedValue={cardData.p02.values[index - 1] ? cardData.p02.values[index - 1] : undefined}
                  readOnly={cardData.p02.isSubmitted}
                  isError={cardData.p02.isSubmitted && cardData.p02.values[index - 1] !== cardData.p02.solution[index - 1]}
                  ariaLabel={'보기' + String.fromCharCode(65 + index)}
                />
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {cardData.p02.solution.map((item, index) => (
              <div key={index}>
                ({String.fromCharCode(65 + index)}) {item}
              </div>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
