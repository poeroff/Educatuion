import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { contentInfo } from './contentInfo';
import { L02C06A04 } from './store';

const P02 = () => {
  const pageKey = 'P02';

  const { initData, changeData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A04);
  const { userId } = useRecoilValue(studentAtom);

  const isSubmittable = cardData[pageKey].userInput.every(v => isNotEmptyString(v));

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  /* 팝업 오픈, answer */

  const [opened, setOpened] = useState<boolean>(false);
  const handleButtonOnClick = () => {
    setOpened(!opened);
  };
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      saveData(pageKey);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const handleInputOnChange = (value: string, idx: number) => {
    setCardData(prev => {
      return {
        ...prev,
        [pageKey]: { ...prev[pageKey], userInput: [...prev[pageKey].userInput.slice(0, idx), value, ...prev[pageKey].userInput.slice(idx + 1)] },
      };
    });
    changeData(pageKey, 1, 1 + idx, value);
  };

  const handleSubmit = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
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
          inputData: cardData[pageKey].userInput.map((v, i) => ({
            subKey: i + 1,
            type: 'TEXT',
            value: v,
          })),
        },
      ];
      submitData(pageKey, userSubmission);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageKey)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            userInput: userSubmissionList[0].inputData.map((v: any, i: number) => v.value || cardData[pageKey].userInput[i]),
            isSubmitted,
          },
        }));
      }
      initData(pageKey, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (2)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: (
      <>
        <QuestionNumber>Q2.</QuestionNumber>
        Scan the paragraphs. What are three types of dark patterns?
      </>
    ),
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      onSubmit={handleSubmit}
      submitDisabled={!isSubmittable}
      submitLabel={!isSubmittable || !cardData[pageKey].isSubmitted ? '완료하기' : isShowAnswer ? '답안 닫기' : '답안 보기'}
      bodyId='targetContainer'
      submitBtnColor={!isSubmittable || isShowAnswer ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
    >
      <Box vAlign='center' useFull>
        <Box>
          <Box>
            <Typography>(1)</Typography>
            <Input
              ariaLabel='1번 답안 입력'
              name='ans1'
              value={cardData[pageKey].userInput[0]}
              minWidth='600px'
              maxLength={100}
              onChange={event => handleInputOnChange(event.target.value, 0)}
              status={isNotEmptyString(cardData[pageKey].userInput[0]) ? InputStatus.ENABLE : InputStatus.DEFAULT}
              readOnly={cardData[pageKey].isSubmitted}
              placeholder='내용을 넣어 주세요.'
            />
          </Box>
          <Box marginTop='20px'>
            <Typography>(2)</Typography>
            <Input
              ariaLabel='2번 답안 입력'
              name='ans2'
              value={cardData[pageKey].userInput[1]}
              minWidth='600px'
              maxLength={100}
              onChange={event => handleInputOnChange(event.target.value, 1)}
              status={isNotEmptyString(cardData[pageKey].userInput[1]) ? InputStatus.ENABLE : InputStatus.DEFAULT}
              readOnly={cardData[pageKey].isSubmitted}
              placeholder='내용을 넣어 주세요.'
            />
          </Box>
          <Box marginTop='20px'>
            <Typography>(3)</Typography>
            <Input
              ariaLabel='3번 답안 입력'
              name='ans3'
              value={cardData[pageKey].userInput[2]}
              minWidth='600px'
              maxLength={100}
              onChange={event => handleInputOnChange(event.target.value, 2)}
              status={isNotEmptyString(cardData[pageKey].userInput[2]) ? InputStatus.ENABLE : InputStatus.DEFAULT}
              readOnly={cardData[pageKey].isSubmitted}
              placeholder='내용을 넣어 주세요.'
            />
          </Box>
        </Box>
      </Box>
      <Box alignSelf='flex-end'>
        <Button
          minWidth='118px'
          size={EStyleSizes.SMALL}
          color={EStyleButtonTypes.SECONDARY}
          label='지문보기'
          useRound
          onClick={() => {
            handleButtonOnClick();
          }}
        />
      </Box>

      <Dialog
        width={921}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight='var(--font-weight-bold)' size={EStyleFontSizes.MEDIUM}>
              Light Up Dark Patterns (2)
            </Typography>
          </Box>
        )}
        isShow={opened}
        onClose={() => handleButtonOnClick()}
        useFooter={true}
        closeLabel={'지문 닫기'}
      >
        {
          <Scroll height='100%'>
            <Typography>
              &nbsp;&nbsp;
              {contentInfo.map((content, idx) => {
                if (idx < 5) return content.originText;
              })}
            </Typography>
            <Typography></Typography>
            <Typography usePre>
              &nbsp;&nbsp;
              {contentInfo.map((content, idx) => {
                if (idx >= 5) return content.originText;
              })}
            </Typography>
          </Scroll>
        }
      </Dialog>

      <BottomSheet bottomSheetTargetId='targetContainer' show={cardData[pageKey].isSubmitted && isShowAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography usePre>{`(1) forced continuity \n(2) hidden fees \n (3) confirm shaming`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const QuestionNumber = styled.span`
  font-size: var(--font-size-36);
  font-weight: var(--font-weight-extraBold);
  line-height: 58px;
  margin-right: 10px;
`;
