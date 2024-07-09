import { EStyleButtonTypes, InputStatus, TMarkType } from '@maidt-cntn/ui';
import { isAnswer } from '@maidt-cntn/util/CommonUtil';
import { useCallback, useMemo, useState } from 'react';
type TLabelName = '채점하기' | '완료하기';
interface IUseMarking {
  answers: string[] | string[][];
  values: string[];
  labelName?: TLabelName;
}

export const useMarking = ({ answers, values, labelName = '채점하기' as TLabelName }: IUseMarking) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isShowAnswer, setShowAnswer] = useState<boolean>(false);
  const [mark, setMark] = useState<TMarkType>('none');
  const [status, setStatus] = useState<InputStatus[]>(Array(answers.length).fill(InputStatus.DEFAULT));
  const isAllFilled = useMemo(() => values.every(value => value.trim().length > 0), [values]);

  const handleSubmit = useCallback(() => {
    if (!submitted) {
      setSubmitted(true);

      const markings = values.map((value, index) => {
        const answer = answers[index];
        if (answer instanceof Array) {
          return answer.some(answer => isAnswer(value, answer));
        } else {
          return isAnswer(value, answers[index] as string);
        }
      });

      setStatus(list => list.map((_, idx) => (markings[idx] ? InputStatus.ENABLE : InputStatus.ERROR)));
      setMark(markings.every(warning => warning) ? 'correct' : 'incorrect');
    } else {
      setShowAnswer(!isShowAnswer);
    }
  }, [answers, isShowAnswer, submitted, values]);

  const buttonColor = useMemo(() => {
    if (submitted) {
      return isShowAnswer ? EStyleButtonTypes.GRAY : EStyleButtonTypes.PRIMARY;
    } else {
      return isAllFilled ? EStyleButtonTypes.PRIMARY : EStyleButtonTypes.SECONDARY;
    }
  }, [isAllFilled, isShowAnswer, submitted]);

  const submitLabel = useMemo(() => {
    return submitted ? (isShowAnswer ? '답안 닫기' : '답안 보기') : labelName;
  }, [isShowAnswer, labelName, submitted]);

  return {
    submitted,
    handleSubmit,
    mark,
    submitLabel,
    buttonColor,
    isShowAnswer,
    status,
  };
};
export default useMarking;
