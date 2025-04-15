<style lang="scss" scoped>
.EasyEcharts {
  background-color: transparent;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  position:relative;
  overflow: hidden;
  section {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
</style>

<template>
  <div class="EasyEcharts" ref="chart-wrapper">
    <section ref="chart-ref"></section>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue';
import type { EasyEchartsController } from './lib';
import { observeDomResize } from '@bestime/utils_browser';
import { uuid } from '@bestime/utils_base';
type EChartsOption = echarts.EChartsOption;

const props = defineProps<{  
  controller: EasyEchartsController
}>()

const oChart = useTemplateRef('chart-ref')
const oWrapper = useTemplateRef('chart-wrapper')
let iChart:echarts.ECharts|undefined;
let obs: ReturnType<typeof observeDomResize> | undefined
const vmId = uuid(15)
onMounted(function () {  
  iChart = echarts.init(oChart.value);
  props.controller._setChart(vmId, iChart);

  obs = observeDomResize(oWrapper.value!, function () {    
    iChart?.resize()
  }, ['height', 'width'])
})

onBeforeUnmount(function () {
  props.controller._dispose(vmId)
  obs?.()
  if(iChart && !iChart.isDisposed) {
    iChart.clear()
    iChart.dispose()
  }
})

</script>