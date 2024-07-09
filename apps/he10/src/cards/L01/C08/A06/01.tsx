import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, inputDatasType, userSubmissionType } from '@maidt-cntn/api';
import {
  Box,
  BoxWrap,
  List,
  Scroll,
  TMainHeaderInfoTypes,
  Dropdown,
  Typography,
  Question,
  EStyleButtonTypes,
  BottomSheet,
  EStyleFontSizes,
  ETagLine,
  Tag,
  IQuestionProps,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { checkAnswers, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);

  const [isShow, setShow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false, false]);
  const [answer, setAnswer] = useState<string[]>(['', '', '']);
  const [results, setResults] = useState<boolean[]>([false, false, false]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Grammar in Reading',
    headerPattern: 'text',
  };
  const questionInfo: IQuestionProps = {
    type: 'text',
    text: 'Choose the grammatically correct words for (1) ~ (3).',
    mark: !isSubmitted ? 'none' : results.every(result => result) ? 'correct' : 'incorrect',
  };
  const solution = ['included', 'Embracing', 'which'];

  const { userId } = useRecoilValue(studentAtom);
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const data = [
    { num: '(1)', dropdownList: ['including', 'included'] },
    { num: '(2)', dropdownList: ['Embracing', 'Embraced'] },
    { num: '(3)', dropdownList: ['who', 'which'] },
  ];

  const onSubmit = () => {
    if (isSubmitted) {
      setShow(!isShow);
      return;
    }
    const markingResult = checkAnswers(answer, solution);
    setResults(markingResult);

    const isCorrect = markingResult.every(value => value);
    const submissionData: inputDatasType[] = answer.map((value, index) => {
      return {
        subKey: index + 1,
        type: 'TEXT',
        value,
        isAnswer: true,
        isCorrect: markingResult[index],
      };
    });
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: submissionData,
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
    setIsSubmitted(true);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setAnswer(userSubmissionList[0].inputData.map((item: inputDatasType) => item.value));
        setIsSubmitted(isSubmitted);
        setResults(userSubmissionList[0].inputData.map((item: inputDatasType) => item.isCorrect));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((_, idx) => idx + 1 === index));

    const newAnswer = [...answer];
    if (value !== undefined) {
      newAnswer[index - 1] = value;
      setAnswer(newAnswer);
      changeData('P01', 1, index, newAnswer);
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
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={onSubmit}
      submitDisabled={answer.some(value => !isNotEmptyString(value))}
      submitBtnColor={
        answer.every(value => isNotEmptyString(value)) ? (isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
    >
      <BoxWrap useFull>
        <Box lineHeight='48px' width='912px' marginRight='24px' background='white'>
          <Scroll height='100%' width='550px' tabIndex={0}>
            <Box padding='4px 22px 4px 12px'>
              It is commonly believed that conflict within a team only has negative impacts. For this reason, when
              <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
                (1) including / included
              </Typography>
              in a team, you are often advised to avoid conflict at all costs. While this suggestion seems to make sense, it may not be helpful for
              your team's growth.
              <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
                (2) Embracing / Embraced
              </Typography>
              disagreements and differences, team members can generate more ideas and make better decisions. It’s time to change your perspective on
              conflict. Instead of viewing conflict as harmful, you should recognize it as a potential opportunity
              <Typography textDecoration='underline' weight='bold' style={{ textUnderlinePosition: 'under' }}>
                (3) who / which
              </Typography>
              can lead to positive outcomes.
            </Box>
          </Scroll>
        </Box>
        <Box>
          <List data={data}>
            {({ value, index = 0 }) => (
              <Box hAlign='center' marginBottom='10px' padding='10px'>
                <Question type='text' size='small'>
                  {value?.num}
                </Question>
                <Dropdown
                  width='225px'
                  marginLeft='10px'
                  isError={isSubmitted && !results[index - 1]}
                  readOnly={isSubmitted}
                  dropdownList={value?.dropdownList}
                  isOpen={openDropdown[(index as number) - 1]}
                  onClick={value => handleDropdownClick(index as number, value)}
                  ariaLabel={`${index}번 답 선택칸`}
                  selectedValue={answer[index - 1]}
                />
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Tag type={ETagLine.GREEN} label='답안' />
          <Box marginTop='10px'>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              (1) included
            </Typography>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              (2) Embracing
            </Typography>
            <Typography size={EStyleFontSizes.MEDIUM} usePre>
              (3) which
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
