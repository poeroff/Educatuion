import React, { useEffect, useState } from 'react';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleSizes,
  ETagLine,
  IQuestionProps,
  Scroll,
  SvgIcon,
  Tag,
  Textarea,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import arrowRight from '@/assets/icon/arrow_right.svg';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L02C06A05b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';

export interface IHE01801 {
  textTitle: string;
  textContent: string;
  imgSrc: string;
  imgAlt: string;
}

const P03 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A05b);
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
          isAnswer: true,
        },
      ],
    },
  ];
  const onGrade = () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p02.answer1, cardData.p02.solution1);
      const isCorrect2 = isAnswer(cardData.p02.answer1, cardData.p02.solution2);
      const isCorrect = isCorrect1 || isCorrect2;
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
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P02', userSubmission, isCorrect);
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
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
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

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (3)',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    text: (
      <Typography>
        <Typography useGap={false} weight={800}>
          Q3.
        </Typography>{' '}
        Fill in the blanks to answer the question.
      </Typography>
    ),
  };

  const content: React.ReactNode = (
    <Box flexDirection='column'>
      <Box>
        <Typography>If you were Nani Tama’s grandson, would you drive him to Murupara? Why or why not? </Typography>
      </Box>
      <Box vAlign='center'>
        <SvgIcon src={arrowRight} size='36px'></SvgIcon>
        <Typography>
          Yes, I would want to <Typography type='blank' width='530px' title='빈칸' style={{ borderColor: 'var(--color-grey-900)' }} />.
        </Typography>
      </Box>
      <Box>
        <span style={{ marginLeft: '36px' }}></span>
        <Typography>
          No, I wouldn’t. He is too weak to <Typography type='blank' width='380px' title='빈칸' style={{ borderColor: 'var(--color-grey-900)' }} />.
        </Typography>
      </Box>
    </Box>
  );

  const textTitle = 'Gathering of the Whakapapa (3)';

  const textContent = `When I arrived at Auntie’s place, I was shocked to see how thin Nani Tama was.
      “Look, Nani,” I said. “I’m not taking you anywhere. You could die on me!” 
      Nani looked at me in anger.
      “You want me to die here in this room? Looking at these four walls? When the whakapapa is not yet finished?”
      The old man held on tightly to the side of the bed and cried out as he stood up.
      Every slow, painful step hurt him, but he tried to walk. 
      I could not help but carry him to the car, and we set off with Auntie.
      We traveled all night, mostly in silence, listening to Nani chanting in the darkness. 
      It was strange but wonderful to hear him. 
      Sometimes, he burst into a song that he had taught Auntie. 
      They sang together, lifting up their voices to send the song flying like a bird through the sky.`;

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={onGrade}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer1)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer1) ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
    >
      <Box hAlign='right'>
        <Button minWidth='96px' size={EStyleSizes.SMALL} color={EStyleButtonTypes.SECONDARY} label='지문보기' onClick={handleButtonClick} useRound />
      </Box>

      <Dialog width={893} height={458} isShow={isDialogOpen} onClose={handleDialogClose} useFooter={true} closeLabel={'지문 닫기'}>
        <Box height={'15%'} background={'gray'} useRound={true} hAlign='flex-start' vAlign='flex-center' useFull={true}>
          <Typography useGap={false} weight={'bold'} size={EStyleFontSizes.MEDIUM}>
            {textTitle}
          </Typography>
        </Box>
        <BoxWrap>
          <Scroll height={'270px'}>
            {textContent.split('\n').map((paragraph, index, arr) => (
              <React.Fragment key={index}>
                <Typography useGap={true} weight='normal' size={EStyleFontSizes.MEDIUM}>
                  {paragraph}
                </Typography>
                <br />
                {index !== arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </Scroll>
        </BoxWrap>
      </Dialog>

      <BoxWrap flexDirection='column' height='100%'>
        <Box marginTop={'-12px'} marginBottom={'12px'}>
          <Scroll>
            <Typography lineHeight='48px'>{content}</Typography>
          </Scroll>
        </Box>
        <Textarea
          defaultValue={cardData.p02.answer1}
          onChange={event => handleChange(1, event.target.value)}
          readOnly={cardData.p02.isSubmitted}
          width='920px'
          placeholder='내용을 넣어 주세요.'
          ariaLabel='"Yes, I would want to" 혹은 "No, I wouldn’t. He is too weak to" 이후 빈칸에 들어갈 내용을 입력해 주세요.'
        />
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'예시 답안'} />
          </Box>
          <Box marginTop='12px'>* {cardData.p02.solution1}</Box>
          <Box marginTop='12px'>* {cardData.p02.solution2}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
