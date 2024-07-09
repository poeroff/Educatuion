import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  IQuestionProps,
  Image,
  Label,
  OverlayTooltip,
  TMainHeaderInfoTypes,
  EImageType,
  EStyleButtonTypes,
  BottomSheet,
  Tag,
  ETagLine,
  Typography,
} from '@maidt-cntn/ui';

import { tokenAtom } from '@maidt-cntn/stores/token';
import { getFileFromCDNWithToken } from '@maidt-cntn/util/FileUtil';
import { Container } from '@maidt-cntn/ui/math';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getMarking } from '@maidt-cntn/util/CommonUtil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import A03_0002_04 from './store';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';

const P01 = () => {
  const [isShow, setShow] = useState<boolean>(false);
  const [clickedPlantIndex, setClickedPlantIndex] = useState<number>(-1);

  const prefix = import.meta.env.VITE_CDN_PATH;
  const [imageSrcHref, setImageSrcHref] = useState<string>('');
  const [{ accessToken }] = useRecoilState(tokenAtom);

  useEffect(() => {
    setImageSrcHref(getFileFromCDNWithToken(prefix + '/A03/0002/04/image 772.png', accessToken));
  }, [accessToken, prefix]);

  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A03_0002_04);
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER_LIST',
          value: [],
          isCorrect: false,
        },
        {
          subKey: 2,
          type: 'NUMBER_LIST',
          value: [],
          isCorrect: false,
        },
      ],
    },
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    iconType: 'search',
    headerPattern: 'icon',
    headerText: '심을 수 있는 모종 수 알아보기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄱ' type='paint' background='var(--color-grey-600)' color='var(--color-white)' />
        모종 붙임딱지 6개를 2명의 텃밭에 똑같이 나누어 붙여 보세요.
      </>
    ),
    mark: getMarking(cardData.p01.isSubmitted, cardData.p01.isCorrect),
  };

  const handleClickPlant = (index: number) => {
    setClickedPlantIndex(index);
  };

  const handleClickGarden = (target: string) => {
    if (clickedPlantIndex !== -1) {
      // 텃밭에 모종 심기
      switch (target) {
        case 'answer1':
          {
            const newPlant = [...cardData.p01.answer1, clickedPlantIndex];
            setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: newPlant } }));
            changeData('P01', 1, 1, newPlant);
          }
          break;
        case 'answer2':
          {
            const newPlant = [...cardData.p01.answer2, clickedPlantIndex];
            setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: newPlant } }));
            changeData('P01', 1, 2, newPlant);
          }
          break;
      }
    } else {
      // 텃밭에서 모종 빼기
      switch (target) {
        case 'answer1':
          if (cardData.p01.answer1.length - 1 >= 0) {
            const newPlant = [...cardData.p01.answer1];
            newPlant.pop();
            setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: newPlant } }));
            changeData('P01', 1, 1, newPlant);
          }
          break;
        case 'answer2':
          if (cardData.p01.answer2.length - 1 >= 0) {
            const newPlant = [...cardData.p01.answer2];
            newPlant.pop();
            setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer2: newPlant } }));
            changeData('P01', 1, 2, newPlant);
          }
          break;
      }
    }
    setClickedPlantIndex(-1);
  };

  const setSubmitBtnColor = () => {
    if (cardData.p01.answer1.length + cardData.p01.answer2.length === 6) {
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
    if (cardData.p01.answer1.length + cardData.p01.answer2.length === 6) return false;
    else return true;
  };

  const handleShowAnswer = () => {
    setShow(!isShow);
  };

  const handleSubmit = () => {
    const isCorrect = cardData.p01.answer1.length === cardData.p01.solution1 && cardData.p01.answer2.length === cardData.p01.solution2;

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
          {
            subKey: 2,
            type: 'NUMBER_LIST',
            value: cardData.p01.answer2,
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
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer2,
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
      vAlign='start'
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      onSubmit={cardData.p01.isSubmitted ? handleShowAnswer : handleSubmit}
      submitBtnColor={setSubmitBtnColor()}
      submitDisabled={setSubmitDisabled()}
      useRound
    >
      <Box flexDirection='column' hAlign='center'>
        <BoxWrap justifyContent='center'>
          <Box position='relative'>
            <Image src='/A03/0002/04/A-EM31-030002-0401-1.png' type={EImageType.IMG} width='340px' height='183px' />
            <GardenButton
              type='button'
              aria-label={cardData.p01.answer1.length === 0 ? '1번 텃밭' : '1번 텃밭, 모종이 ' + cardData.p01.answer1.length + '개 들어있습니다'}
              onClick={() => {
                handleClickGarden('answer1');
              }}
              disabled={cardData.p01.isSubmitted}
            >
              {cardData.p01.answer1.length > 0
                ? cardData.p01.answer1.map((_, idx) => (
                    <Image key={idx} src={'/A03/0002/04/A-EM31-030002-0401-3.png'} type={EImageType.IMG} width='47px' height='52px' />
                  ))
                : ''}
            </GardenButton>
          </Box>
          <Box position='relative'>
            <Image src='/A03/0002/04/A-EM31-030002-0401-2.png' type={EImageType.IMG} width='340px' height='183px' />
            <GardenButton
              type='button'
              aria-label={cardData.p01.answer2.length === 0 ? '2번 텃밭' : '2번 텃밭, 모종이 ' + cardData.p01.answer2.length + '개 들어있습니다'}
              onClick={() => {
                handleClickGarden('answer2');
              }}
              disabled={cardData.p01.isSubmitted}
            >
              {cardData.p01.answer2.length > 0
                ? cardData.p01.answer2.map((_, idx) => (
                    <Image key={idx} src={'/A03/0002/04/A-EM31-030002-0401-3.png'} type={EImageType.IMG} width='47px' height='52px' />
                  ))
                : ''}
            </GardenButton>
          </Box>
        </BoxWrap>
        <RobotBalloon backgroundSrc={imageSrcHref}>
          <OverlayTooltip type='cloud' place='top'>
            하나씩 번갈아가며
            <br />
            붙여 보세요
          </OverlayTooltip>
        </RobotBalloon>

        <BoxWrap justifyContent='center' marginTop={24}>
          {Array(6)
            .fill('')
            .map((_, index) => (
              <Box key={index}>
                <ClickButton
                  type='button'
                  aria-label={
                    `${index + 1}번째 모종` +
                    (clickedPlantIndex === index
                      ? ', 선택됨'
                      : cardData.p01.answer1.includes(index) || cardData.p01.answer2.includes(index)
                      ? ', 선택 불가능'
                      : ', 선택 가능')
                  }
                  title='엔터키를 입력하고 원하는 텃밭을 선택해주세요.'
                  onClick={() => handleClickPlant(index)}
                  disabled={cardData.p01.isSubmitted || cardData.p01.answer1.includes(index) || cardData.p01.answer2.includes(index)}
                  state={
                    cardData.p01.answer1.includes(index) || cardData.p01.answer2.includes(index)
                      ? 'disabled'
                      : clickedPlantIndex === index
                      ? 'active'
                      : undefined
                  }
                >
                  <Image src={'/A03/0002/04/A-EM31-030002-0401-3.png'} type={EImageType.IMG} width='47px' height='52px' />
                </ClickButton>
              </Box>
            ))}
        </BoxWrap>
      </Box>

      <BottomSheet bottomSheetTargetId='targetContainer' marginTop={10} height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Box>
              <Tag type={ETagLine.GREEN} label={'답안'} />
            </Box>
            <Box marginTop={10} display='flex' title='텃밭 1개에 모종이 3개씩 있습니다.'>
              <Box>
                <Image
                  src='/A03/0002/04/A-EM31-030002-0401-1.png'
                  type={EImageType.IMG}
                  alt='텃밭 1, 모종이 3개 들어있습니다'
                  width='260px'
                  height='150px'
                />
                <Box zIndex={1} left={95} top={520} position='absolute' display='flex' gap={30}>
                  <Image src={'/A03/0002/04/A-EM31-030002-0401-3.png'} type={EImageType.IMG} width='47px' height='52px' />
                  <Image src={'/A03/0002/04/A-EM31-030002-0401-3.png'} type={EImageType.IMG} width='47px' height='52px' />
                  <Image src={'/A03/0002/04/A-EM31-030002-0401-3.png'} type={EImageType.IMG} width='47px' height='52px' />
                </Box>
              </Box>
              <Box marginLeft={20}>
                <Image
                  src='/A03/0002/04/A-EM31-030002-0401-2.png'
                  type={EImageType.IMG}
                  alt='텃밭 2, 모종이 3개 들어있습니다'
                  width='260px'
                  height='150px'
                />
                <Box zIndex={1} left={380} top={520} position='absolute' display='flex' gap={30}>
                  <Image src={'/A03/0002/04/A-EM31-030002-0401-3.png'} type={EImageType.IMG} width='47px' height='52px' />
                  <Image src={'/A03/0002/04/A-EM31-030002-0401-3.png'} type={EImageType.IMG} width='47px' height='52px' />
                  <Image src={'/A03/0002/04/A-EM31-030002-0401-3.png'} type={EImageType.IMG} width='47px' height='52px' />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box marginTop='48px'>
            <Box>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
            </Box>
            <Box marginTop={10}>
              <Typography>한 명의 텃밭에 3개씩 모종 붙임딱지를 붙입니다.</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const GardenButton = styled.button`
  position: absolute;
  height: 110px;
  width: 100%;

  bottom: 7px;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const RobotBalloon = styled.span<{ backgroundSrc?: string }>`
  position: absolute;
  right: 59px;
  top: 0;

  display: inline-block;
  height: 165px;
  width: 135px;
  background: url(${({ backgroundSrc }) => `"${backgroundSrc}"`}) bottom right no-repeat;
  background-size: 80px 75px;
`;

// 텃밭 버튼에 올라갔을 시 투명색으로 변하게 => disabled
const ClickButton = styled.button<{ state?: 'active' | 'disabled' }>`
  border-radius: 16px;
  padding: 24px 26px;
  border: 1px solid var(--color-grey-300);

  ${({ state }) =>
    state === 'active' &&
    `
      padding: 23px 25px;
      border: 2px solid #1E6EFA;
      background: var(--color-blue-50);
    `}

  ${({ state }) =>
    state === 'disabled' &&
    `
      opacity : 20%;
    `}
`;

export default P01;
