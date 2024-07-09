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
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import styled from '@emotion/styled';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C08A05a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C08A05a);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setIsShow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const dropdownList = ['O', 'X'];
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'Practice',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Write O if the underlined part is correct, or write X if wrong and correct it.',
    mark: cardData.p03.isSubmitted ? (cardData.p03.isCorrect ? 'correct' : 'incorrect') : 'none',
    markSize: 'middle',
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
    : !(cardData.p03.answer1 === 'O' || isNotEmptyString(cardData.p03.answer2))
    ? EStyleButtonTypes.SECONDARY
    : EStyleButtonTypes.PRIMARY;
  const handleSubmit = () => {
    if (cardData.p03.isSubmitted) {
      setIsShow(!isShow);
    } else {
      setIsCorrect(
        cardData.p03.answer1.toLowerCase().trim() === cardData.p03.solution1 && cardData.p03.answer2.toLowerCase().trim() === cardData.p03.solution2,
      );
      setCardData(prev => ({
        ...prev,
        p03: {
          ...prev.p03,
          isSubmitted: true,
          isCorrect:
            cardData.p03.answer1.toLowerCase().trim() === cardData.p03.solution1 &&
            cardData.p03.answer2.toLowerCase().trim() === cardData.p03.solution2,
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
          isCorrect:
            cardData.p03.answer1.toLowerCase().trim() === cardData.p03.solution1 &&
            cardData.p03.answer2.toLowerCase().trim() === cardData.p03.solution2,
        },
      ];
      submitDataWithResult('P03', userSubmission, isCorrect);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    if (value !== undefined) {
      setOpenDropdown(openDropdown.map((val, idx) => idx + 1 === index));
      setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer1: value } }));
      changeData('P03', 1, 1, value);
    }
  };

  const handleInputChangeEvent = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer2: target.value } }));
    changeData('P03', 1, 2, target.value);
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
      submitDisabled={!(cardData.p03.answer1 === 'O' || isNotEmptyString(cardData.p03.answer2))}
      submitLabel={cardData.p03.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={submitBtnColor}
      bodyId='targetContainer'
    >
      <Box>
        <Box>
          <TextView title='보기'>
            <Image src={'/L01/C08/A05/HE1-L01-C08-A05.jpg'} width={'636px'} height='49px' alt='' />
            <Box type='hidden'>
              (When) Paired with new partners, the chimpanzees usually failed to get the food. 빨간 색자 (When) Paired가 파란 색자 the chimpanzees와
              선으로 연결되어 있다.
            </Box>
          </TextView>
        </Box>
        <Box marginTop='20px'>
          <Box hAlign={'flex-start'}>
            <StyledTypography>
              3.{` `}
              <Typography style={{ textUnderlinePosition: 'under' }} textDecoration='underline' useGap={false}>
                Communicated
              </Typography>{' '}
              openly, we can avoid misunderstandings with other people.
            </StyledTypography>
          </Box>
        </Box>
      </Box>
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
                    isOpen={openDropdown[-1]}
                    ariaLabel={'3번 문제의 O/X 선택란'}
                    isError={cardData.p03.isSubmitted && !isAnswer(cardData.p03.answer1, cardData.p03.solution1)}
                    readOnly={cardData.p03.isSubmitted}
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
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            (1) X <br />
            <br />
            (2) Communicating
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;

const StyledTypography = styled(Typography)`
  display: block;
  max-width: 100%;
`;
