import { useEffect, useState } from 'react';
import {
  Box,
  IQuestionProps,
  Label,
  Image,
  TMainHeaderInfoTypes,
  Typography,
  EStyleButtonTypes,
  ETagLine,
  Dropdown,
  BottomSheet,
  Tag,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { studentAtom } from '@/stores/student';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { L03C05A03 } from './store';
import { getMarking, isAnswer } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(L03C05A03);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false]);

  const pageNum = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'meWords',
  };

  const questionInfo: IQuestionProps = {
    text: '그림을 보고, 어울리는 표현을 골라 봅시다.',
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNum)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0 && Array.isArray(userSubmissionList[0].inputData[0].value)) {
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
      initData(pageNum, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleDropdownClick = (index: number, value: string) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx === index));
    if (value === '') return;
    const updatedAnswers = cardData.p01.answer?.map((ans, idx) => (idx === index ? value : ans));
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: updatedAnswers } }));
    changeData(pageNum, 1, 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p01.isSubmitted) {
      setIsShow(prev => !prev);
      return;
    }
    const isCorrect = cardData.p01.answer.every((a, idx) => a === cardData.p01.solution[idx]);

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
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNum, userSubmission, isCorrect);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(pageNum);
    };
  }, []);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='center'
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
    >
      <Box useFull vAlign='center' flexDirection='column' marginTop={'64px'}>
        <Box vAlign='flex-start'>
          <Box width='448px' flexDirection='row' paddingRight='24px'>
            <Box display='flex' justifyContent='center' flex='8px' paddingBottom='2px'>
              <Label size='number' type='line'>
                <Typography weight='var(--font-weight-bold)' align='center' lineHeight='42px'>
                  1
                </Typography>
              </Label>
              <Box margin='0 6px 8px 6px'>
                <Image src='/L03/C05/A03/ME1-L03-C05-A03-P01-1.jpg' alt='스케이트 보드를 타고 점프하는 여학생' width='398px' height='238px' />
              </Box>
            </Box>

            <Box flexDirection='column'>
              <Dropdown
                width='398px'
                marginLeft='35px'
                dropdownList={cardData.p01.dropArr}
                isOpen={openDropdown[0]}
                selectedValue={cardData.p01.answer[0]}
                readOnly={cardData.p01.isSubmitted}
                onClick={value => handleDropdownClick(0, value || '')}
                isError={cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer[0], cardData.p01.solution[0])}
                isInline={true}
                ariaLabel='1번째 답 선택칸'
                type='up'
              />
            </Box>
          </Box>

          <Box width='448px' flexDirection='row'>
            <Box display='flex' justifyContent='center' flex='8px' paddingBottom='2px'>
              <Label size='number' type='line'>
                <Typography weight='var(--font-weight-bold)' align='center' lineHeight='42px'>
                  2
                </Typography>
              </Label>

              <Box margin='0 6px 8px 6px'>
                <Image src='/L03/C05/A03/ME1-L03-C05-A03-P01-2.jpg' alt='럭비공을 뺏으려고 충돌하는 두 남학생' width='398px' height='238px' />
              </Box>
            </Box>

            <Box flexDirection='column'>
              <Dropdown
                width='398px'
                marginLeft='45px'
                dropdownList={cardData.p01.dropArr}
                isOpen={openDropdown[1]}
                selectedValue={cardData.p01.answer[1]}
                readOnly={cardData.p01.isSubmitted}
                onClick={value => handleDropdownClick(1, value || '')}
                isError={cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer[1], cardData.p01.solution[1])}
                isInline={true}
                ariaLabel='2번째 답 선택칸'
                type='up'
              />
            </Box>
          </Box>
        </Box>
      </Box>

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
