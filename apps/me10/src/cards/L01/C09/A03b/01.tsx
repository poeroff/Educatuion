import {
  BottomSheet,
  Box,
  BoxWrap,
  Dropdown,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  PinchZoom,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Balloon, Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L01C09A03b } from './store';
import { useEffect, useState } from 'react';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const PAGE = 'P01';

const imgContent = {
  imgSrc: `/L01/C09/A03/ME1-L01-C09-A03-P01.jpg`,
  imgAlt: `여우와 함께 있는 어린 왕자`,
};

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A03b);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false, false]);

  const currentPage = 'P01';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', ''],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const { imgSrc, imgAlt } = imgContent;

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'practice',
    headerText: 'A',
  };

  const questionInfo: IQuestionProps = {
    text: '주어진 말을 이용하여 어린 왕자의 말을 완성해 봅시다.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const paragraph: React.ReactNode = (
    <Typography usePre lineHeight='64px'>
      Hi, I{' '}
      <Typography useGap={false} fontWeight='var(--font-weight-bold)'>
        (1)
      </Typography>
      <Dropdown
        width='180px'
        dropdownList={cardData.p01.dropArr[0]}
        isOpen={openDropdown[0]}
        selectedValue={cardData.p01.answer[0]}
        readOnly={cardData.p01.isSubmitted}
        onClick={value => handleDropdownClick(0, value || '')}
        isError={cardData.p01.isSubmitted && cardData.p01.answer[0] !== cardData.p01.solution[0]}
        isInline={true}
      />{' '}
      the Little Prince.{'\n'}This is my friend Fox.{'\n'}His ears{' '}
      <Typography useGap={false} fontWeight='var(--font-weight-bold)'>
        (2)
      </Typography>{' '}
      <Dropdown
        width='180px'
        dropdownList={cardData.p01.dropArr[1]}
        isOpen={openDropdown[1]}
        selectedValue={cardData.p01.answer[1]}
        readOnly={cardData.p01.isSubmitted}
        onClick={value => handleDropdownClick(1, value || '')}
        isError={cardData.p01.isSubmitted && cardData.p01.answer[1] !== cardData.p01.solution[1]}
        isInline={true}
      />{' '}
      are big, but he{' '}
      <Typography useGap={false} fontWeight='var(--font-weight-bold)'>
        (3)
      </Typography>{' '}
      <Dropdown
        width='180px'
        dropdownList={cardData.p01.dropArr[2]}
        isOpen={openDropdown[2]}
        selectedValue={cardData.p01.answer[2]}
        readOnly={cardData.p01.isSubmitted}
        onClick={value => handleDropdownClick(2, value || '')}
        isError={cardData.p01.isSubmitted && cardData.p01.answer[2] !== cardData.p01.solution[2]}
        isInline={true}
        type='up'
      />{' '}
      a good listener.{'\n'}We are good friends.
    </Typography>
  );

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0].value,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleDropdownClick = (index: number, value: string) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    if (value === '') return;
    const updatedAnswers = cardData.p01.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: updatedAnswers } }));
    changeData(PAGE, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p01.answer.every((a, idx = 0) => a === cardData.p01.solution[idx]);

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.p01.answer,
            isAnswer: true,
            isCorrect: cardData.p01.isCorrect,
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
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      bodyId='targetContainer'
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!Array.isArray(cardData.p01.answer) || cardData.p01.answer.some(value => value === '' || value === undefined)}
      submitBtnColor={
        !Array.isArray(cardData.p01.answer) || cardData.p01.answer.some(value => value === '' || value === undefined)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={submitAnswer}
      useExtend
    >
      <BoxWrap useFull justifyContent='center'>
        <Box vAlign='center' gap={20}>
          <PinchZoom>
            <Image src={imgSrc} width='346px' />
            <Box type='hidden'>{imgAlt}</Box>
          </PinchZoom>
          <Box type='hidden' id={'img_desc'}></Box>
        </Box>
        <Box width='560px' marginLeft='10px' gap={20} alignSelf='center'>
          <Balloon place='left' backgroundColor='var(--color-white)' isShadow>
            <Box>{paragraph}</Box>
          </Balloon>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='25%' margin-top={'10px'}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography usePre>{cardData.p01.solution.map((sol, idx) => `(${idx + 1}) ${sol} \n`).join('')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
