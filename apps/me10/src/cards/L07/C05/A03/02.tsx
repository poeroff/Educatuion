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
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L07C05A03 } from './store';
import { useEffect, useState } from 'react';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';
import styled from '@emotion/styled';

const imgContent = {
  imgSrc: `/L07/C05/A03/ME1-L07-C05-A03-P02.jpg`,
  imgAlt: `눈으로 가득한 지역에서 두툼한 외투를 입은 여학생이 얼음 아래 물고기를 내려다 보고 있다. `,
};

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L07C05A03);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const currentPage = 'P02';
  const pageKey = currentPage.toLowerCase() as 'p02';

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

  const { imgSrc, imgAlt } = imgContent;

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meWords',
  };

  const questionInfo: IQuestionProps = {
    text: '여행 일기의 빈칸에 알맞은 말을 골라 봅시다.',
    mark: getMarking(cardData[pageKey].isSubmitted, cardData[pageKey].isCorrect),
  };

  const paragraph: React.ReactNode = (
    <BoxWrap flexDirection='column'>
      <Box>
        <Typography>
          Snow was everywhere from top to (3)
          <Dropdown
            width='200px'
            dropdownList={cardData[pageKey].dropArr}
            isOpen={openDropdown[0]}
            selectedValue={cardData[pageKey].answer[0]}
            readOnly={cardData[pageKey].isSubmitted}
            onClick={value => handleDropdownClick(0, value || '')}
            isError={cardData[pageKey].isSubmitted && !isAnswer(cardData[pageKey].answer[0], cardData[pageKey].solution[0])}
            isInline={true}
            ariaLabel='1번째 답 선택칸'
          />{' '}
          . It was cold. There were some fish (4)
          <Dropdown
            width='200px'
            dropdownList={cardData[pageKey].dropArr}
            isOpen={openDropdown[1]}
            selectedValue={cardData[pageKey].answer[1]}
            readOnly={cardData[pageKey].isSubmitted}
            onClick={value => handleDropdownClick(1, value || '')}
            isError={cardData[pageKey].isSubmitted && !isAnswer(cardData[pageKey].answer[1], cardData[pageKey].solution[1])}
            isInline={true}
            ariaLabel='2번째 답 선택칸'
          />
        </Typography>
      </Box>
    </BoxWrap>
  );

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0 && Array.isArray(userSubmissionList[0].inputData[0].value)) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev[pageKey],
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
    const updatedAnswers = cardData[pageKey].answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({ ...prev, p02: { ...prev[pageKey], answer: updatedAnswers } }));
    changeData(currentPage, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData[pageKey].isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData[pageKey].answer.every((a, idx = 0) => a === cardData[pageKey].solution[idx]);

    setCardData(prev => ({ ...prev, p02: { ...prev[pageKey], isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[pageKey].answer,
            isAnswer: true,
            isCorrect: cardData[pageKey].isCorrect,
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
      submitLabel={cardData[pageKey].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!Array.isArray(cardData[pageKey].answer) || cardData[pageKey].answer.some(value => value === '' || value === undefined)}
      submitBtnColor={
        !Array.isArray(cardData[pageKey].answer) || cardData[pageKey].answer.some(value => value === '' || value === undefined)
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
            <Image src={imgSrc} alt={imgAlt} width='460px' />
            <Box type='hidden'>{imgAlt}</Box>
          </PinchZoom>
          <Box type='hidden' id={'img_desc'}></Box>
        </Box>
        <Box width='490px' marginLeft='10px' gap={20} alignSelf='center'>
          {paragraph}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='25%' margin-top={'10px'}>
        <Box background='lightGray' borderRadius='12px' marginTop='30px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px' marginBottom='22px'>
            <Typography usePre>{cardData[pageKey].solution.map((sol, idx) => `(${idx + 1}) ${sol} \n`).join('')}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const Indent = styled.span`
  margin-left: -40px;
`;

export default P02;
