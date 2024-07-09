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
  Dropdown,
  IQuestionProps,
  Tag,
  TMainHeaderInfoTypes,
  Typography,
} from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { useState } from 'react';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';

const P03 = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [mark, setMark] = useState<IQuestionProps['mark']>('none');
  const [openDropdown, setOpenDropdown] = useState<boolean[]>([false, false, false]);
  const [userAnswers, setUserAnswers] = useState<string[]>(['', '', '']);

  const answerList: string[] = ['homeless', 'locations', 'well-being'];
  const dropList: string[] = ['locations', 'homeless', 'well-being'];

  const headerInfo: TMainHeaderInfoTypes = {
    headerText: 'Listen and Answer',
  };

  const questionInfo: IQuestionProps = {
    text: 'Choose the correct words for the blanks.',
    mark: mark,
    markSize: 'middle',
  };

  const audioInfo: IAudioPlayerProps = {
    audioSrc: '/L01/C03/A02/HE2-L01-C03-A02-02.mp3',
    captionSrc: '/L01/C03/A02/HE2-L01-C03-A02-02.srt',
  };

  const dropdownType = 'up';

  const handleSubmitClick = () => {
    if (!submitted) {
      const newIsAnswerList: boolean[] = Object.values(userAnswers).map((userAnswer, index) => {
        return isAnswer(userAnswer, answerList[index]);
      });

      const isMarkAnswer = newIsAnswerList.every(isCorrect => isCorrect);

      isMarkAnswer ? setMark('correct') : setMark('incorrect');
      setSubmitted(true);
    } else {
      setIsBottomSheetOpen(!isBottomSheetOpen);
    }
  };

  const handleDropdownClick = (index: number, value: string | undefined) => {
    setOpenDropdown(openDropdown.map((val, idx) => idx + 1 === index));

    const newAnswer = [...userAnswers];
    if (value !== undefined) newAnswer[index - 1] = value;
    setUserAnswers(newAnswer);
  };

  return (
    <Container
      bodyId='targetContainer'
      headerInfo={headerInfo}
      questionInfo={questionInfo}
      audioInfo={audioInfo}
      vAlign='flex-start'
      submitLabel={submitted ? (isBottomSheetOpen ? '답안 닫기' : '답안 보기') : '채점하기'}
      submitDisabled={!submitted && Object.values(userAnswers).some(answer => answer === '')}
      submitBtnColor={
        !Object.values(userAnswers).some(answer => answer === '')
          ? isBottomSheetOpen
            ? EStyleButtonTypes.GRAY
            : EStyleButtonTypes.PRIMARY
          : EStyleButtonTypes.SECONDARY
      }
      onSubmit={handleSubmitClick}
      useExtend
    >
      <Image
        alt={'옆면에 강아지와 고양이 그림이 있는 앰뷸런스 모양의 버스와 동물 이동 장을 들고 유니폼을 입고 있는 수의사 남녀'}
        type={EImageType.IMG_BG}
        src={'/L01/C03/A02/HE2-L01-C03-A02-02-1.png'}
        width={'1000px'}
        height={'400px'}
      >
        <BoxWrap width={'1000px'} marginTop={'30px'}>
          <Box width={'240px'} useFull marginLeft={'10px'} marginTop={'30px'} marginRight={'0px'}>
            <Box marginTop={'50px'} hAlign={'center'}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'} size={EStyleFontSizes.MEDIUM}>
                Get to Know
              </Typography>
            </Box>
            <Box hAlign={'center'} vAlign={'center'}>
              <Box>
                <Typography useGap={false}>
                  <Typography useGap={false} weight={700} size={EStyleFontSizes.MEDIUM}>
                    the Vet Bus
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box width={'240px'} height={'350px'} marginRight={'0px'}>
            <Box hAlign={'center'}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                What is it?
              </Typography>
            </Box>
            <Box marginTop={'50px'}>
              <Typography useGap={false}>a mobile clinic</Typography>
            </Box>
            <Box>
              <Typography useGap={false}>designed for</Typography>
              <Typography useGap={false}>treating</Typography>
            </Box>
            <Box hAlign={'flex-start'} vAlign={'center'}>
              (1)
              <Dropdown
                isError={submitted && userAnswers[0] !== answerList[0]}
                width='185px'
                type={dropdownType}
                dropdownList={dropList}
                isOpen={openDropdown[0]}
                onClick={value => handleDropdownClick(1, value)}
                readOnly={submitted}
              />
            </Box>
            <Box hAlign={'flex-start'} vAlign={'center'}>
              <Typography useGap={false}>animals</Typography>
            </Box>
          </Box>
          <Box useFull width={'235px'} height={'350px'} marginRight={'5px'}>
            <Box hAlign={'center'}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                How does it
              </Typography>
            </Box>
            <Box hAlign={'center'}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                operate?
              </Typography>
            </Box>
            <Box marginTop={'20px'}>
              <Typography useGap={false}>travels every </Typography>
              <Typography useGap={false}>day to different</Typography>
            </Box>
            <Box hAlign={'flex-start'}>
              (2)
              <Dropdown
                isError={submitted && userAnswers[1] !== answerList[1]}
                width='185px'
                type={dropdownType}
                dropdownList={dropList}
                isOpen={openDropdown[1]}
                onClick={value => handleDropdownClick(2, value)}
                readOnly={submitted}
              />
            </Box>
            <Box>
              <Typography useGap={false}>to provide </Typography>
              <Typography useGap={false}>much-needed </Typography>
              <Typography useGap={false}>services</Typography>
            </Box>
          </Box>
          <Box width={'235px'} height={'350px'}>
            <Box hAlign={'center'}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                Why does it
              </Typography>
            </Box>
            <Box hAlign={'center'}>
              <Typography useGap={false} weight={'var(--font-weight-bold)'}>
                need support?
              </Typography>
            </Box>
            <Box marginTop={'20px'}>
              <Typography useGap={false}>to help improve </Typography>
            </Box>

            <Box>
              <Typography useGap={false}>the animals</Typography>
            </Box>
            <Box hAlign={'flex-start'}>
              (3)
              <Dropdown
                isError={submitted && userAnswers[2] !== answerList[2]}
                width='185px'
                type={dropdownType}
                dropdownList={dropList}
                isOpen={openDropdown[2]}
                onClick={value => handleDropdownClick(3, value)}
                readOnly={submitted}
              />
            </Box>
            <Typography useGap={false}>and create healthier environments</Typography>
          </Box>
        </BoxWrap>
      </Image>

      <BottomSheet bottomSheetTargetId='targetContainer' height='40%' show={isBottomSheetOpen}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px'>
            {answerList.map((item, index) => (
              <div key={index}>
                ({index + 1}) {item}
              </div>
            ))}
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

export default P03;
