import {
  Box,
  BoxWrap,
  IQuestionProps,
  Input,
  Label,
  Typography,
  Drawing,
  BottomSheet,
  Tag,
  ETagLine,
  EStyleButtonTypes,
  ICanvasFunction,
} from '@maidt-cntn/ui';
import { Container, MathExpression } from '@maidt-cntn/ui/math';
import { useEffect, useState, useRef } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { getUserSubmission, userSubmissionType } from '@maidt-cntn/api';
import { studentAtom } from '@/stores/student';
import { pageIdsAtom } from '@/stores/page';
import usePageData from '@/hooks/usePageData';
import { B03000850 } from './store';
import { dataURLToBlob } from '@maidt-cntn/util/CommonUtil';

const P01 = () => {
  const { changeData, initData, saveData, submitData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B03000850);
  const canvasRef = useRef<ICanvasFunction>(null);
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p01.isSubmitted ? (cardData.p01.isCorrect ? 'correct' : 'incorrect') : 'none',
    text: (
      <>
        <Box>
          <Box vAlign='center'>
            민주 어머니께서는 오늘 김치를 담그셨습니다. 김치를 오전에 27포기, 오후에 37포기 담그셨습니다. 오늘 담그신 김치를 옹기 한 개에 8포기씩
            담으려면 옹기는 몇 개 필요한지 풀이 과정을 쓰고 답을 구해 보세요.
          </Box>
        </Box>
      </>
    ),
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
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
        },
        {
          subKey: 3,
          type: 'TEXT',
          value: '',
        },
      ],
    },
  ];

  const tmpSaveCanvas = async () => {
    if (!canvasRef.current?.isCanvasBlank()) {
      const canvasDataURL = canvasRef.current?.getValue();
      if (canvasDataURL) {
        setCardData(prev => ({ ...prev, p01: { ...prev.p01, canvasDataURL: canvasDataURL } }));
        changeData('P01', 1, 3, canvasDataURL);
      }
    }
  };

  const init = async () => {
    const pageId = pageIds.find(page => page.page === 'P01')?.pageId;
    if (pageId) {
      const { userSubmissionList, isSubmitted } = await getUserSubmission(userId, pageId);
      if (userSubmissionList.length > 0) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            answer1: userSubmissionList[0].inputData[1]?.value || cardData.p01.answer1,
            canvasPath1: userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasPath1,
            canvasDataURL: userSubmissionList[0].inputData[2]?.value || cardData.p01.canvasDataURL,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
          },
        }));
        if (!isSubmitted) {
          //canvas image load from temp save
          if (userSubmissionList[0].inputData[2]?.value || cardData.p01.canvasDataURL) {
            if (userSubmissionList[0].inputData[2]?.value)
              canvasRef.current?.settingCanvasImageWithTempData(dataURLToBlob(userSubmissionList[0].inputData[2]?.value));
            else canvasRef.current?.settingCanvasImageWithTempData(dataURLToBlob(cardData.p01.canvasDataURL));
          }
        } else {
          //canvas image load from real save
          if (userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasPath1) {
            canvasRef.current?.settingCanvasImage({
              subjectCode: subjectCode,
              uploadPath: userSubmissionList[0].inputData[0]?.value || cardData.p01.canvasPath1,
            });
          }
        }
      }
      initData('P01', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = async () => {
    if (cardData.p01.isSubmitted) {
      setShow(!isShow);
    } else {
      const uploadCanvasImagePromise = canvasRef.current?.uploadCanvasImage({
        subjectCode: subjectCode,
        cardPath: '/B03/0008/50', //setting required based on card
        canvasIndex: 1,
        page: '01',
        userId: userId,
      });
      const isCorrect = cardData.p01.answer1 === cardData.p01.solution1;
      const canvasPath = await uploadCanvasImagePromise;
      const data = cardData.p01;
      if (canvasPath) {
        setCardData(prev => ({
          ...prev,
          p01: {
            ...prev.p01,
            canvasPath1: canvasPath ?? '',
            isSubmitted: true,
            isCorrect: isCorrect,
          },
        }));

        const userSubmission: userSubmissionType[] = [
          {
            mainKey: 1,
            inputData: [
              {
                subKey: 1,
                type: 'TEXT',
                value: canvasPath,
              },
              {
                subKey: 2,
                type: 'NUMBER',
                value: data.answer1,
                isAnswer: true,
                isCorrect,
              },
              {
                subKey: 3,
                type: 'TEXT',
                value: canvasPath,
              },
            ],
            isCorrect,
          },
        ];
        submitData('P01', userSubmission);
      }
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 2) {
      setCardData(prev => ({ ...prev, p01: { ...prev.p01, answer1: value } }));
    }
    changeData('P01', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P01');
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
      headerInfo={null}
      questionInfo={questionInfo}
      vAlign='flex-start'
      background={'var(--color-white)'}
      submitLabel={cardData.p01.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!cardData.p01.answer1}
      submitBtnColor={!cardData.p01.answer1 ? EStyleButtonTypes.SECONDARY : isShow ? EStyleButtonTypes.GRAY : EStyleButtonTypes.YELLOW}
      onSubmit={handleSubmit}
      useRound
    >
      <Box useFull justifyContent='flex-start' flexDirection='column' height={'224px'}>
        <Box vAlign='center' marginTop='10px'>
          <Box marginRight='8px' width={36} height={36} flex-basis={'content'}>
            <Typography
              useGap={false}
              fontSize='var(--font-size-28)'
              color='var(--color-yellow-800)'
              weight='var(--font-weight-semiBold)'
              align='center'
            >
              &nbsp;1
            </Typography>
            <Typography>민주 어머니께서 오늘 담그신 김치는 모두 몇 포기일까요?</Typography>
          </Box>
        </Box>
        <BoxWrap marginTop='10px' flex='1'>
          <Box marginRight='10px' marginTop='40px'>
            <Label
              value='풀이'
              color='var(--color-yellow-800)'
              background='var(--color-yellow-100)'
              lineColor='var(--color-yellow-700)'
              svgWidth={100}
            />
          </Box>
          <Box useFull>
            <Drawing width='800px' height='162px' ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p01.isSubmitted} />
          </Box>
        </BoxWrap>
        <BoxWrap justifyContent='flex-end' marginTop='24px'>
          <Box>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />{' '}
            <Input
              value={cardData.p01.answer1}
              onChange={event => handleChange(2, event.target.value)}
              readOnly={cardData.p01.isSubmitted}
              status={cardData.p01.isSubmitted && cardData.p01.answer1.trim() !== cardData.p01.solution1 ? 'error' : ''}
              placeholder=''
              ariaLabel='답란1'
              maxLength={2}
              type='number'
            />
            <Typography>포기</Typography>
          </Box>
        </BoxWrap>
      </Box>
      <BottomSheet
        height={'50%'}
        show={isShow}
        bottomSheetTargetId={'targetContainer'}
        closeOption={{
          useYn: true,
          onClose: () => {
            setShow(false);
          },
        }}
      >
        <Box background='lightGray' borderRadius='12px' marginTop='200px' padding='28px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography useGap={false}>64</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography useGap={false}>
                예{')'} 민주 어머니께서 오늘 담그신 김치는 오전에 담그신 김치 수 27과 오후에 담그신 김치 수 37의 합이므로{' '}
                <MathExpression equation={'$27+37=64$'} /> (포기)입니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P01;
