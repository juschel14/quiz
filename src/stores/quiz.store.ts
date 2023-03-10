
import { defineStore } from 'pinia'
import { fetchWrapper } from '../helpers';
import type Question  from '../types/question'
import { useAuthStore } from '../stores';

const query = import.meta.env.VITE_API_URL
const token_URL = import.meta.env.VITE_TOKEN_URL
interface Response {
    response_code: number,
    results: Question[]
}
interface TokenResponse {
    response_code: number,
    token: Token
}
interface Token {
    token: null | string
}

interface QuizState {
    error: null | string,
    token: null | Token,
    easy_questions: [] | Question[],
    medium_questions: [] | Question[],
    hard_questions: [] | Question[],
    selected_difficulty: null | string,
}


export const useQuizStore = defineStore({
    id: 'quiz',    
    
    state: (): QuizState => {
        return {           
            easy_questions: [] as Question[],
            medium_questions: [] as Question[],
            hard_questions: [] as Question[],
            error: null,
            selected_difficulty: null,
            token: null
        }
     
    },
    actions: {
        resetError() {
            this.$state.error = null
        },
        async getToken() {
            try {
                const oke: TokenResponse = await fetchWrapper.fetchData(token_URL)
                if(oke.response_code === 0) {
                    this.$state.token = oke.token
                }
            } catch (error) {
                console.log('token? error',error)
            }
        },
        shuffleArray(array: any) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            let options = [] as any []
            array.forEach((string: string) => {
                let option = {label: string, value: string}
                options.push(option)
            })
            return options
        },
        sanitize(encoded: Question[]) {
            let ret =  [] as Question[]
            encoded.forEach( (obj: Question) => {
                try {
                    let cleaned = JSON.parse(decodeURIComponent(JSON.stringify(obj).replaceAll('%22','%47')))
                    let incorrect = cleaned.incorrect_answers.slice()                   
                    incorrect.push(cleaned.correct_answer)
                    cleaned['all_answers'] = this.shuffleArray(incorrect)
                    cleaned['key'] = cleaned.question
                    ret.push(cleaned)
                } catch(error) {
                    console.error(error)
                }                
            })
            return ret
        },
        async getQuestions(difficulty: string) {
            try {               
                this.$state.selected_difficulty = difficulty
                const tok = '&token=' + this.$state.token
                const response: Response = await fetchWrapper.fetchData(query + difficulty + tok)
                
                if(response.response_code === 0) {
                    const sanitized: Question[]  = await this.sanitize(response.results)
                    switch(difficulty) {
                        case 'easy':                            
                            if(this.$state.easy_questions.length === 0) {
                                this.$state.easy_questions = sanitized
                            } else {
                                sanitized.forEach((obj: Question) => {
                                    (this.$state.easy_questions as Question[]).push(obj)
                                })                                
                            }                            
                        break;
                        case 'medium':
                            if(this.$state.medium_questions.length === 0) {
                                this.$state.medium_questions = sanitized
                            } else {
                                sanitized.forEach((obj: Question) => {
                                    (this.$state.medium_questions as Question[]).push(obj)
                                })                                
                            }                            
                        break;
                        case 'hard':
                            if(this.$state.hard_questions.length === 0) {
                                this.$state.hard_questions = sanitized
                            } else {
                                sanitized.forEach((obj: Question) => {
                                    (this.$state.hard_questions as Question[]).push(obj)
                                })                                
                            }                               
                        break;
                    }
                    
                } else {
                    this.$state.error = 'fetching questions failed!'
                }
            } catch (error) {
                this.$state.error = JSON.stringify(error)
            }
        },
        deleteToken() {
            this.$state.token = null
        }
    }
});