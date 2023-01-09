function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          position: null,
        },
      ],
      reverse: false,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const pos = [Math.floor(i / 3) + 1, (i % 3) + 1];
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    for (let j = 0; j < squares.length; j++) {
      document.getElementsByClassName("square")[j].style.color = "black";
      document.getElementsByClassName("square")[j].style.opacity = "0.7";
    }
    document.getElementsByClassName("square")[i].style.color = "red";
    document.getElementsByClassName("square")[i].style.opacity = "0.7";

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: pos,
        },
      ]),
      stepNumber: history.length,
      reverse: false,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step, position) {
    for (let j = 0; j < 9; j++) {
      document.getElementsByClassName("square")[j].style.color = "black";
      document.getElementsByClassName("square")[j].style.opacity = "0.7";
    }

    if (position) {
      let i = (position[0] - 1) * 3 + position[1] - 1;
      document.getElementsByClassName("square")[i].style.color = "red";
      document.getElementsByClassName("square")[i].style.opacity = "0.7";
    }

    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let desc = move
        ? "Revenir au tour n°" + move + " (" + step.position + ")"
        : "Revenir au début de la partie";
      let strong =
        move === this.state.stepNumber ? <strong>{desc}</strong> : desc;
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move, step.position)}
            style={{ marginBottom: "3px" }}
          >
            {strong}
          </button>
        </li>
      );
    });

    if (this.state.reverse) moves.reverse();

    let status;
    if (winner) status = winner;
    else status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>
            <button
              onClick={() => {
                this.setState({ reverse: !this.state.reverse });
              }}
              style={{ marginBottom: "12px" }}
            >
              Inverser l'ordre des coups
            </button>
            {moves}
          </ul>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      for (let j = 0; j < lines[i].length; j++) {
        document.getElementsByClassName("square")[lines[i][j]].style.color =
          "green";
      }

      return "Le gagnant est: " + squares[a];
    }
  }

  let isFull = true;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      isFull = false;
      break;
    }
  }
  if (isFull) return "Egalité";
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
