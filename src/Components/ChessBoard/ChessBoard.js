import React, { useState } from "react";

import Queen from "../Queen/Queen";
import CloseIcon from "../CloseIcon/CloseIcon";
import styles from "./ChessBoard.module.css";

const ChessBoard = () => {
  const [queen1, setQueen1] = useState(false);
  const [queen2, setQueen2] = useState(false);
  const [closeIcon, setCloseIcon] = useState(false);

  const isValidPosition = (pos1, pos2) => {
    console.log(pos1, pos2, "pos");
    const [pos1Row, pos1Col] = pos1;
    const [pos2Row, pos2Col] = pos2;

    function isCrossPosition() {
      const pos1Sum = parseInt(pos1Row.toString() + pos1Col.toString());
      const pos2Sum = parseInt(pos2Row.toString() + pos2Col.toString());

      let diff = pos1Sum - pos2Sum;
      diff = Math.sign(diff) * diff;

      // console.log(diff, pos1Sum, pos2Sum, "diff");

      if (diff % 11 === 0 || diff % 9 === 0) {
        return true;
      }

      return false;
    }

    if (pos1Row === pos2Row || pos1Col === pos2Col || isCrossPosition()) {
      return false;
    }

    return true;
  };

  const handleCellClick = (row, col) => {
    if (!queen1) {
      setQueen1([row, col]);
    }
    if (queen1 && isValidPosition(queen1, [row, col])) {
      setQueen2([row, col]);
    }
  };

  const handleMouseOver = (row, col) => {
    if (queen1 && !isValidPosition(queen1, [row, col])) {
      console.log(true, "mouseOver");
      setCloseIcon([row, col]);
    }
  };

  const handleMouseOut = (row, col) => {
    setCloseIcon(false);
  };

  const renderCloseIcon = (row, col) => {
    if (closeIcon) {
      let [closePosRow, closePosCol] = closeIcon;

      if (closePosRow === row && closePosCol === col) {
        return <CloseIcon />;
      }
    }
  };

  const renderQueen = (row, col) => {
    if (queen1) {
      let [queen1PosRow, queen1PosCol] = queen1;

      if (queen1PosRow === row && queen1PosCol === col) {
        return <Queen />;
      }
    }

    if (queen2) {
      let [queen2PosRow, queen2PosCol] = queen2;

      if (queen2PosRow === row && queen2PosCol === col) {
        return <Queen />;
      }
    }
    return (
      <div>
        {row}
        {col}
      </div>
    );
  };

  const renderChessBoard = () => {
    let content = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        content.push(
          <div
            onMouseEnter={() => handleMouseOver(row, col)}
            onMouseLeave={() => handleMouseOut(row, col)}
            onClick={() => handleCellClick(row, col)}
            className={
              (row + col) % 2 === 1 ? styles.cellBlack : styles.cellWhite
            }
            key={`${row}${col}`}
          >
            {renderCloseIcon(row, col)}
            {renderQueen(row, col)}
          </div>
        );
      }
    }
    return content;
  };

  return <div className={styles.board}>{renderChessBoard()}</div>;
};

export default React.memo(ChessBoard);
