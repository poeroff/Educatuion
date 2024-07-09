import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import {
  Box,
  TMainHeaderInfoTypes,
  IAudioPlayerProps,
  Tag,
  ETagLine,
  Typography,
  EStyleButtonTypes,
  IQuestionProps,
  BottomSheet,
  BoxWrap,
  Image,
  PinchZoom,
  EImageType,
  Scroll,
  EStyleFontSizes,
  Dropdown,
  Question,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L04C03A02b } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C03A02b);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const dropArr1: string[] = ['100', '150'];
  const dropArr2: string[] = ['destroyed', 'stronger'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the correct words with information from the dialogue.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L04/C03/A02/HE2-L04-C03-A02-01.mp3',
    captionSrc: '/L04/C03/A02/HE2-L04-C03-A02-01.srt',
  };

  const imgInfo = {
    imgSrc: `/L04/C03/A02/HE2-L04-C03-A02-01.jpg`,
    imgAlt: `다리 세 개가 달리고 치료용 레이저를 쏘고 있는 나노봇 하나`,
  };

  const scripts: string[] = [
    `People will be able to live up to`,
    `years in the near future.`,
    `Nanobots will be able to target and make`,
    `cancer cells`,
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const isSubmitDisabled = !isNotEmptyString(cardData.p01.answer1) || !isNotEmptyString(cardData.p01.answer2);

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isAnswer1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isAnswer2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect = isAnswer1 && isAnswer2;

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: isAnswer1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
              isAnswer: isAnswer2,
            },
          ],
          isCorrect,
        },
      ];
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect } }));
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((_, idx) => idx + 1 === index));

    switch (index) {
      case 1:
        setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value || cardData.p01.answer1 } }));
        changeData('P01', 1, index, value || cardData.p01.answer1);

        break;
      case 2:
        setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value || cardData.p01.answer2 } }));
        changeData('P01', 1, index, value || cardData.p01.answer2);
        break;
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P01');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='container'
      headerInfo={headerInfo}
      audioInfo={audioInfo}
      questionInfo={questionInfo}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안닫기' : '답안보기') : '채점하기'}
      onSubmit={handleSubmit}
      submitDisabled={isSubmitDisabled}
      vAlign={'flex-start'}
    >
      <BoxWrap>
        <Box width={'70%'} height={'400px'} hAlign='center'>
          <Scroll tabIndex={0}>
            <Box marginTop={'20px'} display='inline-flex'>
              <Typography useGap={false}>
                <Question type={'dot'} size='small'>
                  <Typography useGap={false} weight={'var(--font-weight-medium)'}>
                    {scripts[0]}
                  </Typography>
                </Question>
              </Typography>
            </Box>
            <Box hAlign='flex' marginRight={`15px`} display='inline-flex' vAlign='center' marginLeft={'29px'}>
              <Typography useGap={false}>(1)</Typography>
              <Dropdown
                width='220px'
                dropdownList={dropArr1}
                isOpen={openDropdown[0]}
                readOnly={cardData.p01.isSubmitted}
                selectedValue={cardData.p01.answer1}
                isError={cardData.p01.isSubmitted && cardData.p01.answer1 !== cardData.p01.solution1}
                onClick={value => handleDropdownClick(1, value)}
              />
            </Box>
            <Box display='inline-flex'>
              <Typography useGap={false}>{scripts[1]}</Typography>
            </Box>
            <Box marginTop={'20px'}>
              <Typography useGap={false}>
                <Question type={'dot'} size='small'>
                  <Typography useGap={false} weight={'var(--font-weight-medium)'}>
                    {scripts[2]}
                  </Typography>
                </Question>
              </Typography>
            </Box>
            <Box display='inline-flex' marginLeft={'29px'}>
              <Typography useGap={false}>{scripts[3]}</Typography>
            </Box>
            <span> </span>
            <Box hAlign='flex' display='inline-flex'>
              <Typography useGap={false}>(2)</Typography>
              <Dropdown
                width='264px'
                dropdownList={dropArr2}
                isOpen={openDropdown[1]}
                readOnly={cardData.p01.isSubmitted}
                selectedValue={cardData.p01.answer2}
                isError={cardData.p01.isSubmitted && cardData.p01.answer2 !== cardData.p01.solution2}
                onClick={value => handleDropdownClick(2, value)}
              />
            </Box>
          </Scroll>
        </Box>
        <Box width={'30%'} hAlign={'center'} height={'342px'}>
          <PinchZoom>
            <Image type={EImageType.IMG} src={imgInfo.imgSrc} alt={imgInfo.imgAlt} width='100%' />
          </PinchZoom>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='container' height={'40%'} show={isShow} closeOption={{ useYn: true, onClose: () => setShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{`(1) ${cardData.p01.solution1}\n(2) ${cardData.p01.solution2}`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
