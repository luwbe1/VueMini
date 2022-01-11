<template>
    <div id="app">
        <div class="row">
            <div class="small-5 columns text-center">
                <img
                :src="myChoiceImg"
                alt=""
                class="text-center"
                >
                <h1 class="text-center"><strong>YOU</strong></h1>
            </div>
            <div class="small-2 columns text-center">
                <h1 style="font-size:100px;"><strong>{{ count }}</strong></h1>
            </div>
            <div class="small-5 columns text-center">
                <img
                :src="comChoiceImg"
                alt=""
                class="text-center"
                >
                <h1 class="text-center"><strong>Computer</strong></h1>
            </div>
        </div>

        <div class="row">
            <div class="small-6 columns text-center">
                <div class="battle-wrap">
                    <img
                    v-for="life in lifeOfMe"
                    src="@/assets/heart.jpg"
                    class="heart"
                    alt=""
                    :key="life">
                    <img
                    v-for="life in leftLifeOfMe"
                    src="@/assets/broken-heart.jpg"
                    class="heart"
                    alt=""
                    :key="life">
                </div>
            </div>
            <div class="small-6 columns text-center">
                <div class="battle-wrap">
                    <img
                    v-for="life in lifeOfCom"
                    src="@/assets/heart.jpg"
                    class="heart"
                    alt=""
                    :key="life">
                    <img
                    v-for="life in leftLifeOfCom"
                    src="@/assets/broken-heart.jpg"
                    class="heart"
                    alt=""
                    :key="life">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="small-6 columns text-center">
                <div class="row">
                    <div class="small-8 small-offset-2 columns text-center">
                        <label
                            v-for="select in selects"
                            class="radio-label"
                            :key="select">
                        <input type="radio" v-model="myChoice" :value="select.value">{{select.name}}</label>

                    </div>
                </div>
                <div class="row">
                    <div class="small-12 columns">
                        <div class="text-center" v-if="isSelectable">
                            <button class="start-btn" @click="startGame()">선택 완료!</button>
                        </div>
                        <div v-else class="loading"> 기다리는 중...</div>
                    </div>
                </div>
            </div>
            <div class="small-6 columns text-center">
                <p>생각 중...</p>
            </div>
        </div>

        <div class="row">
            <div class="small-12 columns log">
                <ul>
                    <li
                    :class="{
                    'win-log': log.winner === 'me',
                    'defeat-log': log.winner === 'com',
                    'draw-log': log.winner === 'no one'
                }"
                    v-for="log in logs"
                    :key="log">{{ log.message }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default({
  name: 'GamePage',
  data: function () {
    return {
      myChoice: null,
      comChoice: null,
      count: 3,
      winner: null,
      lifeOfMe: 3,
      lifeOfCom: 3,
      isSelectable: true,
      logs: [],
      selects: [
        {name: '가위', value: 'scissor'},
        {name: '바위', value: 'rock'},
        {name: '보', value: 'paper'}
      ]
    }
  },
  computed: {
    // image url 사용할 때는 require 사용
    myChoiceImg: function () {
      return this.myChoice !== null ? require(`@/assets/${this.myChoice}.jpg`) : require('@/assets/question.jpg')
    },
    comChoiceImg: function () {
      return this.comChoice !== null ? require(`@/assets/${this.comChoice}.jpg`) : require('@/assets/question.jpg')
    },
    leftLifeOfMe: function () {
      return 3 - this.lifeOfMe
    },
    leftLifeOfCom: function () {
      return 3 - this.lifeOfCom
    }
  },
  watch: {
    count: function (newVal) {
      if (newVal === 0) {
        // 컴퓨터가 가위바위보를 선택하는
        this.selectCom()

        // 가위바위보 승패 결정 & 몫을 차감
        this.whoIsWin()

        // 게임 리셋
        this.count = 3
        this.isSelectable = true

        // 로그를 업데이트 하는 부분
        this.updateLogs()
      }
    },
    lifeOfMe: function (newVal) {
      if (newVal === 0) {
        // 게임을 종료
        this.endGame('안타깝네요, 당신이 패배함')
      }
    },
    lifeOfCom: function (newVal) {
      if (newVal === 0) {
        this.endGame('축하하네요, 당신이 승리함')
      }
    }
  },
  methods: {
    startGame: function () {
      // 버튼이 보이지 않음
      this.isSelectable = false
      if (this.myChoice === null) {
        alert('가위 바위 보 중 하나를 선택하세요.')
        this.isSelectable = true
      } else {
        let countDown = setInterval(() => {
          this.count--
          if (this.count === 0) {
            clearInterval(countDown)
          }
        }, 1000)
      }
    },
    selectCom: function () {
      let number = Math.random()
      if (number < 0.33) {
        this.comChoice = 'scissor'
      } else if (number < 0.66) {
        this.comChoice = 'rock'
      } else {
        this.comChoice = 'paper'
      }
    },
    whoIsWin: function () {
      // 가위바위보 승패 결정
      if (this.myChoice === this.comChoice) this.winner = 'no one'
      else if (this.myChoice === 'rock' && this.comChoice === 'scissor') this.winner = 'me'
      else if (this.myChoice === 'scissor' && this.comChoice === 'paper') this.winner = 'me'
      else if (this.myChoice === 'paper' && this.comChoice === 'rock') this.winner = 'me'
      else if (this.myChoice === 'scissor' && this.comChoice === 'rock') this.winner = 'com'
      else if (this.myChoice === 'paper' && this.comChoice === 'scissor') this.winner = 'com'
      else if (this.myChoice === 'rock' && this.comChoice === 'paper') this.winner = 'com'
      else this.number = 'error'

      // 몫 차감
      if (this.winner === 'me') {
        this.lifeOfCom--
      } else if (this.winner === 'com') {
        this.lifeOfMe--
      }
    },
    updateLogs: function () {
      let log = {
        // 일반 string을 사용해서 비교해보자
        message: `You: ${this.myChoice}, Computer: ${this.comChoice}`,
        winner: this.winner
      }

      this.logs.unshift(log)
    },
    endGame: function (msg) {
      setTimeout(() => {
        confirm(msg)
        this.lifeOfMe = 3
        this.lifeOfCom = 3
        this.myChoice = null
        this.comChoice = null
        this.winner = null
        this.logs = []
      }, 500)
    }
  }
})
</script>
<style scoped src="@/assets/app.css"> </style>
<style scoped src="@/assets/foundation.min.css"> </style>
