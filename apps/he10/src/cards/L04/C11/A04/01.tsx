import {
  Input,
  BoxWrap,
  Box,
  TMainHeaderInfoTypes,
  Scroll,
  Typography,
  EStyleButtonTypes,
  IQuestionProps,
  InputStatus,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { L04C11A04 } from './store';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L04C11A04);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState(false);

  const currentPage = 'P01';

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'C. Reading',
  };

  const questionInfo: IQuestionProps = {
    text: `1. Complete the summary of the passage using two words starting with the given letters.`,

    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
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
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = isAnswer(cardData.p01.answer1, cardData.p01.solution1);
      const isCorrect2 = isAnswer(cardData.p01.answer2, cardData.p01.solution2);
      const isCorrect = isCorrect1 && isCorrect2;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p01.answer1,
              isAnswer: true,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p01.answer2,
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
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
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
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
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

  const text = (
    <>
      <Typography usePre>
        &nbsp;&nbsp;The world’s widespread love of coffee comes at a substantial environmental cost, as the extraction process generates significant
        waste. Only 0.2 percent of a coffee bean is used to make coffee, with the remaining 99.8 percent
        <Typography textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
          (a)dispose
        </Typography>
        of as waste. As a result, the vast quantity of coffee consumed worldwide produces millions of tons of coffee waste each year.
        {`\n`}
        &nbsp;&nbsp;So, what happens to all the waste from the coffee extraction process? Spent coffee grounds (SCGs) are classified as general waste
        and
        <Typography textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
          (b)sent
        </Typography>
        to landfills. There they break down, releasing methane, a greenhouse gas that is approximately 25 times more potent than CO2. Some SCGs are
        incinerated instead of
        <Typography textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
          (c)being
        </Typography>
        buried, but this releases a lot of CO2: 338 kg per ton. However, neither of these waste management options
        <Typography textDecoration={'underline'} style={{ textUnderlinePosition: 'under' }}>
          (d)takes
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
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={isNotEmptyString(cardData.p01.answer1) && isNotEmptyString(cardData.p01.answer2) ? false : true}
      submitBtnColor={
        !(isNotEmptyString(cardData.p01.answer1) && isNotEmptyString(cardData.p01.answer2))
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={onGrade}
    >
      <BoxWrap>
        <Box display='felx-start' height='370px' width='468px' background='white' line-height='48px' useRound paddingRight='10px' marginRight='20px'>
          <Scroll>
            <Box padding='4px 22px 4px 12px'>{text}</Box>
          </Scroll>
        </Box>
        <Box vAlign='center' margin={'auto'}>
          <Scroll>
            <Box lineHeight={'52px'} width='420px'>
              <Typography usePre>
                During the process of making a cup of coffee, a significant portion of the coffee beans end up as w
                <Input
                  minWidth={'235px'}
                  maxLength={30}
                  inputSize='x-small'
                  placeholder={'내용을 넣어 주세요.'}
                  ariaLabel='1번 답란'
                  value={cardData.p01.answer1}
                  onChange={event => handleChange?.(1, event.target.value)}
                  status={
                    !isNotEmptyString(cardData.p01.answer1)
                      ? InputStatus.DEFAULT
                      : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer1, cardData.p01.solution1)
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  readOnly={cardData.p01.isSubmitted}
                />
                . {`\n`}
              </Typography>
              <Typography>These materials are either buried or burnt, which leads to</Typography>
              <Typography>
                e
                <Input
                  minWidth={'235px'}
                  maxLength={30}
                  inputSize='x-small'
                  placeholder={'내용을 넣어 주세요.'}
                  ariaLabel='2번 답란'
                  value={cardData.p01.answer2}
                  onChange={event => handleChange?.(2, event.target.value)}
                  status={
                    !isNotEmptyString(cardData.p01.answer2)
                      ? InputStatus.DEFAULT
                      : cardData.p01.isSubmitted && !isAnswer(cardData.p01.answer2, cardData.p01.solution2)
                      ? InputStatus.ERROR
                      : InputStatus.ENABLE
                  }
                  readOnly={cardData.p01.isSubmitted}
                />{' '}
                problems.
              </Typography>
            </Box>
          </Scroll>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              {cardData.p01.solution1 + ` \n ` + cardData.p01.solution2}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
