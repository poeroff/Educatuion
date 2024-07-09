import {
  TMainHeaderInfoTypes,
  Input,
  Typography,
  BoxWrap,
  Box,
  IAudioPlayerProps,
  BottomSheet,
  Question,
  EStyleButtonTypes,
  ETagLine,
  Tag,
  EStyleFontSizes,
  Image,
  InputStatus,
} from '@maidt-cntn/ui';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { L03C04A02 } from './store';

const imgSrc = '/L03/C04/A02/HE1-L03-C04-A02-1.jpg';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C04A02);
  const [isShow, setIsShow] = useState(false);

  const bottomAnswer = (
    <>
      <Box marginTop='12px'>
        <Typography>(1)&nbsp;{cardData.p02.solution1}</Typography>
        <br />
        <Typography>(2)&nbsp;{cardData.p02.solution2}</Typography>
        <br />
        <Typography>(3)&nbsp;{cardData.p02.solution3}</Typography>
      </Box>
    </>
  );

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: '1. Fill in the blanks using information from the talk.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C04/A02/HE1-L03-C04-A02.mp3',
    captionSrc: '/L03/C04/A02/HE1-L03-C04-A02.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: false,
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
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
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

  const handleInputChange = (index: number, value: string) => {
    if (index === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (index === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    }
    changeData('P02', 1, index, value);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsShow(!isShow);
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
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.answer3,
              isAnswer: true,
            },
          ],
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer2 && cardData.p02.answer3)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      audioInfo={audioInfo}
      onSubmit={submitAnswer}
    >
      <Image src={imgSrc} width='920px' height='auto' style={{ position: 'absolute', objectFit: 'cover', zIndex: -1 }} />
      <Box hAlign='center' paddingTop='30px'>
        <Typography color='var(--color-blue-400)' weight={'var(--font-weight-extraBold)'}>
          Inventions Inspired by Nature
        </Typography>
      </Box>
      <Box>
        <BoxWrap height='calc(100% - 62px)'>
          <Box paddingLeft='24px' useFull>
            <Box hAlign={'center'} paddingTop={20} paddingBottom={10}>
              <Image style={{ width: '240px', height: '160px' }} src={'/L03/C04/A02/HE1-L03-C04-A02-2.jpg'} alt='벨크로' />
            </Box>
            <Box flex={1} paddingLeft={15}>
              <Box vAlign='middle'>
                <Question type='dot' size='small'>
                  <Typography size={EStyleFontSizes['X-MEDIUM']}>inspired by plant (1)</Typography>
                </Question>
                <Input
                  width='100px'
                  aria-label='1번 답란'
                  maxLength={30}
                  value={cardData.p02.answer1}
                  inputSize='x-small'
                  status={isNotEmptyString(cardData.p02.answer1) ? InputStatus.ENABLE : InputStatus.DEFAULT}
                  onChange={event => handleInputChange(1, event.target.value)}
                  readOnly={cardData.p02.isSubmitted}
                />
              </Box>
              <Box paddingLeft='29px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']}>that stuck to dog's fur</Typography>
              </Box>
            </Box>
          </Box>
          <Box useFull>
            <Box hAlign={'center'} paddingTop={20} paddingBottom={10}>
              <Image style={{ width: '240px', height: '160px' }} src={'/L03/C04/A02/HE1-L03-C04-A02-3.jpg'} alt='샤워커튼' />
            </Box>
            <Box paddingRight='5px' flex={1}>
              <Box vAlign='middle'>
                <Question type='dot' size='small'>
                  <Typography size={EStyleFontSizes['X-MEDIUM']}>inspired by lotus (2)</Typography>
                </Question>
                <Input
                  width='100px'
                  aria-label='2번 답란'
                  maxLength={30}
                  value={cardData.p02.answer2}
                  status={isNotEmptyString(cardData.p02.answer2) ? InputStatus.ENABLE : InputStatus.DEFAULT}
                  inputSize='x-small'
                  onChange={event => handleInputChange(2, event.target.value)}
                  readOnly={cardData.p02.isSubmitted}
                />
              </Box>
              <Box paddingLeft='29px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']}>, which resist (3)</Typography>
                <Input
                  width='100px'
                  aria-label='3번 답란'
                  maxLength={30}
                  value={cardData.p02.answer3}
                  status={isNotEmptyString(cardData.p02.answer3) ? InputStatus.ENABLE : InputStatus.DEFAULT}
                  inputSize='x-small'
                  onChange={event => handleInputChange(3, event.target.value)}
                  readOnly={cardData.p02.isSubmitted}
                />
              </Box>
              <Box paddingLeft='29px'>
                <Typography size={EStyleFontSizes['X-MEDIUM']}>and stay dry</Typography>
              </Box>
            </Box>
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범 답안' />
          </Box>
          <Box marginTop='12px'>{bottomAnswer}</Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
