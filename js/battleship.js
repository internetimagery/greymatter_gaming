
((element) => {

    const BOARD_SIZE = 5;

    var board = [];
    for (let i=0; i<BOARD_SIZE; i++) {
	for (let j=0; j<BOARD_SIZE; j++) {
	    if ( j % 2 ) {
		board.push({"fillStyle": ""});
	    } else {
		board.push({"fillStyle": "#e76f51"});
	    }
	}
    }
    var boats = [];
    boats.push([[2,2],[2,4]]);
    boats.push([[4,1],[2,1]]);


    let grid = document.build_grid(element, board, boats);





})(document.getElementById("main"))
