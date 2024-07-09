import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Input,
  InputStatus,
  Question,
  Scroll,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L04C11A04 } from './store';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/en';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C11A04);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const currentPage = 'P02';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
    headerPattern: 'text',
  };

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
        {
          subKey: 2,
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
      const isCorrect2 = isAnswer(cardData.p02.answer2, cardData.p02.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
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
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.answer2,
              isAnswer: true,
              isCorrect: isCorrect2,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(currentPage, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === currentPage)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(currentPage, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    }
    changeData(currentPage, 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData(currentPage);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const questionInfo: IQuestionProps = {
    text: '2. Choose the one with a grammatical error among (a)-(d) and correct it.',
    size: 'small',
  };

  const text = (
    <>
      <Typography usePre>
        &nbsp;&nbsp;The world’s widespread love of coffee comes at a substantial environmental cost, as the extraction process generates significant
        waste. Only 0.2 percent of a coffee bean is used to make coffee, with the remaining 99.8 percent
        <Typography textDecoration='underline' weight='var(--font-weight-bold)' style={{ textUnderlinePosition: 'under' }}>
          (a) dispose
        </Typography>
        of as waste. As a result, the vast quantity of coffee consumed worldwide produces millions of tons of coffee waste each year.
        {`\n`}
        &nbsp;&nbsp;So, what happens to all the waste from the coffee extraction process? Spent coffee grounds (SCGs) are classified as general waste
        and
        <Typography textDecoration='underline' weight='var(--font-weight-bold)' style={{ textUnderlinePosition: 'under' }}>
          (b) sent
        </Typography>
        to landfills. There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent than CO2. Some SCGs are
        incinerated instead of
        <Typography textDecoration='underline' weight='var(--font-weight-bold)' style={{ textUnderlinePosition: 'under' }}>
          (c) being
        </Typography>
        buried, but this releases a lot of CO2: 338 kg per ton. However, neither of these waste management options
        <Typography textDecoration='underline' weight='var(--font-weight-bold)' style={{ textUnderlinePosition: 'under' }}>
          (d) takes
        </Typography>
        into account the potential value of coffee grounds. Although the grounds contain valuable organic compounds and minerals, they are simply
        destroyed.
      </Typography>
    </>
  );

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={isNotEmptyString(cardData.p02.answer1) && isNotEmptyString(cardData.p02.answer2) ? false : true}
      submitBtnColor={
        !(isNotEmptyString(cardData.p02.answer1) && isNotEmptyString(cardData.p02.answer2))
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={onGrade}
    >
      <BoxWrap useFull>
        <Box useFull useRound width='468px' lineHeight='48px' paddingRight='16px' marginRight='24px' background='white'>
          <Scroll>
            <Box padding='4px 22px 4px 12px'>{text}</Box>
          </Scroll>
        </Box>
        <Box margin={'auto'}>
          <Box vAlign='center' display='block'>
            <Box>
              <Question type='text' size='small'>
                틀린 부분
              </Question>
            </Box>
            <Input
              width='350px'
              inputSize='x-small'
              value={cardData.p02.answer1}
              maxLength={40}
              onChange={event => handleChange?.(1, event.target.value)}
              ariaLabel={'1번 답란'}
              readOnly={cardData.p02.isSubmitted}
              placeholder='내용을 넣어 주세요.'
              status={!isNotEmptyString(cardData.p02.answer1) ? InputStatus.DEFAULT : InputStatus.ENABLE}
            />
          </Box>
          <Box vAlign='center' display='block'>
            <Box>
              <Question type='text' size='small'>
                고친 내용
              </Question>
            </Box>
            <Input
              width='350px'
              inputSize='x-small'
              maxLength={40}
              onChange={event => handleChange?.(2, event.target.value)}
              readOnly={cardData.p02.isSubmitted}
              textAlign='left'
              placeholder='내용을 넣어 주세요.'
              ariaLabel={'2번 답란'}
              value={cardData.p02.answer2}
              status={!isNotEmptyString(cardData.p02.answer2) ? InputStatus.DEFAULT : InputStatus.ENABLE}
            />
          </Box>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='모범답안' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{`틀린 부분 : ` + cardData.p02.solution1 + `\n` + `고친 내용 : ` + cardData.p02.solution2}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};
export default P02;
