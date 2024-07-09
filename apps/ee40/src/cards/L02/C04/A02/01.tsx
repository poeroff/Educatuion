import { Box, PinchZoom, Image, Textarea, IQuestionProps, TMainHeaderInfoTypes, EStyleButtonTypes } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/en';
import { getCorrectData, getDefaultData } from './pageData';
import useCurrentPageData from '@/hooks/useCurrentPageData';
import useFile from '@/utils/fileDownLoad';

type PropsInfo = {
  headerInfo: TMainHeaderInfoTypes;
  questionInfo: IQuestionProps;
};

const INFO: PropsInfo = {
  headerInfo: {
    headerText: 'Class Theater',
    headerPattern: 'text',
  },
  questionInfo: {
    text: '바닷속을 여행한다면 무엇을 보고 싶나요?',
  },
};

const P01 = () => {
  const imageUrl = useFile('EE40', '/L02/C04/A02/EE4-L02-C04-A02-P01.png');
  const images = [
    {
      src: imageUrl?.[0] || '',
      alt: '주황색 잠수함이 물속을 항해하고 있는 모습이 그려져 있다. 잠수함 주변에는 여러 마리의 보라색 물고기들이 헤엄치고 있으며, 바닥에는 해초와 산호가 자라고 있다. 배경은 푸른색의 물과 물결을 나타내는 다양한 색조로 표현되어 있다.',
      title:
        '주황색 잠수함이 물속을 항해하고 있는 모습이 그려져 있다. 잠수함 주변에는 여러 마리의 보라색 물고기들이 헤엄치고 있으며, 바닥에는 해초와 산호가 자라고 있다. 배경은 푸른색의 물과 물결을 나타내는 다양한 색조로 표현되어 있다.',
    },
  ];

  const { getValueInputData, changeInputData, isSubmittedInput, submitPageData } = useCurrentPageData({
    initData: getDefaultData(1),
    collectDatas: getCorrectData(1),
  });

  const handleChangeInputData = (mainKey: number, subKey: string, value: string) => {
    changeInputData(mainKey, subKey, value);
  };

  const mainKey = 1;
  const isComplete: boolean = isSubmittedInput(mainKey, 'TEXT-01');
  const currentAnswer = getValueInputData(mainKey, 'TEXT-01');

  const validationCheck = () => {
    return currentAnswer === null || (typeof currentAnswer === 'string' && currentAnswer.trim().length === 0);
  };

  const completeQnA = () => {
    if (!isComplete) {
      submitPageData();
    }
  };

  return (
    <Container
      headerInfo={INFO.headerInfo}
      questionInfo={INFO.questionInfo}
      useExtend
      submitLabel={'완료하기'}
      submitBtnColor={!validationCheck() ? (isComplete ? EStyleButtonTypes.SECONDARY : EStyleButtonTypes.YELLOW) : EStyleButtonTypes.SECONDARY}
      submitDisabled={isComplete}
      onSubmit={completeQnA}
    >
      <Box useFull>
        <Box display='flex' gap='30px' justifyContent='center' alignItems='center' marginBottom='32px'>
          <PinchZoom>
            <Image src={images[0].src} alt={images[0].alt} height='360px' width='480px' title={images[0].title} style={{ borderRadius: '8px' }} />
          </PinchZoom>
          <Box width='480px' height='394px' hAlign='center' gap='24px'>
            <Textarea
              placeholder='내용을 넣어주세요.'
              value={currentAnswer as string}
              onChange={e => {
                handleChangeInputData(mainKey, 'TEXT-01', e.target.value);
              }}
              width='480px'
              height='180px'
              // fontSize='32px'
              // fontWeight='500'
              // lineHeight='48px'
              disabled={isComplete}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default P01;
