import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  BottomSheet,
  Button,
  Tag,
  Scroll,
  ETagLine,
  Typography,
  EStyleButtonTypes,
  EStyleSizes,
  Textarea,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect } from 'react';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L04C06A07a } from './store';
import { useRecoilValue, useRecoilState } from 'recoil';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A07a);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (5)',
  };
  const questionInfo = {
    text: 'Q5. What are three functions of fabric made from used coffee grounds?',
  };

  const answer = 'It refers to various social issues caused by noise pollution.';

  const [opened, setOpened] = useState<boolean>(false);
  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);

  const { userId } = useRecoilValue(studentAtom);
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            userInput: userSubmissionList[0].inputData[0]?.value || cardData.p02.userInput,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const handleSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.userInput,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
    } else {
      setIsAnswerOpen(!isAnswerOpen);
    }
  };

  const content =
    'Recycled coffee grounds have a wide range of uses, including coffee logs, fabrics for clothing and shoes, and reusable cups. Coffee logs, for instance, generate more heat and burn for a longer time than wood. Fabric made from coffee grounds absorbs sweat, dries quickly, and provides UV protection. Reusable cups from coffee grounds not only have a visually appealing appearance but also preserve the taste of the coffee. Korea has shown a growing interest in recycling spent coffee grounds in recent years. The government is taking steps toward the creation of a sustainable recycling system in the coffee industry, while companies are dedicating themselves to researching and developing new uses for coffee waste. By recycling materials such as coffee waste, individuals can also help protect the environment. With continued efforts, the recycling of used coffee grounds is expected to increase, encouraging more sustainable methods of enjoying coffee for years to come.';

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        isNotEmptyString(cardData.p02.userInput) ? (isAnswerOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      submitLabel={cardData.p02.isSubmitted ? (isAnswerOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!cardData.p02.userInput && !cardData.p02.isSubmitted}
      onSubmit={handleSubmit}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            width='100%'
            height='100%'
            placeholder='내용을 입력해 주세요.'
            readOnly={cardData.p02.isSubmitted}
            ariaLabel={'답란'}
            value={cardData.p02.userInput}
            onChange={e => {
              setCardData(prev => ({ ...prev, p02: { ...prev.p02, userInput: e.target.value } }));
              changeData('P02', 1, 1, e.target.value);
            }}
          />
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false}>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleButtonOnClick} />
            </Box>
          )}
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isAnswerOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
