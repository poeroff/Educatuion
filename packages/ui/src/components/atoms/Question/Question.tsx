import { IWAI } from '@emotion/react';
import Style from './Question.style.';
import Mark from '../Mark/Mark';
import { TMarkType } from '@/type/Question/QuestionType';
import { TSubject } from '@/type/Layout';

export type TQuestionTypes = 'text' | 'number' | 'icon' | 'dot';

export interface IQuestionProps extends IWAI {
  subject?: TSubject;
  size?: 'small' | 'medium' | 'large';
  type?: TQuestionTypes;
  number?: string;
  text?: React.ReactNode;
  mark?: TMarkType;
  markSize?: 'middle' | 'large';
  markPosition?: string;
}

export const Question = ({
  subject = 'en',
  size = 'large',
  type = 'text',
  number = '',
  text = '',
  mark,
  markSize,
  markPosition,
  children,
}: IQuestionProps & { children?: React.ReactNode }) => {
  const contents = () => {
    switch (size) {
      case 'large':
        return (
          <Style.QuestionLarge type={type}>
            {type === 'number' && <Style.QuestionNum size='large'>{number}</Style.QuestionNum>}
            {children || text}
          </Style.QuestionLarge>
        );
      case 'medium':
        return (
          <Style.QuestionMedium type={type}>
            {type === 'number' && <Style.QuestionNum size='medium'>{number}</Style.QuestionNum>}
            {type === 'dot' && <Style.QuestionDot />}
            {children || text}
          </Style.QuestionMedium>
        );
      default:
        return (
          <Style.Question subject={subject} type={type}>
            {type === 'dot' && <Style.QuestionDot height={40} />}
            {children || text}
          </Style.Question>
        );
    }
  };
  return (
    <Mark type={mark} size={markSize} markPosition={markPosition}>
      {contents()}
    </Mark>
  );
};

export default Question;
