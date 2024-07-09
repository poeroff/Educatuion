// Page: EE4-L01-C02-A04-P03

import { useState } from 'react';
import { useCurrentPageData } from '@/hooks/useCurrentPageData';
import {
  Box,
  BoxWrap,
  Dialog,
  EStyleButtonTypes,
  EStyleFontSizes,
  IAudioData,
  IQuestionProps,
  List,
  ListHeader,
  NameTag,
  Recorder,
  SimpleAudioPlayer,
  TMainHeaderInfoTypes,
  ToggleButton,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { initDataType } from '@maidt-cntn/api';
import { correctDataType } from '@/types/pageData';

export type IListenAndAnswer = {
  question: string;
  answer: string;
  character: string;
  color: string;
  audio: string;
  audioData: IAudioData | null;
};

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  pageNumber: number;
  mainKey: number[];
  subKey: string[];
  getCorrectData: (index: number) => correctDataType[];
  getDefaultData: (index: number) => initDataType;
  data: IListenAndAnswer[];
};

const Component = (pageInfo: PageProps) => {
  const { headerInfo, questionInfo, pageNumber, mainKey, subKey, getCorrectData, getDefaultData, data } = pageInfo;
  const [listData, setListData] = useState<IListenAndAnswer[]>(data);
  const [isShow, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { getValueInputData, changeInputData, isSubmittedInput, gradeSubmitPageData } = useCurrentPageData({
    initData: getDefaultData(pageNumber),
    collectDatas: getCorrectData(pageNumber),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: IAudioData) => {
    changeInputData(mainKey, subKey, value);
  };

  const recorderData = listData.map((data, index) => ({ ...data, audioData: getValueInputData(mainKey[index], subKey[index]) || null }));
  const allRecordersSubmitted = recorderData.every(
    element => typeof element.audioData === 'object' && element.audioData !== null && !Array.isArray(element.audioData),
  );

  const onHandler = (idx: number, list: IListenAndAnswer[], audioData: IAudioData) => {
    const _list = list?.map((data, index) => (index === idx ? { ...data, audioData } : data));
    setListData(_list);
    handleChangeInputData(mainKey[idx], subKey[idx], audioData);
  };

  const handelModal = () => {
    setShow(!isShow);
  };

  const completeQnA = () => {
    setShow(false);
    gradeSubmitPageData();
  };

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel='완료하기'
      submitBtnColor={allRecordersSubmitted ? EStyleButtonTypes.YELLOW : EStyleButtonTypes.SECONDARY}
      submitDisabled={!allRecordersSubmitted}
      onSubmit={handelModal}
    >
      <ListHeader>
        <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
      </ListHeader>
      <Box marginTop='20px'>
        <List data={recorderData} gap={50}>
          {({ value, index = 1 }) => (
            <BoxWrap alignItems='center'>
              <Box width='105px' flexShrink='0'>
                <NameTag
                  label={value?.character}
                  style={{
                    minWidth: '38px',
                    height: '38px',
                    background: `${value?.color}`,
                    fontWeight: '500',
                    fontSize: '24px',
                  }}
                />
              </Box>
              <Box position='relative' width='100%'>
                <Typography weight='bold' size={EStyleFontSizes.LARGE} useGap={false}>
                  {value?.question}
                </Typography>
                {isOpen && (
                  <Box position='absolute' top='60px' left='0px'>
                    <Typography color='#2F38C7' useGap={false}>
                      {value?.answer}
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box display='flex' gap='5px' marginLeft='auto'>
                {value?.audio && <SimpleAudioPlayer audioSrc={value?.audio} />}
                <Recorder recorderIndex={index} initialData={value?.audioData} onSubmit={audioData => onHandler(index - 1, listData, audioData)} />
              </Box>
            </BoxWrap>
          )}
        </List>
      </Box>
      <Dialog
        width={400}
        height={200}
        useFooter
        isShow={isShow && allRecordersSubmitted !== null}
        closeLabel='아니오'
        confirmLabel='예'
        onClose={handelModal}
        onConfirm={completeQnA}
      >
        <Typography>완료하시겠습니까?</Typography>
      </Dialog>
    </Container>
  );
};

export default Component;
