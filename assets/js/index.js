document.addEventListener("DOMContentLoaded", function () {
  // DOM元素
  const timerDisplay = document.getElementById("timer");
  const statusDisplay = document.getElementById("status");
  const progressBar = document.querySelector(".timer-progress");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const presetBtns = document.querySelectorAll(".preset-btn");
  const customTimeInput = document.getElementById("customTime");
  const setCustomBtn = document.getElementById("setCustomBtn");
  const endSound = document.getElementById("endSound");

  // 计时器变量
  let timer;
  let isRunning = false;
  let isPaused = false;
  let totalSeconds = 25 * 60; // 默认25分钟
  let remainingSeconds = totalSeconds;
  let progressPercent = 0;

  // 更新计时器显示
  function updateDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    timerDisplay.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    // 更新进度条
    progressPercent =
      ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }

  // 开始计时器
  function startTimer() {
    if (isRunning && !isPaused) return;

    if (isPaused) {
      isPaused = false;
    } else {
      remainingSeconds = totalSeconds;
    }

    isRunning = true;
    startBtn.textContent = "继续";
    startBtn.innerHTML = '<i class="fas fa-play mr-2"></i>继续';
    statusDisplay.textContent = "专注中...";
    document.querySelector(".timer-display").classList.remove("time-end");

    timer = setInterval(() => {
      remainingSeconds--;

      if (remainingSeconds <= 0) {
        clearInterval(timer);
        isRunning = false;
        timerDisplay.textContent = "00:00";
        statusDisplay.textContent = "时间到！休息一下吧";
        progressBar.style.width = "100%";
        document
          .querySelector(".timer-display")
          .classList.add("time-end");

        // 播放提示音
        endSound.play();

        // 闪烁效果
        timerDisplay.classList.add("animate-pulse-slow");
        return;
      }

      updateDisplay();
    }, 1000);
  }

  // 暂停计时器
  function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timer);
    isRunning = false;
    isPaused = true;
    statusDisplay.textContent = "已暂停";
  }

  // 重置计时器
  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    remainingSeconds = totalSeconds;
    progressBar.style.width = "0%";
    statusDisplay.textContent = "准备开始";
    startBtn.textContent = "开始";
    startBtn.innerHTML = '<i class="fas fa-play mr-2"></i>开始';
    document.querySelector(".timer-display").classList.remove("time-end");
    timerDisplay.classList.remove("animate-pulse-slow");
    updateDisplay();
  }

  // 设置时间
  function setTime(minutes) {
    totalSeconds = minutes * 60;
    resetTimer();

    // 更新预设按钮状态
    presetBtns.forEach((btn) => {
      if (parseInt(btn.dataset.time) === minutes) {
        btn.classList.add("active", "bg-red-100");
      } else {
        btn.classList.remove("active", "bg-red-100");
      }
    });
  }

  // 事件监听器
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

  presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const minutes = parseInt(btn.dataset.time);
      setTime(minutes);
    });
  });

  setCustomBtn.addEventListener("click", () => {
    const customMinutes = parseInt(customTimeInput.value);

    if (customMinutes && customMinutes >= 1 && customMinutes <= 120) {
      setTime(customMinutes);
      customTimeInput.value = "";
    } else {
      alert("请输入1-120之间的有效分钟数");
    }
  });

  customTimeInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      setCustomBtn.click();
    }
  });

  // 初始化
  updateDisplay();
});