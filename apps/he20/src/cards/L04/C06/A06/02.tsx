import { useState, useRef, useEffect } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Scroll,
  Button,
  Input,
  BottomSheet,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  Typography,
  EStyleFontSizes,
  Tag,
  ETagLine,
  IQuestionProps,
  SvgIcon,
  InputStatus,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrow_right from '@/assets/icon/arrow_right.svg';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { L04C06A06 } from './store';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L04C06A06);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Will AI-Powered Neural Implants Make Us Super-Humans? (4)',
    headerPattern: 'text',
  };

  const questionInfo: IQuestionProps = {
    text: 'Q4. Fill in the blank to complete the sentences.',
    mark: cardData.p02.isSubmitted ? (cardData.p02.answer.trim().toLowerCase() === cardData.p02.solution ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
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
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            isSubmitted,
            isCorrect: userSubmissionList[0].isCorrect,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const handleSubmit = () => {
    if (cardData.p02.isSubmitted) {
      setIsShowAnswer(!isShowAnswer);
    } else {
      const isCorrect = cardData.p02.answer.trim().toLowerCase() === cardData.p02.solution;
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true, isCorrect } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.answer,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer: e.target.value } }));
    changeData('P02', 1, 1, e.target.value);
  };

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      onSubmit={handleSubmit}
      submitDisabled={!cardData.p02.answer}
      submitBtnColor={!cardData.p02.answer ? EStyleButtonTypes.SECONDARY : isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitLabel={cardData.p02.isSubmitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : '채점하기'}
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button label={'지문 보기'} color={EStyleButtonTypes.SECONDARY} size={EStyleSizes['SMALL']} onClick={openModal} useRound />
        </Box>
      </BoxWrap>

      <Scroll>
        <Box background={'white'} useRound>
          <Scroll>
            <Box>
              <Typography>What problem would occur if hackers could freely access personal data through neural implants?</Typography>
            </Box>
            <Box>
              <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px' }} src={arrow_right} size='36px' />
              <Typography>Our thoughts, emotions, and behaviors could be</Typography>
              <Input
                name='value1'
                value={cardData.p02.answer}
                width='300px'
                maxLength={1000}
                inputRef={inputRef}
                onChange={handleInputChange}
                placeholder='내용을 넣어 주세요.'
                ariaLabel='내용을 넣어 주세요.'
                status={
                  !cardData.p02.answer
                    ? InputStatus.DEFAULT
                    : cardData.p02.isSubmitted && !cardData.p02.isCorrect
                    ? InputStatus.ERROR
                    : InputStatus.ENABLE
                }
                readOnly={cardData.p02.isSubmitted}
              />

              <Typography>by hackers.</Typography>
            </Box>
          </Scroll>
        </Box>
      </Scroll>

      <BottomSheet bottomSheetTargetId='container' show={cardData.p02.isSubmitted && isShowAnswer} height='30%'>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography>controlled</Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog tabIndex={101} width={921} height={500} isShow={isShowModal} onClose={closeModal} useFooter={true} closeLabel='지문 닫기'>
        <Box useFull padding='24px 32px'>
          <Box vAlign='center' width='100%' useRound backgroundColor='var(--color-grey-100)' marginBottom='24px'>
            <Typography weight={'var(--font-weight-bold)'} size={EStyleFontSizes['X-MEDIUM']}>
              Will AI-Powered Neural Implants Make Us Super-Humans? (4)
            </Typography>
          </Box>

          <Box display='flex'>
            <Scroll height={'250px'}>
              <Typography>
                Before we can fully embrace the era of AI-powered neural implants, many tricky ethical issues should be addressed. The integration of
                AI technology with the human brain raises concerns about what it means to be human. Our brains are believed to be central to our
                identity, existence, and value as human beings. However, an over-reliance on technology may delay our natural development and create
                confusion about whether we are human, AI, or something in between. Another critical issue is privacy. There’s a risk that
                organizations or hackers could access personal data without permission through AI-connected implants. This means that our thoughts,
                emotions, and behaviors could be controlled by hackers. There’s an additional risk that this technology could lead to even greater
                social inequality, given that it may not be available to all due to its high cost. Such unequal access to the technology could
                intensify the division between those who can afford the implants and those who cannot.!
              </Typography>
            </Scroll>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P02;
