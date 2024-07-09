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
  THead,
  TMainHeaderInfoTypes,
  TR,
  Table,
  TableCaption,
  Tag,
  Textarea,
  Typography,
  makeAudioData,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { L05C04A02 } from './store';

const P03 = () => {
  const pageNumber = 'P03';
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageData = useRecoilValue(pageDataAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L05C04A02);
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
          subKey: 5,
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
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData[pageNumber].audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          [pageNumber]: {
            ...prev[pageNumber],
            userInput1: userSubmissionList[0].inputData[0]?.value || cardData[pageNumber].userInput1,
            userInput2: userSubmissionList[0].inputData[1]?.value || cardData[pageNumber].userInput2,
            userInput3: userSubmissionList[0].inputData[2]?.value || cardData[pageNumber].userInput3,
            userInput4: userSubmissionList[0].inputData[3]?.value || cardData[pageNumber].userInput4,
            userInput5: userSubmissionList[0].inputData[4]?.value || cardData[pageNumber].userInput5,
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
              subKey: 5,
              type: 'TEXTAREA',
              value: cardData[pageNumber].userInput5,
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
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, [pageNumber]: { ...prev[pageNumber], userInput5: value } }));
    }
    changeData(pageNumber, 1, subKey + 1, value);
  };

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Green Volunteers: Step 3',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: '세운 계획을 발표하고, 친구들에게 함께하자고 제안해 봅시다.',
  };

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const data = [{ thText: '기관 · 장소' }, { thText: '일시' }, { thText: '활동 내용' }, { thText: '환경에 좋은 점' }];
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
    isNotEmptyString(cardData[pageNumber].userInput5 || '') &&
    Object.values(cardData[pageNumber].audioData!).every(value => value) &&
    Object.values(cardData[pageNumber].audioData!).length !== 0;
  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const toggleShowAnswer = () => {
    setIsShowAnswer(prev => !prev);
  };

  const recorderRef = useRef<IRecorderRef>(null);
  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L05/C04/A02',
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
              <Typography>I’m going to volunteer at </Typography>
              <Box flex={1}>
                <Input
                  value={cardData[pageNumber]?.userInput1}
                  onChange={e => handleInputChange(e.target.value, 0)}
                  placeholder={'e.g. Noeul Park'}
                  ariaLabel='답 입력란 1'
                  width='220px'
                  maxLength={999}
                  readOnly={cardData[pageNumber].isSubmitted}
                />{' '}
                <Input
                  value={cardData[pageNumber]?.userInput2}
                  onChange={e => handleInputChange(e.target.value, 1)}
                  placeholder={'e.g. June 5 at 10'}
                  ariaLabel='답 입력란 2'
                  width='240px'
                  maxLength={999}
                  readOnly={cardData[pageNumber].isSubmitted}
                />
              </Box>
            </Box>
            <Box vAlign='center' marginTop={'16px'}>
              <Typography>I’m going to</Typography>
              <Box flex={1}>
                <Input
                  value={cardData[pageNumber]?.userInput3}
                  onChange={e => handleInputChange(e.target.value, 2)}
                  placeholder={'e.g. plant trees there'}
                  ariaLabel='답 입력란 3'
                  width='615px'
                  maxLength={999}
                  readOnly={cardData[pageNumber].isSubmitted}
                />
              </Box>
            </Box>
            <Box vAlign='center' marginTop={'16px'}>
              <Typography>It’ll</Typography>
              <Box flex={1}>
                <Input
                  value={cardData[pageNumber]?.userInput4}
                  onChange={e => handleInputChange(e.target.value, 3)}
                  placeholder={'e.g. cool and clean the air'}
                  ariaLabel='답 입력란 4'
                  width='725px'
                  maxLength={999}
                  readOnly={cardData[pageNumber].isSubmitted}
                />
              </Box>
            </Box>
            <Box vAlign='center' marginTop={'16px'}>
              <Typography>It’ll also</Typography>
              <Box flex={1}>
                <Input
                  value={cardData[pageNumber]?.userInput5}
                  onChange={e => handleInputChange(e.target.value, 4)}
                  placeholder={'e.g. give a home and food to animals'}
                  ariaLabel='답 입력란 5'
                  width='665px'
                  maxLength={999}
                  readOnly={cardData[pageNumber].isSubmitted}
                />
              </Box>
            </Box>
            <Box vAlign='center' marginTop={'16px'}>
              <Typography>Why don't you join me?</Typography>
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
            <Table color={EStyleTableTypes.TERTIARY} sizes={['200px', '200px', '200px', '400px']}>
              <TableCaption caption='환경 보호 봉사 계획' hidden />
              <THead>
                {data.map(value => (
                  <TH vAlign='middle' color={EStyleTableTypes.TERTIARY} scope={'col'}>
                    {value.thText}
                  </TH>
                ))}
              </THead>
              <TBody>
                <TR></TR>
                <TR>
                  {data.map((__, index) => (
                    <TD color={EStyleTableTypes.DEFAULT} key={index}>
                      <Textarea
                        height='260px'
                        placeholder='내용을 넣어 주세요.'
                        ariaLabel={`답 입력란${index + 1}`}
                        value={
                          index === 0
                            ? cardData['P02'].userInput1
                            : index === 1
                            ? cardData['P02'].userInput2
                            : index === 2
                            ? cardData['P02'].userInput3
                            : index === 3
                            ? cardData['P02'].userInput4
                            : index === 4
                            ? cardData['P02'].userInput5
                            : ''
                        }
                        readOnly={true}
                      />
                    </TD>
                  ))}
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
