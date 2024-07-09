import { ChangeEvent, useEffect } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  EImageType,
  EStyleFontSizes,
  ESvgType,
  IQuestionProps,
  Image,
  Input,
  InputStatus,
  Label,
  OverlayTooltip,
  SvgIcon,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import fox from '../../../../assets/example/EM-008/fox.png';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageIdsAtom } from '@/stores/page';
import { A01_0004_04 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import EM00801, { IBoxData, ImgBox } from '@maidt-cntn/math/pages/EM-008-01';
import figure1 from '@maidt-cntn/assets/icons/figure_1.svg';
import figure10 from '@maidt-cntn/assets/icons/figure_10.svg';
import figure100 from '@maidt-cntn/assets/icons/figure_100.svg';

const P02 = () => {
  const { changeData, initData, submitDataWithResult, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(A01_0004_04);
  const { userId } = useRecoilValue(studentAtom);

  const pageNumber = 'P02';
  const pageKey = 'p02';

  const checkIsCorrect = (isCorrect: boolean[]) => {
    return Array.isArray(isCorrect) ? isCorrect.every(value => value) : isCorrect;
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'icon',
    iconType: 'search',
    headerText: '필요한 블록 수 구하기',
  };

  const questionInfo: IQuestionProps = {
    type: 'icon',
    text: (
      <>
        <Label value='ㄴ' color='var(--color-white)' background='var(--color-grey-600)' />수 모형이 모두 몇 개인지 알아보세요.
      </>
    ),
    mark: cardData[pageKey].isSubmitted ? (checkIsCorrect(cardData[pageKey].isCorrect) ? 'correct' : 'incorrect') : 'none',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'NUMBER',
          value: cardData[pageKey].answer.value1,
          isAnswer: true,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: cardData[pageKey].answer.value2,
          isAnswer: true,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: cardData[pageKey].answer.value3,
          isAnswer: true,
        },
      ],
    },
  ];

  const submitAnswer = (state: boolean[]) => {
    setCardData(prev => ({ ...prev, [pageKey]: { ...prev[pageKey], isSubmitted: true, isCorrect: state } }));
    const isCorrect = state.every(val => val);
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'NUMBER',
            value: cardData[pageKey].answer.value1,
            isAnswer: true,
            isCorrect: state[0],
          },
          {
            subKey: 2,
            type: 'NUMBER',
            value: cardData[pageKey].answer.value2,
            isAnswer: true,
            isCorrect: state[1],
          },
          {
            subKey: 3,
            type: 'NUMBER',
            value: cardData[pageKey].answer.value3,
            isAnswer: true,
            isCorrect: state[2],
          },
        ],
        isCorrect,
      },
    ];
    submitDataWithResult(pageNumber, userSubmission, isCorrect);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [pageKey]: {
            ...prev[pageKey],
            answer:
              {
                value1: userSubmissionList[0].inputData[0]?.value,
                value2: userSubmissionList[0].inputData[1]?.value,
                value3: userSubmissionList[0].inputData[2]?.value,
              } || cardData[pageKey].answer,
            isSubmitted,
            isCorrect: isSubmitted
              ? [
                  userSubmissionList[0].inputData[0]?.isCorrect,
                  userSubmissionList[0].inputData[1]?.isCorrect,
                  userSubmissionList[0].inputData[2]?.isCorrect,
                ]
              : [false, false, false],
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleInputChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInputs = {
      ...cardData[pageKey].answer,
      [name]: value,
    };
    setCardData(prev => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        answer: userInputs,
      },
    }));
    changeData(pageNumber, 1, Number(name.slice(-1)), value);
  };

  const inputNodes = [
    <Box key={1} width='100%' height='100%'>
      <Box backgroundColor='var(--color-green-200)' marginBottom='4px' padding='12px 0' textAlign='center' borderRadius='8px'>
        백 모형
      </Box>
      <Box borderRadius='8px' width='210px' background='white' hAlign='center' padding='8px 16px' border='1px solid var(--color-grey-400)'>
        <Input
          type='number'
          name='value1'
          width='52px'
          value={cardData[pageKey].answer.value1}
          readOnly={cardData[pageKey].isSubmitted}
          status={
            cardData[pageKey].isSubmitted
              ? !cardData[pageKey].isCorrect[0]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
              : !isNotEmptyString(cardData[pageKey].answer.value1)
              ? InputStatus.DEFAULT
              : InputStatus.ENABLE
          }
          onChange={handleInputChangeEvent}
          title='백 모형 개수의 답'
          maxLength={1}
        />
        <Typography>개</Typography>
      </Box>
    </Box>,
    <Box key={2} width='100%' height='100%' marginLeft='24px'>
      <Box backgroundColor='var(--color-pink-200)' marginBottom='4px' padding='12px 0' textAlign='center' borderRadius='8px'>
        십 모형
      </Box>
      <Box borderRadius='8px' width='210px' background='white' hAlign='center' padding='8px 16px' border='1px solid var(--color-grey-400)'>
        <Input
          type='number'
          name='value2'
          width='52px'
          value={cardData[pageKey].answer.value2}
          readOnly={cardData[pageKey].isSubmitted}
          status={
            cardData[pageKey].isSubmitted
              ? !cardData[pageKey].isCorrect[1]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
              : !isNotEmptyString(cardData[pageKey].answer.value2)
              ? InputStatus.DEFAULT
              : InputStatus.ENABLE
          }
          onChange={handleInputChangeEvent}
          title='십 모형 개수의 답'
          maxLength={1}
        />
        <Typography>개</Typography>
      </Box>
    </Box>,
    <Box key={3} width='100%' height='100%' marginLeft='24px'>
      <Box backgroundColor='var(--color-blue-200)' marginBottom='4px' padding='12px 0' textAlign='center' borderRadius='8px'>
        일 모형
      </Box>
      <Box borderRadius='8px' width='210px' background='white' hAlign='center' padding='8px 16px' border='1px solid var(--color-grey-400)'>
        <Input
          type='number'
          name='value3'
          width='52px'
          value={cardData[pageKey].answer.value3}
          readOnly={cardData[pageKey].isSubmitted}
          status={
            cardData[pageKey].isSubmitted
              ? !cardData[pageKey].isCorrect[2]
                ? InputStatus.ERROR
                : InputStatus.ENABLE
              : !isNotEmptyString(cardData[pageKey].answer.value3)
              ? InputStatus.DEFAULT
              : InputStatus.ENABLE
          }
          onChange={handleInputChangeEvent}
          title='일 모형 개수의 답'
          maxLength={1}
        />
        <Typography>개</Typography>
      </Box>
    </Box>,
  ];

  const topFigureData: IBoxData[] = [
    { count: 2, ariaLabel: '백 모형' },
    { count: 5, ariaLabel: '십 모형' },
    { count: 5, ariaLabel: '일 모형' },
    { count: 3, ariaLabel: '백 모형' },
    { count: 7, ariaLabel: '십 모형' },
    { count: 8, ariaLabel: '일 모형' },
  ];
  const getImg = (ariaLabel: string) => {
    switch (ariaLabel) {
      case '백 모형':
        return figure100;
      case '십 모형':
        return figure10;
      case '일 모형':
        return figure1;
    }
  };
  const topFigureNode = (
    <Box vAlign='center' flexDirection='column' position='relative' marginTop='10px'>
      <FoxSpeak>
        <OverlayTooltip type='cloud' place='top'>
          <Typography size={EStyleFontSizes['X-SMALL']} width='100%' align='center' useGap={false} usePre>
            일 모형 10개를 <br />
            십 모형 1개로 바꾸고, <br />
            십 모형 10개를 <br />백 모형 1개로 바꿔요.
          </Typography>
        </OverlayTooltip>
      </FoxSpeak>
      <Box display='flex' position='absolute' right={211} top={-17}>
        <Image type={EImageType.IMG_BG} src={'/A01/0004/04/A0100040402_1.png'} width='225px' height='267px' />
        <Box marginLeft='14px'>
          <Image type={EImageType.IMG_BG} src={'/A01/0004/04/A0100040402_2.png'} width='210px' height='235px' />
        </Box>
      </Box>
      <Box width='680px' display='grid' gridTemplateColumns='1fr 1fr 1fr' rowGap='8px' columnGap='24px'>
        {topFigureData.map((item, index) => (
          <Box key={index} type='line' useFull hAlign='center' borderRadius='16px' minHeight='116px' padding='8px 0'>
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
      </Box>
    </Box>
  );

  useEffect(() => {
    return () => {
      saveData(pageNumber);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  const figureData: IBoxData[] = [
    { count: 6, ariaLabel: '백 모형' },
    { count: 3, ariaLabel: '십 모형' },
    { count: 4, ariaLabel: '일 모형' },
  ];

  return (
    <EM00801
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      inputNodes={inputNodes}
      topFigureNode={topFigureNode}
      figureData={figureData}
      inputs={cardData[pageKey].answer}
      answer={cardData[pageKey].solution}
      commentary={cardData[pageKey].commentary}
      submitted={cardData[pageKey].isSubmitted}
      onSubmit={submitAnswer}
    />
  );
};

const FoxSpeak = styled.div`
  position: absolute;
  top: 85px;
  right: 10px;

  display: block;
  background: url(${fox}) bottom center no-repeat;
  height: 225px;
  width: 192px;
`;

export default P02;
