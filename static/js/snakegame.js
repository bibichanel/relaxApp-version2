const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");

let highestScore = 0;

document.getElementById("play-btn").addEventListener("click", function() {    
    const width = document.getElementById("snakeboard_width").value;
    const height = document.getElementById("snakeboard_height").value;

    let checkResult = check_valid_params(width, height);

    if (checkResult == "valid!") {
        snakeboard.width = width;
        snakeboard.height = height;

        document.getElementById("settings-form").style.display = "none";
        document.getElementById("settings-form").style.setProperty("z-index", "2");

        document.getElementById("snakegame").style.display = "flex";
        document.getElementById("snakegame").style.setProperty("z-index", "3");

        
        start_snake_game();
    }
    else {
        alert(checkResult);
        if (checkResult.startsWith("Width")) {
            document.getElementById("snakeboard_width").value = null;
        }
        else {
            document.getElementById("snakeboard_height").value = null;
        }
    }
});

function check_valid_params(width, height) {
    if (width < 300 || 1300 < width) {
        return "Width phải nằm trong đoạn [300; 1300]!";
    }
    if (height < 200 || 500 < height) {
        return "Height phải nằm trong đoạn [200; 500]!";
    }
    return "valid!";
}

function start_snake_game() {
    let score = 0;
    document.getElementById("current-score").innerHTML = "Score: " + score;

    let snake = [
        { x: snakeboard.width / 2 - 00, y: snakeboard.height / 2 },
        // { x: snakeboard.width / 2 - 10, y: snakeboard.height / 2 },
        // { x: snakeboard.width / 2 - 20, y: snakeboard.height / 2 },
        // { x: snakeboard.width / 2 - 30, y: snakeboard.height / 2 },
        // { x: snakeboard.width / 2 - 40, y: snakeboard.height / 2 },
    ]
    
    let changingDirection = false;
    let dx = 10;
    let dy = 0;

    main();
    
    function main() {
        if (has_game_end()) {
            document.getElementById("snakegame").style.setProperty("z-index", "2");

            document.getElementById("game-over").style.display = "flex";
            document.getElementById("game-over").style.setProperty("z-index", "3");

            document.getElementById("total-score").innerHTML = "Your score: " + score;
            document.getElementById("total-highest-score").innerHTML = "Your highest score: " + highestScore;

            return;
        }
    
        changingDirection = false;
    
        setTimeout(function on_tick() {
            clear_board();
            draw_food();
            move_snake();
            draw_snake();
    
            main();
        }, 100);
    }

    function clear_board() {
        const boardBorder = "black";
        const boardBackground = "white";
        snakeboard_ctx.fillStyle = boardBackground;
        snakeboard_ctx.strokestyle = boardBorder;
        snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
        snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }

    function draw_snake() {
        snake.forEach(draw_snake_part);
    }

    function draw_snake_part(snakePart) {
        if (snakePart.x === snake[0].x && snakePart.y === snake[0].y) {
            snakeboard_ctx.fillStyle = "lightgreen";
            snakeboard_ctx.strokestyle = "darkblue";
            snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
            snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
        }
        else {
            const snakeCol = "lightblue";
            const snakeBorder = "darkblue";
            snakeboard_ctx.fillStyle = snakeCol;
            snakeboard_ctx.strokestyle = snakeBorder;
            const x = snakePart.x + 5;
            const y = snakePart.y + 5;
            const r = 5;
    
            snakeboard_ctx.beginPath();
            snakeboard_ctx.arc(x, y, r, 0 * Math.PI, 2 * Math.PI);
            snakeboard_ctx.fill();
            snakeboard_ctx.stroke();        
        }
        snakeboard_ctx.closePath();    
    }
    
    function has_game_end() {
        for (let i = 4; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;
            }
        }
    
        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x > snakeboard.width - 10;
        const hitToptWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > snakeboard.height - 10;
    
        return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
    }
    
    document.addEventListener("keydown", change_direction);
    
    function change_direction(event) {
        const LEFT_KEY = 37;
        const RIGHT_KEY = 39;
        const UP_KEY = 38;
        const DOWN_KEY = 40;
    
        if (changingDirection) return;
        changingDirection = true;
    
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;
    
        const keyPressed = event.keyCode;
    
        if (keyPressed === LEFT_KEY && !goingRight) {
            dx = -10;
            dy = 0;
        }
        if (keyPressed === UP_KEY && !goingDown) {
            dx = 0;
            dy = -10;
        }
        if (keyPressed === RIGHT_KEY && !goingLeft) {
            dx = 10;
            dy = 0;
        }
        if (keyPressed === DOWN_KEY && !goingUp) {
            dx = 0;
            dy = 10;
        }
    }
    
    let food_x;
    let food_y;
    gen_food();
    
    function gen_food() {
        food_x = random_food(0, snakeboard.width - 10);
        food_y = random_food(0, snakeboard.height - 10);
        snake.forEach(function has_food_conflict_snake(snakePart) {
            const isFoodConflictSnake = snakePart.x == food_x && snakePart.y == food_y;
            if (isFoodConflictSnake) {
                gen_food();
            }
        });
    }
    
    function random_food(min, max) {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    }
    
    function draw_food() {
        snakeboard_ctx.fillStyle = "lightgreen";
        snakeboard_ctx.strokestyle = "darkgreen";
        // snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
        // snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
        
        const x = food_x + 5;
        const y = food_y + 5;
        const r = 5;
    
        snakeboard_ctx.beginPath();
        snakeboard_ctx.arc(x, y, r, 0 * Math.PI, 2 * Math.PI);
        snakeboard_ctx.fill();
        snakeboard_ctx.stroke();
        snakeboard_ctx.closePath();
    }
    
    function move_snake() {
        const head = {
            x: snake[0].x + dx,
            y: snake[0].y + dy
        };
        snake.unshift(head);
        const isSnakeEatFood = snake[0].x === food_x && snake[0].y === food_y;
        if (isSnakeEatFood) {
            score += 1;
            document.getElementById("current-score").innerHTML = "Score: " + score;
            if (score > highestScore) {
                highestScore = score;
                document.getElementById("current-highest-score").innerHTML = "Highest score: " + highestScore;
            }
            gen_food();
        } else {
            snake.pop();
        }
    }
}

document.getElementById("back-to-settings-btn").addEventListener("click", function() {
    document.getElementById("game-over").style.display = "none";
    document.getElementById("snakegame").style.display = "none";
    document.getElementById("settings-form").style.display = "flex";
});

document.getElementById("replay-btn").addEventListener("click", function() {    
    document.getElementById("game-over").style.display = "none";
    document.getElementById("settings-form").style.display = "none";
    start_snake_game();
});
