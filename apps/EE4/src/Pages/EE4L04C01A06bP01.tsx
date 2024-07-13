// import { useState } from 'react';
// import { Container } from '@maidt-cntn/ui/en';
// import {
//   Box,
//   BoxWrap,
//   VideoPlayer,
//   Typography,
//   List,
//   Tag,
//   BottomSheet,
//   ETagLine,
//   IQuestionProps,
//   EStyleButtonTypes,
//   TMainHeaderInfoTypes,
//   ChipButton,
//   EChipButtonType,
//   IAudioPlayerProps,
// } from '@maidt-cntn/ui';
// import { useCurrentPageData } from '@/hooks/useCurrentPageData';
// import { useRecoilValue } from 'recoil';
// import { currentPageGradeData } from '@/stores';
// import { initDataType } from '@maidt-cntn/api';
// import { PageProps } from '@/cards/L05/C01/A06a';

// interface Props {
//   headerInfo: TMainHeaderInfoTypes;
//   questionInfo: IQuestionProps;
//   audioInfo: IAudioPlayerProps;
//   ImageList : PageProps
//   srtFile?: string;
//   mainKey: number;
//   subKey: string;
//   data: string;
//   video: {
//     src: string;
//     srt: string;
//     haveSrt?: boolean;
//     srtErr: string;
//   };
//   label: string[];
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
//   video: {
//     src: string;
//     srt: string;
//     haveSrt?: boolean;
//     srtErr: string;
//   };
//   data: string;
//   isCorrect: boolean | undefined;
//   isComplete: boolean;
//   isCorrectData?: string | boolean | number | string[];
//   isSolutionData?: { script?: { text: string }[]; interpretation?: { text: string }[] };
// }

// const EE4L05C01A06aP02 = ({
//   headerInfo,
//   ImageList,
//   audioInfo,
//   questionInfo,
//   label,
//   mainKey,
//   subKey,
//   data,
//   video,
//   getDefaultData,
//   getCorrectData,
//   getSolutionData,
// }: Props) => {
//   const gradeData = useRecoilValue(currentPageGradeData);
//   const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
//     initData: getDefaultData(mainKey),
//     collectDatas: getCorrectData(mainKey),
//   });
//   const [isOpen, setIsOpen] = useState(false);

//   const CONST: CONST = {
//     headerInfo: headerInfo,
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
//     video: video,
//     isCorrect: gradeData.find(data => data.mainKey === mainKey)?.isCorrect,
//     isComplete: isSubmittedInput(mainKey, subKey),
//     isCorrectData: getCorrectData(mainKey)[0].inputDatas[0][0].value,
//     isSolutionData: getSolutionData(mainKey)[0],
//   };

//   const onSumbit = () => {
//     if (!CONST.isComplete) {
//       gradeSubmitPageData();
//     } else {
//       setIsOpen(!isOpen);
//     }
//   };

//   return (
//     <Container
//       useExtend
//       bodyId='targetContainer'
//       headerInfo={CONST.headerInfo}
//       questionInfo={CONST.questionInfo}
//       submitDisabled={getValueInputData(mainKey, subKey) === 0}
//       submitLabel={CONST.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
//       submitBtnColor={CONST.isComplete ? (isOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
//       audioInfo={audioInfo}
//       onSubmit={onSumbit}
//     >
//       <BoxWrap useFull display='block'>
//         <Box width='350px' useFull height='300px'>
//             <Image  src={ }></Image>
//           <VideoPlayer videoSrc={CONST.video.src} srtFile={CONST.video.haveSrt ? CONST.video.srt : CONST.video.srtErr} />
//           <BoxWrap marginLeft={100} marginTop={10}>
//             <Box>
//               <List
//                 data={['O', 'X']}
//                 align='horizontal'
//                 row={({ value, index = 1 }) => (
//                   <ChipButton
//                     key={index}
//                     type='radio'
//                     name='radio-group'
//                     status={index === 1 ? EChipButtonType.O : EChipButtonType.X}
//                     isActive={index === getValueInputData(mainKey, subKey)}
//                     size='64px'
//                     onClick={() => changeInputData(mainKey, subKey, index)}
//                     isError={CONST.isComplete && !CONST.isCorrect}
//                     readOnly={CONST.isComplete}
//                     isDisabled={CONST.isComplete}
//                   ></ChipButton>
//                 )}
//               />
//             </Box>
//           </BoxWrap>
//         </Box>
//       </BoxWrap>
//       {isOpen && (
//         <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
//           <Box background='lightGray' borderRadius='12px' marginTop='48px'>
//             {label.map((item: string, idx: number) => {
//               return (
//                 <Box key={idx} marginTop={idx === 0 ? '0' : '48px'}>
//                   <Box>
//                     <Tag type={ETagLine.GREEN} label={item} />
//                   </Box>
//                   <Box marginTop='12px'>
//                     {idx === 0 && CONST.isCorrectData === 1 ? 'O' : 'X'}
//                     {idx === 1 &&
//                       CONST.isSolutionData?.script?.map((item: { text: string }) => {
//                         return (
//                           <Box key={item.text} marginTop='12px'>
//                             {item.text}
//                           </Box>
//                         );
//                       })}
//                     {idx === 2 &&
//                       CONST.isSolutionData?.interpretation?.map((item: { text: string }) => {
//                         return (
//                           <Box key={item.text} marginTop='12px'>
//                             {item.text}
//                           </Box>
//                         );
//                       })}
//                   </Box>
//                 </Box>
//               );
//             })}
//           </Box>
//         </BottomSheet>
//       )}
//     </Container>
//   );
// };
// export default EE4L05C01A06aP02;

/*
    1. URL: http://localhost:4270/#/ee40/L01-C01-A06
    2. 페이지: EE4-L01-C01-A06-P01

    3. PropsTypes
        - headerInfo: TMainHeaderInfoTypes;
        - questionInfo: IQuestionProps;
        - audioInfo: IAudioPlayerProps;
        - files: any;
        - pageNumber: number;
        - mainKey: number;
        - subKey: string;
        - list: { src: string; alt: string }[];
        - correctData: number;
*/

// UI 공통
import {
  Image,
  BoxWrap,
  Box,
  PinchZoom,
  Radio,
  Label,
  EStyleButtonTypes,
  Tag,
  Typography,
  BottomSheet,
  ETagLine,
  TMainHeaderInfoTypes,
  IQuestionProps,
  IAudioPlayerProps,
  List,
  SimpleAudioPlayer,
  Recorder,
  EStyleFontSizes,
} from '@maidt-cntn/ui';

// UI en
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';

// API
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import { useRecoilValue } from 'recoil';
import { currentPageGradeData } from '@/stores';
import { initDataType } from '@maidt-cntn/api';

export type IListData = {
  src?: string;
  alt?: string;
};

type IListenAndAnswer = {
  type: string;
  color: string;
  content: React.ReactNode;
  isRecoding: boolean;
  src?: string;
  alt?: string;
};

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  audioInfo?: IAudioPlayerProps;

  getCorrectData: (index: number) => any;
  getDefaultData: (index: number) => initDataType;
  pageNumber?: number;
  mainKey?: number;
  subKey?: string;
  pageData?: IListData[] | undefined;
};

const EE4L0401A06bP01 = ({
  headerInfo,
  questionInfo,
  audioInfo,
  getCorrectData,
  getDefaultData,

  pageNumber, // pageData.ts case number
  mainKey, // pageData.ts mainKey
  subKey, // pageData.ts subKey ex) 'TEXT-01',
  pageData = [], // PageData
}: PageProps) => {
  const [isOpen, setIsOpen] = useState(false); // 답안 보기
  const [data, setData] = useState<Array<IListenAndAnswer>>([
    {
      type: 'A',
      color: '#E2F2FF',
      content: (
        <>
          Good afternoon.
          <br />
          How are you?
        </>
      ),
      isRecoding: false,
    },
    {
      type: 'B',
      color: '#FFF0CC',
      content: <>I’m good.</>,

      isRecoding: false,
    },
  ]);

  // bx pageData.ts
  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber as number),
    collectDatas: getCorrectData(pageNumber as number),
  });

  // bx pageData.ts handle event
  const handleChangeInputData = (mainKey: number, subKey: string, value: number) => {
    changeInputData(mainKey, subKey, value);
  };

  const gradeData = useRecoilValue(currentPageGradeData); // 체점후 [{ mainKey, isCorrect }] 데이터
  const inputData = getValueInputData(mainKey as number, subKey as string) || null; // radio data
  const isComplete: boolean = isSubmittedInput(mainKey as number, subKey as string); // 체점하기 submit 여부
  const isCorrect = gradeData.find(data => data.mainKey === mainKey)?.isCorrect; // 체점 후 정답인지 아닌지 체크
  const correctData = getCorrectData(pageNumber as number)[0].inputDatas[0][0].value; // 정답

  // record handler
  const recordonHandler = (index: number) => {
    setData(prevDataList => {
      const updatedDataList = [...prevDataList];
      updatedDataList[index].isRecoding = true;
      return updatedDataList;
    });
  };

  // radio handler
  const onHandler = (index: number) => {
    handleChangeInputData(mainKey as number, subKey as string, index);
  };

  // 체점하기
  const onSubmit = () => {
    if (!isComplete) {
      gradeSubmitPageData();
      return;
    }

    setIsOpen(!isOpen);
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={{
        ...questionInfo,
        mark: isComplete ? (isCorrect === undefined ? 'none' : isCorrect ? 'correct' : 'star') : 'none',
        markSize: 'middle',
      }}
      submitDisabled={inputData === null}
      submitLabel={isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitBtnColor={inputData != null ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      audioInfo={audioInfo}
      onSubmit={onSubmit}
      useExtend
    >
      <Box>
        <BoxWrap>
          <Box marginRight='85px'></Box>
          <Box marginRight='85px'></Box>
          <Box marginRight='145px'></Box>

          <Box>
            {/* 상단 3개 항목 */}
            <List<IListData>
              align='horizontal'
              data={pageData.slice(0, 3)}
              row={({ value, index = 0 }) => (
                <div>
                  <div style={{ marginBottom: '10%' }}>
                    <Typography size={EStyleFontSizes['LARGE']} color='#996500' weight={800}>
                      {index}
                    </Typography>
                  </div>
                  <Radio
                    type='square'
                    name='result1'
                    isError={isComplete ? !isCorrect : false}
                    disabled={isComplete}
                    value={index + 1 === inputData}
                    onClick={() => onHandler(index + 1)}
                  >
                    <div>
                      <Box width='px' height='200px' hAlign='center' border='none'>
                        {value && <img src={value.src} width='164px' height='200px' alt={value.alt} title={value.alt} />}
                      </Box>
                    </div>
                  </Radio>
                </div>
              )}
            />
          </Box>
        </BoxWrap>

        <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
          <Box background='lightGray' borderRadius='12px' marginTop='48px'>
            <Tag fontSize='22px' height='auto' label='답안' type={ETagLine.GREEN} width='auto' />
            <Box margin='25px 0 20px'>
              <Typography>{correctData}</Typography>
            </Box>
          </Box>
        </BottomSheet>
      </Box>
    </Container>
  );
};

export default EE4L0401A06bP01;
