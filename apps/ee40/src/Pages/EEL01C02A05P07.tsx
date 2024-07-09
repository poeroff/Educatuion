import { useState } from 'react';

import { Container } from '@maidt-cntn/ui/en';
import {
  TMainHeaderInfoTypes,
  Box,
  IQuestionProps,
  EStyleButtonTypes,
  BoxWrap,
  PinchZoom,
  Image,
  List,
  Label,
  Typography,
  SimpleAudioPlayer,
  Recorder,
  Button,
  Tag,
  ETagLine,
  IAudioData,
  BottomSheet,
} from '@maidt-cntn/ui';

import { correctDataType, initDataType } from '@maidt-cntn/api';
import useCurrentPageData from '@/hooks/useCurrentPageData';

type Image = {
  label: string;
  src: string;
  alt: string;
  value?: string;
  title?: string;
};

interface Props {
  INITIAL: {
    isValChk: boolean;
    isComplete: boolean;
  };
}

export type IListenAndAnswer = {
  type: string;
  color: string;
  content: React.ReactNode;
  audioSrc?: string;
};

interface IEEL01C02A05P07 {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  data: IListenAndAnswer[];
  mainKey: number;
  getDefaultData: (mainKey: number) => initDataType;
  getCorrectData: (mainKey: number) => correctDataType[];
  getSolutionData: (pageNumber: number) => {
    script: { text: string }[];
    interpretation: { text: string }[];
  }[];
  imageList: Image[];
}

const EEL01C02A05P07 = ({ headerInfo, questionInfo, data, mainKey, getDefaultData, getCorrectData, getSolutionData, imageList }: IEEL01C02A05P07) => {
  const [isOpen, setIsOpen] = useState(false);

  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(mainKey),
    collectDatas: getCorrectData(mainKey),
  });

  const INITIAL: Props['INITIAL'] = {
    isValChk: Boolean(getValueInputData(mainKey, 'RECORDER-1') && getValueInputData(mainKey, 'RECORDER-2')),
    isComplete: isSubmittedInput(mainKey, 'RECORDER-1') && isSubmittedInput(mainKey, 'RECORDER-2'),
  };

  const getRecorderData = (index: number): IAudioData | null => {
    return getValueInputData(mainKey, `RECORDER-${index === 1 ? 1 : 2}`);
  };

  const handleRecorderSubmit = (index: number, audioData: IAudioData) => {
    changeInputData(mainKey, `RECORDER-${index === 1 ? 1 : 2}`, audioData);
  };

  const handleSubmit = () => {
    if (!INITIAL.isComplete) {
      submitPageData();
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      onSubmit={handleSubmit}
      submitLabel={INITIAL.isComplete ? (isOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitBtnColor={INITIAL.isValChk ? (isOpen ? EStyleButtonTypes.DEFAULT : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={INITIAL.isValChk ? false : true}
    >
      <Box>
        <BoxWrap marginTop='30px'>
          <Box width='424px' height='304px'>
            {imageList.map((item, index) => (
              <Box key={index} hAlign='center' width='424px' height='132px' marginTop='30px'>
                <Button
                  label={item.label}
                  style={{
                    width: '102px',
                    height: '48px',
                    fontSize: '28px',
                    background: '#2F38C7',
                    marginRight: '10px',
                  }}
                />
                <Box hAlign='center' vAlign='center' width='302px' height='132px'>
                  <PinchZoom>
                    <Image src={item.src} alt={item.alt} title={item.title} style={{ width: 'fit-content', height: '132px', borderRadius: '8px' }} />
                  </PinchZoom>
                </Box>
              </Box>
            ))}
          </Box>
          <Box hAlign='center' width='474px' height='354px' marginTop='20px'>
            <List data={data} gap={10}>
              {({ value, index }) => (
                <Box hAlign='flex-start' gap={4}>
                  <Box hAlign='flex-start' gap={8}>
                    <Box alignSelf='flex-start'>
                      <Label value={value?.type || ''} type={'paint'} background={value?.color} size={'middle'} />
                    </Box>
                    <Box marginTop={value?.type === 'A' ? '' : '-10px'}>
                      <Typography
                        style={{
                          fontSize: '32px',
                          lineHeight: '48px',
                          width: '324px',
                          height: '111px',
                          borderRadius: '8px',
                          padding: '8px 12px 8px 12px',
                        }}
                        weight='500'
                      >
                        {value?.content}
                      </Typography>
                    </Box>
                    <Box alignSelf='flex-start'>
                      {value?.type === 'A' ? (
                        <Recorder
                          recorderIndex={index as number}
                          initialData={getRecorderData(index as number)}
                          onSubmit={audioData => handleRecorderSubmit(index as number, audioData)}
                          readOnly={INITIAL.isComplete}
                        />
                      ) : (
                        <SimpleAudioPlayer audioSrc={value?.audioSrc || ''} />
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
            </List>
          </Box>
        </BoxWrap>
        {isOpen && (
          <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
            <Box background='lightGray' borderRadius='12px' marginTop='48px'>
              <Box>
                <Box>
                  <Tag type={ETagLine.GREEN} label={'답안'} />
                </Box>
                <Box marginTop='12px'>
                  <List data={getSolutionData(mainKey)[0].script} row={({ value }) => <Typography>{value?.text}</Typography>} />
                </Box>
              </Box>
              <Box marginTop='48px'>
                <Box>
                  <Tag type={ETagLine.GREEN} label={'해석'} />
                </Box>
                <Box marginTop='12px'>
                  <List data={getSolutionData(mainKey)[0].interpretation} row={({ value }) => <Typography>{value?.text}</Typography>} />
                </Box>
              </Box>
            </Box>
          </BottomSheet>
        )}
      </Box>
    </Container>
  );
};

export default EEL01C02A05P07;
