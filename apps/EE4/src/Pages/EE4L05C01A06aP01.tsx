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
  Radio,
} from '@maidt-cntn/ui';
import { useState } from 'react';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import { correctDataType, initDataType } from '@maidt-cntn/api';
import { it } from 'node:test';
import GradeCheck from '@/components/gradeCheck';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';

type Image = {
  // src: string | string[] | undefined;
  src: string;
  alt: string;
  value: string;
  title: string;
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

const EE4L05C01A06aP01 = ({ layout, imgArr, pageData }: Props) => {
  const CONST = { ...layout };
  const { mainKey, subKey, pageNumber, getDefaultData, getCorrectData } = pageData;

  const [isOpen, setIsOpen] = useState(false);
  const [images] = useState<Image[]>(imgArr);

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const getCorrectAnswer = (pageNumber: number, mainKey: number, subKey: string) => {
    const data = getCorrectData(pageNumber).find(item => item.mainKey === mainKey);
    if (data) {
      return data?.inputDatas?.flat().find(item => item.subKey === subKey)?.value;
    }
    return null;
  };
  const gradeData = useRecoilValue(currentPageGradeData);
  const isComplete: boolean = isSubmittedInput(mainKey, subKey);
  const isCorrect = gradeData.find(data => data.mainKey === mainKey)?.isCorrect;
  const correctAnswer = getCorrectAnswer(pageData.pageNumber, mainKey, subKey);
  const currentAnswer = getValueInputData(mainKey, subKey);

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
  //   <Container
  //   headerInfo={headerInfo}
  //   questionInfo={{
  //     ...questionInfo,
  //     mark: isComplete ? (isCorrect === undefined ? 'none' : isCorrect ? 'correct' : 'star') : 'none',
  //     markSize: 'middle',
  //   }}
  //   submitDisabled={inputData === null}
  //   submitLabel={isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
  //   submitBtnColor={inputData != null ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
  //   onSubmit={onSubmit}
  //   useExtend
  // >

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
        <Box display='flex' flexDirection='column' gap='30px' marginBottom='32px' width='100%'>
          <Box display='flex' gap='30px' width='100%'>
            {[1, 2].map(item => (
              <Box key={item} display='block' width='calc(50% - 15px)'>
                <Radio type='circle' onClick={() => handleChangeInputData(mainKey, subKey, images[item - 1].value)}></Radio>
                <Image
                  src={images[item - 1].src}
                  alt={images[item - 1].alt}
                  height='360px'
                  width='100%'
                  title={images[item - 1].title}
                  style={{ borderRadius: '8px' }}
                />
              </Box>
            ))}
          </Box>
          <Box display='flex' gap='30px' width='100%'>
            {[3, 4].map(item => (
              <Box key={item} display='block' width='calc(50% - 15px)'>
                <Radio type='circle' onClick={() => handleChangeInputData(mainKey, subKey, images[item - 1].value)}></Radio>

                <Image
                  src={images[item - 1].src}
                  alt={images[item - 1].alt}
                  height='360px'
                  width='100%'
                  title={images[item - 1].title}
                  style={{ borderRadius: '8px' }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {isOpen && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
            <Box marginBottom='25px' background='gray' padding='28px' useRound>
              <Box margin='25px 0'>
                <Tag fontSize='22px' height='auto' label='예시 답안' type={ETagLine.GREEN} width='auto' />
                <Box margin='25px 0 50px'>
                  <Typography>{correctAnswer as string}</Typography>
                </Box>
              </Box>
            </Box>
          </BottomSheet>
        )}
      </Box>
    </Container>
  );
};

export default EE4L05C01A06aP01;
