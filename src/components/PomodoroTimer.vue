<template>
  <div class="w-full max-w-md mx-auto">
    <div class="flex items-center justify-center mb-4">
      <h1 class="text-3xl md:text-4xl font-bold text-center text-gray-800">
        番茄工作法时钟
      </h1>
    </div>
    <p class="text-gray-600 text-center mb-8">提升专注力，高效完成任务</p>

    <div class="tomato-container bg-white">
      <!-- 计时器显示区域 -->
      <div class="timer-display bg-gradient-to-r from-red-50 to-orange-50 py-10 px-6 text-center"
        :class="{ 'time-end': isTimeEnd }">
        <div class="text-7xl font-bold text-red-500 mb-4" id="timer">
          {{ formattedTime }}
        </div>
        <div class="text-xl font-medium text-gray-700 mb-2" id="status">
          {{ statusText }}
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden mx-auto max-w-xs">
          <div class="timer-progress h-full bg-red-500" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <!-- 控制面板 -->
      <div class="p-6">
        <div class="flex justify-center space-x-4 mb-8">
          <button @click="startTimer" :disabled="isRunning && !isPaused"
            class="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition duration-300 transform hover:scale-105 disabled:transform-none">
            <i class="fas fa-play mr-2"></i>{{ startButtonText }}
          </button>
          <button @click="pauseTimer" :disabled="!isRunning"
            class="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition duration-300 transform hover:scale-105 disabled:transform-none">
            <i class="fas fa-pause mr-2"></i>暂停
          </button>
          <button @click="resetTimer"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-8 rounded-full font-semibold shadow-lg transition duration-300 transform hover:scale-105">
            <i class="fas fa-redo mr-2"></i>重置
          </button>
        </div>

        <!-- 预设时间选择 -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">
            选择专注时长
          </h3>
          <div class="grid grid-cols-3 gap-3">
            <button v-for="preset in presetTimes" :key="preset.minutes" @click="setTime(preset.minutes)" :class="[
              'preset-btn bg-white border-2 border-red-200 text-red-500 py-3 rounded-lg font-medium hover:bg-red-50 transition-all',
              { 'active bg-red-100': totalMinutes === preset.minutes }
            ]">
              {{ preset.label }}
            </button>
          </div>
        </div>

        <!-- 自定义时间设置 -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">自定义时间</h3>
          <div class="flex">
            <input type="number" v-model.number="customMinutes" min="1" max="120" placeholder="输入分钟 (1-120)"
              class="custom-input flex-grow border-2 border-red-200 rounded-l-lg py-3 px-4 focus:outline-none focus:border-red-400"
              @keyup.enter="setCustomTime" />
            <button @click="setCustomTime"
              class="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-r-lg font-semibold transition">
              设置
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 番茄工作法说明 -->
    <div class="mt-8 bg-white p-6 rounded-2xl shadow-md">
      <h3 class="text-xl font-bold text-gray-800 mb-4">番茄工作法</h3>
      <p class="text-gray-600 mb-3">
        <i class="fas fa-check-circle text-red-500 mr-2"></i>选择一个任务，将番茄时间设为25分钟
      </p>
      <p class="text-gray-600 mb-3">
        <i class="fas fa-check-circle text-red-500 mr-2"></i>专注工作直到番茄时钟响起
      </p>
      <p class="text-gray-600 mb-3">
        <i class="fas fa-check-circle text-red-500 mr-2"></i>短暂休息5分钟，然后开始下一个番茄钟
      </p>
      <p class="text-gray-600">
        <i class="fas fa-check-circle text-red-500 mr-2"></i>每完成4个番茄钟，休息15-30分钟
      </p>
    </div>

    <!-- 音频提示 -->
    <audio ref="endSound" :src="endSoundUrl"></audio>
  </div>

  <!-- 开发者信息 -->
  <footer class="mt-12 pb-8 text-center">
    <div class="max-w-md mx-auto px-4">
      <div class="border-t border-gray-200 pt-6">
        <p class="text-gray-600 text-sm mb-2">
          本项目由 <span class="font-semibold color-blue"><a href="https://github.com/Jsmond2016" target="_blank"
              rel="noopener noreferrer">Jsmond2016</a></span> 开发
        </p>
        <div class="flex justify-center items-center space-x-4">
          <a href="https://github.com/Jsmond2016/PomoFocus" target="_blank" rel="noopener noreferrer"
            class="text-gray-600 hover:text-red-500 transition-colors duration-200 flex items-center space-x-1">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clip-rule="evenodd" />
            </svg>
            <span>GitHub 仓库</span>
          </a>
          <span class="text-gray-400">•</span>
          <span class="text-gray-500 text-sm">MIT License</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

// 音频文件URL
const endSoundUrl = 'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'

// 响应式数据
const totalSeconds = ref(25 * 60)
const remainingSeconds = ref(25 * 60)
const isRunning = ref(false)
const isPaused = ref(false)
const isTimeEnd = ref(false)
const customMinutes = ref<number | null>(null)

// 预设时间
const presetTimes = [
  { minutes: 25, label: '25分钟' },
  { minutes: 30, label: '30分钟' },
  { minutes: 45, label: '45分钟' }
]

// 计算属性
const totalMinutes = computed(() => Math.floor(totalSeconds.value / 60))
const formattedTime = computed(() => {
  const minutes = Math.floor(remainingSeconds.value / 60)
  const seconds = remainingSeconds.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const statusText = computed(() => {
  if (isTimeEnd.value) return '时间到！休息一下吧'
  if (isPaused.value) return '已暂停'
  if (isRunning.value) return '专注中...'
  return '准备开始'
})

const startButtonText = computed(() => {
  if (isPaused.value) return '继续'
  if (isRunning.value) return '继续'
  return '开始'
})

const progressPercent = computed(() => {
  return ((totalSeconds.value - remainingSeconds.value) / totalSeconds.value) * 100
})

// 计时器引用
let timer: number | null = null
const endSound = ref<HTMLAudioElement>()

// 方法
const startTimer = () => {
  if (isRunning.value && !isPaused.value) return

  if (isPaused.value) {
    isPaused.value = false
  } else {
    remainingSeconds.value = totalSeconds.value
  }

  isRunning.value = true
  isTimeEnd.value = false

  timer = window.setInterval(() => {
    remainingSeconds.value--

    if (remainingSeconds.value <= 0) {
      if (timer) clearInterval(timer)
      isRunning.value = false
      isTimeEnd.value = true

      // 播放提示音
      endSound.value?.play()

      return
    }
  }, 1000)
}

const pauseTimer = () => {
  if (!isRunning.value) return

  if (timer) clearInterval(timer)
  isRunning.value = false
  isPaused.value = true
}

const resetTimer = () => {
  if (timer) clearInterval(timer)
  isRunning.value = false
  isPaused.value = false
  remainingSeconds.value = totalSeconds.value
  isTimeEnd.value = false
}

const setTime = (minutes: number) => {
  totalSeconds.value = minutes * 60
  resetTimer()
}

const setCustomTime = () => {
  if (customMinutes.value && customMinutes.value >= 1 && customMinutes.value <= 120) {
    setTime(customMinutes.value)
    customMinutes.value = null
  } else {
    alert('请输入1-120之间的有效分钟数')
  }
}

// 清理
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

body {
  font-family: 'Noto Sans SC', sans-serif;
}

.tomato-container {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-radius: 24px;
  overflow: hidden;
}

.timer-display {
  transition: all 0.3s ease;
}

.timer-progress {
  transition: width 1s linear;
}

.preset-btn {
  transition: all 0.2s ease;
}

.preset-btn:hover {
  transform: translateY(-3px);
}

.preset-btn.active {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.custom-input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.time-end {
  animation: timeEnd 1s infinite alternate;
}

@keyframes timeEnd {
  from {
    background-color: #fee2e2;
  }

  to {
    background-color: #fecaca;
  }
}
</style>
