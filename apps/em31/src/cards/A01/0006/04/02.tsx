import {
  Box,
  BoxWrap,
  ESvgType,
  IQuestionProps,
  Input,
  Label,
  List,
  SvgIcon,
  Image,
  TMainHeaderInfoTypes,
  Typography,
  EStyleButtonTypes,
  BottomSheet,
  ETagLine,
  Tag,
  EImageType,
  OverlayTooltip,
} from '@maidt-cntn/ui';
import math_x from '@maidt-cntn/assets/icons/checkSymbol_X.svg';
import figure1 from '@maidt-cntn/assets/icons/figure_1.svg';
import figure10 from '@maidt-cntn/assets/icons/figure_10.svg';
import figure100 from '@maidt-cntn/assets/icons/figure_100.svg';
import selectedFigure1 from '@maidt-cntn/assets/icons/selected_figure_1.svg';
import selectedFigure10 from '@maidt-cntn/assets/icons/selected_figure_10.svg';
import selectedFigure100 from '@maidt-cntn/assets/icons/selected_figure_100.svg';
import { useEffect, useState } from 'react';
import { Container } from '@maidt-cntn/ui/math';
import styled from '@emotion/styled';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { A01_0006_04 } from './store';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import math_x_icon from '../../../../assets/icon/math_X_icon.svg';
import bubbleTail from '@maidt-cntn/assets/icons/bubble_tail.svg';
import { css } from '@emotion/react';
import { IBoxData, ImgBox, getImg } from '@maidt-cntn/math/pages/EM-008-01';

const P02 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A01_0006_04);
  const [isShow, setShow] = useState<boolean>(false);

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: (
      <Typography color='var(--color-yellow-500)' weight='bold'>
        남은 책 수 구하기
      </Typography>
    ),
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='var(--color-grey-600)' />
        <Box fontWeight='var(--font-weight-medium)'>
          수 모형 317에서 172만큼&nbsp;
          <SvgIcon type={ESvgType.IMG} src={math_x} alt='X' width='32px' height='32px' />표 하고 남은 수 모형이 몇 개인지 알아보세요.
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

  const foxImage = '/A01/0006/04/EM-021-01.png';
  const instructionImage = '/A01/0006/04/EM-008-02.png';
  const imageSize = ['175px', '140px', '25px'];

  const upperData: IBoxData[] = [
    { count: 3, ariaLabel: '백 모형' },
    { count: 1, ariaLabel: '십 모형' },
    { count: 7, ariaLabel: '일 모형' },
  ];

  const data = [
    { title: '백 모형', color: 'var(--color-green-200)', count: 2, img: figure100, selectdImg: selectedFigure100 },
    { title: '십 모형', color: 'var(--color-pink-200)', count: 11, img: figure10, selectdImg: selectedFigure10 },
    { title: '일 모형', color: 'var(--color-blue-200)', count: 7, img: figure1, selectdImg: selectedFigure1 },
  ];

  const [showXArray, setShowXArray] = useState(data.map(item => [...Array(item.count)].map(() => false)));

  const onClickFigure = (colIndex: number, rowIndex: number) => {
    setShowXArray(prev => {
      const currentXArray = prev.map(row => [...row]);
      currentXArray[colIndex][rowIndex] = !currentXArray[colIndex][rowIndex];
      return currentXArray;
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const newData = cardData.p02.data.map((data, index) => {
        return { ...data, answer: userSubmissionList[0]?.inputData[index].value || cardData.p02.data[index].answer };
      });
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            data: [...newData],
            isSubmitted,
          },
        }));
        initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
      }
    }
  };

  const handleChange = (subKey: number, value: string) => {
    const newData = [...cardData.p02.data];
    newData[subKey] = {
      ...newData[subKey],
      answer: value,
    };
    setCardData(prev => ({ ...prev, p02: { ...prev.p02, data: newData } }));
    changeData('P02', 1, subKey + 1, value);
  };

  const submitAnswer = () => {
    if (cardData.p02.isSubmitted) setShow(!isShow);
    else {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, isSubmitted: true } }));
      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXT',
              value: cardData.p02.data[0].answer,
              isAnswer: true,
              isCorrect: true,
            },
            {
              subKey: 2,
              type: 'TEXT',
              value: cardData.p02.data[1].answer,
              isAnswer: true,
              isCorrect: true,
            },
            {
              subKey: 3,
              type: 'TEXT',
              value: cardData.p02.data[2].answer,
              isAnswer: true,
              isCorrect: true,
            },
          ],
          isCorrect: true,
        },
      ];
      submitData('P02', userSubmission);
    }
  };

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) init();
  }, [pageIds]);

  useEffect(() => {
    if (cardData.p02.data[0].answer !== '' && cardData.p02.data[1].answer !== '' && cardData.p02.data[2].answer !== '') {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, disabled: false } }));
    } else if (!cardData.p02.isSubmitted) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, disabled: true } }));
    }
  }, [cardData.p02.data[0].answer, cardData.p02.data[1].answer, cardData.p02.data[2].answer]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={submitAnswer}
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={cardData.p02.disabled}
      submitBtnColor={cardData.p02.disabled ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      useRound
    >
      <Box vAlign='center' flexDirection='column' useFull>
        <Box position='absolute' top={130} right={80} zIndex={1}>
          <Box position='absolute' top={-33} left={-65}>
            <OverlayTooltip type='cloud' place='top'>
              십모형 1개에 7을 뺄 수 없을 때에는 <br />
              백모형 1개를 십모형 10개로 바꿔요.
            </OverlayTooltip>
          </Box>
          <Image type={EImageType.IMG_BG} src={foxImage} width='160px' height='170px' />
        </Box>
        <Box position='absolute' zIndex={3} left={198} top={22}>
          <Image type={EImageType.IMG_BG} src={'/A01/0006/04/A0100060402_1.png'} width='200px' height='51px' />
        </Box>
        <BoxWrap width='auto'>
          {upperData.map((item, index) => (
            <Box key={index} width='210px' type='line' useFull hAlign='center' borderRadius='16px' minHeight='116px' padding='8px 0'>
              <ImgBox role='img' aria-label={item.ariaLabel + item.count + '개'} ariaLabel={item.ariaLabel}>
                {[...Array(item.count)].map((__, index) => (
                  <Box display='flex'>
                    <SvgIcon
                      type={ESvgType.IMG}
                      zIndex={item.ariaLabel === '백 모형' ? item.count - index : 0}
                      src={getImg(item.ariaLabel)}
                      alt=''
                      ariaHidden
                      size='100%'
                    />
                  </Box>
                ))}
              </ImgBox>
            </Box>
          ))}
        </BoxWrap>
        <Box margin='10px 0 7px 0' hAlign='center' width='100%'>
          <SvgIcon src={bubbleTail} width='100%' height='45px' />
        </Box>
        <BoxWrap marginBottom='24px' width='auto' position='relative' minHeight='fit-content'>
          <Box marginTop='100px' position='absolute' left={-150}>
            <Image src={instructionImage} alt='172만큼 X표 해 봐요.' width='150px' />
          </Box>
          {data.map((item, colIndex) => {
            return (
              <Box key={colIndex} width='210px' height='100%'>
                <Box type='line' useRound height='100%' padding='8px 25px' hAlign='center'>
                  <Box display='flex' flexWrap='wrap' gap='4px' flexDirection={colIndex === 2 ? 'row' : 'column'}>
                    {Array(item.count)
                      .fill(null)
                      .map((_, index) => (
                        <Button
                          key={index}
                          onClick={() => onClickFigure(colIndex, index)}
                          isClick={showXArray[colIndex][index]}
                          index={colIndex}
                          aria-label={
                            showXArray[colIndex][index] ? `선택된 ${index + 1}번째 ${item.title} 한 개` : `${index + 1}번째 ${item.title} 한 개`
                          }
                        >
                          <SvgIcon
                            type={ESvgType.IMG}
                            src={showXArray[colIndex][index] ? item.selectdImg : item.img}
                            alt=''
                            ariaHidden
                            width={imageSize[colIndex]}
                          />
                        </Button>
                      ))}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </BoxWrap>
        <Box hAlign='center'>
          <List
            data={data}
            align='horizontal'
            gap={24}
            row={({ value, index = 1 }) => (
              <Box key={index} width='100%' height='100%'>
                <Box backgroundColor={value?.color} marginBottom='4px' padding='12px 0' textAlign='center' borderRadius='8px'>
                  {value?.title}
                </Box>
                <Box borderRadius='8px' width='210px' background='white' hAlign='center' padding='8px 16px' border='1px solid var(--color-grey-400)'>
                  <Input
                    width='52px'
                    onChange={e => handleChange(index - 1, e.target.value)}
                    value={cardData.p02.data[index - 1]?.answer}
                    ariaLabel={value?.title + ' 개수의 답'}
                    maxLength={1}
                    readOnly={cardData.p02.isSubmitted}
                  />
                  <Typography style={{ paddingRight: 0 }}>개</Typography>
                </Box>
              </Box>
            )}
          />
        </Box>
      </Box>
      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {cardData.p02.data[0].solution}, {cardData.p02.data[1].solution}, {cardData.p02.data[2].solution}
          </Box>
          <Box marginTop='12px'>
            <Tag type={ETagLine.GREEN} label='해설' />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{`- 백 모형 1개를 십 모형 10개로 바꾸었으므로 백 모형 2개 중에서 1개에 X표 합니다.`}</Typography>
            <Typography usePre>
              {`- 십 모형 11개 중에서 7개에 X표 합니다.\n- 일 모형 7개 중에서 2개에 X표 합니다.\n- X표 하고 남은 수 모형은 백 모형이 1개, 십 모형이 4개, 일 모형이 5개입니다.`}
            </Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const Button = styled.button<{ isClick: boolean; index: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px;

  ${({ isClick }) => isClick && 'outline: 2px solid var(--color-red-700)'};
  ${({ index }) => (index === 2 ? 'border-radius: 4px' : 'border-radius: 8px; width: 100%')};

  ::after {
    ${({ isClick }) => isClick && `content : ''`};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background: url(${math_x_icon}) center center no-repeat;
    background-size: 100%;
    ${({ index }) => {
      switch (index) {
        case 0:
          return css`
            width: 26px;
            height: 26px;
          `;
        case 1:
          return css`
            width: 20px;
            height: 20px;
          `;
        case 2:
          return css`
            width: 11px;
            height: 11px;
          `;
      }
    }};
  }
`;

export default P02;
