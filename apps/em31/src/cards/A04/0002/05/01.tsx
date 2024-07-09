import styled from '@emotion/styled';
import {
  BottomSheet,
  Box,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IQuestionProps,
  Image,
  Label,
  TMainHeaderInfoTypes,
  Tag,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';

import { tokenAtom } from '@maidt-cntn/stores/token';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';

import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { A04_0002_05 } from './store';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A04_0002_05);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const prefix = import.meta.env.VITE_CDN_PATH;
  const [imageSrcHref, setImageSrcHref] = useState<string>('');
  const [{ accessToken }] = useRecoilState(tokenAtom);

  useEffect(() => {
    setImageSrcHref(getFileFromCDNWithToken(prefix + '/A04/0002/05/MC31402-2.png', accessToken));
  }, [accessToken, prefix]);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '30×2 계산하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <Box vAlign='center'>
        <Label value={'ㄱ'} color='var(--color-white)' background='var(--color-grey-600)' marginRight={12} />
        <Box marginTop={5} vAlign='center'>
          30×2를&nbsp;
          <Image src='/A04/0002/05/MC31402-2.png' alt='십의 모형' width='40px' height='40px' />을 붙여 나타내 보세요.
        </Box>
      </Box>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [-1, -1, -1, -1, -1, -1],
          isCorrect: false,
        },
      ],
    },
  ];

  const [clickedCoinIndex, setClickedCoinIndex] = useState<number>(-1);

  const handelClickCoin = (index: number) => {
    setClickedCoinIndex(index);
  };
  const handleClickCoinBox = (index: number) => {
    const newCoinBox = [...cardData.p01.answer];
    newCoinBox[index] = clickedCoinIndex;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer: newCoinBox } }));
    changeData('P01', 1, 1, newCoinBox);

    setClickedCoinIndex(-1);
  };

  const setSubmitBtnColor = () => {
    if (cardData.p01.answer && cardData.p01.answer.every(val => val !== -1)) {
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
    if (cardData.p01.answer.every(val => val !== -1)) return false;
    else return true;
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleSubmit = () => {
    const isCorrect =
      cardData.p01.answer.every(val => val !== -1) && cardData.p01.answer.filter(item => item !== -1).length === cardData.p01.solution;

    setCardData(prev => ({ ...prev, p01: { ...prev.p01, isSubmitted: true, isCorrect: isCorrect } }));
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER_LIST',
            value: cardData.p01.answer,
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
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p01.answer,
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
      vAlign='flex-start'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={setSubmitDisabled()}
      useExtend
      useRound
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        <Box display='flex' justifyContent='center'>
          <Box marginTop={40} marginRight={20} position='relative'>
            <Image src='/A04/0002/05/MC31402.png' alt='십의 모형이 한 줄당 3 개씩 2개의 줄이 있습니다.' width='380px' height='150px' />
            <Box position='absolute' gridTemplateColumns={'repeat(3, 1fr)'} top={6} left={83} display='grid' gap={17} width={200}>
              {cardData.p01.answer.map((value, index = 1) => (
                <CoinBoxButton
                  key={index}
                  type='button'
                  onClick={() => handleClickCoinBox(index)}
                  aria-label={`${index + 1}번째 파란색 십의 모형` + (value !== -1 ? ', 빨간색 십의 모형이 붙여짐' : '')}
                >
                  {value !== -1 && <Image src={'/A04/0002/05/MC31402-2.png'} type={EImageType.IMG} width='60px' height='60px' />}
                </CoinBoxButton>
              ))}
            </Box>
          </Box>
          <Box>
            <Image src='/A04/0002/05/A-EM31-040002-0501-3.png' alt='십 모형 막대기는 십의 모형으로 나타낼 수 있어요.' width='270px' height='320px' />
          </Box>
        </Box>

        <Box hAlign='center' border='2.5px solid var(--color-red-300)' borderRadius='16px' width={600} height={100} marginTop={-40}>
          {Array(6)
            .fill('')
            .map((__, index) => (
              <CoinButton
                type='button'
                aria-label={
                  `${index + 1}번째 빨간색 십의 모형` +
                  (clickedCoinIndex === index ? ', 선택됨' : cardData.p01.answer.includes(index) ? ', 선택 불가능' : ', 선택 가능')
                }
                title='엔터키를 입력하고 비어져있는 파란색 십의 모형을 선택해주세요.'
                key={index}
                onClick={() => handelClickCoin(index)}
                backgroundSrc={imageSrcHref}
                disabled={cardData.p01.isSubmitted || cardData.p01.answer.includes(index)}
                state={cardData.p01.answer.includes(index) ? 'disabled' : clickedCoinIndex === index ? 'active' : undefined}
              />
            ))}
        </Box>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' marginTop={50} height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'답안'} />
            </Box>
            <Box marginTop={10}>
              <Box marginTop={10} marginRight={20} position='relative'>
                <Image src='/A04/0002/05/MC31402.png' alt='십의 모형이 한 줄당 3 개씩 2개의 줄이 있습니다.' width='380px' height='150px' />
                <Box position='absolute' gridTemplateColumns={'repeat(3, 1fr)'} top={6} left={83} display='grid' gap={17} width={200}>
                  {Array(6)
                    .fill('')
                    .map((__, index) => (
                      <CoinBoxButton key={index} type='button' aria-label={`${index + 1}번째 빨간색 십의 모형`}>
                        <Image src={'/A04/0002/05/MC31402-2.png'} type={EImageType.IMG} width='60px' height='60px' />
                      </CoinBoxButton>
                    ))}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box marginTop='48px'>
            <Box>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
            </Box>
            <Box marginTop={15} display='flex'>
              <Box marginLeft={12} marginTop={-6}>
                <Image src='/A04/0002/05/MC31402-2.png' alt='십의 모형' width='40px' height='40px' />
              </Box>
              을 3개씩 2번 놓습니다.
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const CoinBoxButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;

const PocketCoinButton = styled.button<{ backgroundSrc?: string }>`
  background: url(${({ backgroundSrc }) => `"${backgroundSrc}"`}) center center no-repeat;
  background-size: 58px;

  width: 58px;
  height: 58px;
`;

const CoinButton = styled(PocketCoinButton)<{ state?: 'active' | 'disabled' }>`
  width: 65px;
  height: 65px;
  padding: 40px;
  border-radius: 50%;

  ${({ state }) =>
    state === 'active' &&
    `
      border: 2px solid #1e6efa;
      background-color: #f4f8ff;
    `}

  ${({ state }) =>
    state === 'disabled' &&
    `
      opacity : 20%;
    `}
`;

export default P01;
