import {
  BottomSheet,
  Box,
  BoxWrap,
  Dropdown,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioPlayerProps,
  Image,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L03C03A02b } from './store';
import React from 'react';

const P03 = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C03A02b);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false, false]);

  const currentPage = 'P03';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo = {
    text: 'Fill in the blanks using information from the talk.',
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L03/C03/A02/HE1-L03-C03-A02-02.mp3',
    captionSrc: '/L03/C03/A02/HE1-L03-C03-A02-02.srt',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', ''],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    const updatedAnswers = cardData.p03.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p03: {
        ...prev.p03,
        answer: value ? updatedAnswers : prev.p03.answer,
      },
    }));
    changeData(currentPage, 1, 1, value ? updatedAnswers : cardData.p03.answer);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const submitAnswer = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p03.answer.every((a, idx = 0) => a === cardData.p03.solution[idx]);

    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p03.answer,
            isAnswer: true,
            isCorrect: cardData.p03.isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(currentPage, userSubmission, isCorrect);
  };

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

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={submitAnswer}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={Array.isArray(cardData.p03.answer) && cardData.p03.answer.some(value => value === '' || value === undefined)}
      submitBtnColor={
        Array.isArray(cardData.p03.answer) && cardData.p03.answer.some(value => value === '' || value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      audioInfo={audioInfo}
    >
      <Image size='100%' src={'/L03/C03/A02/HE1-L03-C03-A02-02-1.jpg'} type={EImageType.IMG_BG}>
        <BoxWrap useFull flexDirection={'column'}>
          <Box hAlign='center' paddingTop='15px'>
            <Typography useGap={false} weight={800}>
              Welcome to the Whispering Gallery
            </Typography>
          </Box>
          <BoxWrap useFull>
            <Box vAlign='center' marginLeft='20px'>
              <Image width='300px' height='200px' src={'/L03/C03/A02/HE1-L03-C03-A02-02-2.jpg'} alt='세인트 폴 성당의 위스퍼링 갤러리 내부의 모습' />
            </Box>
            <Box display='flex' flexDirection='column'>
              <Box>
                <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                  The Whispering Gallery is a circular wall
                </Typography>
              </Box>
              <Box vAlign='center' display='inline-flex'>
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  (1)
                </Typography>
                <Dropdown
                  readOnly={cardData.p03.isSubmitted}
                  width='228px'
                  dropdownList={cardData.p03.dropArr1}
                  isOpen={openDropdown[0]}
                  selectedValue={cardData.p03.answer[0]}
                  onClick={value => handleDropdownClick(0, value)}
                  ariaLabel='1번째 답 선택칸'
                  isError={cardData.p03.isSubmitted && cardData.p03.answer[0] !== cardData.p03.solution[0]}
                />
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  the dome of
                </Typography>
              </Box>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                St. Paul’s Cathedral in London. When you
              </Typography>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                on one side, your speech can be
              </Typography>
              <Box vAlign='center'>
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  (2)
                </Typography>
                <Dropdown
                  readOnly={cardData.p03.isSubmitted}
                  width='228px'
                  dropdownList={cardData.p03.dropArr2}
                  isOpen={openDropdown[1]}
                  selectedValue={cardData.p03.answer[1]}
                  onClick={value => handleDropdownClick(1, value)}
                  ariaLabel='2번째 답 선택칸'
                  isError={cardData.p03.isSubmitted && cardData.p03.answer[1] !== cardData.p03.solution[1]}
                />
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  on the opposite side
                </Typography>
              </Box>
              <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                because the sound waves travel along the
              </Typography>
              <Box vAlign='center'>
                <Typography useGap={true} size={EStyleFontSizes.MEDIUM}>
                  (3)
                </Typography>
                <Dropdown
                  readOnly={cardData.p03.isSubmitted}
                  width='228px'
                  dropdownList={cardData.p03.dropArr3}
                  isOpen={openDropdown[2]}
                  selectedValue={cardData.p03.answer[2]}
                  onClick={value => handleDropdownClick(2, value)}
                  ariaLabel='3번째 답 선택칸'
                  isError={cardData.p03.isSubmitted && cardData.p03.answer[2] !== cardData.p03.solution[2]}
                  type='up'
                />
                <Typography useGap={false} size={EStyleFontSizes.MEDIUM}>
                  Try it out for yourself !
                </Typography>
              </Box>
            </Box>
          </BoxWrap>
        </BoxWrap>
      </Image>
      <BottomSheet bottomSheetTargetId='targetContainer' height={'40%'} show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography>
              {cardData.p03.solution.map((elem, idx) => (
                <React.Fragment key={idx}>
                  ({idx + 1}) {elem}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
