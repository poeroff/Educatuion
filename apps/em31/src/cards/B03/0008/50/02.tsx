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

const P02 = () => {
  const { changeData, initData, saveData, submitData } = usePageData();
  const { userId } = useRecoilValue(studentAtom);
  const pageIds = useRecoilValue(pageIdsAtom);
  const [cardData, setCardData] = useRecoilState(B03000850);
  const canvasRef = useRef<ICanvasFunction>(null);
  const subjectCode = import.meta.env.VITE_APP_CODE.toUpperCase();
  const [isShow, setShow] = useState<boolean>(false);

  const questionInfo: IQuestionProps = {
    type: 'icon',
    mark: cardData.p02.isSubmitted ? (cardData.p02.isCorrect ? 'correct' : 'incorrect') : 'none',
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
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
        },
        {
          subKey: 2,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
        },
        {
          subKey: 3,
          type: 'NUMBER',
          value: 0,
          isAnswer: false,
        },
        {
          subKey: 4,
          type: 'TEXT',
          value: '',
          isAnswer: false,
        },
        {
          subKey: 5,
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
        setCardData(prev => ({ ...prev, p02: { ...prev.p02, canvasDataURL: canvasDataURL } }));
        changeData('P02', 1, 5, canvasDataURL);
      }
    }
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
            answer1: userSubmissionList[0].inputData[0]?.value || cardData.p02.answer1,
            answer2: userSubmissionList[0].inputData[1]?.value || cardData.p02.answer2,
            answer3: userSubmissionList[0].inputData[2]?.value || cardData.p02.answer3,
            canvasPath1: userSubmissionList[0].inputData[3]?.value || cardData.p02.canvasPath1,
            isSubmitted,
            isCorrect: isSubmitted ? userSubmissionList[0].isCorrect : false,
            canvasDataURL: userSubmissionList[0].inputData[4]?.value || cardData.p02.canvasDataURL,
          },
        }));

        if (!isSubmitted) {
          //canvas image load from temp save
          if (userSubmissionList[0].inputData[4]?.value || cardData.p02.canvasDataURL) {
            if (userSubmissionList[0].inputData[4]?.value)
              canvasRef.current?.settingCanvasImageWithTempData(dataURLToBlob(userSubmissionList[0].inputData[4]?.value));
            else canvasRef.current?.settingCanvasImageWithTempData(dataURLToBlob(cardData.p02.canvasDataURL));
          }
        } else {
          //canvas image load from real save
          if (userSubmissionList[0].inputData[3]?.value || cardData.p02.canvasPath1) {
            canvasRef.current?.settingCanvasImage({
              subjectCode: subjectCode,
              uploadPath: userSubmissionList[0].inputData[3]?.value || cardData.p02.canvasPath1,
            });
          }
        }
      }
      initData('P02', userSubmissionList, defaultSubmission, isSubmitted);
    }
  };

  const handleSubmit = async () => {
    if (cardData.p02.isSubmitted) {
      setShow(!isShow);
    } else {
      const uploadCanvasImagePromise = canvasRef.current?.uploadCanvasImage({
        subjectCode: subjectCode,
        cardPath: '/B03/0008/50', //setting required based on card
        canvasIndex: 1,
        page: '02',
        userId: userId,
      });
      const isCorrect =
        cardData.p02.answer1 === cardData.p02.solution1 &&
        cardData.p02.answer2 === cardData.p02.solution2 &&
        cardData.p02.answer3 === cardData.p02.solution3;
      const canvasPath = await uploadCanvasImagePromise;
      const data = cardData.p02;
      if (canvasPath) {
        setCardData(prev => ({
          ...prev,
          p02: {
            ...prev.p02,
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
                type: 'NUMBER',
                value: data.answer1,
                isAnswer: true,
                isCorrect,
              },
              {
                subKey: 2,
                type: 'NUMBER',
                value: data.answer2,
                isAnswer: true,
                isCorrect,
              },
              {
                subKey: 3,
                type: 'NUMBER',
                value: data.answer3,
                isAnswer: true,
                isCorrect,
              },
              {
                subKey: 4,
                type: 'TEXT',
                value: canvasPath,
                isAnswer: true,
                isCorrect,
              },
              {
                subKey: 5,
                type: 'TEXT',
                value: '',
              },
            ],
            isCorrect,
          },
        ];
        submitData('P02', userSubmission);
      }
    }
  };

  const handleChange = (subKey: number, value: string) => {
    if (subKey === 1) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer1: value } }));
    } else if (subKey === 2) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer2: value } }));
    } else if (subKey === 3) {
      setCardData(prev => ({ ...prev, p02: { ...prev.p02, answer3: value } }));
    }
    changeData('P02', 1, subKey, value);
  };

  useEffect(() => {
    return () => {
      saveData('P02');
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
      submitLabel={cardData.p02.isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!(cardData.p02.answer1 && cardData.p02.answer3 && cardData.p02.answer2)}
      submitBtnColor={
        !(cardData.p02.answer1 && cardData.p02.answer3 && cardData.p02.answer2)
          ? EStyleButtonTypes.SECONDARY
          : isShow
          ? EStyleButtonTypes.GRAY
          : EStyleButtonTypes.YELLOW
      }
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
              &nbsp;2
            </Typography>
            <Typography>필요한 옹기 수를 구하는 식을 써 보세요.</Typography>
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
            <Drawing width='800px' height='162px' ref={canvasRef} tmpSave={tmpSaveCanvas} disabled={cardData.p02.isSubmitted} />
          </Box>
        </BoxWrap>
        <BoxWrap justifyContent='flex-end' marginTop='24px'>
          <Box>
            <Label value='답' color='var(--color-yellow-800)' background='var(--color-yellow-100)' lineColor='var(--color-yellow-700)' />{' '}
            <Input
              value={cardData.p02.answer1}
              onChange={event => handleChange(1, event.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={cardData.p02.isSubmitted && cardData.p02.answer1.trim() !== cardData.p02.solution1 ? 'error' : ''}
              placeholder=''
              ariaLabel='답란1'
              width='160px'
              maxLength={2}
              type='number'
            />
            <Typography>
              <MathExpression equation={'$\\div$'} />
            </Typography>
            <Input
              value={cardData.p02.answer2}
              onChange={event => handleChange(2, event.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={cardData.p02.isSubmitted && cardData.p02.answer2.trim() !== cardData.p02.solution2 ? 'error' : ''}
              placeholder=''
              ariaLabel='답란2'
              width='80px'
              maxLength={1}
              type='number'
            />
            <Typography>
              <MathExpression equation={'$=$'} />
            </Typography>
            <Input
              value={cardData.p02.answer3}
              onChange={event => handleChange(3, event.target.value)}
              readOnly={cardData.p02.isSubmitted}
              status={cardData.p02.isSubmitted && cardData.p02.answer3.trim() !== cardData.p02.solution3 ? 'error' : ''}
              placeholder=''
              ariaLabel='답란3'
              width='80px'
              maxLength={1}
              type='number'
            />
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
              <Typography useGap={false}>64, 8, 8</Typography>
            </Box>
          </Box>
          <Box position='relative' marginTop='40px'>
            <Tag type={ETagLine.GREEN} label='풀이' />
            <Box display={'flex'} flexDirection={'column'} marginTop='12px' gap={'20px'}>
              <Typography useGap={false}>
                예{')'} 필요한 옹기 수는 오늘 담그신 김치 수를 옹기 한 개에 담으려는 김치 수로 나눈 몫입니다. 따라서 필요한 옹기 수를 구하는 데 필요한
                식은 <MathExpression equation={'$64\\div8=8$'} />
                입니다.
              </Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P02;
