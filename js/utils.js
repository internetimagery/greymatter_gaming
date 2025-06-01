((document) => {

    const CELL_SIZE = 100;
    const BOAT_WIDTH = 30;
    const LETTERS = "ABCDEFGHIJKLMNOP"

    const DARK_BLUE = "#264653";
    const LIGHT_BLUE = "#2a9d8f";
    const YELLOW = "#e9c46a";
    const ORANGE = "#f4a261";
    const RED = "#e76f51";

    draw_sea = (ctx, canvas) => {
	// Draw Water
	ctx.fillStyle = LIGHT_BLUE;
	ctx.beginPath();
	ctx.roundRect(0, 0, canvas.width, canvas.height, CELL_SIZE);
	ctx.fill();
    }
    draw_coords = (ctx, SIZE) => {
	ctx.fillStyle = "black";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.font = "50px Arial";
	for (let r=0; r<SIZE; r++) {
	    ctx.fillText(LETTERS[r], r*CELL_SIZE+CELL_SIZE*0.5+CELL_SIZE, CELL_SIZE*0.5, CELL_SIZE);
	}
	for (let c=0; c<SIZE; c++) {
	    ctx.fillText(c+1, CELL_SIZE*0.5, c*CELL_SIZE+CELL_SIZE*0.5+CELL_SIZE, CELL_SIZE);
	}
    }
    draw_board = (ctx, SIZE, board) => {
	for (let r=0; r<SIZE; r++) {
	    let y = r * CELL_SIZE + CELL_SIZE;

	    for (let c=0; c<SIZE; c++) {
		let x = c * CELL_SIZE + CELL_SIZE;

		// Fill it in
		let style = board[r*SIZE+c]["fillStyle"];
		if ( style ) {
		    ctx.fillStyle = style;
		    ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
		}

		// Border
		ctx.strokeStyle = DARK_BLUE;
		ctx.lineWidth = 1;
		ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
	    }
	}
    }
    draw_boats = (ctx, SIZE, boats) => {
	ctx.strokeStyle = "#000";
	ctx.lineWidth = BOAT_WIDTH * 0.25;
	for (let boat of boats) {
	    // Make a boat like
	    //  /-----)
	    //  \-----)

	    const start = [boat[0][0]*CELL_SIZE+CELL_SIZE+CELL_SIZE*0.5, boat[0][1]*CELL_SIZE+CELL_SIZE+CELL_SIZE*0.5];
	    const end = [boat[1][0]*CELL_SIZE+CELL_SIZE+CELL_SIZE*0.5, boat[1][1]*CELL_SIZE+CELL_SIZE+CELL_SIZE*0.5];

	    const delta = [end[0] - start[0], end[1] - start[1]];
	    const len = (delta[0] ** 2 + delta[1] ** 2) ** 0.5;
	    const h = len ** 0.5;
	    // Normalized
	    const norm = [delta[0]/len, delta[1]/len];

	    const left =  [-norm[1]*BOAT_WIDTH, norm[0]*BOAT_WIDTH];
	    const right = [norm[1]*BOAT_WIDTH, -norm[0]*BOAT_WIDTH];

	    for (let side of [left, right]) {
		ctx.beginPath()
		ctx.moveTo(start[0], start[1]);
		ctx.quadraticCurveTo(
		    side[0]+start[0], side[1]+start[1],
		    side[0]+start[0]+norm[0]*CELL_SIZE*0.5, side[1]+start[1]+norm[1]*CELL_SIZE*0.5,
		);
		ctx.lineTo(side[0]+end[0]+norm[0]*-CELL_SIZE*0.5, side[1]+end[1]+norm[1]*-CELL_SIZE*0.5);
		ctx.quadraticCurveTo(
		    side[0]+end[0], side[1]+end[1],
		    end[0], end[1],
		);
		ctx.stroke();
	    }
	}
    }

    document.build_grid = (element, board, boats) => {
	const SIZE = board.length ** 0.5;
	const canvas = document.createElement("canvas");
	canvas.width =  (SIZE + 2) * CELL_SIZE
	canvas.height = (SIZE + 2) * CELL_SIZE
	element.appendChild(canvas);
	const ctx = canvas.getContext("2d");

	draw_sea(ctx, canvas);
	draw_coords(ctx, SIZE);
	draw_board(ctx, SIZE, board);
	draw_boats(ctx, SIZE, boats);
    }


})(document)
