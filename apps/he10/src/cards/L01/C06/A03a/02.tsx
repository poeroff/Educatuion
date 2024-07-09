import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  BoxWrap,
  EStyleButtonTypes,
  Typography,
  Scroll,
  IQuestionProps,
  TMainHeaderInfoTypes,
  Textarea,
  BottomSheet,
  ETagLine,
  Tag,
  EStyleSizes,
  TextareaStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C06A03a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A03a);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

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

  const onSubmitText = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: e.target.value } }));
    changeData('P02', 1, 1, e.target.value);
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

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Q1. Who is the speaker?',
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong  (1)',
    headerPattern: 'text',
  };

  const contents = `It’s good to see you, everyone! I’m Dr. Edward Wilson, an evolutionary biologist. Thank you for inviting me here today. On my way, I had trouble locating this room. Luckily, a friendly student came up to me and walked me here. It’s fascinating how, in situations like this, we want to help someone in need. Now, this raises some interesting questions: where does our friendliness come from, and why is it important?`;

  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const boxHeight = '400px';

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer1) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer1)}
      onSubmit={onSubmitText}
    >
      <BoxWrap useFull>
        <Box width='50%' height={boxHeight}>
          <Textarea
            width='100%'
            height='100%'
            placeholder='내용을 넣어 주세요.'
            value={cardData.p02.answer1}
            readOnly={cardData.p02.isSubmitted}
            ariaLabel={'답안 입력란'}
            onChange={handleInputChange}
            status={cardData.p02.isSubmitted ? TextareaStatus.DEFAULT : TextareaStatus.ENABLE}
          />
        </Box>

        <Box
          width='50%'
          height={boxHeight}
          background='var(--color-blue-50)'
          border={'1px solid var(--color-grey-600)'}
          useRound
          useFull
          padding='20px 16px'
        >
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false}>
                  {contents}
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

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow && cardData.p02.isSubmitted}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>The speaker is Dr. Edward Wilson, an evolutionary biologist.</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const ButtonWrap = styled.div`
  padding: 6px 14px;
  display: flex;
  justify-content: flex-end;
`;
