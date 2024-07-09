import headerIcon from '@/assets/icon/m_default_01.svg';
import {
  TMainHeaderInfoTypes,
  Box,
  BottomSheet,
  IQuestionProps,
  Tag,
  ETagLine,
  SvgIcon,
  EStyleButtonTypes,
  Input,
  TBody,
  TD,
  TH,
  TR,
  Table,
  TableMathCaption,
  EStyleTableTypes,
  InputStatus,
  BoxWrap,
  Typography,
} from '@maidt-cntn/ui';
import { DialogContainer } from '@maidt-cntn/ui/math';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { A04000105_store } from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking, isAnswer, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const P08 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04000105_store);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: Array(9).fill(''),
        },
        {
          subKey: 2,
          type: 'TEXT_LIST',
          value: Array(9).fill(''),
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'mathTween',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        곱셈표를 완성해 보세요.
      </>
    ),
    mark: getMarking(cardData.P08.isSubmitted, cardData.P08.isCorrect),
  };

  const handleInputChange = (ansType: string, index: number, val: string) => {
    switch (ansType) {
      case 'answer1':
        {
          const newAnswer = cardData.P08.answer1.map((item, idx) => (index === idx ? val : item));
          setCardData(prev => ({ ...prev, P08: { ...prev.P08, answer1: newAnswer } }));
          changeData('P08', 1, 1, newAnswer);
        }
        break;
      case 'answer2':
        {
          const newAnswer = cardData.P08.answer2.map((item, idx) => (index === idx ? val : item));
          setCardData(prev => ({ ...prev, P08: { ...prev.P08, answer2: newAnswer } }));
          changeData('P08', 1, 2, newAnswer);
        }
        break;
    }
  };

  const handleInputStatus = (ansType: string, index: number): InputStatus => {
    const answer = ansType === 'answer1' ? cardData.P08.answer1[index] : cardData.P08.answer2[index];
    const solution = ansType === 'answer1' ? cardData.P08.solution1[index] : cardData.P08.solution2[index];
    return !isNotEmptyString(answer)
      ? InputStatus.DEFAULT
      : cardData.P08.isSubmitted && !isAnswer(answer, solution)
      ? InputStatus.ERROR
      : InputStatus.ENABLE;
  };

  const setSubmitBtnColor = () => {
    return cardData.P08.answer1.every(item => isNotEmptyString(item)) && cardData.P08.answer2.every(item => isNotEmptyString(item))
      ? isShow
        ? EStyleButtonTypes.GRAY
        : EStyleButtonTypes.YELLOW
      : EStyleButtonTypes.SECONDARY;
  };

  const setSubmitDisabled = () => {
    return cardData.P08.answer1.every(item => isNotEmptyString(item)) && cardData.P08.answer2.every(item => isNotEmptyString(item)) ? false : true;
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleSubmit = () => {
    const isCorrect1 = cardData.P08.answer1 === cardData.P08.solution1;
    const isCorrect2 = cardData.P08.answer2 === cardData.P08.solution2;
    const isCorrect = isCorrect1 && isCorrect2;

    setCardData(prev => ({ ...prev, P08: { ...prev.P08, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData.P08.answer1,
          },
          {
            subKey: 2,
            type: 'TEXT_LIST',
            value: cardData.P08.answer2,
          },
        ],
        isCorrect: isCorrect,
      },
    ];
    submitDataWithResult('P08', userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P08')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          P08: {
            ...prev.P08,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.P08.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.P08.answer2,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P08', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P08');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const thColArr1 = ['0', '3', '6'];
  const thRowArr1 = ['2', '4', '8'];
  const thColArr2 = ['1', '5', '9'];
  const thRowArr2 = ['3', '6', '7'];

  return (
    <DialogContainer
      vAlign='flex-start'
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData.P08.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.P08.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={setSubmitDisabled()}
    >
      <BoxWrap>
        <Box useFull>
          <Table color={EStyleTableTypes.DEFAULT} sizes={['20%', '26%', '26%', '26%']} caption='곱셈표'>
            <TableMathCaption caption='2,4,8과 0,3,6의 곱셈' math={['']} />
            <TBody>
              <TR>
                <TH scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                  ×
                </TH>
                {thColArr1.map((value, colIndex) => (
                  <TH key={colIndex} scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                    {value}
                  </TH>
                ))}
              </TR>
              {thRowArr1.map((item, rowIndex) => (
                <TR key={rowIndex}>
                  <TH scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                    <Box width={65}>{item}</Box>
                  </TH>
                  {Array(3)
                    .fill('')
                    .map((_, index) => (
                      <TD key={rowIndex * 3 + index} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                        <Input
                          type='number'
                          width='70px'
                          value={cardData.P08.answer1[rowIndex * 3 + index]}
                          onChange={e => handleInputChange('answer1', rowIndex * 3 + index, e.target.value)}
                          ariaLabel={`${item}×${thColArr1[index]}의 값`}
                          status={handleInputStatus('answer1', rowIndex * 3 + index)}
                          readOnly={cardData.P08.isSubmitted}
                          maxLength={2}
                        />
                      </TD>
                    ))}
                </TR>
              ))}
            </TBody>
          </Table>
        </Box>
        <Box useFull>
          <Table color={EStyleTableTypes.DEFAULT} sizes={['20%', '26%', '26%', '26%']} caption='곱셈표'>
            <TableMathCaption caption='3,6,7과 1,5,9의 곱셈' math={['']} />
            <TBody>
              <TR>
                <TH scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                  ×
                </TH>
                {thColArr2.map((value, colIndex) => (
                  <TH key={colIndex} scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                    {value}
                  </TH>
                ))}
              </TR>
              {thRowArr2.map((item, rowIndex) => (
                <TR key={rowIndex}>
                  <TH scope='col' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                    <Box width={65}>{item}</Box>
                  </TH>
                  {Array(3)
                    .fill('')
                    .map((_, index) => (
                      <TD key={rowIndex * 3 + index} vAlign='middle' hAlign='center' color={EStyleTableTypes.DEFAULT}>
                        <Input
                          type='number'
                          width='70px'
                          value={cardData.P08.answer2[rowIndex * 3 + index]}
                          onChange={e => handleInputChange('answer2', rowIndex * 3 + index, e.target.value)}
                          ariaLabel={`${item}×${thColArr2[index]}의 값`}
                          status={handleInputStatus('answer2', rowIndex * 3 + index)}
                          readOnly={cardData.P08.isSubmitted}
                          maxLength={2}
                        />
                      </TD>
                    ))}
                </TR>
              ))}
            </TBody>
          </Table>
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' show={isShow} height='40%'>
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} marginTop='10px' flexDirection='column'>
              <Typography>0, 6, 12 / 0, 12, 24 / 0, 24, 48</Typography>
              <Typography>3, 15, 27 / 6, 30, 54 / 7, 35, 63</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='10px'>
              <Typography>곱셈구구를 하여 빈칸을 채웁니다.</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='힌트' />
            <Box display={'flex'} flexDirection={'column'} marginTop='10px'>
              <Typography>곱셈구구를 떠올려 봐요.</Typography>
              <Typography>이때 0은 어떤 수를 곱해도 0이에요.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </DialogContainer>
  );
};

export default P08;
