import { useEffect, useRef, useState } from 'react';

import {
  IQuestionProps,
  TMainHeaderInfoTypes,
  BoxWrap,
  Textarea,
  Box,
  EStyleButtonTypes,
  ETagLine,
  BottomSheet,
  Tag,
  Typography,
  ICanvasFunction,
  Drawing,
  EImageType,
  Image,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import usePageData from '@/hooks/usePageData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import { L07C04A02 } from './store';
import { dataURLToBlob, isNotEmptyString, truncateToMaxBytes } from '@maidt-cntn/util/CommonUtil';

const defaultSubmission: userSubmissionType[] = [
  {
    mainKey: 1,
    inputData: [
      {
        subKey: 1,
        type: 'TEXT_LIST',
        value: ['', '', ''],
        isAnswer: true,
      },
      {
        subKey: 2,
        type: 'CANVAS',
        value: '',
      },
    ],
  },
];

const P02 = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { changeData, initData, submitData, saveData } = usePageData();
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(L07C04A02);
  const { userId } = useRecoilValue(studentAtom);
  const canvasRef = useRef<ICanvasFunction>(null);
  const backgroundImg = `/L07/C04/A02/ME1-L07-C04-A02-P02.jpg`;
  const headerInfo: TMainHeaderInfoTypes = {
    headerPattern: 'text',
    headerText: 'About Animals: Step2',
  };

  const questionInfo: IQuestionProps = {
    text: '조사한 동물의 흥미로운 사실을 정리해 봅시다.',
  };

  const handleChangeInput = (value: string, index: number) => {
    const updatedAnswers = cardData.p02.answer?.map((ans, idx) => (idx === index ? truncateToMaxBytes(value) : ans));
    setCardData(prev => ({
      ...prev,
      p02: {
        ...prev.p02,
        answer: updatedAnswers,
      },
    }));
    changeData('P02', 1, 1, updatedAnswers);
  };

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, canvasDataURL: canvasDataURL } }));
        changeData('P02', 1, 2, canvasDataURL);
      }
    }
  };

  const isSubmitDisabled = !cardData.p02.answer?.every(val => isNotEmptyString(val));

  const onSubmitAnswer = () => {
    if (cardData.p02.isSubmitted) {
      setIsOpen(!isOpen);
      return;
    }
    const data = cardData.p02;
    const canvasDataURL = canvasRef.current?.getValue();
    if (canvasDataURL) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, canvasDataURL: canvasDataURL, isSubmitted: true } }));
    }
    const userSubmission: userSubmissionType[] = [
      {
        mainKey: 1,
        inputData: [
          {
            subKey: 1,
            type: 'TEXT_LIST',
            value: data.answer,
            isAnswer: true,
          },
          {
            subKey: 2,
            type: 'CANVAS',
            value: canvasDataURL,
          },
        ],
      },
    ];

    submitData('P02', userSubmission);
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P02')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
            answer: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer,
            canvasDataURL: userSubmissionList[0].inputData[1]?.value || cardData.p02.canvasDataURL,
            isSubmitted,
          },
        }));
        if (userSubmissionList[0].inputData[1]?.value || cardData.p02.canvasDataURL) {
          if (userSubmissionList[0].inputData[1]?.value)
            canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(userSubmissionList[0].inputData[1]?.value));
          else {
            cardData.p02.canvasDataURL && canvasRef.current?.settingCanvasImageWithBlobs(dataURLToBlob(cardData.p02.canvasDataURL));
          }
        }
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  useEffect(() => {
    if (pageIds.length > 0) {
      init();
    }
  }, [pageIds]);

  useEffect(() => {
    return () => {
      saveData('P02');
    };
  }, []);

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      vAlign='flex-start'
      onSubmit={onSubmitAnswer}
      submitLabel={cardData.p02.isSubmitted ? (isOpen ? '답안 닫기' : '답안 보기') : '완료하기'}
      submitDisabled={isSubmitDisabled}
      submitBtnColor={isSubmitDisabled ? EStyleButtonTypes.SECONDARY : isOpen ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY}
    >
      <BoxWrap marginTop='14px'>
        <BoxWrap width='calc(50% - 22px)' flexDirection='column' justifyContent='center' marginRight='0'>
          <Box marginTop='0' marginRight='0'>
            <Textarea
              width='414px'
              height='94px'
              placeholder='e.g. big easters'
              ariaLabel='조사한 동물의 흥미로운 사실 예시를 적어주세요. for example. big easters'
              readOnly={cardData.p02.isSubmitted}
              value={cardData.p02.answer?.[0]}
              onChange={e => handleChangeInput(e.target.value, 0)}
            />
          </Box>

          <Box marginTop='16px' marginRight='0'>
            <Textarea
              width='414px'
              height='94px'
              placeholder='e.g. Baby pandas are pink.'
              ariaLabel='조사한 동물의 흥미로운 사실 예시를 적어주세요. for example. Baby pandas are pink.'
              readOnly={cardData.p02.isSubmitted}
              value={cardData.p02.answer?.[1]}
              onChange={e => handleChangeInput(e.target.value, 1)}
            />
          </Box>

          <Box marginTop='16px' marginRight='0'>
            <Textarea
              width='414px'
              height='94px'
              placeholder='e.g. Pandas can swim.'
              ariaLabel='조사한 동물의 흥미로운 사실 예시를 적어주세요. for example. Pandas can swim.'
              readOnly={cardData.p02.isSubmitted}
              value={cardData.p02.answer?.[2]}
              onChange={e => handleChangeInput(e.target.value, 2)}
            />
          </Box>
        </BoxWrap>
        <Box width={'50%'} position='relative'>
          <Image width='482px' height='378px' type={EImageType.IMG_BG} src={backgroundImg}></Image>
          <Box position='absolute' top='48px' useRound width='482px' height='250px' textAlign='center'>
            <Typography fontSize='24px'>Draw animals</Typography>
          </Box>
          <Box position='absolute' top='60px' left='45px'>
            <Drawing height='250px' width='402px' ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p02.isSubmitted} />
          </Box>

          {/* </Box> */}
        </Box>
      </BoxWrap>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label={'예시 답안'} />
          </Box>
          <Box marginTop='12px'>
            <Typography usePre>{`* Pandas\n- big eaters\n- Baby pandas are pink.\n- Pandas can swim.`}</Typography>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
