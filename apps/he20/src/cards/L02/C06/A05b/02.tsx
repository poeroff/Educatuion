import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Button,
  EStyleButtonTypes,
  EStyleSizes,
  Scroll,
  Typography,
  BottomSheet,
  ETagLine,
  Tag,
  Input,
  SvgIcon,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L02C06A05b } from './store';
import styled from '@emotion/styled';
import RightArrowIcon from '@maidt-cntn/assets/icons/simple_right_arrow.svg';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A05b);
  const [isShow, setShow] = useState(false);

  const answer = (
    <>
      I might feel{' '}
      <Typography useGap={false} textDecoration={'underline'}>
        unpleasant
      </Typography>
      .
    </>
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (3)',
  };
  const questionInfo = {
    text: (
      <>
        <QuestionNumber>Q2.</QuestionNumber>Fill in the blanks to answer the question.
      </>
    ),
  };

  const [opened, setOpened] = useState<boolean>(false);
  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const content =
    'Another common type of dark pattern is known as “hidden fees.” This design suddenly adds extra fees at the last step of the ordering process. On the final page, consumers are surprised to discover additional charges, such as shipping or processing fees, which the seller has added to increase 5 the final cost of the order.\n\n“Confirm-shaming” is another online trick that users should be aware of. This technique manipulates users into feeling ashamed for cancelling their membership or requesting a refund for an order. Companies use this to keep their members subscribed, even if it goes against the members’ intentions. For example, when users want to cancel their subscription, they are offered two options: “I want to keep my benefits” and “I want to give up my benefits.” The first option is presented in an appealing way, while the second option seems like a bad choice.';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <BoxWrap useFull maxHeight={'90%'}>
        <Box background={'white'} useRound alignContent='center'>
          <Box>
            <Typography>If you encountered a confirm-shaming trick, how would you feel?</Typography>
          </Box>
          <Box>
            <Typography>
              <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px', marginRight: '5px' }} src={RightArrowIcon} size='36px' />I might feel{' '}
              <Input
                value={cardData.p02.answer1}
                onChange={handleInputChange}
                readOnly={cardData.p02.isSubmitted}
                ariaLabel='답란'
                width='180px'
                maxLength={999}
                status={!isNotEmptyString(cardData.p02.answer1) ? InputStatus.DEFAULT : InputStatus.ENABLE}
              />
            </Typography>
          </Box>
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='56px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false} style={{ whiteSpace: 'pre-wrap', textIndent: '24px' }}>
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
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>{answer}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;

const QuestionNumber = styled.span`
  font-weight: var(--font-weight-extraBold);
  margin-right: 10px;
`;
