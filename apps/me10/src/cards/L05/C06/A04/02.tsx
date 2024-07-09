import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
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
  TextareaStatus,
} from '@maidt-cntn/ui';
import { useEffect, useState, useRef, useMemo, ChangeEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { L05C06A04 } from './store';

const P02 = () => {
  const PAGE_ID = 'P02';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L05C06A04);
  const [isPassageShow, setPassageShow] = useState<boolean>(false);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const status = useMemo(
    () => Object.keys(cardData.p02.answer).map(key => (isNotEmptyString(cardData.p02.answer) ? TextareaStatus.ENABLE : TextareaStatus.DEFAULT)),
    [cardData.p02.answer],
  );

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

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Small Actions, Big Change (1)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'What about you?',
  };

  const content = (
    <>
      <Typography style={{ whiteSpace: 'pre-wrap' }}>
        {'   '}
        Last month, I saw “#ZeroWasteChallenge” on Jiwoo’s social media. The challenge was making no trash. I liked her idea and tried the challenge.
        Here is my one-week plan for a trash-free life.
      </Typography>
    </>
  );

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_ID)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_ID, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChange = (value: string) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: value } }));
    changeData(PAGE_ID, 1, 1, value);
  };

  const onSubmit = () => {
    if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData.p02.answer,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData(PAGE_ID, userSubmission);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_ID);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const openModal = () => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement;
    setPassageShow(true);
  };

  const closeModal = () => {
    setPassageShow(false);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  };

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      return;
    } else {
      onSubmit();
    }
  };

  return (
    <Container
      bodyId={'targetContainer'}
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={'완료하기'}
      submitBtnColor={
        !cardData.p02.answer ? EStyleButtonTypes.SECONDARY : cardData.p02.isSubmitted ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={cardData.p02.isSubmitted || !cardData.p02.answer}
      onSubmit={handleSubmit}
      vAlign='flex-start'
    >
      <BoxWrap useFull>
        <Box useFull marginRight='24px'>
          <Box vAlign='center' margin='24px 0'>
            <Typography style={{ whiteSpace: 'pre-line' }}>Q. 환경 보호를 위해 실천하고 있는 일이 있나요?</Typography>
          </Box>
          <Textarea
            name={'value1'}
            width='100%'
            height='50%'
            readOnly={cardData.p02.isSubmitted}
            placeholder='내용을 넣어 주세요.'
            ariaLabel={'답란'}
            value={cardData.p02.answer}
            onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
              const { value } = target;
              handleInputChange(value);
            }}
            status={status[0]}
            tabIndex={102}
          />
        </Box>
        <Box background='var(--color-blue-50)' border={'1px solid var(--color-grey-600)'} useRound useFull padding='20px 16px'>
          {isPassageShow ? (
            <>
              <Box hAlign='flex-end' marginBottom='8px' paddingRight='16px'>
                <Button
                  color={EStyleButtonTypes.SECONDARY}
                  size={EStyleSizes.SMALL}
                  label='닫기'
                  minWidth='70px'
                  onClick={closeModal}
                  tabIndex={104}
                />
              </Box>
              <Scroll height='calc(100% - 52px)' tabIndex={0}>
                <Typography lineHeight={'48px'} useGap={false} usePre>
                  {content}
                </Typography>
              </Scroll>
            </>
          ) : (
            <Box vAlign='center' hAlign='center' useFull>
              <Button color={EStyleButtonTypes.SECONDARY} label='지문 보기' minWidth='118px' useRound onClick={openModal} tabIndex={103} />
            </Box>
          )}
        </Box>
      </BoxWrap>
    </Container>
  );
};

export default P02;
