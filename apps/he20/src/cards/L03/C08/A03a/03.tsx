import {
  Box,
  TMainHeaderInfoTypes,
  TextView,
  Input,
  Typography,
  Image,
  IQuestionProps,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  EStyleTableTypes,
  Dropdown,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  InputStatus,
  BoxWrap,
  EStyleFontSizes,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L03C08A03a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString, getMarking } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L03C08A03a);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setIsShow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownList = ['O', 'X'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Point 1 :Practice',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: (
      <StyledTypography>
        <Typography weight='var(--font-weight-bold)' useGap={false}>
          Check O
        </Typography>{' '}
        if the underlined part is correct, or{' '}
        <Typography weight='var(--font-weight-bold)' useGap={false}>
          check X
        </Typography>{' '}
        if wrong and correct it
      </StyledTypography>
    ),
    mark: getMarking(cardData.p03.isSubmitted, cardData.p03.isCorrect),
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

  const submitBtnColor = cardData.p03.isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.PRIMARY
    : cardData.p03.answer1 === 'O' || (cardData.p03.answer1 === 'X' && isNotEmptyString(cardData.p03.answer2))
    ? EStyleButtonTypes.PRIMARY
    : EStyleButtonTypes.SECONDARY;

  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(!isShow);
    } else {
      const isCorrect =
        isAnswer(cardData.p03.answer1, cardData.p03.solution1) &&
        (cardData.p03.answer1 === 'O' || isAnswer(cardData.p03.answer2, cardData.p03.solution2));
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          isSubmitted: true,
          isCorrect: isCorrect,
        },
      }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p03.answer1,
              isAnswer: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p03.answer2,
              isAnswer: true,
            },
          ],
          isCorrect: isCorrect,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    if (value !== undefined) {
      setOpenDropdown(openDropdown.map((val, idx) => idx + 1 === index));
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          answer1: value,
          answer2: value === 'O' ? '' : prev.p03.answer2,
        },
      }));
      changeData('P03', 1, 1, value);
      if (value === 'O') {
        changeData('P03', 1, 2, '');
      }
    }
  };

  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (cardData.p03.answer1 === 'X') {
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: target.value } }));
      changeData('P03', 1, 2, target.value);
    }
  };

  useEffect(() => {
    if (inputRef.current != null) {
      if (cardData.p03.answer1 === 'O') {
        setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: '' } }));
        changeData('P03', 1, 2, '');
        inputRef.current.value = '';
        inputRef.current.disabled = true;
      } else if (cardData.p03.answer1 === 'X') {
        inputRef.current.disabled = false;
      }
    }
  }, [cardData.p03.answer1]);

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P03')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p03.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p03.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P03', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P03');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={() => {
        handleSubmit();
      }}
      submitDisabled={!(cardData.p03.answer1 === 'O' || (cardData.p03.answer1 === 'X' && isNotEmptyString(cardData.p03.answer2)))}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      bodyId='targetContainer'
    >
      <BoxWrap flexDirection='column' useFull paddingTop='65px'>
        <Box>
          <Box>
            <TextView title='보기'>
              <Image src={'/L03/C08/A03/HE2-L03-C08-A03-P01.jpg'} width={'900px'} alt='' />
              <Box type='hidden'>
                <p>
                  {`이 이미지는 퍼즐 조각 모양으로 나뉜 두 개의 문장을 보여준다.첫 번째 문장은 다음과 같다: 첫 번째 조각: "Although" (빨간색 글씨로 작성됨) 두 번째 조각: "he" 세 번째 조각: "became" 네 번째 조각: "a free man," 다섯 번째 조각: "he still faced racial discrimination." 이 조각들이 합쳐져서 "Although he became a free man, he still faced racial discrimination."라는 문장이 된다.
두 번째 문장은 다음과 같다: 첫 번째 조각: "Despite" (파란색 글씨로 작성됨) 두 번째 조각: "challenges in their lives," 세 번째 조각: "the artists never gave up on their art." 이 조각들이 합쳐져서 "Despite challenges in their lives, the artists never gave up on their art."라는 문장이 된다.`}
                </p>
              </Box>
            </TextView>
          </Box>
          <Box marginTop='20px'>
            <Box hAlign='flex-start'>
              <BoxWrap>
                <StyledTypography>
                  3.{' '}
                  <Typography style={{ textUnderlinePosition: 'under' }} textDecoration='underline' useGap={false}>
                    Although
                  </Typography>{' '}
                  the challenging courses on Mt. Everest, the climbers made their way to the top.{' '}
                </StyledTypography>
              </BoxWrap>
            </Box>
          </Box>
        </Box>
      </BoxWrap>
      <Box>
        <Table color={EStyleTableTypes.DEFAULT} sizes={['64px', '206px', 'auto']}>
          <THead>
            <TR>
              <TH scope='col' width='30%' color={EStyleTableTypes.DEFAULT}>
                O/X
              </TH>
              <TH scope='col' color={EStyleTableTypes.DEFAULT}>
                Corrections
              </TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TD width='10px' color={EStyleTableTypes.GRAY}>
                <Box display='flex'>
                  <Box marginTop={'10px'}>
                    <Typography>(1)</Typography>
                  </Box>
                  <Dropdown
                    type={'up'}
                    width='190px'
                    selectedValue={cardData.p03.answer1}
                    dropdownList={dropdownList}
                    ariaLabel={'3번 문제의 O/X 선택란'}
                    isOpen={openDropdown[-1]}
                    readOnly={cardData.p03.isSubmitted}
                    isError={cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer1, cardData.p03.solution1)}
                    onClick={value => handleDropdownClick(0, value)}
                  />
                </Box>
              </TD>
              <TD color={EStyleTableTypes.GRAY}>
                <Box display='flex'>
                  <Typography>(2)</Typography>
                  <Input
                    width='100%'
                    value={cardData.p03.answer2}
                    placeholder='내용을 넣어 주세요.'
                    inputSize='small'
                    maxLength={20}
                    readOnly={cardData.p03.isSubmitted}
                    disabled={cardData.p03.answer1 !== 'X'}
                    status={
                      !isNotEmptyString(cardData.p03.answer2)
                        ? InputStatus.DEFAULT
                        : cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer2, cardData.p03.solution2)
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    ariaLabel={'3번 문제의 오답 수정 입력란'}
                    onChange={handleInputChangeEvent}
                    inputRef={inputRef}
                  />
                </Box>
              </TD>
            </TR>
          </TBody>
        </Table>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='30%' show={isShow} closeOption={{ useYn: true, onClose: () => setIsShow(false) }}>
        <Box background='lightGray' borderRadius='12px' marginTop='35px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='정답' />
          </Box>
          <Box marginTop='12px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              (1) {`${cardData.p03.solution1} \n (2) ${cardData.p03.solution2} `}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const StyledTypography = styled(Typography)`
  display: inline;
  max-width: 100%;
`;
