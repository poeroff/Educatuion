import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Textarea,
  IQuestionProps,
  Scroll,
  Typography,
  BottomSheet,
  ETagLine,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A06a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const content = `An example of a circular economy in action occurs when a chain of coffee shops collaborates with an organization to collect spent coffee
    grounds from its shops. These grounds are processed to remove impurities and dried out. The resulting SCGs are sold to fertilizer
    companies, where they are transformed into organic fertilizer. This fertilizer is later sold back to the coffee shop chain. The chain
    provides the fertilizer to local ecofriendly farmers, who then sell their produce back to the chain. The farm produce can be used to
    create various food items, such as rice chips and dried sweet potatoes, which are sold in the chain’s coffee shops. By repurposing coffee
    grounds in this manner, related businesses and local farmers can benefit both economically and environmentally.`;

  const pageKey = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A06a);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const { userId } = useRecoilValue(studentAtom);
  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer: userSubmissionList[0].inputData[0]?.value || cardData[pageKey].answer,
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setAnswerOpen(!isAnswerOpen);
      return;
    }

    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true } }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [{ subKey: 1, type: 'TEXTAREA', value: cardData[pageKey].answer }],
      },
    ];
    submitData(pageKey, userSubmission);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A Better Future for Coffee Waste (4)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q4. What kind of food items are made from produce grown with coffee fertilizer?',
    mark: 'none',
  };

  const [opened, setOpened] = useState<boolean>(false);
  const [isAnswerOpen, setAnswerOpen] = useState<boolean>(false);

  const handleInputChangeEvent = (value: string) => {
    const truncateValue = truncateToMaxBytes(value);

    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: truncateValue,
      },
    }));
    changeData(pageKey, 1, 1, truncateValue);
  };

  const getButtonColor = () => {
    if (!cardData[pageKey].isSubmitted) {
      return !cardData[pageKey].answer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    }
  };

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const getSubmitLabel = () => (cardData[pageKey].isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기');

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={getButtonColor()}
      submitLabel={getSubmitLabel()}
      submitDisabled={!cardData[pageKey].isSubmitted && !cardData[pageKey].answer}
      onSubmit={() => submitAnswer()}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            width='100%'
            height='100%'
            placeholder='내용을 입력해 주세요.'
            readOnly={cardData[pageKey].isSubmitted}
            ariaLabel={'답란'}
            value={cardData[pageKey].answer}
            onChange={e => handleInputChangeEvent(e.target.value)}
          />
        </Box>
        <Box useFull>
          <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
            {opened ? (
              <>
                <Box hAlign='flex-end' marginBottom='8px'>
                  <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
                </Box>
                <Scroll height='calc(100% - 52px)' tabIndex={0}>
                  <Typography lineHeight={'48px'}>{content}</Typography>
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
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{cardData[pageKey].commentary}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
