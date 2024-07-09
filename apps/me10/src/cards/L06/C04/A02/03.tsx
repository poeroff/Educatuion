import usePageData from '@/hooks/usePageData';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import {
  BottomSheet,
  Box,
  BoxWrap,
  Button,
  Dialog,
  EStyleButtonTypes,
  EStyleSizes,
  EStyleTableTypes,
  ETagLine,
  IRecorderRef,
  IUploadRecordData,
  Input,
  Recorder,
  Scroll,
  TBody,
  TD,
  TH,
  TMainHeaderInfoTypes,
  TR,
  Table,
  Tag,
  Textarea,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L06C04A02 } from './store';

const P03 = () => {
  const pageNumber = 'P03';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageData = useRecoilValue(pageDataAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L06C04A02);
  const { userId } = useRecoilValue(studentAtom);

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

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXTAREA',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXTAREA',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXTAREA',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXTAREA',
          value: '',
        },
        {
          subKey: 6,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === pageNumber)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      console.log(userSubmissionList);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData[pageNumber].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });
        console.log(newAudioData);

        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            userInput1: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].userInput1,
            userInput2: userSubmissionList[0].inputData[1]?.value || cardData[pageNumber].userInput2,
            userInput3: userSubmissionList[0].inputData[2]?.value || cardData[pageNumber].userInput3,
            userInput4: userSubmissionList[0].inputData[3]?.value || cardData[pageNumber].userInput4,
            isSubmitted: isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData(pageNumber, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = () => {
    if (!cardData[pageNumber].isSubmitted) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], isSubmitted: true } }));

      const userSubmission: userSubmissionType[] = [
        {
          mainKey: 1,
          inputData: [
            {
              subKey: 1,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput1,
            },
            {
              subKey: 2,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput2,
            },
            {
              subKey: 3,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput3,
            },
            {
              subKey: 4,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput4,
            },
            {
              subKey: 6,
              type: 'AUDIO',
              value: {},
            },
          ],
        },
      ];
      if (pageData.find(value => value.page === pageNumber)) {
        userSubmission[0].inputData = pageData.find(value => value.page === pageNumber)!.userSubmission[0].inputData;
      }
      submitData(pageNumber, userSubmission);
    }
  };

  const handleInputChange = (value: string, subKey: number) => {
    if (subKey === 0) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput1: value } }));
    } else if (subKey === 1) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput2: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput3: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput4: value } }));
    }
    changeData(pageNumber, 1, subKey + 1, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'My Role Model: Step 3',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: '자신의 롤 모델에 관해 발표해 봅시다.',
  };

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const openModal = () => {
    setIsShowModal(true);
  };
  const closeModal = () => {
    setIsShowModal(false);
  };

  const isSubmittable =
    isNotEmptyString(cardData[pageNumber].userInput1 || '') &&
    isNotEmptyString(cardData[pageNumber].userInput2 || '') &&
    isNotEmptyString(cardData[pageNumber].userInput3 || '') &&
    isNotEmptyString(cardData[pageNumber].userInput4 || '') &&
    Object.values(cardData[pageNumber].audioData!).every(value => value) &&
    Object.values(cardData[pageNumber].audioData!).length !== 0;
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const toggleShowAnswer = () => {
    setIsShowAnswer(prev => !prev);
  };

  const recorderRef = useRef<IRecorderRef>(null);
  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L06/C04/A02',
      changeData,
      mainKey: 1,
      page: pageNumber,
      setFunction: setCardData,
      subjectCode: 'ME10',
      subKey: index,
      userId,
    });
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      submitLabel={cardData[pageNumber].isSubmitted ? (!isShowAnswer ? '답안보기' : '답안닫기') : '완료하기'}
      submitDisabled={!isSubmittable}
      submitBtnColor={
        !cardData[pageNumber].isSubmitted
          ? isSubmittable
            ? EStyleButtonTypes.PRIMARY
            : EStyleButtonTypes.SECONDARY
          : !isShowAnswer
          ? EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.GRAY
      }
      onSubmit={!cardData[pageNumber].isSubmitted ? handleSubmit : toggleShowAnswer}
    >
      <Box background={'white'} useRound>
        <Scroll height='300px'>
          <Box padding='0 40px' marginTop={30}>
            <Box vAlign='center'>
              <Typography>My role model is </Typography>
              <Box flex={1}>
                <Input
                  value={cardData[pageNumber]?.userInput1}
                  onChange={e => handleInputChange(e.target.value, 0)}
                  placeholder={'e.g. King Sejong'}
                  ariaLabel='답 입력란 1'
                  width='500px'
                  maxLength={999}
                  readOnly={cardData[pageNumber].isSubmitted}
                />{' '}
              </Box>
            </Box>
            <Box vAlign='center' marginTop={'16px'}>
              <Typography>He was</Typography>
              <Box flex={1}>
                <Input
                  value={cardData[pageNumber]?.userInput2}
                  onChange={e => handleInputChange(e.target.value, 1)}
                  placeholder={'e.g. very smart and caring'}
                  ariaLabel='답 입력란 2'
                  width='610px'
                  maxLength={999}
                  readOnly={cardData[pageNumber].isSubmitted}
                />
              </Box>
            </Box>
            <Box vAlign='center' marginTop={'16px'}>
              <Typography>He</Typography>
              <Box flex={1}>
                <Input
                  value={cardData[pageNumber]?.userInput3}
                  onChange={e => handleInputChange(e.target.value, 2)}
                  placeholder={'e.g. invented Hangeul for his people'}
                  ariaLabel='답 입력란 3'
                  width='665px'
                  maxLength={999}
                  readOnly={cardData[pageNumber].isSubmitted}
                />
              </Box>
            </Box>
            <Box vAlign='center' marginTop={'16px'}>
              <Typography>I want to</Typography>
              <Box flex={1}>
                <Input
                  value={cardData[pageNumber]?.userInput4}
                  onChange={e => handleInputChange(e.target.value, 3)}
                  placeholder={'e.g. help people'}
                  ariaLabel='답 입력란 4'
                  width='595px'
                  maxLength={999}
                  readOnly={cardData[pageNumber].isSubmitted}
                />
              </Box>
            </Box>
          </Box>
        </Scroll>
      </Box>

      <BoxWrap justifyContent={'space-between'} marginTop={'24px'} width={'100%'}>
        <Box width={'30%'}></Box>
        <Box width={'30%'} hAlign='center'>
          <Recorder
            recorderIndex={6}
            initialData={cardData[pageNumber].audioData?.[6]}
            readOnly={cardData[pageNumber].isSubmitted}
            onSubmit={() => {
              onSubmitRecorder(6);
            }}
            ref={recorderRef}
          />
        </Box>
        <Box width={'30%'} hAlign='flex-end'>
          <Button
            label={'작성 내용 보기'}
            color={EStyleButtonTypes.SECONDARY}
            size={EStyleSizes['SMALL']}
            minWidth='132px'
            useRound
            onClick={openModal}
            style={{ border: '1.5px var(--color-grey-500) solid', color: 'var(--color-grey-700)' }}
            disabled={!cardData['P02'].isSubmitted}
          />
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShowAnswer}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'예시답안'} />
          </Box>
          <BoxWrap flexDirection='column' marginTop='12px'>
            <Typography>{cardData[pageNumber].solution}</Typography>
          </BoxWrap>
        </Box>
      </BottomSheet>

      <Dialog width={921} height={500} isShow={isShowModal} closeLabel='확인' onClose={closeModal} useFooter={true} confirmLabel='확인'>
        <Box>
          <Scroll>
            <Table color={EStyleTableTypes.DEFAULT} sizes={['350px', 'auto', 'auto', 'auto']}>
              <caption></caption>
              <TBody>
                <TR>
                  <TH color={EStyleTableTypes.TERTIARY} scope='row' hAlign='center'>
                    <Typography color='var(--color-black)'>Who is your role model?</Typography>
                  </TH>
                  <TD color={EStyleTableTypes.DEFAULT}>
                    <Textarea
                      height='75px'
                      width='100%'
                      placeholder='내용을 넣어 주세요.'
                      ariaLabel={`답 입력란 1`}
                      value={cardData['P02'].userInput1}
                      readOnly={true}
                    />
                  </TD>
                </TR>
                <TR>
                  <TH color={EStyleTableTypes.TERTIARY} scope='row' hAlign='center'>
                    <Typography color='var(--color-black)'>What is the person like?</Typography>
                  </TH>
                  <TD color={EStyleTableTypes.DEFAULT} colSpan={3}>
                    <Textarea
                      height='75px'
                      width='100%'
                      placeholder='내용을 넣어 주세요.'
                      ariaLabel={`답 입력란 2`}
                      value={cardData['P02'].userInput2}
                      readOnly={true}
                    />
                  </TD>
                </TR>
                <TR>
                  <TH color={EStyleTableTypes.TERTIARY} scope='row' hAlign='center'>
                    <Typography color='var(--color-black)'>What does/did the person do?</Typography>
                  </TH>
                  <TD color={EStyleTableTypes.DEFAULT} colSpan={3}>
                    <Textarea
                      height='100px'
                      width='100%'
                      placeholder='내용을 넣어 주세요.'
                      ariaLabel={`답 입력란 3`}
                      value={cardData['P02'].userInput3}
                      readOnly={true}
                    />
                  </TD>
                </TR>
                <TR>
                  <TH color={EStyleTableTypes.TERTIARY} scope='row' hAlign='center'>
                    <Typography color='var(--color-black)'>What do you want to do like the person?</Typography>
                  </TH>
                  <TD color={EStyleTableTypes.DEFAULT} colSpan={3}>
                    <Textarea
                      height='100px'
                      width='100%'
                      placeholder='내용을 넣어 주세요.'
                      ariaLabel={`답 입력란 4`}
                      value={cardData['P02'].userInput4}
                      readOnly={true}
                    />
                  </TD>
                </TR>
              </TBody>
            </Table>
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

export default P03;
