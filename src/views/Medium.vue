<template>
  <div style="width: 100%">  
    <div class="q-pa-md">
     
      <QTable
        v-if="raw_questions"        
        :title="'Medium Multiple Choice'"
        :rows="questions[pagination.page - 1] || []"
        :columns="columns"
        row-key="name"
        style="min-width: 80vw;"
        v-model:pagination="pagination"
        hide-pagination
      >
      
      <template v-slot:header="props">
          <QTr :props="props">            
            <QTh
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.name }}
            </QTh>
          </QTr>
        </template>
        <template v-slot:body="props">
          <QTr :props="props" @click="props.expand = !props.expand; test(props.row)" style="cursor:pointer;">
           
            <QTd
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              :auto-width="false"
            >
              {{ col.value }}
            </QTd>
          </QTr>
          <QTr v-show="props.row.key === crr" :props="props">
            <QTd style="width: 8%;">    
                <QBtn 
                    :label="checked ? 'Reset' : 'Check'" 
                    type="button" 
                    color="primary"
                    @click="checkAnswer(props.row)"
                    style="display: block; margin-bottom: 4px;"
                    dense
                ></QBtn>
                <QBtn 
                    :label="'Close'" 
                    type="button" 
                    color="primary"
                    @click="closeRow()"
                    dense
                ></QBtn>
            </QTd>
            <QTd style="width: 92%;">         
                <div class="q-pa-md">                  
                  <QOptionGroup
                    v-if="props.row"
                    :options="props.row.all_answers"
                    type="radio"
                    v-model="answer"
                  />
                </div>
                <div v-show="checked" class="q-px-sm" :style="result ? 'color:green;' : 'color:red;'">
                  Your answer is: <strong>{{ result ? 'correct' : 'not correct' }}</strong>
                </div>
               
            </QTd>
            
          </QTr>
        </template>
      </QTable>
      <div class="row justify-center q-mt-md">
        <QPagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="sm"
        />
    </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">

import type Question from '@/types/question'
import { ref,  onMounted, computed, watch, watchEffect } from 'vue'
import {  useQuizStore } from '../stores'

  const quizStore = useQuizStore()  
  

  const columns = [
    { name: 'category', label: 'Category', field: 'category', sortable: true },
    { name: 'difficulty', label: 'Difficulty', field: 'difficulty', sortable: true },
    { name: 'question', label: 'Question', field: 'question', sortable: true },
  ]    
  
  const crr = ref('')
  const isAdding = ref(false)
  const answer = ref(null)
  const result = ref(false)
  const checked = ref(false)
  var q : Question[]
  var questions : typeof q[] = []
  const raw_questions = computed(() => quizStore.$state.medium_questions)
  const page_number = computed(() => pagination.value.page)
  const pagination = ref({
      sortBy: 'category',
      descending: false,
      page: 1,
      rowsPerPage: 10,      
      rowsNumber:  raw_questions.value.length
    })
  
  const pagesNumber = computed(() => Math.ceil(raw_questions.value.length / pagination.value.rowsPerPage))
  
  onMounted(async () => {   
    await quizStore.getQuestions('medium')
  })
  
    
  const checkAnswer = (row: Question) => {
    if(checked.value) {
      answer.value = null
      checked.value = false
    } else {
      result.value = row.correct_answer === answer.value ?  true : false  
      checked.value = true
    }
      
  }
  const closeRow = () => {
    console.log('close role')  
    crr.value = ''
    answer.value = null
    checked.value = false
  }
 
  const test = (p: Question) => {
    answer.value = null
    checked.value = false
    if(crr.value === p.key) {
      crr.value = ''
    } else {
      crr.value = p.key
    }
  }

  const chunkQuestions = () => {
    const raw = JSON.parse(JSON.stringify(raw_questions.value))
    console.log('watch raw q',raw_questions,raw)
    const chunks = Array.from({ length: Math.ceil(raw_questions.value.length / pagination.value.rowsPerPage) })
      .map(() => raw.splice(0, pagination.value.rowsPerPage));
      console.log('chunks',chunks)
      questions = chunks//[pagination.value.page]
      pagination.value.rowsNumber =  raw_questions.value.length
  }
  
  watch(raw_questions, () => {
    chunkQuestions()
  })

  watch(page_number,async () => {
    if(page_number.value > questions.length - 2) {
      await quizStore.getQuestions('medium')
      chunkQuestions()
    }
  })
  


</script>