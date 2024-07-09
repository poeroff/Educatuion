import React, { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  Box,
  Scroll,
  Typography,
  EStyleFontSizes,
  TMainHeaderInfoTypes,
  Input,
  Button,
  EStyleButtonTypes,
  Dialog,
  SvgIcon,
  BottomSheet,
  ETagLine,
  EStyleSizes,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_icon from '@maidt-cntn/assets/icons/arrow-icon.svg';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L02C06A05 } from './store';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P02 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A05);
  const { userId } = useRecoilValue(studentAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Light Up Dark Patterns (3)',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Q2. Fill in the blanks to answer the question.',
  };

  const handleDialogButtonClick = () => {
    setIsDialogOpen(true);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsBottomSheetOpen(!isBottomSheetOpen);
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
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
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
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            isSubmitted,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData('P02', 1, subKey, value);
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
      vAlign='flex-start'
      submitLabel={cardData.p02.isSubmitted ? (isBottomSheetOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!isNotEmptyString(cardData.p02.answer1) || !isNotEmptyString(cardData.p02.answer2)}
      submitBtnColor={
        isNotEmptyString(cardData.p02.answer1) && isNotEmptyString(cardData.p02.answer2)
          ? isDialogOpen
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={submitAnswer}
    >
      <Box hAlign='flex-end' vAlign='flex-start'>
        <Button size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' useRound onClick={handleDialogButtonClick} />
      </Box>
      <Box background={'white'} useRound marginTop={'20px'} height={'220px'}>
        <Scroll tabIndex={0}>
          <Typography useGap={false}>If you encountered a confirm-shaming trick, how would you feel?</Typography>
          <Box>
            <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px' }} src={arrow_icon} size='34px' />
            <Typography>I might feel</Typography>
            <Input
              name='userAnswer1'
              width={'215px'}
              value={cardData.p02.answer1}
              onChange={e => handleChange(1, e.target.value)}
              maxLength={99}
              inputSize={'x-small'}
              placeholder='내용을 넣어 주세요.'
              readOnly={cardData.p02.isSubmitted}
              aria-label='첫번째 내용을 넣어 주세요.'
            />{' '}
            ,
          </Box>
          <Box marginTop={'10px'}>
            <Typography>but I would</Typography>
            <Input
              name='userAnswer2'
              width={'520px'}
              value={cardData.p02.answer2}
              onChange={e => handleChange(2, e.target.value)}
              maxLength={99}
              placeholder='내용을 넣어 주세요.'
              inputSize={'x-small'}
              readOnly={cardData.p02.isSubmitted}
              aria-label='두번째 내용을 넣어 주세요.'
            />{' '}
            .
          </Box>
        </Scroll>
      </Box>

      <Dialog
        width={950}
        height={458}
        topHeight={50}
        useHeader
        header={() => (
          <Box height='50px' marginBottom='20px' background={'gray'} useRound={true}>
            <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
              Light Up Dark Patterns (3)
            </Typography>
          </Box>
        )}
        isShow={isDialogOpen}
        onClose={() => setIsDialogOpen(!isDialogOpen)}
        useFooter={true}
        closeLabel={'지문 닫기'}
        tabIndex={103}
      >
        <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
          Another common type of dark pattern is known as “hidden fees.” This design suddenly adds extra fees at the last step of the ordering
          process. On the final page, consumers are surprised to discover additional charges, such as shipping or processing fees, which the seller
          has added to increase 5 the final cost of the order.
        </Typography>
        <br />
        <br />
        <Typography useGap={false} weight={'normal'} size={EStyleFontSizes.MEDIUM}>
          “Confirm-shaming” is another online trick that users should be aware of. This technique manipulates users into feeling ashamed for
          cancelling their membership or requesting a refund for an order. Companies use this to keep their members subscribed, even if it goes
          against the members’ intentions. For example, when users want to cancel their subscription, they are offered two options: “I want to keep my
          benefits” and “I want to give up my benefits.” The first option is presented in an appealing way, while the second option seems like a bad
          choice.
        </Typography>
      </Dialog>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isBottomSheetOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='예시 답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              I might feel
            </Typography>
            &nbsp;
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              unpleasant
            </Typography>
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              , but I would
            </Typography>
            &nbsp;
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']} textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
              stick to my decisions and not change my mind.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
