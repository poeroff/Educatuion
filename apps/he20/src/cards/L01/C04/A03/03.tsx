import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  TMainHeaderInfoTypes,
  Box,
  Dialog,
  Scroll,
  Button,
  Input,
  Recorder,
  BoxWrap,
  EStyleButtonTypes,
  EStyleSizes,
  List,
  Question,
  IRecorderRef,
  IUploadRecordData,
  InputStatus,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { L01C04A03, getUserSubmissionStore03 } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, inputDataType, userSubmissionType } from '@maidt-cntn/api';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';

const PAGE = 'P03';

const P03 = () => {
  const AUDIO_SUBKEY = 8;
  const { changeData, initData, submitData, saveData } = usePageData();
  const recorderRef = useRef<IRecorderRef>(null);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A03);
  const { userId } = useRecoilValue(studentAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const defaultSubmission = getUserSubmissionStore03(['', '', '', '', '', '', '']);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, answer: prev.p03.answer?.map((text, idx) => (index === idx ? value : text)) } }));
    changeData(PAGE, 1, index + 1, value);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p03.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'HE20',
        });
        setCardData(prev => ({
          ...prev,
          p03: {
            ...prev.p03,
            answer:
              userSubmissionList[0].inputData
                .filter((data: { type: inputDataType }) => data.type !== 'AUDIO')
                .map((data: { value: string }) => data.value) || cardData.p03.answer,
            audioData: newAudioData,
            isSubmitted,
          },
        }));
      }
      initData(PAGE, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = async () => {
    setCardData(prev => ({ ...prev, p03: { ...prev.p03, isSubmitted: true } }));
    const userSubmission = getUserSubmissionStore03(cardData.p03.answer || ['', '', '', '', '', '', '']);
    if (pageData.find(value => value.page === PAGE)) {
      userSubmission[0].inputData.push(pageData.find(value => value.page === PAGE)!.userSubmission[0].inputData[AUDIO_SUBKEY - 1]);
    }
    submitData(PAGE, userSubmission);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L01/C04/A03',
      changeData,
      mainKey: 1,
      page: 'p03',
      setFunction: setCardData,
      subjectCode: 'HE20',
      subKey: index,
      userId,
    });
  };

  const getInputComponent = (index: number, placeholder: string, width: string) => {
    return (
      <Input
        textAlign='left'
        inputSize='x-small'
        value={cardData.p03.answer![index]}
        maxLength={999}
        placeholder={placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeValue(e, index)}
        width={width}
        status={cardData.p03.answer![index] === '' ? InputStatus.DEFAULT : InputStatus.ENABLE}
        ariaLabel={`${index}번 입력란`}
        readOnly={cardData.p03.isSubmitted}
      />
    );
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Step 3. Present and Share',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: 'Fill in the blanks to present your speech.',
  };

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData(PAGE);
    };
  }, []);

  useEffect(() => {
    if (
      cardData.p03.isSubmitted ||
      !cardData.p03.answer?.every(text => isNotEmptyString(text)) ||
      Object.keys(cardData.p03.audioData ?? {}).length === 0
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [cardData.p03]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitLabel='완료하기'
      submitBtnColor={isButtonDisabled ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY}
      submitDisabled={isButtonDisabled}
      onSubmit={handleSubmit}
    >
      <Box tabIndex={101} background={'white'} lineHeight='55px' height='335px' overflow='auto' useRound useFull>
        <Scroll>
          <Typography usePre lineHeight='55px'>
            Hello, everyone! Are you thinking of adopting {getInputComponent(0, 'e.g. a Welsh Corgi', '230px')}? Today, I’d like to share some tips
            for raising this special companion. {'\n'}
            First of all, {getInputComponent(1, 'e.g. Welsh Corgis are highly active', '400px')}, so it’s important to{' '}
            {getInputComponent(2, 'e.g. play with them a lot to keep them happy', '500px')}. {'\n'}
            Secondly, {getInputComponent(3, 'e.g. be careful when walking them on the hot summer days', '650px')}, as{' '}
            {getInputComponent(4, 'e.g. they are sensitive to the heat from the ground because of their short legs', '840px')}. {'\n'}
            Lastly, {getInputComponent(5, 'e.g. pay close attention to their food consumption', '550px')} since{' '}
            {getInputComponent(6, 'e.g. they tend to gain weight easily', '400px')}. Remember these tips and take good care of your animals!
          </Typography>
        </Scroll>
      </Box>
      <BoxWrap justifyContent={'space-between'} marginTop={'24px'} width={'100%'}>
        <Box width={'30%'}></Box>
        <Box width={'30%'} hAlign='center'>
          <Recorder
            recorderIndex={1}
            initialData={cardData.p03.audioData?.[AUDIO_SUBKEY]}
            onSubmit={() => onSubmitRecorder(AUDIO_SUBKEY)}
            readOnly={cardData.p03.isSubmitted}
            ref={recorderRef}
          />
        </Box>
        <Box width={'30%'} hAlign='flex-end'>
          <Button
            label={'작성 내용 보기'}
            color={cardData.p01.isSubmitted ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY}
            disabled={!cardData.p01.isSubmitted}
            size={EStyleSizes['SMALL']}
            minWidth='132px'
            useRound
            onClick={openModal}
            ariaLabel='작성 내용 보기 버튼'
          />
        </Box>
      </BoxWrap>

      <Dialog width={921} isShow={isShowModal} closeLabel='닫기' onClose={closeModal} useFooter={true} confirmLabel='닫기'>
        <Box>
          <Scroll>
            <List data={cardData.p01.data ?? []}>
              {({ value }) => (
                <>
                  <Question type={'dot'} size={'small'}>
                    {value?.contents}
                  </Question>
                  <Box marginTop='8px'>
                    <Input textAlign='left' width='100%' name='modalValue' value={value?.userAnswer} readOnly />
                  </Box>
                </>
              )}
            </List>
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P03;
