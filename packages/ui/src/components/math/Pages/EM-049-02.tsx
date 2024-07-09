import styled from '@emotion/styled';
import { BottomSheet, Box, EStyleButtonTypes, ETagLine, IQuestionProps, Image, Label, List, Radio, Tag, Typography } from '@maidt-cntn/ui';
import { Container } from '@maidt-cntn/ui/math';
import { MouseEvent, ReactElement, ReactNode, useCallback, useState } from 'react';

interface IEM04902Props {
  questionInfo: IQuestionProps;
  image?: ReactElement<typeof Image>;
  options: ReactNode[];
  onChange: (value: string) => void;
  isSubmitted: boolean;
  onSubmit: () => void;
  solutionIndex: number;
  commentary: ReactNode;
  selectedValue?: number;
}

const EM04902 = ({ questionInfo, image, options, onChange, isSubmitted, onSubmit, solutionIndex, commentary, selectedValue }: IEM04902Props) => {
  const bodyId = 'EM04902';
  const [isShow, setShow] = useState<boolean>(false);

  const handleSubmit = () => {
    if (isSubmitted) {
      setShow(show => !show);
    } else {
      onSubmit();
    }
  };
  const submitLabel = isSubmitted ? (isShow ? '답안 닫기' : '답안 보기') : '채점하기';
  const submitButtonColor = isSubmitted
    ? isShow
      ? EStyleButtonTypes.GRAY
      : EStyleButtonTypes.YELLOW
    : selectedValue
    ? EStyleButtonTypes.YELLOW
    : EStyleButtonTypes.SECONDARY;

  const handleRadio = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      onChange(value);
    },
    [onChange],
  );
  return (
    <Container
      headerInfo={null}
      questionInfo={questionInfo}
      background={'var(--color-white)'}
      bodyId={bodyId}
      useRound
      vAlign='start'
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
      submitBtnColor={submitButtonColor}
      submitDisabled={!isSubmitted && !selectedValue}
    >
      <Box display='flex' alignItems='center' flexDirection='column'>
        {image && (
          <Box padding='24px' type='line' useRound useFull hAlign='center'>
            {image}
          </Box>
        )}
        <ListWrapper>
          <List align='horizontal' data={options}>
            {({ value, index }) => {
              const isCorrect = solutionIndex === index;
              return (
                <Radio
                  name='radio-group'
                  type='square'
                  value={selectedValue === index}
                  key={`radio-group-${index}`}
                  onClick={handleRadio}
                  label={`${index}`}
                  readOnly={isSubmitted}
                  isError={isSubmitted && !isCorrect}
                >
                  <Box display='flex' alignItems='center'>
                    <Label value={index} />
                    <Box>
                      <Typography>{value}</Typography>
                    </Box>
                  </Box>
                </Radio>
              );
            }}
          </List>
        </ListWrapper>
      </Box>

      <BottomSheet bottomSheetTargetId={bodyId} height='40%' show={isShow}>
        <Box background='lightGray' borderRadius='12px' marginTop='48px'>
          <Box>
            <Tag type={ETagLine.GREEN} label='답안' />
          </Box>
          <Box marginTop='12px' display='flex' flexDirection='column'>
            <Typography>{solutionIndex}</Typography>
          </Box>

          <Box marginTop={'10px'}>
            <Box>
              <Tag type={ETagLine.GREEN} label={'풀이'} />
            </Box>
            <Box marginTop='12px'>
              <Typography usePre>{commentary}</Typography>
            </Box>
          </Box>
        </Box>
      </BottomSheet>
    </Container>
  );
};

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  ul {
    height: 56px;
    line-height: 56px;
    display: flex;
    justify-content: space-between;
  }
`;

export default EM04902;
