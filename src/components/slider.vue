<template>
    <div class="slider" ref="slider">
        <div class="process" :style="{width}"></div>
        <div class="sliderBtn" ref="sliderBtn" :style="{left}">
            <div class="block" @mousedown="moveSliderDown($event)" @mouseup="moveSliderUp"></div>
            <div class="tips" v-show="ifShowTips">
                <span>{{parseInt(scale*100)}}</span>
        </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, getCurrentInstance} from 'vue';
  const props = defineProps(['pieData','min','max'])
  const emit = defineEmits(['getWarningNum'])
  const pageInstance = getCurrentInstance();
  const slider = ref(null)
  const sliderBtn = ref(null)
  const per11 = ref(props.pieData)
  const ifShowTips = ref(false)
  let scale = computed(()=>{
    return ((per11.value - props.min) / (props.max - props.min)).toFixed(2);
  })
  let width = computed(()=>{
    if(slider.value){
        console.log(slider.value.offsetWidth,scale,'<<<<<<<<')
        return slider.value.offsetWidth * scale.value + 'px';
    }else{
        return 0 + 'px'
    }
    
  })
  let left = computed(()=>{
    if(slider.value){
        return slider.value.offsetWidth * scale.value -  sliderBtn.value.offsetWidth/2  + 'px';
    }else{
        return 0 + 'px'
    }
    
  })
  
  
  function moveSliderDown(e){
    console.log(e)
    ifShowTips.value = true
    var moveWidth = parseInt(width.value);
    var disX = e.clientX;
    document.onmousemove = function(e){
        var newWidth = e.clientX - disX + parseInt(moveWidth);
        var newScale = newWidth / slider.value.offsetWidth;
        var per
        per = Math.ceil((props.max - props.min) * newScale + props.min);
        per = Math.max(per,props.min);
        per = Math.min(per,props.max);
        per11.value = per
        console.log('11111',e.clientX,disX,parseInt(width.value),newWidth,newScale,per,per11.value)
    }
  }
  function moveSliderUp(e){
    ifShowTips.value = false
    emit('getWarningNum', per11.value)
    document.onmousemove = document.onmouseup = null;
  }
  onMounted(() => {
  })
</script>
<style lang="less" scoped>
  .box{
    margin:100px auto 0;
    width:80%;
  }
  .clear:after{
    content:'';
    display:block;
    clear:both;
  }
  .slider{
    position:relative;
    margin:20px 0;
    width:400px;
    height:10px;
    background:#e4e7ed;
    border-radius:5px;
    cursor:pointer;

    .process{
        position:absolute;
        left:0;
        top:0;
        width:112px;
        height:10px;
        border-radius:5px;
        background:rgb(147,114,241);
    }
    .sliderBtn{
        position:absolute;
        left:100px;
        top:-7px;
        width:20px;
        height:20px;
    }
    .block{
        width:20px;
        height:20px;
        border-radius:50%;
        border:2px solid rgba(167,142,242,.6);
        background:rgba(255,255,255,1);
        transition:.2s all;
    }

    .block:hover{
        transform:scale(1.1);
        opacity:.6;
    }
    .tips{
        position:absolute;
        left:-7px;
        bottom:-40px;
        min-width:15px;
        text-align:center;
        padding:4px 8px;
        background:#000;
        border-radius:5px;
        color:#fff;
        i{
            position:absolute;
            margin-left:-5px;
            left:50%;
            bottom:-9px;
            font-size:16px;
            color:#000;
        }
    }
  }
</style>

