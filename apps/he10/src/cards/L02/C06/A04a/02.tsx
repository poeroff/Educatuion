import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  ETagLine,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Textarea,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { textContentA04 } from '../A04/commonData';
import { contentInfo } from './contentInfo';
import { L02C06A04a } from './store';

const P02 = () => {
  const pageKey = 'p02';
  const pageNumber = 'P02';

  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A04a);
  const { userId } = useRecoilValue(studentAtom);

  const isSubmittable = cardData.p02.userInput !== '';

  /* default 제출 값 */
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
      isCorrect: false,
    },
  ];

  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const toggleShowAnswer = () => {
    setIsShowAnswer(!isShowAnswer);
  };
  const [opened, setOpened] = useState<boolean>(false);
  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (2)',
  };

  const questionText = (
    <Typography useGap={false}>
      <Typography weight={'var(--font-weight-bold)'} useGap={false}>
        Q2.
      </Typography>{' '}
      How long did it take Nani Tama to gather most of the whakapapa?
    </Typography>
  );

  const questionInfo = {
    text: questionText,
  };

  const content = textContentA04.content;

  const handleTextAreaOnChange = (value: string) => {
    setCardData(prev => {
      return { ...prev, [pageKey]: { ...prev[pageKey], userInput: value } };
    });
    changeData(pageNumber, 1, 1, value);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      return;
    } else {
      setCardData(prev => ({
        ...prev,
        [pageKey]: {
          ...prev[pageKey],
          isSubmitted: true,
        },
      }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData[pageKey].userInput,
            },
          ],
        },
      ];
      submitData(pageNumber, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId || 2;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            userInput: userSubmissionList[0].inputData[0].value || cardData[pageKey].userInput,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={!cardData[pageKey].isSubmitted ? '완료하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      submitDisabled={!isSubmittable}
      submitBtnColor={!isSubmittable ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      onSubmit={cardData[pageKey].isSubmitted ? () => toggleShowAnswer() : () => handleSubmit()}
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Textarea
            width='100%'
            height='100%'
            placeholder='내용을 입력해 주세요.'
            ariaLabel='서술형 입력란'
            value={cardData[pageKey].userInput}
            readOnly={cardData[pageKey].isSubmitted}
            onChange={e => handleTextAreaOnChange(e.target.value)}
          />
        </Box>
        <Box background='blue' useRound useFull>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom={'24px'}>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight='48px' useGap={false}>
                  &nbsp;{content}
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
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{contentInfo.P02.text[1]}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
