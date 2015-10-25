dig.Layers.TutorialSix = dig.Layer.extend({
  text: "Three strikes and you're fired!",

  ctor: function () {
    this._super()

    this.setTag(dig.Layers.TutorialSix.TAG)
    this.initializeDirtGrid()
    this.initializeDirtBin()
    this.initializeGoldBin()
    this.initializeText()
    this.initializeScore()
    this.initializeStrikes()
  },

  initializeDirtBin: function () {
    var bin = new dig.Sprites.DirtBin()
    this.addChild(bin)
    bin.setPosition(cc.p(100, 193))
  },

  initializeDirtGrid: function () {
    dig.Factories.Dirt.grid(6, 6).forEach(function (dirt) {
      this.addChild(dirt)
    }, this)
  },

  initializeGoldBin: function () {
    var bin = new dig.Sprites.GoldBin()
    this.addChild(bin)
    bin.setPosition(700, 193)
  },

  initializeScore: function () {
    var score = new dig.Labels.Score()
    this.addChild(score)
    score.setPosition(600, 413)
    score.addToMultiplier(2)
    score.add(332)
    score.removeFromScore(100)
    score.resetMultiplier()
  },

  initializeStrikes: function () {
    var strikes = new dig.Labels.Strikes()
    this.addChild(strikes)
    strikes.setPosition(145, 413)
    strikes.addStrike()
  },

  initializeText: function () {
    var text = new dig.Label(
      this.text, 'Monaco', 36, cc.size(375, 300), cc.TEXT_ALIGNMENT_CENTER
    )
    text.centerOn(cc.winSize)
    this.addChild(text)
  }
})

dig.Layers.TutorialSix.TAG = 'tutorial_six_layer'
