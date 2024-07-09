import { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  BottomSheet,
  Tag,
  Button,
  ETagLine,
  Typography,
  EStyleButtonTypes,
  EStyleSizes,
  EStyleFontSizes,
  Scroll,
  SvgIcon,
  IQuestionProps,
  Dropdown,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_right from '@/assets/icon/arrow_right.svg';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { L03C06A04b } from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C06A04b);
  const { userId } = useRecoilValue(studentAtom);

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [isShow, setShow] = useState<boolean>(false); // 모범 답안

  const currentPage = 'P02';

  const dropArr: string[] = ['peaks', 'valleys'];
  const dropAnswer = 'peaks';

  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false]);
  const [answer, setAnswer] = useState<string[]>([]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Tuning Out: The Science of Noise-Cancellation (2)',
  };
  const questionInfo: IQuestionProps = {
    text: 'Q2. Choose the correct words to complete the sentences.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const [opened, setOpened] = useState<boolean>(false);
  const handleButtonOnClick = () => {
    setOpened(!opened);
  };

  const content =
    'Sound is produced through vibrations that occur from a sound source, when the strings of a guitar are played, for instance. The vibrations of the sound source cause the air to vibrate and the sound to travel as waves, similar to the ripples created in a lake when you throw a stone. When these sound waves reach our ears, the brain interprets them as sound. Just as different ripples in water might overlap if you throw two stones, sound waves can also interfere with each other when they meet. There are two types of interference: constructive and destructive. Constructive interference occurs when the peaks of two waves overlap, resulting in a bigger wave and a louder sound. Destructive interference, on the other hand, occurs when a peak of one wave overlaps with a valley of another wave, so they cancel each other out and produce a quieter sound, or no sound at all.';

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx + 1 === index));

    const newAnswer = [...answer];
    if (value !== undefined) newAnswer[index - 1] = value;
    setAnswer(newAnswer);
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: newAnswer[0] } }));
    changeData(currentPage, 1, 1, newAnswer[0]);
  };

  const getSubmitBtnColor = () => {
    if (!cardData.p02.isSubmitted) {
      return submitDisabled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY;
    } else {
      return isShow ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.PRIMARY;
    }
  };

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
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            isSubmitted,
            isCorrect: userSubmissionList[0].inputData[0]?.isCorrect || false,
          },
        }));
      }

      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const onSubmitText = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
      return;
    } else {
      const isCorrect = answer.every((a, idx) => a === dropAnswer);

      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect: isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer1,
              isCorrect: isCorrect,
            },
          ],
        },
      ];

      submitDataWithResult(currentPage, userSubmission, isCorrect);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitBtnColor={
        !isNotEmptyString(cardData.p02.answer1) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmitText}
      submitDisabled={!isNotEmptyString(cardData.p02.answer1)}
    >
      <BoxWrap useFull>
        <Box width={'50%'} marginRight='24px'>
          <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
            When does constructive interference occur?
          </Typography>
          <BoxWrap marginTop={'20px'}>
            <Box>
              <SvgIcon src={arrow_right} size='38px' />
            </Box>
            <Box>
              <Typography useGap={false}>Constructive interference occurs when the</Typography>
              <Dropdown
                width='264px'
                dropdownList={dropArr}
                readOnly={cardData.p02.isSubmitted}
                disabled={cardData.p02.isSubmitted}
                isOpen={openDropdown[0]}
                selectedValue={cardData.p02.answer1}
                isError={cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? false : true) : false}
                onClick={value => handleDropdownClick(1, value)}
              />
              <Typography useGap={false}> of two waves overlap.</Typography>
            </Box>
          </BoxWrap>
        </Box>
        <Box width={'50%'} background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {opened ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button color={EStyleButtonTypes.SECONDARY} size={EStyleSizes.SMALL} label='닫기' minWidth='70px' onClick={handleButtonOnClick} />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography style={{ textIndent: 'var(--font-size-28)' }} lineHeight={'48px'} useGap={false} usePre>
                  {content}
                </Typography>
              </Scroll>{' '}
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
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography useGap={false} size={EStyleFontSizes['X-MEDIUM']}>
              {dropAnswer}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
