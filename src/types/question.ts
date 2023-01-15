interface Incorrect {
  in_correct: string
}

export default  interface Question {
  category: string,
  type: string,
  difficulty: string,
  question: string,
  key: string,
  correct_answer: string,
  incorrect_answers: Incorrect [],
  all_answers: Incorrect [],
}
    