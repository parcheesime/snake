var ate = function(snake, otherThing) {
  var head = snake[0];
  return CHUNK.detectCollisionBetween([head], otherThing);
}

var draw = function(snakeToDraw, apple) {
  var drawableSnake = { color: "green", pixels: snakeToDraw };
  var drawableApple = { color: "red", pixels: [apple] };
  var drawableObjects = [drawableSnake, drawableApple];
  CHUNK.draw(drawableObjects);
}

var advanceGame = function() {
  var newSnake = moveSnake(snake);

  if (ate(newSnake, snake)) {
    CHUNK.endGame();
    CHUNK.flashMessage("Whoops! You ate yourself!");
  }

  if (ate(newSnake, [apple])) {
    newSnake = growSnake(newSnake);
    apple = CHUNK.randomLocation();
  }

  if (ate(newSnake, CHUNK.gameBoundaries())) {
   CHUNK.endGame();
   CHUNK.flashMessage("Whoops! you hit a wall!");
 }

  if (CHUNK.detectCollisionBetween([apple], snake)) {
    snake = growSnake(snake);
    apple = CHUNK.randomLocation();
  }
  // if (CHUNK.detectCollisionBetween(snake, CHUNK.gameBoundaries())) {
  //   CHUNK.endGame();
  //   CHUNK.flashMessage("Whoops! you hit a wall with a score of " + highScore);
  // }
  snake = newSnake
  draw(snake, apple);
}

var growSnake = function(snake) {
  // CHUNK.flashMessage("You ate an apple ")
  // delay(.5)
  highScore += 2
  var indexOfLastSegment = snake.length - 1;
  var lastSegment = snake[indexOfLastSegment];
  snake.push({ top: lastSegment.top, left: lastSegment.left });
  return snake;
}

var changeDirection = function(direction) {
  snake[0].direction = direction;
}


var drawSnake = function(snakeToDraw) {
  var drawableSnake = { color: "purple", pixels: snakeToDraw };
  var drawableObjects = [drawableSnake];
  CHUNK.draw(drawableObjects);
}


var moveSegment = function(segment) {
  if (segment.direction === "down") {
    return { top: segment.top + 1, left: segment.left }
  } else if (segment.direction === "up") {
    return { top: segment.top - 1, left: segment.left }
  } else if (segment.direction === "right") {
    return { top: segment.top, left: segment.left + 1 }
  } else if (segment.direction === "left") {
    return { top: segment.top, left: segment.left - 1 }
  }
  return segment;
}

var moveSnake = function(snake) {
  var newSnake = []
  snake.forEach(function(oldSegment, segmentIndex){
    var newSegment = moveSegment(oldSegment)
    newSegment.direction = segmentFurtherForwardThan(segmentIndex, snake).direction;
    newSnake.push(newSegment)
  })
  // var oldSegment = snake[0]
  // var newSegment = moveSegment(oldSegment)
  // newSegment.direction = oldSegment.direction
  // var newSnake = [newSegment]
  return newSnake
}

var segmentFurtherForwardThan = function(index, snake) {
  if (snake[index - 1] === undefined) {
    return snake[index];
  } else {
    return snake[index - 1];
  }
}

var apple = {top: 8, left: 10};
var snake = [{ top: 1, left: 0, direction: "down" }, { top: 0, left: 0, direction: "down" }];
var highScore = snake.length


CHUNK.executeNTimesPerSecond(advanceGame, 3);
CHUNK.onArrowKey(changeDirection);
