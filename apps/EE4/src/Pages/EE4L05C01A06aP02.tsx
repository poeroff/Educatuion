// import { useState } from 'react';
// import { Container } from '@maidt-cntn/ui/en';
// import { Image, BoxWrap, Box, List, Label, Typography, Radio, BottomSheet, ETagLine, Tag } from '@maidt-cntn/ui';
// import { TMainHeaderInfoTypes, EStyleButtonTypes, IAudioPlayerProps, IQuestionProps } from '@maidt-cntn/ui';
// import { useCurrentPageData } from '@/hooks/useCurrentPageData';
// import { useRecoilValue } from 'recoil';
// import { currentPageGradeData } from '@/stores';
// import { initDataType } from '@maidt-cntn/api';

// interface Props {
//   headerInfo: TMainHeaderInfoTypes;
//   questionInfo: IQuestionProps;
//   audioInfo?: IAudioPlayerProps;
//   data: { text: string }[];
//   image: { src: string; alt: string };
//   label: string[];
//   mainKey: number;
//   subKey: string;
//   getDefaultData: (pageNumber: number) => initDataType;
//   getCorrectData: (pageNumber: number) => {
//     mainKey: number;
//     inputDatas: {
//       subKey: string;
//       value: string | boolean | number | string[];
//     }[][];
//   }[];
//   getSolutionData: (pageNumber: number) => {
//     script?: { text: string }[];
//     interpretation?: { text: string }[];
//   }[];
// }

// interface CONST {
//   headerInfo: TMainHeaderInfoTypes;
//   questionInfo: IQuestionProps;
//   audioInfo?: IAudioPlayerProps;
//   label: string[];
//   data: { text: string }[];
//   image: { src: string; alt: string };
//   isValChk: boolean;
//   isCorrect: boolean | undefined;
//   isComplete: boolean;
//   isCorrectData: string | boolean | number | string[];
//   isSolutionData: { script?: { text: string }[]; interpretation?: { text: string }[] };
// }

// const EE4L06C01A06b = ({
//   headerInfo,
//   questionInfo,
//   audioInfo,
//   data,
//   label,
//   image,
//   mainKey,
//   subKey,
//   getDefaultData,
//   getCorrectData,
//   getSolutionData,
// }: Props) => {
//   const gradeData = useRecoilValue(currentPageGradeData);
//   const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
//     initData: getDefaultData(mainKey),
//     collectDatas: getCorrectData(mainKey),
//   });

//   const CONST: CONST = {
//     headerInfo: headerInfo,

//     label: label,
//     questionInfo: {
//       text: questionInfo.text,
//       mark: isSubmittedInput(mainKey, subKey)
//         ? gradeData.find(data => data.mainKey === mainKey)?.isCorrect === undefined
//           ? 'none'
//           : gradeData.find(data => data.mainKey === mainKey)?.isCorrect
//           ? 'correct'
//           : 'star'
//         : 'none',
//       markSize: 'middle',
//     },
//     data: data,
//     image: image,
//     isValChk: getValueInputData(mainKey, subKey) === '' ? true : false,
//     isCorrect: gradeData.find(data => data.mainKey === mainKey)?.isCorrect,
//     isComplete: isSubmittedInput(mainKey, subKey),
//     isCorrectData: getCorrectData(mainKey)[0].inputDatas[0][0].value,
//     isSolutionData: getSolutionData(mainKey)[0],
//   };
//   const [isOpen, setIsOpen] = useState(false);

//   const onSumbit = () => {
//     if (!CONST.isComplete) {
//       gradeSubmitPageData();
//     } else {
//       setIsOpen(!isOpen);
//     }
//   };

//   return (
//     <Container
//       bodyId='targetContainer'
//       headerInfo={CONST.headerInfo}
//       questionInfo={CONST.questionInfo}
//       submitDisabled={getValueInputData(mainKey, subKey) === 0}
//       submitLabel={CONST.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
//       submitBtnColor={CONST.isComplete ? (isOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
//       audioInfo={audioInfo}
//       onSubmit={onSumbit}
//     >
//       <Box useFull>
//         <BoxWrap gap='40px' useFull>
//           <Box hAlign={'start'} width='460px' useFull>
//             <Image src={CONST.image.src} alt={CONST.image.alt} width='460px' height='340px' style={{ objectFit: 'cover' }} />
//           </Box>
//           <Box vAlign={'left'} hAlign={'center'} useFull>
//             <List data={CONST.data}>
//               {({ value, index = 1 }) => (
//                 <Radio
//                   type={'square'}
//                   align='vertical'
//                   name={'radio-question-A'}
//                   label={String(index)}
//                   ariaLabel={index + '번 보기'}
//                   {...{ checked: index === getValueInputData(mainKey, subKey), onChange: () => changeInputData(mainKey, subKey, index) }}
//                   //defaultValue={index === getValueInputData(mainKey, 'P01')}
//                   //value={index === getValueInputData(mainKey, 'P01')}
//                   //onClick={() => onHandler(index)}
//                   disabled={CONST.isComplete}
//                   isError={CONST.isComplete && !CONST.isCorrect}
//                   tabIndex={101 + index}
//                 >
//                   <BoxWrap>
//                     <Box hAlign={'center'}>
//                       <Label value={index} />
//                     </Box>
//                     <Typography>{value?.text}</Typography>
//                   </BoxWrap>
//                 </Radio>
//               )}
//             </List>
//           </Box>
//         </BoxWrap>

//         {isOpen && (
//           <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
//             <Box background='lightGray' borderRadius='12px' marginTop='48px'>
//               {label.map((item, idx) => {
//                 return (
//                   <Box marginTop={idx === 0 ? '0' : '48px'}>
//                     <Box>
//                       <Tag type={ETagLine.GREEN} label={item} />
//                     </Box>
//                     <Box marginTop='12px'>
//                       {idx === 0 && CONST.isCorrectData}
//                       {idx === 1 &&
//                         CONST.isSolutionData.script?.map((item: { text: string }) => {
//                           return (
//                             <Box key={item.text} marginTop='12px'>
//                               {item.text}
//                             </Box>
//                           );
//                         })}
//                       {idx === 2 &&
//                         CONST.isSolutionData.interpretation?.map((item: { text: string }) => {
//                           return (
//                             <Box key={item.text} marginTop='12px'>
//                               {item.text}
//                             </Box>
//                           );
//                         })}
//                     </Box>
//                   </Box>
//                 );
//               })}
//             </Box>
//           </BottomSheet>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default EE4L06C01A06b;

import { Container } from '@maidt-cntn/ui/en';
import {
  ETagLine,
  TMainHeaderInfoTypes,
  EStyleButtonTypes,
  Box,
  PinchZoom,
  Image,
  Textarea,
  Typography,
  IQuestionProps,
  Tag,
  IAudioPlayerProps,
  BottomSheet,
  List,
  ChipButton,
  EChipButtonType,
} from '@maidt-cntn/ui';
import { useState } from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { correctDataType, initDataType } from '@maidt-cntn/api';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';

type Image = {
  src: string;
  alt: string;
  value?: string;
  title?: string;
};

type pageData = {
  pageNumber: number;
  mainKey: number;
  subKey: string;
  getDefaultData: (mainKey: number) => initDataType;
  getCorrectData: (mainKey: number) => correctDataType[];
};

interface Props {
  layout: {
    headerInfo: TMainHeaderInfoTypes;
    questionInfo: IQuestionProps;
    audioInfo?: IAudioPlayerProps;
  };

  imgArr: Image[];
  pageData: pageData;
}

const EE4L05C01A06aP02 = ({ layout, imgArr, pageData }: Props) => {
  const CONST = { ...layout };
  const { mainKey, subKey, pageNumber, getDefaultData, getCorrectData } = pageData;

  const [isOpen, setIsOpen] = useState(false);
  const [images] = useState<Image[]>(imgArr);

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: number) => {
    changeInputData(mainKey, subKey, value);
  };

  const getCorrectAnswer = (pageNumber: number, mainKey: number, subKey: string) => {
    const data = getCorrectData(pageNumber).find(item => item.mainKey === mainKey);

    if (data && data.inputDatas) {
      // inputDatas를 평탄화하고 모든 value를 추출
      const values = data.inputDatas.flat().map(item => item.value);

      return values;
    }
    return null;
  };

  const isComplete: boolean = isSubmittedInput(mainKey, subKey);
  const correctAnswer = getCorrectAnswer(pageData.pageNumber, mainKey, subKey);
  console.log(correctAnswer);
  const currentAnswer = getValueInputData(mainKey, subKey);
  const gradeData = useRecoilValue(currentPageGradeData);
  const isCorrect = gradeData.find(data => data.mainKey === mainKey)?.isCorrect;

  const validationCheck = () => {
    return currentAnswer === null || (typeof currentAnswer === 'string' && currentAnswer.trim().length === 0);
  };

  const completeQnA = () => {
    if (isComplete) {
      setIsOpen(!isOpen);
      return;
    }
    gradeSubmitPageData();
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={CONST.headerInfo}
      questionInfo={{
        ...CONST.questionInfo,
        mark: isComplete ? (isCorrect === undefined ? 'none' : isCorrect ? 'correct' : 'star') : 'none',
        markSize: 'middle',
      }}
      useExtend
      submitLabel={isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={!validationCheck() ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={validationCheck()}
      onSubmit={completeQnA}
      audioInfo={CONST.audioInfo}
    >
      <Box useFull>
        <Box display='flex' gap='30px' marginBottom='32px' width='100%'>
          {[1, 2, 3].map(item => (
            <Box key={item} display='block' width='33%'>
              <PinchZoom>
                <Image
                  src={imgArr[item - 1].src}
                  alt={imgArr[item - 1].alt}
                  height='360px'
                  width='100%'
                  title={imgArr[item - 1].title}
                  style={{ borderRadius: '8px' }}
                />
              </PinchZoom>
              <Box vAlign='start' marginTop='10px' textAlign='center'>
                <List
                  data={['O', 'X']}
                  align='horizontal'
                  row={({ value, index = 1 }) => (
                    <ChipButton
                      key={index}
                      type='radio'
                      name={`radio-group-${item}`}
                      status={index === 1 ? EChipButtonType.O : EChipButtonType.X}
                      isActive={index === getValueInputData(mainKey, `TEXT-${item}`)}
                      size='44px'
                      onClick={() => handleChangeInputData(mainKey, `TEXT-${item}`, index)}
                    ></ChipButton>
                  )}
                />
              </Box>
            </Box>
          ))}
        </Box>
        {isOpen && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
            <Box marginBottom='25px' background='gray' padding='28px' useRound>
              <Box margin='25px 0'>
                <Tag fontSize='22px' height='auto' label='예시 답안' type={ETagLine.GREEN} width='auto' />
                <Box margin='25px 0 50px'>
                  {correctAnswer?.map(correct => (
                    <Typography>{correct === 1 ? 'O' : 'X'}</Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </BottomSheet>
        )}
      </Box>
    </Container>
  );
};

export default EE4L05C01A06aP02;
