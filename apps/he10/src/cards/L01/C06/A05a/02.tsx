import React, { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Textarea,
  TextareaStatus,
  Typography,
  EStyleSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from 'styled-components';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { L01C06A05a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [isShow, setShow] = useState(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C06A05a);
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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'The Power of Friendliness: Soft but Strong (3)',
  };

  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Q3. Read through the passages. How many examples are presented that support how friendliness is related to survival?',
  };

  const contents =
    ' I’ll give you another example of how friendliness is related to survival.' +
    ' Dr. Hare and his colleagues designed an experiment with chimpanzees and bonobos.' +
    ' Although the two are genetically similar, they are different in nature.' +
    ' He conducted an experiment to see how dogs would respond to human gestures compared to wolves, who share the same common ancestor.' +
    ' To study their cooperative behavior, Dr. Hare’s team set up a device which required two individuals to pull both ends of a rope at the same time in order to access food on a board.' +
    ' When placed with partners that the chimpanzees knew, they were able to work together to get the food.' +
    ' However, when paired with new partners, the chimpanzees usually failed to get the food, and when they occasionally succeeded, they did not share  the food with their partner' +
    ' The bonobos, on the other hand, got along much better than the chimpanzees.' +
    ' They solved the problem regardless of which individual they were paired with, and they were also more willing to share the food.' +
    ' This research shows that bonobos have a cooperative and friendly nature.' +
    ' Experts suggest that their nature has helped their species survive.' +
    ' Without these characteristics, they could have faced extinction.';

  const boxHeight = '350px';

  const handleClickButton = () => {
    setOpened(!opened);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={onSubmitText}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer1) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!isNotEmptyString(cardData.p02.answer1)}
    >
      <BoxWrap useFull boxGap={24} width={920}>
        <Box width='50%' height={boxHeight}>
          <Textarea
            width='100%'
            height='100%'
            ariaLabel='답 입력란'
            placeholder='내용을 넣어 주세요.'
            value={cardData.p02.answer1}
            readOnly={cardData.p02.isSubmitted}
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
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleClickButton} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false}>
                  {contents}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문보기' minWidth='118px' useRound onClick={handleClickButton} />
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
            <Typography useGap={false}>
              There are two examples: one involving dogs and wolves and the other involving chimpanzees and bonobos.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ButtonWrap = styled.div`
  padding: 6px 14px;
  display: flex;
  justify-content: flex-end;
`;

export default P02;
