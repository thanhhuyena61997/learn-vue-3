<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import dayjs from 'dayjs';
import { ref } from 'vue';
import * as isBetween from 'dayjs/plugin/isBetween';

//import { VueDraggableNext } from 'vue-draggable-next';
dayjs.extend(isBetween);

const userStore = useUserStore();
const message = ref<string>('');
const doSomething = () => {
  console.log(message.value.charAt(0).toLocaleUpperCase() + message.value.slice(1));
};
const list = [
  {
    name: 'task 1',
    tasks: [
      {
        name: 'task 2',
        tasks: []
      }
    ]
  },
  {
    name: 'task 3',
    tasks: [
      {
        name: 'task 4',
        tasks: []
      }
    ]
  },
  {
    name: 'task 5',
    tasks: []
  }
];

const log = event => {
  console.log(event);
};

const day = dayjs('2010-10-20').isBetween('2010-10-19', dayjs('2010-10-25'), 'year');
console.log(day);

const array = [15, 16, 17, 18, 19];

//TH: có initial value
//accumulator => returns cái gì thì biến sẽ lưu cái đó, giá trị lần chạy đầu tiên = initial value
//currentValue => giá trị đầu tiên của mảng

//TH: ko có initial value
//accumulator => returns cái gì thì biến sẽ lưu cái đó, giá trị lần chạy đầu tiên = giá trị đầu tiên của mảng
//currentValue => giá trị thứ 2 của mảng

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`
  );
  return returns;
}

array.reduce(reducer, 0);
</script>

<template>
  <h1>About component</h1>
  <p v-if="userStore.getInfo?.credential">pinia not null</p>

  <div @click="doSomething">Do something</div>
  <a-input v-model:value="message" placeholder="Enter input here" />
  <p>The message is: {{ message }}</p>
  <div class="flex m-10"></div>
</template>
<style lang="scss" scoped></style>
