import arrow_right from '@/assets/icon/arrow_right.svg';
import { L02C06A05 } from '@/cards/L02/C06/A05/store';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
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
  Input,
  Scroll,
  SvgIcon,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const DialogHeader = () => {
  return (
    <Box background={'gray'} height='50px' marginBottom='20px' useRound useFull>
      <Typography weight={'bold'} lineHeight='unset' size={EStyleFontSizes.MEDIUM}>
        Gathering of the Whakapapa (3)
      </Typography>
    </Box>
  );
};

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L02C06A05);

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
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
          },
        }));
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setShowAnswer(prev => !prev);
      return;
    }
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p02.answer,
            isAnswer: true,
          },
        ],
      },
    ];
    submitData('P02', userSubmission);
  };

  const handleChange = (index: number, value: string) => {
    const updatedAnswers = cardData.p02.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData('P02', 1, 1, updatedAnswers);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Gathering of the Whakapapa (3)',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Q3. Fill in the blanks to answer the question.',
  };

  const [showContent, setShowContent] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      bodyId='targetContainer'
      submitLabel={cardData.p02.isSubmitted ? (showAnswer ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={
        !cardData.p02.answer?.every(val => val) ? EStyleButtonTypes.SECONDARY : showAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY
      }
      submitDisabled={!cardData.p02.answer?.every(val => val)}
      onSubmit={submitAnswer}
      useExtend
    >
      <BoxWrap marginBottom={'15px'}>
        <Box width={'100%'} hAlign={'flex-end'}>
          <Button
            label={'지문보기'}
            color={EStyleButtonTypes.SECONDARY}
            size={EStyleSizes['SMALL']}
            onClick={() => setShowContent(prev => !prev)}
            useRound
          />
        </Box>
      </BoxWrap>
      <Box background={'white'}>
        <Typography>
          If you were Nani Tama’s grandson, would you drive him to Murupara?
          <br />
          Why or why not?
          <br />
        </Typography>
        <Box>
          <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px' }} src={arrow_right} size='36px' />
          <Typography useGap={false}>Yes, I would want to</Typography>{' '}
          <Input
            placeholder='내용을 넣어 주세요.'
            inputSize='small'
            name='value1'
            value={cardData.p02.answer ? cardData.p02.answer[0] : ''}
            maxLength={100}
            width='300px'
            minWidth='300px'
            onChange={e => handleChange(0, e.target.value)}
            disabled={showContent}
            ariaLabel='1번 답란'
            readOnly={cardData.p02.isSubmitted}
          />
          .
          <br />
        </Box>
        <Box marginTop={'10px'}>
          <SvgIcon style={{ verticalAlign: 'text-top', padding: '4px 12px' }} src={arrow_right} size='36px' />
          <Typography useGap={false} align={'center'}>
            No, I wouldn’t. He is too weak to
          </Typography>{' '}
          <Input
            placeholder='내용을 넣어 주세요.'
            inputSize='small'
            name='value2'
            value={cardData.p02.answer ? cardData.p02.answer[1] : ''}
            maxLength={100}
            width='300px'
            minWidth='300px'
            onChange={e => handleChange(1, e.target.value)}
            disabled={showContent}
            ariaLabel='2번 답란'
            readOnly={cardData.p02.isSubmitted}
          />
          .
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={showAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography useGap={false}>(1) Yes, I would want to </Typography>{' '}
            <Typography useGap={false} textDecoration='underline' style={{ display: 'inline' }}>
              help him finish the whakapapa and carry out his duty.
            </Typography>
            <br />
            <Typography useGap={false}>(2) No, I wouldn’t. He is too weak to </Typography>{' '}
            <Typography useGap={false} textDecoration='underline'>
              go on the journey to Murupara.
            </Typography>
          </Box>
        </Box>
      </BottomSheet>

      <Dialog
        useHeader
        tabIndex={101}
        header={DialogHeader}
        isShow={showContent}
        width={893}
        height={458}
        topHeight={50}
        useFooter
        onClose={() => setShowContent(!showContent)}
        closeLabel='지문 닫기'
      >
        <Typography>
          <Typography weight={'normal'} size={EStyleFontSizes.MEDIUM} style={{ marginBottom: '20px' }}>
            When I arrived at Auntie’s place, I was shocked to see how thin Nani Tama was. “Look, Nani,” I said. “I’m not taking you anywhere. You
            could die on me!” Nani looked at me in anger. “You want me to die here in this room? Looking at these four walls? When the whakapapa is
            not yet finished?” The old man held on tightly to the side of the bed and cried out as he stood up. Every slow, painful step hurt him, but
            he tried to walk. I could not help but carry him to the car, and we set off with Auntie. We traveled all night, mostly in silence,
            listening to Nani chanting in the darkness. It was strange but wonderful to hear him. Sometimes, he burst into a song that he had taught
            Auntie. They sang together, lifting up their voices to send the song flying like a bird through the sky.
          </Typography>
        </Typography>
      </Dialog>
    </Container>
  );
};

export default P02;
