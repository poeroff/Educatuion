import { Container } from '@maidt-cntn/ui/en';
import {
  Box,
  PinchZoom,
  Image,
  Radio,
  IQuestionProps,
  IAudioPlayerProps,
  Tag,
  Label,
  Drawing,
  Typography,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  ETagLine,
  BottomSheet,
  // Writing,
} from '@maidt-cntn/ui';

import { useCallback, useEffect, useState } from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { TContentInfo, TSolutionData } from '@/types/contentInfo';
import { correctDataType, initDataType } from '@maidt-cntn/api';
import GradeCheck from '@/components/gradeCheck';

type IListenAndAnswer = {
  title: string;
};

type INITIAL = {
  isComplete: boolean;
  isCorrect: boolean | undefined;
  isValue: number[];
};

type TPageData = {
  pageNumber: number;
  mainKey: number;
  subKey: string;
  getDefaultData: (pageNumber: number) => initDataType;
  getCorrectData: (pageNumber: number) => correctDataType[];
  getSolutionData: (pageNumber: number) => TSolutionData[];
};

interface Props {
  layout: {
    headerInfo: TMainHeaderInfoTypes;
    hQuestionInfo: IQuestionProps;
    srtFile?: string;
    audioInfo?: IAudioPlayerProps;
  };
  pageData: TPageData;
  contentInfo: TContentInfo<'img', 'text'>;
}

const backgroundImage = {
  src: '/writing.png',
  alt: '판서',
};

const EEL01C03A03P01 = ({ layout, pageData, contentInfo }: Props) => {
  const CONST = { ...layout };
  const { pageNumber, mainKey, subKey, getDefaultData, getCorrectData, getSolutionData } = pageData;
  const { questionInfo, answerInfo } = contentInfo;

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const [INITIAL, setINITIAL] = useState<INITIAL>({
    isComplete: false,
    isCorrect: undefined,
    isValue: [],
  });

  // const [selectedIndex, setSelectedIndex] = useState<number[] | null>(Number(getValueInputData(mainKey, subKey)));
  const [solutionData] = useState<TSolutionData>(getSolutionData(pageNumber)[0]);

  const [selectedIndex, setSelectedIndex] = useState<number[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeInputData = (mainKey: number, subKey: string, value: number[]) => {
    changeInputData(mainKey, subKey, value);
    setSelectedIndex(value);
  };

  const onHandler = (index: number) => {
    let newSelectedIndex = selectedIndex !== null ? [...selectedIndex] : [];
    if (newSelectedIndex.includes(index)) {
      newSelectedIndex = newSelectedIndex.filter(i => i !== index);
    } else {
      newSelectedIndex.push(index);
    }
    handleChangeInputData(mainKey, subKey, newSelectedIndex);
  };

  const getCorrectAnswer = useCallback(
    (pageNumber: number, mainKey: number, subKey: string) => {
      const data = getCorrectData(pageNumber).find(item => item.mainKey === mainKey);
      if (data) {
        return data?.inputDatas?.flat().find(item => item.subKey === subKey)?.value;
      }
      return null;
    },
    [getCorrectData],
  );

  const completeQnA = () => {
    if (!INITIAL.isComplete) {
      gradeSubmitPageData();
      return;
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setINITIAL({
      isComplete: isSubmittedInput(mainKey, subKey),
      isCorrect: getCorrectAnswer(pageNumber, mainKey, subKey) === getValueInputData(mainKey, subKey),
      isValue: getValueInputData(mainKey, subKey) as number[],
    });
  }, [getCorrectAnswer, getValueInputData, isSubmittedInput, mainKey, pageNumber, subKey]);

  useEffect(() => {
    if (selectedIndex) {
      document.querySelectorAll('input[type="radio"]').forEach((el, index) => {
        if (selectedIndex.includes(index + 1)) {
          (el as HTMLInputElement).checked = true;
        } else {
          (el as HTMLInputElement).checked = false;
        }
      });
    }
  }, [selectedIndex]);

  const radioButtonList = (items: IListenAndAnswer[], startIndex: number) => (
    <Box display='flex' gap={80}>
      {items.map((item, index) => {
        const idx = startIndex + index;
        return (
          <Box key={index} width='50px' height='86px' gap={8} display='flex' flexDirection='column' alignItems='center'>
            <Label type={'paint'} value={item.title} background='#E2F2FF' />
            <Radio
              type='circle'
              align='vertical'
              name={`radio-group-${idx}`}
              value={selectedIndex?.includes(idx) === getValueInputData(mainKey, subKey)}
              onClick={() => onHandler(idx)}
              disabled={INITIAL.isComplete}
            />
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      questionInfo={{
        text: (
          <span>
            {CONST.hQuestionInfo.text}
            <GradeCheck mainKey={mainKey} />
          </span>
        ),
      }}
      submitLabel={INITIAL.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={INITIAL.isValue.length === 0}
      submitBtnColor={INITIAL.isValue.length === 0 ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW}
      audioInfo={CONST.audioInfo}
      onSubmit={completeQnA}
    >
      <Box useFull>
        <Box display='flex' gap='40px' justifyContent='center' alignItems='center' margin='20px 20px 20px 40px'>
          <PinchZoom>
            <Image
              src={questionInfo.questionImgSrc}
              width='437px'
              height='355px'
              alt={questionInfo.questionImgAlt}
              title={questionInfo.questionImgTitle}
              style={{ borderRadius: '8px' }}
            />
          </PinchZoom>
          <Box width='523px' height='347px'>
            <Box width='310px' height='86px' display='flex' justifyContent='space-between' marginBottom='30px'>
              {radioButtonList(answerInfo.answerText.slice(0, 3), 1)}
            </Box>
            <Box width='310px' height='86px' display='flex' justifyContent='space-between' marginBottom='30px'>
              {radioButtonList(answerInfo.answerText.slice(3), 4)}
            </Box>
            <Box hAlign={'center'}>
              <Drawing width='500px' height='107px' image={backgroundImage} />
            </Box>
          </Box>
        </Box>
        {isOpen && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
            <Box marginBottom='25px' background='gray' padding='28px' useRound>
              <Box margin='25px 0'>
                <Tag fontSize='22px' height='auto' label='답안' type={ETagLine.GREEN} width='auto' />
                <Box margin='25px 0 50px'>
                  <Typography>{solutionData.answer}</Typography>
                </Box>
              </Box>
            </Box>
          </BottomSheet>
        )}
      </Box>
    </Container>
  );
};

export default EEL01C03A03P01;
