import {
  TMainHeaderInfoTypes,
  Input,
  Typography,
  Box,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  Button,
  Dialog,
  Scroll,
  InputStatus,
  EStyleSizes,
  EStyleFontSizes,
  BoxWrap,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState, ChangeEvent } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C06A07b } from './store';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { studentAtom } from '@/stores/student';
import { truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

export interface IDialog {
  dialogTitle: React.ReactNode;
  dialogText: string;
}

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const [cardData, setCardData] = useRecoilState(L04C06A07b);
  const pageIds = useRecoilValue(pageIdsAtom);

  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);
  const [isShowText, setShowText] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans?(5)',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Q5. Complete the author’s opinion about what should be done before conducting brain research.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const dialogWithoutTitle: Omit<IDialog, 'dialogTitle'> = {
    dialogText:
      'I hope that we can overcome these challenges through careful consideration of neuroethics. This field highlights the social aspects of neural technology and provides possible answers to what should be considered legal and ethical. I think it is important to establish a prior review process and thoroughly assess the ethical aspects before any kind of brain research is conducted. This will ensure thatscience and technology progress in accordance with ethical principles.​ What do you think about this technology? Please share your opinion in the comments section below.',
  };
  const { userId } = useRecoilValue(studentAtom);

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

  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(!isShowAnswer);
    } else {
      const isCorrect1 = cardData.p02.answer1.trim().toLowerCase() === cardData.p02.solution1;
      const isCorrect2 = cardData.p02.answer2.trim().toLowerCase() === cardData.p02.solution2;
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page == 'P02')?.pageId;
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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const inputChangeHandler = (subKey: number, e: ChangeEvent<HTMLInputElement>) => {
    const truncateValue = truncateToMaxBytes(e.target.value);
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        [`answer${subKey}`]: truncateValue,
      },
    }));
    changeData('P02', 1, subKey, truncateValue);
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
      onSubmit={onGrade}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2)}
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2)
          ? EStyleButtonTypes.SECONDARY
          : isShowAnswer
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
    >
      <BoxWrap justifyContent={'flex-end'} marginBottom={'24px'}>
        <Button
          minWidth='132px'
          size={EStyleSizes.SMALL}
          color={EStyleButtonTypes.SECONDARY}
          label='지문보기'
          useRound
          onClick={() => setShowText(true)}
        />
      </BoxWrap>

      <Dialog
        width={893}
        height={500}
        isShow={isShowText}
        closeLabel='지문 닫기'
        onClose={() => setShowText(false)}
        useFooter={true}
        confirmLabel='지문 닫기'
      >
        <Box tabIndex={103} useFull padding='24px 32px'>
          <Box vAlign='center' width='100%' height='48px' useRound backgroundColor='var(--color-grey-100)' marginBottom='24px'>
            <Typography weight={'bold'} size={EStyleFontSizes['X-MEDIUM']}>
              Will AI-Powered Neural Implants Make Us Super-Humans?(5)
            </Typography>
          </Box>
          <Scroll height='270px'>
            <Box padding='4px 12px'>
              <Typography fontSize='28px' lineHeight={'40px'}>
                {dialogWithoutTitle.dialogText}
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </Dialog>

      <Box useRound width='100%' background='white'>
        <Typography> I think it is important to establish a prior</Typography>
        <Input
          value={cardData.p02.answer1}
          inputSize='x-small'
          width='260px'
          maxLength={20}
          onChange={event => inputChangeHandler(1, event)}
          placeholder='내용을 넣어 주세요.'
          ariaLabel='1번 답란.'
          status={!cardData.p02.answer1 ? 'default' : cardData.p02.isSubmitted && !cardData.p02.isCorrect ? 'error' : 'enable'}
          readOnly={cardData.p02.isSubmitted}
        />

        <Typography>process and thoroughly assess the</Typography>
        <Input
          value={cardData.p02.answer2}
          inputSize='x-small'
          width='260px'
          maxLength={20}
          onChange={event => inputChangeHandler(2, event)}
          placeholder='내용을 넣어 주세요.'
          ariaLabel='2번 답란.'
          status={!cardData.p02.answer2 ? 'default' : cardData.p02.isSubmitted && !cardData.p02.isCorrect ? 'error' : 'enable'}
          readOnly={cardData.p02.isSubmitted}
        />
        <Typography> aspects before any kind of brain research is conducted.</Typography>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{`(1) review\n(2) ethical`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
