import { InputStatus, TMarkType } from '@maidt-cntn/ui';
import * as math from 'mathjs';

/**
 *
 * @param str string 인지 확인
 * @returns true/false
 */
export const isValidString = (str: string) => {
  //console.log('isValidString : ', str != null && str.trim() !== '');
  const newStr = str || '';
  return typeof newStr === 'string' && newStr.trim() !== '';
};

/**
 *
 * @param str : 빈 공백 제거
 * @returns true/false
 */
export const removeSpaces = (str: string) => {
  //console.log('removeSpaces : ', str.split(' ').join(''));
  return str.split(' ').join('');
};

/**
 *
 * @param str 빈문자열 체크
 * @returns 빈문자열이 아니면 true/ 빈문자열 이면 false
 */
export const isNotEmptyString = (str: string) => {
  return isValidString(str) && removeSpaces(str) !== '';
};

/**
 *
 * @param expression1 식 1
 * @param expression2 식 2
 * @returns 식 1과 식 2 가 같으면 true / 다르면 false
 */
function isSameExpression(expression1: string, expression2: string) {
  type OperationTypes = '+' | '-' | '*' | '/';

  const numberList1 = expression1.split(/([+\-*/])/).filter(Boolean);
  const numberList2 = expression2.split(/([+\-*/])/).filter(Boolean);
  const operatorCount1 = countOperations(expression1);
  const operatorCount2 = countOperations(expression2);

  if (numberList1.length !== numberList2.length) {
    return false;
  }

  numberList1.sort();
  numberList2.sort();

  //정답과 식의 숫자가 다를 경우 false return
  if (!numberList1.every((val, index) => val === numberList2[index])) {
    return false;
  }

  //사칙연산 갯수가 다를 경우 false return /
  if (Object.keys(operatorCount1).some(key => operatorCount1[key as OperationTypes] !== operatorCount2[key as OperationTypes])) {
    return false;
  }

  return true;

  function countOperations(expression: string) {
    const operationCount: Record<OperationTypes, number> = {
      '+': 0,
      '-': 0,
      '*': 0,
      '/': 0,
    };

    for (let i = 0; i < expression.length; i++) {
      if (operationCount.hasOwnProperty(expression[i])) {
        operationCount[expression[i] as OperationTypes]++;
      }
    }

    return operationCount;
  }
}

/**
 *
 * @param inputString 식 문자열
 * @returns 식이 일치하면 true / 불일치 하면 false
 */
export const checkExpression = (inputString: string, answer: string) => {
  inputString = inputString.replace(' ', '').replace('×', '*').replace('÷', '/');
  answer = answer.replace(' ', '').replace('×', '*').replace('÷', '/');
  const expression1 = inputString.split('=')[0];
  const expression2 = inputString.split('=')[1];

  //등호가 없고 숫자만 있을 경우 false return
  if (!inputString.includes('=') && !isNaN(Number(expression1))) {
    return false;
  }

  // 둘 다 식일 경우 false return
  if (expression2 && isNaN(Number(expression1)) && isNaN(Number(expression2))) {
    return false;
  }

  //식과 정답이 다를 경우 false return
  if (expression2 && math.evaluate(expression1) !== math.evaluate(expression2)) {
    return false;
  }

  if (expression2) {
    if (!isSameExpression(expression1, answer.split('=')[0]) && !isSameExpression(expression2, answer.split('=')[0])) {
      return false;
    }
  } else {
    if (!isSameExpression(expression1, answer.split('=')[0])) {
      return false;
    }
  }

  return true;
};

/**
 * @param value
 * @summary 정답을 비교하기 위해 입력받은 값을 정제하는 함수.
 * @returns 정제된 value
 */
const processAnswer = (value: string) => {
  return value.replace(/\s+/g, ' ').toLowerCase().trim();
};

/**
 *
 * @param userAnswer 정답인지 확인할 문자열
 * @param correctAnswer 정답 문자열
 * @summary 정답인지 확인하는 함수. 정답이 복수개인 경우 처리 가능
 * @returns userAnswer가 correctAnswer에 해당하는 정답이면 true, 아니면 false
 */
export const isAnswer = (userAnswer: string, correctAnswer: string | string[]) => {
  // 복수 답안이 인정되는 경우 처리(aaa, bbb 모두 정답인 경우)
  if (Array.isArray(correctAnswer)) {
    return correctAnswer.some(correct => processAnswer(correct) === processAnswer(userAnswer));
  }
  return processAnswer(userAnswer) === processAnswer(correctAnswer);
};

/**
 *
 * @param userAnswer 정답인지 확인할 문자열
 * @param correctAnswer 정답 문자열
 * @summary 두 수의 합 또는 곱 수식이 정답인지 확인하는 함수. "1+2=3"과 같은 형태의 합 또는 곱 수식을 "1+2","2+1","2+1=3","1+2=3" 과 같게 처리
 * @returns userAnswer 수식이 answer에 해당하는 정답이면 true, 아니면 false
 */
export const isEquationAnswer = (userAnswer: string, correctAnswer: string) => {
  type Equation = {
    operands: number[];
    result: number | null;
    operator: string;
  };

  const normalize = (str: string): string => str.replace(/\s+/g, '');

  const parseEquation = (equation: string): Equation => {
    let operator = '+';

    if (equation.includes('+')) {
      operator = '+';
    } else if (equation.includes('×')) {
      operator = '×';
    }

    const [left, right] = equation.split('=');
    const operands = left.split(operator).map(Number);
    const result = right ? Number(right) : null;
    return { operands, result, operator };
  };

  const normalizedUserAnswer = normalize(userAnswer);
  const normalizedCorrectAnswer = normalize(correctAnswer);

  const userEquation = parseEquation(normalizedUserAnswer);
  const correctEquation = parseEquation(normalizedCorrectAnswer);

  const sortedUserOperands = userEquation.operands.sort((a, b) => a - b);
  const sortedCorrectOperands = correctEquation.operands.sort((a, b) => a - b);

  const operandsMatch = sortedUserOperands.join() === sortedCorrectOperands.join();
  const operatorsMatch = userEquation.operator === correctEquation.operator;

  const resultMatches =
    userEquation.result !== null ? userEquation.result === correctEquation.result : normalizedUserAnswer.includes('=') ? false : true;

  return operandsMatch && resultMatches && operatorsMatch;
};

/**
 *
 * @param userAnswers 사용자가 입력한 답안 배열
 * @param correctAnswer 정답 배열
 * @summary 답안이 여러개인 경우 각각의 문항을 채점해서 정답 여부를 boolean 배열로 반환
 * @returns 정답 여부를 담은 boolean 배열
 */
export const checkAnswers = (userAnswers: string[], correctAnswer: (string | string[])[]): boolean[] => {
  return userAnswers.map((answer, index) => {
    return isAnswer(answer, correctAnswer[index]);
  });
};

/**
 *
 * @param isSubmitted 답안 제출여부
 * @param isCorrect 답안 정답여부
 * @returns Question에 표시될 marking type string
 */
export const getMarking = (isSubmitted: boolean, isCorrect: boolean): TMarkType => {
  return isSubmitted ? (isCorrect ? 'correct' : 'incorrect') : 'none';
};

/**
 *
 * @param isSubmitted 답안 제출여부
 * @param value input 입력값
 * @returns Input의 status type을 반환
 */
export const getInputStatus = (isCorrect: boolean, value: string): InputStatus => {
  // Input 컴포넌트는 입력값이 없을 때 default, 오답일 경우 error, 그 외의 모든 경우 enable의 status를 가짐
  return !value ? InputStatus.DEFAULT : !isCorrect ? InputStatus.ERROR : InputStatus.ENABLE;
};

/**
 *
 * @param timeLimit task 함수 기다릴 시간
 * @param task 목표 한숨
 * @returns timeLimit 넘을시 "TIMEOUT" 해당 시간 안에 끝날시 task 의 결과값
 */
export const fulfillWithTimeLimit = async (timeLimit: number, maxCount: number, task: any) => {
  let count = 0;

  while (count < maxCount) {
    let timeout;
    const timeoutPromise = new Promise((resolve, reject) => {
      timeout = setTimeout(() => {
        resolve('TIMEOUT');
      }, timeLimit);
    });
    const response = await Promise.race([task, timeoutPromise]);

    if (response !== 'TIMEOUT') {
      clearTimeout(timeout);

      return response;
    }
    count += 1;
  }
};

/**
 *
 * @param userAnswer 사용자 입력 문자열
 * @param size 자르고 싶은 byte size (기본값 : 서술형 글자수 제한 정책인 2000 bytes)
 * @returns userAnswer를 원하는 바이트 크기(size)만큼 잘라서 반환
 */
export const truncateToMaxBytes = (userAnswer: string, size: number = 2000) => {
  const getByteSize = (str: string) => {
    let bytes = 0;
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if (charCode >= 0xac00 && charCode <= 0xd7a3) {
        bytes += 2;
      } else {
        bytes += encodeURIComponent(str[i]).length > 1 ? 2 : 1;
      }
    }
    return bytes;
  };

  const inputByteSize = getByteSize(userAnswer);
  let truncatedValue = userAnswer;

  if (inputByteSize > size) {
    let cutSize = 0;
    for (let i = 0; i < userAnswer.length; i++) {
      const charSize = getByteSize(userAnswer[i]);
      cutSize += charSize;
      if (cutSize > size) {
        truncatedValue = userAnswer.substring(0, i);
        break;
      }
    }
  }
  return truncatedValue;
};

/**
 *
 * @param value input 입력값
 * @returns value가 number이면 true
 */
export const isNumber = (value: string) => {
  return /^\d*$/.test(value);
};

/**
 * @param value[] value 입력값
 * @param answer[] answer 입력값
 * @returns value가 answer마다 일치하면 true
 */
export const areArraysEqualIgnoringCaseAndWhitespace = (value: string[], answer: string[]): boolean => {
  // 배열의 길이가 다르면 false 반환
  if (value.length !== answer.length) {
    return false;
  }

  // 배열의 모든 요소가 동일한지 확인 (공백 제거 및 대소문자 무시)
  return value.every((val, index) => isAnswer(val, answer[index]));
};

/**
 * @param tokenString string token 스트링 값
 * @returns 현재 시간과 파라미터로 받은 timestamp의 값이 4시간 이상 차이나면 true, 아니면 false
 */
export const isExpiredAccessToken = (tokenString: string): boolean => {
  const regex = /~exp=(\d+)/;
  const match = tokenString.match(regex);

  if (match) {
    const expiredTimestamp = parseInt(match[1], 10);
    const expiredTimestampInMilliseconds = expiredTimestamp * 1000;
    const currentTimestampInMilliseconds = new Date().getTime();
    if (currentTimestampInMilliseconds - expiredTimestampInMilliseconds > 0) return true;
    else return false;
  } else {
    return true; //expired 되었다고 가정
  }
};

/**
 * @param dataURL string
 * @returns Blob result from dataURL
 */
export const dataURLToBlob = (dataURL: string) => {
  const byteString = window.atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

/**
 * @param blob Blob
 * @param callback custom callback after dataURL result occurred
 */
export const blobToDataURL = (blob: Blob, callback: Function) => {
  const fileReader = new FileReader();
  fileReader.onload = e => {
    callback(e.target?.result);
  };
  fileReader.readAsDataURL(blob);
};

/**
 * @param answer 사용자가 입력한 답
 * @param solution 정답
 * @returns 입력한 정답의 숫자 사이에 공백이있으면 false, 그 외의 공백들은 solution과 비교하여 정답 처리
 * ' 35 x  2' 입력시 -> 정답 처리
 * ' 3 5 x 2' 입력시 -> 오답 처리
 */
export const isExpressionCorrect = (answer: string, solution: string | string[]) => {
  // 숫자 사이의 공백이 있다면 false 반환
  if (/\d\s+\d/.test(answer)) {
    return false;
  }

  // 입력한 값의 모든 공백을 제거
  const normalizedAnswer = answer.replace(/\s+/g, '');

  // solution이 배열인 경우, 배열의 요소 중 하나라도 일치하면 true 반환
  if (Array.isArray(solution)) {
    return solution.some(sol => normalizedAnswer === sol);
  }

  // solution이 단일 문자열인 경우, 문자열과 일치하는지 확인
  return normalizedAnswer === solution;
};
