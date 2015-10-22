dig.Layers.TestRoom = dig.Layer.extend({
  movingSprite: null,
  spriteZIndex: 0,

  ctor: function () {
    this._super()

    var label = new dig.Labels.TestRoom()
    label.centerOn(cc.winSize)
    var dirt = new dig.Dirt()
    dirt.centerOn(cc.winSize)
    var dirtTwo = new dig.Dirt()
    dirtTwo.centerOn(cc.size(cc.winSize.width + 20, cc.winSize.height))

    this.addChild(label)
    this.addDirt(dirt)
    this.addDirt(dirtTwo)

    var clickListener = dig.EventListeners.MouseClickAndDragToMove.clone()
    cc.eventManager.addListener(clickListener, this)
  },

  addDirt: function (dirt) {
    this.addChild(dirt, this.spriteZIndex)
    this.spriteZIndex++
  },

  childrenIntersectingWith: function (point) {
    return this.getChildren().filter(function (child) {
      if (child.intersectsWith != null) {
        return child.intersectsWith(point)
      }
      return false
    })
  },

  childrenInDescendingOrderIntersectingWith: function (point) {
    return this.childrenIntersectingWith(point).sort(function (x, y) {
      return y.zIndex - x.zIndex
    })
  },

  detectDraggingSpriteAt: function (point) {
    this.startDraggingSprite(this.topChildIntersectingWith(point))
  },

  dragSpriteBy: function (target) {
    var sum = cc.pAdd(target, this.movingSprite.getPosition())
    this.movingSprite.setPosition(sum)
  },

  spriteBeingDragged: function () {
    return this.movingSprite != null
  },

  startDraggingSprite: function (sprite) {
    this.movingSprite = sprite
  },

  stopDraggingSprite: function () {
    this.movingSprite = null
  },

  topChildIntersectingWith: function (point) {
    return this.childrenInDescendingOrderIntersectingWith(point)[0]
  }
})
