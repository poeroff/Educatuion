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
  Scroll,
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
import { L01C09A03 } from './store';
import { useEffect, useState } from 'react';
import { getMarking } from '@maidt-cntn/util/CommonUtil';

const imgContent = {
  imgSrc: `/L01/C09/A03/ME1-L01-C09-A03-P01.jpg`,
  imgAlt: `여우와 함께 있는 어린 왕자`,
};

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L01C09A03);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const currentPage = 'P01';

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', '', ''],
          isAnswer: true,
          isCorrect: false,
        },
      ],
    },
  ];

  const { imgSrc, imgAlt } = imgContent;

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'A',
    headerPattern: 'icon',
    iconType: 'mePractice',
  };

  const questionInfo: IQuestionProps = {
    text: '주어진 말을 이용하여 어린 왕자의 말을 완성해 봅시다. ',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
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

  const renderDropdown = (index: number): React.ReactNode => (
    <Dropdown
      width='200px'
      dropdownList={cardData.p01.dropArr}
      isOpen={openDropdown[index]}
      selectedValue={cardData.p01.answer[index]}
      readOnly={cardData.p01.isSubmitted}
      onClick={value => handleDropdownClick(index, value)}
      ariaLabel={`${index + 1}번째 답 선택칸`}
      isError={cardData.p01.isSubmitted && cardData.p01.answer[index] !== cardData.p01.solution[index]}
      type={index > 2 ? 'up' : 'down'}
      isInline={true}
    />
  );

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));

    const updatedAnswers = cardData.p01.answer.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        answer: updatedAnswers,
      },
    }));
    changeData(currentPage, 1, 1, updatedAnswers);
  };
  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
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
      <BoxWrap useFull={true}>
        <Box vAlign='center'>
          <PinchZoom>
            <Image src={imgSrc} alt={imgAlt} width='460px' />
          </PinchZoom>
        </Box>
        <Balloon whiteSpace={false} backgroundColor='var(--color-white)' place='left' isShadow={true}>
          {' '}
          <Scroll tabIndex={0}>
            <Box width='440px'>
              <Typography lineHeight='64px'>
                Hi, I (1) {renderDropdown(0)} the Little Prince. This (2) {renderDropdown(1)} my friend Fox. His ears are (3) {renderDropdown(2)} big,
                but he (4) {renderDropdown(3)} a good listener. We (5) {renderDropdown(4)} good friends.
              </Typography>
            </Box>{' '}
          </Scroll>
        </Balloon>
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
