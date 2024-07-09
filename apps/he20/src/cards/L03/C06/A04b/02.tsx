import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dropdown,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03C06A04b } from './store';
import { contentInfo } from '../A04/contentInfo';
import { getMarking, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A04b);
  const [isShow, setIsShow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const currentPage = 'P02';

  const [isOpen, setIsOpen] = useState(false); // 지문 보기

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [''],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];
  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
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
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
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
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const handleDropdownClick = (index: number, newValue: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const originalValue = cardData.p02.answer;
    const newValues = [...originalValue];

    if (newValue !== undefined) {
      newValues[index] = newValue;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: newValues } }));
    }
    changeData(currentPage, 1, 1, newValues);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'From Shadows to Spotlights (2)',
  };
  const questionText = (
    <Typography>
      <Typography weight={'var(--font-weight-bold)'}>Q2.</Typography> Choose the correct words to complete the sentences.
    </Typography>
  );

  const questionInfo: IQuestionProps = {
    text: questionText,
    mark: getMarking(cardData.p02.isSubmitted, cardData.p02.isCorrect),
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      submitDisabled={!cardData.p02.answer.every(isNotEmptyString)}
      submitBtnColor={
        cardData.p02.answer.every(isNotEmptyString) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
      vAlign={'flex-start'}
    >
      <BoxWrap useFull>
        <Box
          width='448px'
          display='inline'
          useFull
          background='var(--color-white)'
          border={'1px solid var(--color-grey-600)'}
          useRound
          marginRight='24px'
        >
          <Box padding='6px 12px '>
            <Box whiteSpace='nowrap' hAlign='flex'>
              <Typography>Bill Traylor</Typography>
              <Dropdown
                width={'240px'}
                dropdownList={cardData.p02.dropArr}
                isOpen={openDropdown[0]}
                selectedValue={cardData.p02.answer[0]}
                readOnly={cardData.p02.isSubmitted}
                onClick={value => handleDropdownClick(0, value)}
                ariaLabel='1번재 답 선택칸'
                isError={cardData.p02.isSubmitted && cardData.p02.answer[0] !== cardData.p02.solution[0]}
              />
            </Box>
            <Typography>drawing when he was around 85 years old.</Typography>
          </Box>
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isOpen ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px'>
                <Button
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={() => setIsOpen(!isOpen)}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight='48px' useGap={true}>
                  &nbsp;
                  {contentInfo.map(content => {
                    return content.originText;
                  })}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문 보기' minWidth='118px' useRound onClick={() => setIsOpen(!isOpen)} />
            </Box>
          )}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='container' height={'40%'} show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {cardData.p02.solution.map((ans, idx) => {
              return <Box key={idx} margin='10px'>{`(${idx + 1}) ${ans}    `}</Box>;
            })}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
