import { useState, ChangeEvent, useEffect } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  BoxWrap,
  EStyleButtonTypes,
  ESvgType,
  IQuestionProps,
  Image,
  Input,
  Label,
  List,
  InputStatus,
  SvgIcon,
  TMainHeaderInfoTypes,
  Typography,
  BottomSheet,
  Tag,
  ETagLine,
  OverlayTooltip,
  EImageType,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { isAnswer, getMarking } from '@maidt-cntn/util/CommonUtil';
import usePageData from '@/hooks/usePageData';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { A01_0006_04_store } from './store';
import { studentAtom } from '@/stores/student';

import math_x from '../../../../assets/icon/math_x.svg';
import figure1 from '@maidt-cntn/assets/icons/figure_1.svg';
import figure10 from '@maidt-cntn/assets/icons/figure_10.svg';
import figure100 from '@maidt-cntn/assets/icons/figure_100.svg';
import selectedFigure1 from '@maidt-cntn/assets/icons/selected_figure_1.svg';
import selectedFigure10 from '@maidt-cntn/assets/icons/selected_figure_10.svg';
import selectedFigure100 from '@maidt-cntn/assets/icons/selected_figure_100.svg';
import math_x_icon from '../../../../assets/icon/math_X_icon.svg';
import { css } from '@emotion/react';
import { IBoxData, ImgBox, getImg } from '@maidt-cntn/math/pages/EM-008-01';
import bubbleTail from '@maidt-cntn/assets/icons/bubble_tail.svg';

const PAGE_NUMBER = 'P02';
const PAGE_KEY = 'p02';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const { userId } = useRecoilValue(studentAtom);
  const [cardData, setCardData] = useRecoilState(A01_0006_04_store);

  const [isShow, setShow] = useState(false);
  const submitLabel = cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitDisabled = cardData[PAGE_KEY].data.some(data => data.answer === '');
  const submitBtnColor = !submitDisabled
    ? cardData[PAGE_KEY].isSubmitted
      ? isShow
        ? EStyleButtonTypes.GRAY
        : EStyleButtonTypes.YELLOW
      : EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '오후에 심을 나무 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='#969590' />
        <Box>
          수 모형 325에서 168만큼&nbsp;
          <SvgIcon type={ESvgType.IMG} src={math_x} alt='X' width='30px' height='25px' />표 하고 남은 수 모형이 몇 개인지 알아보세요.
        </Box>
      </>
    ),
    mark: getMarking(cardData[PAGE_KEY].isSubmitted, cardData[PAGE_KEY].isCorrect),
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

  const upperData: IBoxData[][] = [
    [
      { count: 3, ariaLabel: '백 모형' },
      { count: 2, ariaLabel: '십 모형' },
      { count: 5, ariaLabel: '일 모형' },
    ],
    [
      { count: 3, ariaLabel: '백 모형' },
      { count: 1, ariaLabel: '십 모형' },
      { count: 15, ariaLabel: '일 모형' },
    ],
  ];

  const data = [
    { title: '백 모형', color: 'var(--color-green-200)', count: 2, img: figure100, selectdImg: selectedFigure100 },
    { title: '십 모형', color: 'var(--color-pink-200)', count: 4, img: figure10, selectdImg: selectedFigure10 },
    { title: '일 모형', color: 'var(--color-blue-200)', count: 4, img: figure1, selectdImg: selectedFigure1 },
  ];
  const imageSize = ['140px', '110px', '20px'];

  const [showXArray, setShowXArray] = useState(data.map(item => [...Array(item.count)].map(() => false)));

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

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUMBER)?.pageId;

    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      const newData = cardData[PAGE_KEY].data.map((data, index) => {
        return { ...data, answer: userSubmissionList[0]?.inputData[index].value || cardData[PAGE_KEY].data[index].answer };
      });

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            data: [...newData],
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
      }
      initData(PAGE_NUMBER, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (cardData[PAGE_KEY].isSubmitted) {
      setShow(prev => !prev);
      return;
    }

    const result = cardData[PAGE_KEY];

    const isCorrect1 = isAnswer(result.data[0].answer.trim(), result.data[0].solution);
    const isCorrect2 = isAnswer(result.data[1].answer.trim(), result.data[1].solution);
    const isCorrect3 = isAnswer(result.data[2].answer.trim(), result.data[2].solution);
    const allCorrect = isCorrect1 && isCorrect2 && isCorrect3;

    setCardData(prev => ({
      ...prev,
      [PAGE_KEY]: {
        ...prev[PAGE_KEY],
        isSubmitted: true,
        isCorrect: allCorrect,
      },
    }));

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: result.data[0].answer,
            isAnswer: true,
            isCorrect: isCorrect1,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: result.data[1].answer,
            isAnswer: true,
            isCorrect: isCorrect2,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: result.data[2].answer,
            isAnswer: true,
            isCorrect: isCorrect3,
          },
        ],
        isCorrect: allCorrect,
      },
    ];
    submitDataWithResult(PAGE_NUMBER, userSubmission, true);
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const subKey = Number(name.split('_')[1]);

    const newData = [...cardData[PAGE_KEY].data];
    newData[subKey] = {
      ...newData[subKey],
      answer: value,
    };

    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], data: newData } }));
    changeData(PAGE_NUMBER, 1, subKey + 1, value);
  };

  const onClickFigure = (colIndex: number, rowIndex: number) => {
    setShowXArray(prev => {
      const currentXArray = prev.map(row => [...row]);
      currentXArray[colIndex][rowIndex] = !currentXArray[colIndex][rowIndex];
      return currentXArray;
    });
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
      useRound
      submitDisabled={submitDisabled}
      submitBtnColor={submitBtnColor}
      vAlign='flex-start'
    >
      <Box position='absolute' top={0} right={15}>
        <Box position='absolute' left={-3}>
          <OverlayTooltip type='cloud' place='top'>
            십 모형 1개에 <br /> 6개를 뺄 수 없어요.
          </OverlayTooltip>
        </Box>
        <Image type={EImageType.IMG_BG} src='/A01/0007/04/0402_02.png' size='170px' />
      </Box>
      <Box position='absolute' top={80} left={10}>
        <Box position='absolute' left={-3}>
          <OverlayTooltip type='cloud' place='top'>
            일 모형 5개에서
            <br />
            8개를 뺄 수 없어요.
          </OverlayTooltip>
        </Box>
        <Image type={EImageType.IMG_BG} src='/A01/0007/04/0402_01.png' width='170px' height='179px' />
      </Box>

      <Box width='678px' margin='0 auto' vAlign='center' flexDirection='column'>
        <Box position='absolute' zIndex={3} left={198} top={202}>
          <Image type={EImageType.IMG_BG} src={'/A01/0006/04/A0100060402_1.png'} width='200px' height='51px' />
        </Box>
        <Box position='absolute' left={430} top={44}>
          <Image type={EImageType.IMG_BG} src={'/A01/0007/04/A0100070402_1.png'} width='200px' height='27px' />
        </Box>

        <List data={upperData}>
          {({ value }) => (
            <>
              <BoxWrap width='auto'>
                {value?.map((item, index) => (
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
            </>
          )}
        </List>

        <Box position='absolute' bottom={-175} left={11}>
          <Image src='/A01/0007/04/0402_03.png' alt='168만큼 X표 해 봐요.' width='150px' />
        </Box>
        <BoxWrap marginBottom='24px' width='auto'>
          {data.map((item, colIndex) => {
            return (
              <Box key={colIndex} width='210px'>
                <Box type='line' useRound height='160px' padding='8px' hAlign='center' flexDirection={colIndex === 2 ? 'row' : 'column'} gap='4px'>
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
            );
          })}
        </BoxWrap>

        <Box hAlign='center'>
          <List
            data={data}
            align='horizontal'
            gap={24}
            row={({ value, index = 1 }) => {
              return (
                <Box key={index} width='100%' height='100%'>
                  <Box backgroundColor={value?.color} marginBottom='4px' padding='12px 0' textAlign='center' borderRadius='8px'>
                    {value?.title}
                  </Box>
                  <Box
                    borderRadius='8px'
                    width='210px'
                    background='white'
                    hAlign='center'
                    padding='8px 16px'
                    border='1px solid var(--color-grey-400)'
                  >
                    <Input
                      width='52px'
                      name={'input_' + (index - 1)}
                      onChange={handleInputChangeEvent}
                      value={cardData[PAGE_KEY].data[index - 1]?.answer}
                      ariaLabel={value?.title + ' 개수'}
                      readOnly={cardData[PAGE_KEY].isSubmitted}
                      status={
                        cardData[PAGE_KEY].isSubmitted && !cardData[PAGE_KEY].isCorrect
                          ? InputStatus.ERROR
                          : cardData[PAGE_KEY].data[index - 1].answer
                          ? InputStatus.ENABLE
                          : InputStatus.DEFAULT
                      }
                    />
                    <Typography>개</Typography>
                  </Box>
                </Box>
              );
            }}
          />
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
              <Typography>{cardData[PAGE_KEY].data.map(t => t.solution).join(', ')}</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='해설' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography>- 백 모형 1개를 십 모형 10개로 바꾸었으므로 백 모형 2개 중에서 1개에 X표 합니다.</Typography>
              <Typography>
                - 십 모형 1개는 일 모형 10개로 바꾸고, 백 모형 1개를 십 모형 10개로 바꾸었으므로 십 모형 11개 중에서 6개에 X표 합니다.
              </Typography>
              <Typography>- 일 모형 15개 중에서 8개에 X표 합니다.</Typography>
              <Typography>- X표 하고 남은 수 모형은 백 모형이 1개, 십 모형이 5개, 일 모형이 7개입니다.</Typography>
            </Box>
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
