<template>
  <div class="row justify-center">       
                
            <QImg 
                alt="Quasar logo"                     
                :src="getImageUrl('logo.svg')" 
                class="img"
                style="max-width: 150px;"
                :ratio="1"
            >   <QTooltip>
                {{"quasar: 2.11.5, quasar/extras: 1.15.9"}}
                </QTooltip>
            </QImg>
            <QImg 
                alt="Vue logo" 
                :src="getImageUrl('logo.png')" 
                class="img"
                :ratio="1"
                style="max-width: 150px;"
            >   <QTooltip>
                {{"vue 3.2.45,  vue-router: 4.1.6"}}
                </QTooltip>
            </QImg>
            <QImg 
                alt="Pinia logo" 
                :src="getImageUrl('pinia.png')" 
                class="img"
                :ratio="3/4"
                style="max-width: 112px;"
            >   <QTooltip>
                {{"pinia: 2.0.29"}}
                </QTooltip>
            </QImg>
            <QImg 
                alt="Sass logo" 
                :src="getImageUrl('sass-logo.png')" 
                class="img"
                :ratio="4/3"
                style="max-width: 200px;"
            >   <QTooltip>
                {{"sass: 1.57.1"}}
                </QTooltip>
            </QImg>
            <QImg 
                alt="Vite logo" 
                :src="getImageUrl('vite-logo.png')" 
                class="img"
                :ratio="1"
                style="max-width: 150px;"
            >   <QTooltip>
                {{"vite: 4.0.4, vitejs/plugin-vue: 4.0.0"}}
                </QTooltip>
            </QImg>
            <QImg 
                alt="TypeScript logo" 
                :src="getImageUrl('ts-logo.png')" 
                class="img"
                :ratio="4/3"
                style="max-width: 200px;"
            >   <QTooltip>
                {{"typescript: 4.9.4"}}
                </QTooltip>
            </QImg>    
       <div class="hint mobile-hide">{{"*hover to see versions"}}</div>    
    </div>
</template>

<script setup lang="ts">
const getImageUrl = (name: string) => {console.log('imgurl',`../assets/${name}`, import.meta.url,new URL(`../assets/${name}`, import.meta.url).href)
  return new URL(`../assets/${name}`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
    
    .hint {
        width: 111px;
        margin-bottom: 11px;
        margin: 11px 0 11px 11px;
        font-size: 11px;
        color: rgb(5, 49, 49);
        align-content: flex-start;
    }
    .col-auto { 
        .img {
            height: 150px;
        }
    }
    
    
    
</style>