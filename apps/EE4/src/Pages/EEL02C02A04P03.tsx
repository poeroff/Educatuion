// Page: EE4-L02-C02-A04-p03
// 질문이 두줄일때

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

interface BoxInfo {
  width: string;
}

export type IListenAndAnswer = {
  question: string;
  answer: string;
  character: string;
  color: string;
  audio: string;
};

export type PageProps = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
  pageNumber: number;
  mainKey: number[];
  subKey: string[];
  getCorrectData: (index: number) => any;
  getDefaultData: (index: number) => initDataType;
  data: IListenAndAnswer[];
  BoxInfo: BoxInfo;
};

const Component = (pageInfo: PageProps) => {
  const { headerInfo, questionInfo, pageNumber, mainKey, subKey, getCorrectData, getDefaultData, data, BoxInfo } = pageInfo;
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

  const allRecordersSubmitted = [...mainKey]
    .map((_, index) => getValueInputData(mainKey[index], subKey[index]) || null)
    .every(element => typeof element === 'object' && element !== null && !Array.isArray(element));

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
      <Box useFull>
        <ListHeader>
          <ToggleButton id='toggle' isChecked={isOpen} isTranslation onClick={() => setIsOpen(!isOpen)} />
        </ListHeader>
        <Box marginTop='20px'>
          <List data={listData} gap={50}>
            {({ value, index = 1 }) => (
              <BoxWrap alignItems='flex-start'>
                <Box width={BoxInfo.width} flexShrink='0'>
                  <NameTag
                    label={value?.character}
                    style={{
                      display: 'inline-block',
                      minWidth: '54px',
                      height: '38px',
                      textAlign: 'center',
                      background: `${value?.color}`,
                      fontWeight: '500',
                      fontSize: '24px',
                      marginTop: '15px',
                    }}
                  />
                </Box>
                <Box position='relative' width='100%' height={value?.question.includes('\n') ? '224px' : '60px'}>
                    <Typography weight='bold' size={EStyleFontSizes.LARGE} useGap={false}>
                      {value?.question}
                    </Typography>
                  {isOpen && (
                    <Box position='absolute' top={value?.question.includes('\n') ? '152px' : '60px'} left='0px'>
                      <Typography color='#2F38C7' useGap={false}>
                        {value?.answer}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Box display='flex' gap='5px' marginLeft='auto'>
                  {value?.audio && <SimpleAudioPlayer audioSrc={value?.audio} />}
                  <Recorder recorderIndex={index} onSubmit={audioData => onHandler(index - 1, listData, audioData)} />
                </Box>
              </BoxWrap>
            )}
          </List>
        </Box>
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
