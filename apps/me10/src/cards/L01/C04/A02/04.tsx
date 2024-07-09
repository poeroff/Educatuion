import { useEffect, useRef, useState } from 'react';
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
  IRecorderRef,
  EStyleSizes,
  Typography,
  IAudioData,
  IUploadRecordData,
  SvgIcon,
  InputStatus,
  Image,
  makeAudioData,
} from '@maidt-cntn/ui';
import styled from '@emotion/styled';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { fulfillWithTimeLimit, isNotEmptyString } from '@maidt-cntn/util/CommonUtil';
import { Container } from '@maidt-cntn/ui/en';
import { L01C04A02 } from './store';
import { studentAtom } from '@/stores/student';
import { pageDataAtom, pageIdsAtom } from '@/stores/page';
import { useRecoilValue, useRecoilState } from 'recoil';
import usePageData from '@/hooks/usePageData';
import { handleDownload } from '@maidt-cntn/util/FileUtil';
import heart from '@/assets/icon/heart.svg';
import star from '@/assets/icon/star.svg';
import video from '@/assets/icon/video.svg';

const P04 = () => {
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const pageData = useRecoilValue(pageDataAtom);
  const [cardData, setCardData] = useRecoilState(L01C04A02);
  const { userId } = useRecoilValue(studentAtom);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const recorderRef = useRef<IRecorderRef>(null);

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'My Video Channel: Step 3',
    headerPattern: 'text',
  };
  const questionInfo = {
    text: '자신의 동영상 채널을 소개해 봅시다.',
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 2,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 5,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 6,
          type: 'TEXT',
          value: '',
        },
        {
          subKey: 7,
          type: 'AUDIO',
          value: {},
        },
      ],
    },
  ];

  const openModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const onSubmitAnswer = () => {
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT',
            value: cardData.p04.answer1,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 2,
            type: 'TEXT',
            value: cardData.p04.answer2,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 3,
            type: 'TEXT',
            value: cardData.p04.answer3,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 4,
            type: 'TEXT',
            value: cardData.p04.answer4,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 5,
            type: 'TEXT',
            value: cardData.p04.answer5,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 6,
            type: 'TEXT',
            value: cardData.p04.answer6,
            isAnswer: true,
            isCorrect: true,
          },
          {
            subKey: 7,
            type: 'AUDIO',
            value: {},
          },
        ],
      },
    ];

    if (pageData.find(value => value.page === 'P04')) {
      userSubmission[0].inputData = pageData.find(value => value.page === 'P04')!.userSubmission[0].inputData;
    }

    setCardData(prev => ({ ...prev, p04: { ...prev.p04, isSubmitted: true } }));
    submitData('P04', userSubmission);
  };

  const onSubmitRecorder = async (index: number) => {
    recorderRef.current?.onSubmitRecorderProcess({
      cardPath: 'L01/C04/A02',
      changeData,
      mainKey: 1,
      page: 'p04',
      setFunction: setCardData,
      subjectCode: 'ME10',
      subKey: index,
      userId,
    });
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P04')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        const newAudioData = await makeAudioData({
          originCardData: cardData.p04.audioData,
          userSubmissionList: userSubmissionList as userSubmissionType<IUploadRecordData>[],
          subjectCode: 'ME10',
        });

        setCardData(prev => ({
          ...prev,
          p04: {
            ...prev.p04,
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p04.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p04.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p04.answer3,
            answer4: userSubmissionList[0].inputData[3]?.value || cardData.p04.answer4,
            answer5: userSubmissionList[0].inputData[4]?.value || cardData.p04.answer5,
            answer6: userSubmissionList[0].inputData[5]?.value || cardData.p04.answer6,
            isSubmitted,
            audioData: newAudioData,
          },
        }));
      }
      initData('P04', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const checkBtnColorInput = () => {
    return (
      Object.values(cardData.p04.audioData!).every(value => value) &&
      Object.values(cardData.p04.audioData!).length !== 0 &&
      cardData.p04.answer1 &&
      isNotEmptyString(cardData.p04.answer1) &&
      cardData.p04.answer2 &&
      isNotEmptyString(cardData.p04.answer2) &&
      cardData.p04.answer3 &&
      isNotEmptyString(cardData.p04.answer3) &&
      cardData.p04.answer4 &&
      isNotEmptyString(cardData.p04.answer4) &&
      cardData.p04.answer5 &&
      isNotEmptyString(cardData.p04.answer5) &&
      cardData.p04.answer6 &&
      isNotEmptyString(cardData.p04.answer6)
    );
  };

  const checkDisableInput = () => {
    return (
      !(
        Object.values(cardData.p04.audioData!).every(value => value) &&
        Object.values(cardData.p04.audioData!).length !== 0 &&
        cardData.p04.answer1 &&
        isNotEmptyString(cardData.p04.answer1) &&
        cardData.p04.answer2 &&
        isNotEmptyString(cardData.p04.answer2) &&
        cardData.p04.answer3 &&
        isNotEmptyString(cardData.p04.answer3) &&
        cardData.p04.answer4 &&
        isNotEmptyString(cardData.p04.answer4) &&
        cardData.p04.answer5 &&
        isNotEmptyString(cardData.p04.answer5) &&
        cardData.p04.answer6 &&
        isNotEmptyString(cardData.p04.answer6)
      ) || cardData.p04.isSubmitted
    );
  };

  const handleInputChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer3: value } }));
    } else if (subKey === 4) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer4: value } }));
    } else if (subKey === 5) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer5: value } }));
    } else if (subKey === 6) {
      setCardData(prev => ({ ...prev, p04: { ...prev.p04, answer6: value } }));
    }
    changeData('P04', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P04');
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign={'flex-start'}
      submitBtnColor={
        checkBtnColorInput() ? (cardData.p04.isSubmitted ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.PRIMARY) : EStyleButtonTypes.SECONDARY
      }
      onSubmit={onSubmitAnswer}
      submitDisabled={checkDisableInput()}
      submitLabel={'완료하기'}
    >
      <Box background={'white'} useRound>
        <Scroll height='300px'>
          <Typography lineHeight='2'>
            Hi, I'm{' '}
            <Input
              maxLength={999}
              placeholder='e.g. Chris'
              name='value1'
              value={cardData.p04.answer1}
              width='259px'
              onChange={event => handleInputChange(1, event?.target.value)}
              readOnly={cardData.p04.isSubmitted}
            />
            . Nice to meet you.
            <br />I love{' '}
            <Input
              maxLength={999}
              placeholder='e.g. sports'
              name='value2'
              value={cardData.p04.answer2}
              width='259px'
              onChange={event => handleInputChange(2, event?.target.value)}
              readOnly={cardData.p04.isSubmitted}
            />
            . My favorite{' '}
            <Input
              maxLength={999}
              placeholder='e.g. sports'
              name='value3'
              value={cardData.p04.answer3}
              width='259px'
              onChange={event => handleInputChange(3, event?.target.value)}
              readOnly={cardData.p04.isSubmitted}
            />
            is{' '}
            <Input
              maxLength={999}
              placeholder='e.g. badminton'
              name='value4'
              value={cardData.p04.answer4}
              width='259px'
              onChange={event => handleInputChange(4, event?.target.value)}
              readOnly={cardData.p04.isSubmitted}
            />
            . <br />
            My videos are all about{' '}
            <Input
              maxLength={999}
              placeholder='e.g. badminton'
              name='value5'
              value={cardData.p04.answer5}
              width='259px'
              onChange={event => handleInputChange(5, event?.target.value)}
              readOnly={cardData.p04.isSubmitted}
            />
            . <br />
            Please visit my video channel "
            <Input
              maxLength={999}
              placeholder='e.g. BadminChris'
              name='value6'
              value={cardData.p04.answer6}
              width='259px'
              onChange={event => handleInputChange(6, event?.target.value)}
              readOnly={cardData.p04.isSubmitted}
            />
            ".
          </Typography>
        </Scroll>
      </Box>

      <BoxWrap justifyContent={'space-between'} marginTop={'24px'} width={'100%'}>
        <Box width={'30%'}></Box>
        <Box width={'30%'} hAlign='center'>
          <Recorder
            recorderIndex={7}
            initialData={cardData.p04.audioData?.[7]}
            readOnly={cardData.p04.isSubmitted}
            onSubmit={() => {
              onSubmitRecorder(7);
            }}
            ref={recorderRef}
          />
        </Box>
        <Box width={'30%'} hAlign='flex-end'>
          <Button
            label={'내 대답 보기'}
            color={EStyleButtonTypes.SECONDARY}
            size={EStyleSizes['SMALL']}
            minWidth='132px'
            useRound
            onClick={openModal}
            style={{ border: '1.5px var(--color-grey-500) solid', color: 'var(--color-grey-700)' }}
          />
        </Box>
      </BoxWrap>

      <Dialog width={1000} height={575} isShow={isShowModal} closeLabel='확인' onClose={closeModal} useFooter={true} confirmLabel='확인'>
        <Box height='100%'>
          <Scroll>
            <FullBox className={'FullBox'}>
              <BoxWrap boxGap={60} justifyContent='center' marginLeft={22}>
                <Box display='flex' flexDirection='column' marginTop={'4vh'}>
                  <Typography color='var(--color-white)' weight='var(--font-weight-bold)'>
                    Channel Name:
                  </Typography>
                  <Input
                    minWidth='263px'
                    placeholder='e.g. BadminChris'
                    value={cardData.p03.answer1}
                    status={!(cardData.p03.answer1 && isNotEmptyString(cardData.p03.answer1)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
                    readOnly={true}
                    ariaLabel='1번 답 입력란'
                  />
                </Box>
                <Box display='flex' flexDirection='column' marginTop={'4vh'}>
                  <Typography color='var(--color-white)' weight='var(--font-weight-bold)'>
                    My Name:
                  </Typography>
                  <Input
                    minWidth='263px'
                    placeholder='e.g. Chris'
                    value={cardData.p03.answer2}
                    status={!(cardData.p03.answer2 && isNotEmptyString(cardData.p03.answer2)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
                    readOnly={true}
                    ariaLabel='2번 답 입력란'
                  />
                </Box>
              </BoxWrap>
              <Box padding='0 40px' marginTop={50}>
                <Box vAlign='center'>
                  <SvgIcon src={heart} size='32px' style={{ margin: '10px' }} />
                  <Typography>Likes: I like</Typography>
                  <Box flex='1'>
                    <Input
                      minWidth='243px'
                      width='100%'
                      placeholder='e.g. sports'
                      value={cardData.p03.answer3}
                      status={!(cardData.p03.answer3 && isNotEmptyString(cardData.p03.answer3)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
                      readOnly={true}
                      ariaLabel='3번 답 입력란'
                    />
                  </Box>
                  &nbsp;.
                </Box>
                <Box vAlign='center' marginTop={10}>
                  <SvgIcon src={star} size='32px' style={{ margin: '10px' }} />
                  <Typography>Favorite: My Favorite</Typography>
                  <Box flex='1'>
                    <Input
                      minWidth='225px'
                      width='100%'
                      placeholder='e.g. sports'
                      value={cardData.p03.answer4}
                      status={!(cardData.p03.answer4 && isNotEmptyString(cardData.p03.answer4)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
                      readOnly={true}
                      ariaLabel='4번 답 입력란'
                    />
                  </Box>
                  <Typography>is</Typography>
                  <Box flex='1'>
                    <Input
                      minWidth='225px'
                      width='100%'
                      placeholder='e.g. badminton'
                      value={cardData.p03.answer5}
                      status={!(cardData.p03.answer5 && isNotEmptyString(cardData.p03.answer5)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
                      readOnly={cardData.p03.isSubmitted}
                      ariaLabel='5번 답 입력란'
                    />
                  </Box>
                  &nbsp;.
                </Box>
                <Box vAlign='center' marginTop={10}>
                  <SvgIcon src={video} size='32px' style={{ margin: '10px' }} />
                  <Typography>My video are about</Typography>
                  <Box flex='1'>
                    <Input
                      minWidth='243px'
                      width='100%'
                      placeholder='e.g. badminton'
                      value={cardData.p03.answer6}
                      status={!(cardData.p03.answer6 && isNotEmptyString(cardData.p03.answer6)) ? InputStatus.DEFAULT : InputStatus.ENABLE}
                      readOnly={cardData.p03.isSubmitted}
                      ariaLabel='6번 답 입력란'
                    />
                  </Box>
                  &nbsp;.
                </Box>
              </Box>
              <BackgroundImage>
                <Image src={'/L01/C04/A02/ME1-L01-C04-A02-P03.jpg'} alt='' width='940px' height='410px' />
              </BackgroundImage>
            </FullBox>
          </Scroll>
        </Box>
      </Dialog>
    </Container>
  );
};

const FullBox = styled.div`
  &.FullBox {
    position: relative;
    z-index: 10;
  }
`;

export const BackgroundImage = styled.div`
  position: absolute;
  z-index: -1;
  right: 0;
  top: 0;
`;

export default P04;
