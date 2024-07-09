import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Container } from '@maidt-cntn/ui/math';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { C02000110_store } from './store';
import usePageData from '@/hooks/usePageData';
import {
  Box,
  Typography,
  SvgIcon,
  ESvgType,
  IQuestionProps,
  Image,
  BoxWrap,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  Symbol,
  List,
} from '@maidt-cntn/ui';
import styled from 'styled-components';
import oIcon from '@/assets/icon/o_icon.png';
import redOIcon from '@/assets/icon/red_o_icon.svg';
import headerIcon from '@/assets/icon/m_default_01.svg';

const P01 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(C02000110_store);
  const { userId } = useRecoilValue(studentAtom);
  const [isShow, setShow] = useState<boolean>(false);
  const PAGE_NUMBER = 'P01';

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <SvgIcon src={headerIcon} size='36px' />
        <Box vAlign='center'>
          원을 모두 찾아 &nbsp;
          <Symbol type='correct' />
          &nbsp;표 하세요.
        </Box>
      </>
    ),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'BOOLEAN',
          value: false,
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'BOOLEAN',
          value: false,
          isCorrect: false,
        },
        {
          subKey: 3,
          type: 'BOOLEAN',
          value: false,
          isCorrect: false,
        },
        {
          subKey: 4,
          type: 'BOOLEAN',
          value: false,
          isCorrect: false,
        },
      ],
    },
  ];

  const onGrade = () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const isCorrect1 = cardData.p01.answer1 === cardData.p01.solution1;
      const isCorrect2 = cardData.p01.answer2 === cardData.p01.solution2;
      const isCorrect3 = cardData.p01.answer3 === cardData.p01.solution3;
      const isCorrect4 = cardData.p01.answer4 === cardData.p01.solution4;
      const isCorrect = isCorrect1 && isCorrect2 && isCorrect3 && isCorrect4;
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'BOOLEAN',
              value: cardData.p01.answer1,
              isCorrect: isCorrect1,
            },
            {
              subKey: 2,
              type: 'BOOLEAN',
              value: cardData.p01.answer2,
              isCorrect: isCorrect2,
            },
            {
              subKey: 3,
              type: 'BOOLEAN',
              value: cardData.p01.answer3,
              isCorrect: isCorrect3,
            },
            {
              subKey: 4,
              type: 'BOOLEAN',
              value: cardData.p01.answer4,
              isCorrect: isCorrect4,
            },
          ],
          isCorrect,
        },
      ];
      submitDataWithResult(PAGE_NUMBER, userSubmission, isCorrect);
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;
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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleClick = (index: number) => {
    if (cardData.p01.isSubmitted) return;
    if (index === 1) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: !cardData.p01.answer1 } }));
    } else if (index === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: !cardData.p01.answer2 } }));
    } else if (index === 3) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer3: !cardData.p01.answer3 } }));
    } else if (index === 4) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer4: !cardData.p01.answer4 } }));
    }
    changeData('p01', 1, index, !cardData.p01[`answer${index}`]);
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUMBER);
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
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={onGrade}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p01.answer1 || cardData.p01.answer2 || cardData.p01.answer3 || cardData.p01.answer4)}
      submitBtnColor={!cardData.p01.answer ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      useRound
    >
      <BoxWrap justifyContent='center'>
        <Box marginBottom={60} width='90%' hAlign='center' flexDirection='column'>
          <Image
            src='/C02/0001/10/DEC322001.png'
            alt='왼쪽부터 첫 번째와 세 번째는 어느 방향에서 보아도 똑같이 동그란 모양이고, 열려 있는 부분이 없는 도형이고, 두 번째는 위쪽과 오른쪽의 굽은 정도가 다른 동그란 모양인 도형이고, 네 번째는 열려 있는 부분이 있는 동그란 모양인 도형의 그림입니다.'
            width='100%'
          />
        </Box>
      </BoxWrap>

      <Box width={'100%'} textAlign='center'>
        <List
          align='horizontal'
          gap={30}
          data={['', '', '', '']}
          row={({ value, index = 1 }) => (
            <Box vAlign='center' justifyContent='center' key={index}>
              <Box vAlign='center'>
                <Typography>(</Typography>
                <CircleCheck type='button' onClick={() => handleClick(index)}>
                  {cardData.p01[`answer${index}`] && (
                    <SvgIcon
                      type={ESvgType.IMG}
                      size='27px'
                      src={
                        cardData.p01.isSubmitted ? (cardData.p01[`answer${index}`] === cardData.p01[`solution${index}`] ? oIcon : redOIcon) : oIcon
                      }
                      alt='O 아이콘'
                    />
                  )}
                </CircleCheck>
                <Typography>)</Typography>
              </Box>
            </Box>
          )}
        />
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
              <Typography>
                ( <Symbol type='correct' /> ) ( &nbsp;&nbsp;&nbsp;&nbsp; ) ( <Symbol type='correct' /> ) ( &nbsp;&nbsp;&nbsp;&nbsp; )
              </Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <BoxWrap marginTop='12px'>
              <Box hAlign='center' vAlign='start' flexDirection='column' useRound useFull>
                <Typography>원은 어느 방향에서 보아도 똑같이 동그란 모양이고, 열려 있는 부분이 없는 도형입니다.</Typography>
              </Box>
            </BoxWrap>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const CircleCheck = styled.button`
  width: 130px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default P01;