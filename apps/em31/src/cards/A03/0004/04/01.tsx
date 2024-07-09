import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  Label,
  List,
  OverlayTooltip,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { useEffect, useState } from 'react';

import child_1 from '@/assets/example/EM-029-01/MA31303_child_1.svg';
import child_2 from '@/assets/example/EM-029-01/MA31303_child_2.svg';
import child_3 from '@/assets/example/EM-029-01/MA31303_child_3.svg';
import child_4 from '@/assets/example/EM-029-01/MA31303_child_4.svg';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A03_0004_04 } from './store';

const P01 = () => {
  const [isShow, setShow] = useState(false);
  const [cardData, setCardData] = useRecoilState(A03_0004_04);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '곱셈과 나눗셈의 관계 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' lineColor='none' background='#969590' color='var(--color-white)' marginRight={12} />
        그림을 보고 곱셈식과 나눗셈식으로 나타내 보세요.
      </>
    ),
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
  };

  const math_expression_List = [
    {
      src: child_1,
      text: '구명조끼가 5개씩 4묶음 \n있으니까 20개예요',
      type: 'multiply',
      math: ['5', '20'],
    },
    {
      src: child_2,
      text: '구명조끼가 4개씩 5묶음 \n있으니까 20개예요',
      type: 'multiply',
      math: ['4', '20'],
    },
    {
      src: child_3,
      text: '구명조끼 20개를 5개씩 \n묶으면 4묶음이에요',
      type: 'divide',
      math: ['20', '5'],
    },
    {
      src: child_4,
      text: '구명조끼 20개를 4개씩 \n묶으면 5묶음이에요',
      type: 'divide',
      math: ['20', '4'],
    },
  ];

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const isAnswerUnfilled = () => {
    let flag = false;
    cardData.p01.answer.forEach(ans => {
      if (!isNotEmptyString(ans)) {
        flag = true;
      }
    });
    return flag;
  };

  const setSubmitBtnColor = () => {
    if (isAnswerUnfilled()) {
      return EStyleButtonTypes.SECONDARY;
    } else {
      if (isShow) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    }
  };

  const setSubmitLabel = () => {
    if (cardData.p01.isSubmitted && isShow) {
      return '답안닫기';
    } else if (cardData.p01.isSubmitted && !isShow) {
      return '답안보기';
    } else {
      return '채점하기';
    }
  };

  const handleSubmit = () => {
    if (cardData.p01.isSubmitted) {
      setShow(show => !show);
      return;
    }

    const isCorrect1 = cardData.p01.answer[0] === cardData.p01.solution[0];
    const isCorrect2 = cardData.p01.answer[1] === cardData.p01.solution[1];
    const isCorrect3 = cardData.p01.answer[2] === cardData.p01.solution[0];
    const isCorrect4 = cardData.p01.answer[3] === cardData.p01.solution[1];

    setCardData(prev => ({
      ...prev,
      p01: {
        ...prev.p01,
        isCorrect: isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4,
        isSubmitted: true,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p01.answer[0],
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p01.answer[1],
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p01.answer[2],
            isCorrect: isCorrect3,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p01.answer[3],
            isCorrect: isCorrect4,
          },
        ],
        isCorrect: isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4,
      },
    ];

    submitDataWithResult('P01', userSubmission, isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer:
              [
                userSubmissionList[0].inputData[0]?.value,
                userSubmissionList[0].inputData[1]?.value,
                userSubmissionList[0].inputData[2]?.value,
                userSubmissionList[0].inputData[3]?.value,
              ] || cardData.p01.answer,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            isSubmitted,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const answerList = [...cardData.p01.answer];
    answerList[subKey - 1] = value;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: answerList } }));
    changeData('P01', 1, subKey, value);
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
      background={'var(--color-white)'}
      submitLabel={setSubmitLabel()}
      onSubmit={handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={isAnswerUnfilled()}
      useRound
      vAlign='flex-start'
    >
      <BoxWrap useFull alignItems='center'>
        <Box width='330px' height='350px' hAlign='center' type='line' useRound>
          <Image src={'/A03/0004/04/A-EM31-030004-0401.png'} alt='구명조끼가 20개가 놓여져 있습니다.' width='242px' height='205px' />
        </Box>
        <Box flex='1' height='100%' hAlign='flex-end' flexDirection='column'>
          <List data={math_expression_List}>
            {({ value, index = 1 }) => (
              <Box
                key={index}
                position='relative'
                hAlign={index % 2 === 0 ? 'flex-start' : 'flex-end'}
                width='100%'
                padding='0 55px'
                marginTop='14px'
                display='flex'
                justifyContent='space-between'
              >
                <Person background={value?.src} align={index % 2 === 0 ? 'right' : 'left'} />
                <Box marginLeft={0} order={index % 2 === 0 ? '+1' : '0'}>
                  <OverlayTooltip type='cloud' place={index % 2 === 0 ? 'left' : 'right'}>
                    {value?.text}
                  </OverlayTooltip>
                </Box>
                <Box background={index % 2 === 0 ? 'yellow' : 'green'} useRound width='236px'>
                  {value?.type === 'multiply' ? (
                    <>
                      <Typography>{value?.math[0]}×</Typography>
                      <Input
                        width='52px'
                        maxLength={1}
                        type='number'
                        status={
                          !cardData.p01.answer[index - 1]
                            ? InputStatus.DEFAULT
                            : cardData.p01.isSubmitted && cardData.p01.answer[index - 1] !== cardData.p01.solution[(index + 1) % 2]
                            ? InputStatus.ERROR
                            : InputStatus.ENABLE
                        }
                        readOnly={cardData.p01.isSubmitted}
                        value={cardData.p01.answer[index - 1]}
                        onChange={e => handleChange(index, e.target.value)}
                        ariaLabel='답을 적어주세요.'
                      />
                      <Typography>={value?.math[1]}</Typography>
                    </>
                  ) : (
                    <>
                      <Typography>
                        {value?.math[0]}÷{value?.math[1]}=
                      </Typography>
                      <Input
                        width='52px'
                        maxLength={1}
                        type='number'
                        status={
                          !cardData.p01.answer[index - 1]
                            ? InputStatus.DEFAULT
                            : cardData.p01.isSubmitted && cardData.p01.answer[index - 1] !== cardData.p01.solution[(index + 1) % 2]
                            ? InputStatus.ERROR
                            : InputStatus.ENABLE
                        }
                        readOnly={cardData.p01.isSubmitted}
                        value={cardData.p01.answer[index - 1]}
                        onChange={e => handleChange(index, e.target.value)}
                        ariaLabel='답을 적어주세요.'
                      />
                    </>
                  )}
                </Box>
              </Box>
            )}
          </List>
        </Box>
      </BoxWrap>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='48px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>4, 5, 4, 5</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>“구명조끼가 5개씩 4묶음 있으니까 20개예요.”를 곱셈식으로 나타내면 5×4=20입니다.</Typography>
              <Typography>“구명조끼가 4개씩 5묶음 있으니까 20개예요.”를 곱셈식으로 나타내면 4×5=20입니다.</Typography>
              <Typography>“구명조끼 20개를 5개씩 묶으면 4묶음이에요.”를 나눗셈식으로 나타내면 20÷5=4입니다.</Typography>
              <Typography>“구명조끼 20개를 4개씩 묶으면 5묶음이에요.”를 나눗셈식으로 나타내면 20÷4=5입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const Person = styled.span<{ background?: string; align: 'left' | 'right' }>`
  position: absolute;
  ${({ align }) => (align === 'right' ? 'right: 34px' : 'left: 34px')};
  top: -32px;

  display: block;
  width: 40px;
  height: 48px;

  background: url(${({ background }) => background && background}) center no-repeat;

  z-index: 99;
`;

export default P01;
