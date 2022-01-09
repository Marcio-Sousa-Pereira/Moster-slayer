new Vue({
  el: '#app',
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100,
    logs: []
  },

  computed: {
    hasResult() {
      return this.playerLife == 0 || this.monsterLife == 0
    }
  },

  watch: {
    hasResult(value) {
      if(value) {
        this.running = false;
      }
    }
  },

  methods: {
    startGame() {
      this.running = true
      this.playerLife = 100
      this.monsterLife = 100
      this.logs = []
    },

    attack(especial) {  
      this.hurt('playerLife', 5, 10, false, "Monstro", "Jogador", 'monster');
      if(this.monsterLife > 0){
        this.hurt('monsterLife', 7, 12, especial, "Jogador", "Monstro", 'player');
      }
    },

    hurt(atr, min, max, especial, source, target, cls) {
      const plus = especial ? 5 : 0;
      const hurt = this.getRandom(min + plus, max + plus);
      this[atr] = Math.max(this[atr] - hurt, 0)

      this.registerLogs(`${source} atingiu o ${target} com ${hurt}`, cls)
    },

    healAndHurt() {
      this.heal(10, 15);
      this.hurt('playerLife', 7, 12, false, "Monstro", "Jogador", 'monster');
    },

    registerLogs(text, cls) {
      this.logs.unshift({ text, cls }) //unshift serve para colocar o parametro sempre em primeiro lugar
    },

    heal(min, max) {
      const life = this.getRandom(min, max);
      this.playerLife = Math.min(this.playerLife + life, 100);
      this.registerLogs(`jogador ganhou força de ${life}`, 'player');
    },

    getRandom(min, max) {
      const value = Math.random() * (max - min) + min
      return Math.round(value);
    }
  }
})