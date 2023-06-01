import MemoBlock from './MemoBlock';

function Board({ animating, handleMemoClick, memoBlocks }) {
  return (
    <main className="board">
      {memoBlocks.map((memoBlock, i) => {
        return (
            <>
          <MemoBlock
            key={`${i}_${memoBlock.emoji}`}
            animating={animating}
            handleMemoClick={handleMemoClick}
            memoBlock={memoBlock}
          />
      </>
        );
    })}
    <h5>My Memo Game</h5>
    </main>
  );
}

export default Board;