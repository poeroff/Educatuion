import { useEffect, useState } from 'react';
import {
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  TMainHeaderInfoTypes,
  EStyleSizes,
  Scroll,
  Typography,
  EStyleFontSizes,
  Dropdown,
  BottomSheet,
  Tag,
  ETagLine,
  SvgIcon,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrowRight from '@/assets/icon/arrow_right.svg';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L02C06A07b } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P02 = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A07b);
  const pageNo = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (5)',
  };

  const questionInfo = {
    text: 'Q4. Choose the one to fill in the blank.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const dropdownList = ['ban', 'promote'];

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: [undefined],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNo)?.pageId;
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
      initData(pageNo, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    const updatedAnswers = cardData.p02.answer.map((ans, idx = 0) => (idx === index && value !== undefined ? value : ans));
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData(pageNo, 1, 1, updatedAnswers);
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
            isCorrect: cardData.p02.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNo, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNo);
    };
  }, []);

  const isActive = () => {
    return cardData.p02.answer[0] !== '';
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={submitAnswer}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={isActive() ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY}
      submitDisabled={!isActive()}
    >
      <BoxWrap useFull>
        <Box vAlign='center' hAlign='flex-start' useFull tabIndex={101}>
          <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM}>
            What is the purpose of the EU’s Digital Service Act?
            <Box vAlign='center'>
              <SvgIcon src={arrowRight} size='38px' />
              <Typography>The purpose of the EU’s</Typography>
            </Box>
            <Typography>Digital Service Act is to</Typography>
            <Typography>
              <Dropdown
                width='200px'
                type={'up'}
                dropdownList={dropdownList}
                onClick={value => handleDropdownClick(0, value)}
                readOnly={cardData.p02.isSubmitted}
                isError={cardData.p02.isSubmitted && !cardData.p02.isCorrect}
                selectedValue={cardData.p02.answer[0]}
              />
            </Typography>
            dark patterns on online platforms.
          </Typography>
        </Box>

        <Box useFull>
          <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
            {opened ? (
              <>
                <Box hAlign='flex-end' marginBottom='8px'>
                  <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
                </Box>
                <Scroll height='calc(100% - 52px)'>
                  <Typography lineHeight={'48px'} useGap={false}>
                    Dark patterns, in contrast, not only manipulate customers to act against their intentions, but they can also lead to financial
                    losses and personal data leaks. To tackle this problem, extensive research across various websites and applications is being
                    conducted to document the prevalence of dark patterns and come up with solutions. In addition to research, governments are
                    actively discussing on how to regulate these deceptive design patterns. The EU’s Digital Service Act, which banned dark patterns
                    on online platforms in 2022, is a good example of such regulation in this area. Such regulations are expected to increase,
                    limiting companies’ deceptive marketing practices in the digital market. However, regulations alone may not be sufficient. As
                    individuals, we should take steps to combat dark patterns and be responsible for our online shopping behavior. This includes being
                    cautious while making purchases, reading terms and conditions carefully, and recognizing that companies’ interests may not be the
                    same as our own. Developing an awareness of dark patterns is also essential to avoid potential harm and economic loss. Ultimately,
                    our attention and efforts will protect us from manipulation and enable us to make wise decisions in this digital age.
                  </Typography>
                </Scroll>
              </>
            ) : (
              <Box vAlign='center' hAlign='center' useFull>
                <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
              </Box>
            )}
          </Box>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <div>{cardData.p02.solution}</div>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
