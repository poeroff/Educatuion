import {
  BottomSheet,
  Box,
  BoxWrap,
  EImageType,
  EStyleButtonTypes,
  EStyleFontSizes,
  ETagLine,
  IAudioPlayerProps,
  Image,
  Input,
  IQuestionProps,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState, useEffect, ChangeEvent } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { L01C03A02a } from './store';
import { studentAtom } from '@/stores/student';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { pageIdsAtom } from '@/stores/page';

const P03 = () => {
  const PAGE_KEY = 'p03';
  const PAGE_NUM = 'P03';

  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L01C03A02a);
  const { userId } = useRecoilValue(studentAtom);

  const [isShow, setShow] = useState<boolean>(false);

  const displayAnswer = [
    '(1) Vet',
    '(2) clinic',
    '(3) homeless animals',
    '(4) different locations, different areas',
    '(5) well-being',
    '(6) environments',
  ];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Fill in the blanks using information from the talk.',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/HE2-L01-C03-A02-02.mp3',
    captionSrc: '/L01/C03/A02/HE2-L01-C03-A02-02.srt',
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const tempAnswers = [...cardData[PAGE_KEY].answers];
    tempAnswers[Number(name.split('_')[1])] = value;

    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], answers: [...tempAnswers] } }));
    changeData(PAGE_NUM, 1, 1, tempAnswers);
  };

  const handleSubmit = () => {
    if (cardData[PAGE_KEY].isSubmitted) {
      setShow(prev => !prev);
      return;
    }

    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: cardData[PAGE_KEY].answers,
            isAnswer: true,
          },
        ],
      },
    ];
    setCardData(prev => ({ ...prev, [PAGE_KEY]: { ...prev[PAGE_KEY], isSubmitted: true } }));
    submitData(PAGE_NUM, userSubmission);
  };

  const defaultSubmission: userSubmissionType[] = [
    {
      mainKey: 1,
      inputData: [
        {
          subKey: 1,
          type: 'TEXT_LIST',
          value: ['', '', '', '', '', '', '', ''],
          isAnswer: true,
        },
      ],
    },
  ];

  const init = async () => {
    const pageId = pageIds.find(page => page.page === PAGE_NUM)?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);

      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          [PAGE_KEY]: {
            ...prev[PAGE_KEY],
            answers: userSubmissionList[0]?.inputData[0]?.value || cardData[PAGE_KEY].answers,
            isSubmitted,
          },
        }));
      }
      initData(PAGE_NUM, userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    return () => {
      saveData(PAGE_NUM);
    };
  }, []);

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      submitLabel={cardData[PAGE_KEY].isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={!Array.isArray(cardData[PAGE_KEY].answers) || cardData[PAGE_KEY].answers?.some(answer => answer === '')}
      submitBtnColor={
        cardData[PAGE_KEY].isSubmitted
          ? isShow
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : !Array.isArray(cardData[PAGE_KEY].answers) || cardData[PAGE_KEY].answers.some(answer => answer === '')
          ? EStyleButtonTypes.SECONDARY
          : EStyleButtonTypes.PRIMARY
      }
      onSubmit={handleSubmit}
      useExtend
    >
      <Image
        alt={'옆면에 강아지와 고양이 그림이 있는 앰뷸런스 모양의 버스와 동물 이동 장을 들고 유니폼을 입고 있는 수의사 남녀'}
        type={EImageType.IMG_BG}
        src={'/L01/C03/A02/HE2-L01-C03-A02-02-1.png'}
        width={'1000px'}
        height={'400px'}
      >
        <BoxWrap width={'1000px'} marginTop={'15px'}>
          <Box width={'240px'} useFull marginLeft={'10px'} marginTop={'30px'} marginRight={'0px'}>
            <Box marginTop={'50px'} hAlign={'center'}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
                Get to Know
              </Typography>
            </Box>
            <Box hAlign={'flex-start'} vAlign={'center'}>
              <Box>
                <Typography useGap={false}>
                  <Typography useGap={false} weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
                    the{' '}
                  </Typography>
                  (1)
                </Typography>
              </Box>
              <Input
                name='input_0'
                marginLeft={10}
                minWidth={'130px'}
                value={cardData[PAGE_KEY].answers[0]}
                onChange={handleInputChange}
                maxLength={33}
                inputSize={'x-small'}
                readOnly={cardData[PAGE_KEY].isSubmitted}
                ariaLabel='1번 답란'
                width='100px'
              />
            </Box>
            <Box hAlign={'center'}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
                Bus
              </Typography>
            </Box>
          </Box>
          <Box width={'240px'} height={'350px'} marginRight={'0px'}>
            <Box hAlign={'center'} vAlign={'center'}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                What is it?
              </Typography>
            </Box>
            <Box marginTop={'45px'}>
              <Typography useGap={false}>a mobile</Typography>
            </Box>
            <Box hAlign={'flex-start'} vAlign={'center'}>
              (2)
              <Input
                name='input_1'
                minWidth={'150px'}
                marginLeft={10}
                value={cardData[PAGE_KEY].answers[1]}
                onChange={handleInputChange}
                maxLength={33}
                inputSize={'x-small'}
                readOnly={cardData[PAGE_KEY].isSubmitted}
                ariaLabel='2번 답란'
                width='170px'
              />
            </Box>
            <Box>
              <Typography useGap={false}>designed for</Typography>
              <Typography useGap={false}>treating</Typography>
            </Box>
            <Box hAlign={'flex-start'} vAlign={'center'}>
              (3)
              <Input
                name='input_2'
                minWidth={'150px'}
                marginLeft={10}
                value={cardData[PAGE_KEY].answers[2]}
                onChange={handleInputChange}
                maxLength={33}
                inputSize={'x-small'}
                readOnly={cardData[PAGE_KEY].isSubmitted}
                ariaLabel='3-1번 답란'
                width='170px'
              />
            </Box>
            <Box hAlign={'flex-start'} vAlign={'center'} marginTop={'5px'}>
              <Input
                name='input_3'
                minWidth={'150px'}
                value={cardData[PAGE_KEY].answers[3]}
                onChange={handleInputChange}
                maxLength={33}
                inputSize={'x-small'}
                readOnly={cardData[PAGE_KEY].isSubmitted}
                ariaLabel='3-2번 답란'
                width='170px'
              />
            </Box>
          </Box>
          <Box useFull width={'235px'} height={'350px'} marginRight={'5px'}>
            <Box hAlign={'center'} flexDirection='column'>
              <Typography useGap={false} align='center' lineHeight={'30px'} weight={'var(--font-weight-bold)'}>
                How does it operate?
              </Typography>
              {/* <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                operate?
              </Typography> */}
            </Box>
            {/* <Box hAlign={'center'}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                operate?
              </Typography>
            </Box> */}
            <Box marginTop={'5px'}>
              <Typography useGap={false}>travels every </Typography>
              <Typography useGap={false}>day to (4)</Typography>
            </Box>
            <Box>
              <Input
                name='input_4'
                minWidth={'160px'}
                value={cardData[PAGE_KEY].answers[4]}
                onChange={handleInputChange}
                maxLength={33}
                inputSize={'x-small'}
                readOnly={cardData[PAGE_KEY].isSubmitted}
                ariaLabel='4-1번 답란'
                width='170px'
              />
            </Box>
            <Box marginTop={'5px'}>
              <Input
                name='input_5'
                minWidth={'160px'}
                value={cardData[PAGE_KEY].answers[5]}
                onChange={handleInputChange}
                maxLength={33}
                inputSize={'x-small'}
                readOnly={cardData[PAGE_KEY].isSubmitted}
                ariaLabel='4-2번 답란'
                width='170px'
              />
            </Box>
            <Box>
              <Typography useGap={false}>to provide</Typography>
              <Typography useGap={false}>much-needed </Typography>
              <Typography useGap={false}>services</Typography>
            </Box>
          </Box>
          <Box width={'240px'} useFull height={'350px'}>
            <Box hAlign={'center'} flexDirection='column'>
              <Typography useGap={false} align='center' lineHeight={'30px'} weight={'var(--font-weight-bold)'}>
                Why does it <br />
                need support?
              </Typography>
            </Box>
            {/* <Box hAlign={'center'}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                need support?
              </Typography>
            </Box> */}
            <Box marginTop={'5px'}>
              <Typography useGap={false}>to help improve </Typography>
            </Box>

            <Box>
              <Typography useGap={false}>the animals</Typography>
            </Box>
            <Box hAlign={'flex-start'} vAlign={'center'}>
              (5)
              <Input
                name='input_6'
                minWidth={'160px'}
                marginLeft={10}
                value={cardData[PAGE_KEY].answers[6]}
                onChange={handleInputChange}
                maxLength={33}
                inputSize={'x-small'}
                readOnly={cardData[PAGE_KEY].isSubmitted}
                ariaLabel='5번 답란'
                width='170px'
              />
            </Box>
            <Typography useGap={false}>and create healthier</Typography>
            <Box hAlign={'flex-start'} vAlign={'center'}>
              (6)
              <Input
                name='input_7'
                minWidth={'160px'}
                marginLeft={10}
                value={cardData[PAGE_KEY].answers[7]}
                onChange={handleInputChange}
                maxLength={33}
                inputSize={'x-small'}
                readOnly={cardData[PAGE_KEY].isSubmitted}
                ariaLabel='6번 답란'
                width='170px'
              />
            </Box>
          </Box>
        </BoxWrap>
      </Image>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {displayAnswer.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
