const RandomDamage = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currenRound: 0,
      winner: null,
      battlelogs : []
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    playerHealthBar() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    monsterHealthBar() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    delaySpecialAttack() {
      return this.currenRound % 3 !== 0;
    },
  },
  methods: {
    NewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currenRound = 0;
      this.winner = null;
      this.battlelogs = [];
    },
    Playerattack() {
      this.currenRound++;
      const attackValue = RandomDamage(12, 5);
      this.monsterHealth -= attackValue;
      this.LogMessage('Player','Attack', attackValue);
      this.Monsterattack();
    },
    Monsterattack() {
      const attackValue = RandomDamage(18, 7);
      this.playerHealth -= attackValue;
      this.LogMessage('Monster','Attack', attackValue);
    },
    SpecialAttack() {
      this.currenRound++;
      const attackValue = RandomDamage(25, 15);
      this.monsterHealth -= attackValue;
      this.LogMessage('Player','Attack',attackValue);
      this.Monsterattack();
    },
    HealPlayer() {
      this.currenRound++;
      const heal = RandomDamage(22, 12);
      if (this.playerHealth + heal > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += heal;
      }
      this.LogMessage('Player','heal',heal);
      this.Monsterattack();
    },
    Surrender() {
      this.winner = 'monster';
    },
    LogMessage(who, what, damage) {
        this.battlelogs.unshift({
            actionBy : who,
            actionType : what,
            actionValue : damage
        });
    }
  },
});
app.mount("#game");
