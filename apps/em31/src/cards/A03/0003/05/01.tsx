import styled from '@emotion/styled';
import {
  Box,
  EImageType,
  EStyleFontSizes,
  IQuestionProps,
  Image,
  Label,
  TMainHeaderInfoTypes,
  Typography,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import A03_0003_05 from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0003_05);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [-1],
          isCorrect: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    iconType: 'search',
    headerPattern: 'icon',
    headerText: '나눗셈식으로 나타내기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        바둑돌 15개를 5개씩 묶어 보세요.
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const [isShow, setShow] = useState<boolean>(false);

  const handleClick = (index: number) => {
    let newPlant = [...cardData.p01.answer1];
    newPlant = newPlant.includes(index) ? newPlant.filter(i => i !== index) : [...newPlant, index];
    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: newPlant } }));
    changeData('P01', 1, 1, newPlant);
  };

  const setSubmitBtnColor = () => {
    if (cardData.p01.answer1.length === cardData.p01.solution1) {
      if (isShow && cardData.p01.isSubmitted) {
        return EStyleButtonTypes.GRAY;
      } else {
        return EStyleButtonTypes.YELLOW;
      }
    } else {
      return EStyleButtonTypes.SECONDARY;
    }
  };

  const setSubmitDisabled = () => {
    if (cardData.p01.answer1.length === cardData.p01.solution1) return false;
    else return true;
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p01.answer1.length === cardData.p01.solution1;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p01.answer1,
            isCorrect: isCorrect,
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult('P01', userSubmission, isCorrect);
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
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
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
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={setSubmitDisabled()}
      useRound
      vAlign='start'
    >
      <Box hAlign='center' flexDirection='column' gap='8px'>
        <Box display='flex' flexDirection='column' gap='8px' title='검정색 바둑돌이 모두 15개가 있습니다.'>
          {Array(3)
            .fill(null)
            .map((_, colIndex) => (
              <GoStoneWrap key={colIndex} isActive={cardData.p01.answer1.includes(colIndex)}>
                {Array(5)
                  .fill(null)
                  .map((_, rowIndex) => (
                    <button
                      key={rowIndex}
                      type='button'
                      aria-label={
                        `${colIndex + 1}번째 줄 ${rowIndex + 1}번째 바둑돌` + (cardData.p01.answer1.includes(colIndex) ? ', 한 묶음으로 선택됨' : '')
                      }
                      title='엔터키를 입력해서 한 묶음으로 선택해보세요.'
                      disabled={cardData.p01.isSubmitted}
                      onClick={() => handleClick(colIndex)}
                    >
                      <Image type={EImageType.IMG} src={`/A03/0003/05/MC31303.png`} width='40px' height='41px' />
                    </button>
                  ))}
              </GoStoneWrap>
            ))}
        </Box>
        <Typography size={EStyleFontSizes['X-MEDIUM']}>* 바둑돌을 클릭해 보세요.</Typography>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' marginTop={10} height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='40px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'답안'} />
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              gap='8px'
              width={300}
              marginTop={10}
              title='검정색 바둑돌이 모두 15개, 1줄에 5개씩 3묶음이 있습니다.'
            >
              {Array(3)
                .fill(null)
                .map((_, colIndex) => (
                  <GoStoneWrap key={colIndex} isActive={true}>
                    {Array(5)
                      .fill(null)
                      .map((_, rowIndex) => (
                        <button key={rowIndex} type='button' disabled={true}>
                          <Image
                            type={EImageType.IMG}
                            src={`/A03/0003/05/MC31303.png`}
                            alt={`${colIndex + 1}번째 줄 ${rowIndex + 1}번째 바둑돌`}
                            width='30px'
                            height='30px'
                          />
                        </button>
                      ))}
                  </GoStoneWrap>
                ))}
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const GoStoneWrap = styled.div<{ isActive?: boolean }>`
  padding: 12px 26px;
  border-radius: 16px;

  ${({ isActive }) =>
    isActive &&
    `
    padding : 10px 24px;
    border: 2px solid #1E6EFA;
    background: var(--color-blue-50);
  `}

  > button + button {
    margin-left: 24px;
  }
`;

export default P01;
