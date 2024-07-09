import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  ESvgType,
  EStyleButtonTypes,
  EStyleFontSizes,
  EStyleTableTypes,
  ETagLine,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  SvgIcon,
  TBody,
  TD,
  TFoot,
  TH,
  THead,
  Label,
  TR,
  Table,
  TableMathCaption,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import empty_square from '@/assets/icon/math_empty_square.svg';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A04000904_Atom } from './store';

import blue_arrow from '../../../../assets/example/EM-004-03/math_arrow.svg';
import red_arrow from '../../../../assets/example/EM-004-03/math_arrow2.svg';

type boxType = 'red' | 'blue';

const P01 = () => {
  const CURRENT_PAGE = 'P01';
  const [isShow, setShow] = useState<boolean>(false);

  const { initData, submitDataWithResult, saveData, changeData } = usePageData();
  const [cardData, setCardData] = useRecoilState(A04000904_Atom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Label type='icon' size='middle' value='1' />
        <span style={{ justifyContent: 'center', verticalAlign: 'top !imnportant' }}>
          24×3을 계산하려고 합니다.&nbsp;
          <SvgIcon
            type={ESvgType.IMG}
            alt='빈칸'
            src={empty_square}
            size='43px'
            style={{ display: 'inline-flex', verticalAlign: 'middle', position: 'relative', top: '-4px' }}
          />
          &nbsp;안에 알맞은 수를 써넣으세요.
        </span>
      </>
    ),
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
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
          isAnswer: true,
        },
      ],
    },
  ];

  const onCalculate = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.answer1.trim() === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2.trim() === cardData.p01.solution2;
      const isCorrect3 = cardData.p01.answer3.trim() === cardData.p01.solution3;
      const isCorrect4 = cardData.p01.answer4.trim() === cardData.p01.solution4;
      const isCorrect5 = cardData.p01.answer5.trim() === cardData.p01.solution5;
      const isCorrect6 = cardData.p01.answer6.trim() === cardData.p01.solution6;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4 && isCorrect5 && isCorrect6;
      setCardData(prev => ({
        ...prev,
        p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect, isCorrect1, isCorrect2, isCorrect3, isCorrect4, isCorrect5, isCorrect6 },
      }));

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
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p01.answer3,
              isAnswer: true,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'TEXT',
              value: cardData.p01.answer4,
              isAnswer: true,
              isCorrect: isCorrect4,
            },
            {
              subKey: 5,
              type: 'TEXT',
              value: cardData.p01.answer5,
              isAnswer: true,
              isCorrect: isCorrect5,
            },
            {
              subKey: 6,
              type: 'TEXT',
              value: cardData.p01.answer6,
              isAnswer: true,
              isCorrect: isCorrect6,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult('P01', userSubmission, isCorrect);
    }
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p01.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p01.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p01.answer4,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p01.answer4,
            isSubmitted,
            isCorrect1: userSubmissionList[0].inputData[0]?.isCorrect || cardData.p01.isCorrect1,
            isCorrect2: userSubmissionList[0].inputData[1]?.isCorrect || cardData.p01.isCorrect2,
            isCorrect3: userSubmissionList[0].inputData[2]?.isCorrect || cardData.p01.isCorrect3,
            isCorrect4: userSubmissionList[0].inputData[3]?.isCorrect || cardData.p01.isCorrect4,
            isCorrect5: userSubmissionList[0].inputData[4]?.isCorrect || cardData.p01.isCorrect5,
            isCorrect6: userSubmissionList[0].inputData[5]?.isCorrect || cardData.p01.isCorrect6,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer6: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(CURRENT_PAGE);
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      onSubmit={onCalculate}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={
        !(
          cardData.p01.answer1 &&
          cardData.p01.answer2 &&
          cardData.p01.answer3 &&
          cardData.p01.answer4 &&
          cardData.p01.answer5 &&
          cardData.p01.answer6
        )
      }
      submitBtnColor={
        !(
          cardData.p01.answer1 &&
          cardData.p01.answer2 &&
          cardData.p01.answer3 &&
          cardData.p01.answer4 &&
          cardData.p01.answer5 &&
          cardData.p01.answer6
        )
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
      useRound
    >
      <BoxWrap useFull position='relative' justifyContent='center' boxGap={70} alignItems='flex-start'>
        <Box padding='0 38px'>
          <Image src={'/A04/0009/04/MC31409.png'} alt='십 모형 6개와 일 모형 12개가 있습니다.' width='380px' height='190px' />
          <AreaBox type='red' top='0px' left='141px' width='108px' height='190px'></AreaBox>
          <AreaBox type='blue' top='0px' left='255px' width='202px' height='190px'></AreaBox>
        </Box>
        <Box padding='24px 48px'>
          <Table color={EStyleTableTypes.MATH} sizes={['33%', '33%', '33%']}>
            <TableMathCaption caption='세로셈' math={['24', '*', '4']} />
            <THead hidden>
              <TR>
                <TH scope='col'>일의 자리</TH>
                <TH scope='col'>십의 자리</TH>
                <TH scope='col'>연산 기호</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD>4</TD>
                <TD>2</TD>
                <TD></TD>
              </TR>
              <TR>
                <TD>3</TD>
                <TD></TD>
                <TD>×</TD>
              </TR>
            </TBody>
            <TFoot>
              <TR>
                <TD>
                  <Input
                    value={cardData.p01.answer1}
                    type='number'
                    onChange={event => handleChange(1, event.target.value)}
                    status={cardData.p01.isSubmitted && !cardData.p01.isCorrect1 ? InputStatus.ERROR : InputStatus.ENABLE}
                    ariaLabel='4×3 일의 자리 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                  />
                </TD>
                <TD width='52px' height='50px'>
                  <Box position='absolute' top='-1px' left='0' zIndex={-1} width='104px' height='56px' backgroundColor='var(--color-blue-200)' />
                  <Input
                    value={cardData.p01.answer2}
                    type='number'
                    onChange={event => handleChange(2, event.target.value)}
                    status={cardData.p01.isSubmitted && !cardData.p01.isCorrect2 ? InputStatus.ERROR : InputStatus.ENABLE}
                    ariaLabel='4×3 십의 자리 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                  />
                </TD>
                <TD width='52px' height='50px'></TD>
              </TR>
              <TR>
                <TD vAlign='middle'>
                  <Input
                    value={cardData.p01.answer3}
                    type='number'
                    onChange={event => handleChange(3, event.target.value)}
                    status={cardData.p01.isSubmitted && !cardData.p01.isCorrect3 ? InputStatus.ERROR : InputStatus.ENABLE}
                    ariaLabel='20×3 일의 자리 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                  />
                </TD>
                <TD>
                  <Box position='absolute' top='-1px' left='0' zIndex={-1} width='104px' height='56px' backgroundColor='var(--color-red-200)' />
                  <Input
                    value={cardData.p01.answer4}
                    type='number'
                    onChange={event => handleChange(4, event.target.value)}
                    status={cardData.p01.isSubmitted && !cardData.p01.isCorrect4 ? InputStatus.ERROR : InputStatus.ENABLE}
                    ariaLabel='20×3 십의 자리 답'
                    maxLength={1}
                    readOnly={cardData.p01.isSubmitted}
                  />
                </TD>
                <TD></TD>
              </TR>
              <TR>
                <TD hAlign='center'>
                  <Input
                    value={cardData.p01.answer5}
                    type='number'
                    onChange={event => handleChange(5, event.target.value)}
                    readOnly={cardData.p01.isSubmitted}
                    status={
                      !cardData.p01.answer5
                        ? InputStatus.DEFAULT
                        : cardData.p01.isSubmitted && !cardData.p01.isCorrect5
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    ariaLabel='정답 일의 자리 답'
                    maxLength={1}
                  />
                  {/* <Input value={''} ariaLabel='십의 자리 답' /> */}
                </TD>
                <TD hAlign='center'>
                  <Input
                    value={cardData.p01.answer6}
                    type='number'
                    onChange={event => handleChange(6, event.target.value)}
                    readOnly={cardData.p01.isSubmitted}
                    status={
                      !cardData.p01.answer6
                        ? InputStatus.DEFAULT
                        : cardData.p01.isSubmitted && !cardData.p01.isCorrect6
                        ? InputStatus.ERROR
                        : InputStatus.ENABLE
                    }
                    ariaLabel='정답 십의 자리 답'
                    maxLength={1}
                  />
                </TD>
                <TD></TD>
              </TR>
            </TFoot>
          </Table>
        </Box>
      </BoxWrap>
      <Box
        position='absolute'
        width='200px'
        height='100px'
        top='28%'
        left='49.5%'
        background={`url(${blue_arrow}) center no-repeat`}
        backgroundSize='100% auto'
        hAlign='center'
      >
        <Box backgroundColor='var(--color-white)' hAlign='center'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>4×3</Typography>
        </Box>
      </Box>
      <Box
        position='absolute'
        width='463px'
        height='44px'
        top='47.4%'
        left='23.4%'
        background={`url(${red_arrow}) center no-repeat`}
        backgroundSize='100% auto'
        hAlign='center'
      >
        <Box backgroundColor='var(--color-white)' vAlign='center' width='80px' marginLeft='240px' marginTop='12px'>
          <Typography size={EStyleFontSizes['X-MEDIUM']}>20×3</Typography>
        </Box>
      </Box>
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
              <Typography>{'1, 2'}</Typography>
              <Typography>{'6, 0'}</Typography>
              <Typography>{'7, 2'}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>{'24×3은 4×3과 20×3의 합입니다.'}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;

const AreaBox = styled.div<{
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  type?: boxType;
  isClicked?: boolean;
}>`
  position: absolute;
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
  ${({ top }) => top && `top: ${top};`}
  ${({ left }) => left && `left: ${left};`}
  ${({ isClicked, type }) =>
    isClicked &&
    type === 'red' &&
    `
    border: 3px solid #EBAA9D;
    `}
    ${({ isClicked, type }) =>
    isClicked &&
    type === 'blue' &&
    `
    border: 3px solid #85B2E0;
  `}
`;
