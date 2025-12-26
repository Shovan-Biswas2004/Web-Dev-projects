const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");
const statusElement = document.getElementById("status");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const updateCapturedPieces = () => {
    const board = chess.board();
    const currentPieces = { w: [], b: [] };

    // 1. Count what is currently on the board
    board.forEach(row => {
        row.forEach(square => {
            if (square) {
                currentPieces[square.color].push(square.type);
            }
        });
    });

    const fullSet = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'r', 'r', 'n', 'n', 'b', 'b', 'q', 'k'];

    const calculateMissing = (full, current) => {
        const missing = [...full];
        current.forEach(piece => {
            const index = missing.indexOf(piece);
            if (index > -1) missing.splice(index, 1);
        });
        return missing;
    };

    // LOGIC SWAP HERE:
    // White's sidebar should show missing BLACK pieces
    // Black's sidebar should show missing WHITE pieces
    const whiteHasTaken = calculateMissing(fullSet, currentPieces.b);
    const blackHasTaken = calculateMissing(fullSet, currentPieces.w);

    renderCaptureUI("white-captures", whiteHasTaken, 'b'); // Show black pieces here
    renderCaptureUI("black-captures", blackHasTaken, 'w'); // Show white pieces here
};

const renderBoard = () => {
  const board = chess.board();
  boardElement.innerHTML = "";
  board.forEach((row, rowindex) => {
    row.forEach((square, squareindex) => {
      const squareElement = document.createElement("div");
      squareElement.classList.add("square",
        (rowindex + squareindex) % 2 === 0 ? "light" : "dark"
      )
      squareElement.dataset.row = rowindex;
      squareElement.dataset.col = squareindex;
      if (square) {
        const pieceElement = document.createElement("img");

        pieceElement.classList.add("piece");
        pieceElement.src = getPieceImage(square);
        pieceElement.alt = `${square.color}-${square.type}`;
        pieceElement.draggable = playerRole === square.color;
        pieceElement.addEventListener("dragstart", (e) => {
          if (pieceElement.draggable) {
            draggedPiece = pieceElement;
            sourceSquare = { row: rowindex, col: squareindex };
            e.dataTransfer.setData("text/plain", "");
          }
        });
        pieceElement.addEventListener("dragend", (e) => {
          draggedPiece = null;
          sourceSquare = null;
        });
        squareElement.appendChild(pieceElement);
      }
      squareElement.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      squareElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedPiece) {
          const targetSource = {
            row: parseInt(squareElement.dataset.row),
            col: parseInt(squareElement.dataset.col)
          }
          handelMove(sourceSquare, targetSource);
        }
      })
      boardElement.appendChild(squareElement);
    })
  });
  if (playerRole === 'b') {
    boardElement.classList.add('flipped');
  } else {
    boardElement.classList.remove('flipped');
  }
  updateCapturedPieces()
};
const handelMove = (source, target) => {
  const move = {
    from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
    to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
    promotion: "q"
  };

  socket.emit("move", move);
};

const getPieceImage = (piece) => {
  const pieceMap = {
    p: "pawn",
    r: "rook",
    n: "knight",
    b: "bishop",
    q: "queen",
    k: "king"
  };

  return `/images/pieces/${piece.color}-${pieceMap[piece.type]}.svg`;
};




const renderCaptureUI = (elementId, pieces, color) => {
    const container = document.getElementById(elementId);
    container.innerHTML = "";
    pieces.forEach(type => {
        const img = document.createElement("img");
        img.src = getPieceImage({ color, type });
        img.classList.add("w-8", "h-8", "opacity-60", "grayscale-[0.5]");
        container.appendChild(img);
    });
};

socket.on("playerDisconnected", () => {
    alert("A player disconnected. Resetting game...");
    window.location.reload(); // This reloads the page automatically
});

socket.on("playerRole", function (role) {
  playerRole = role;
  statusElement.innerText =
    role === "w" ? "You are playing as White" : "You are playing as Black";
  renderBoard();
})

socket.on("spectatorRole", () => {
  playerRole = null;
  document.getElementById("status").innerText = "Spectating";
  renderBoard();
});

socket.on("boardState", function (fen) {
  chess.load(fen);
  renderBoard();

})
socket.on("move", function (move) {
  chess.move(move);
  renderBoard();
})



renderBoard();