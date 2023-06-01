
function MemoBlock({ animating, handleMemoClick, memoBlock }) {
    return (
        <div className="memo-block" onClick={() => (!memoBlock.flipped && !animating) && handleMemoClick(memoBlock)}>
          <div className={`memo-block-inner ${memoBlock.flipped && 'memo-block-flipped'}`}>
            <div className="memo-block-front"><img className="logot" src="./mylogot.png/" alt="My" /></div>
            <div className="memo-block-back ">
              <img src={memoBlock.image.img} alt={memoBlock.image.name} />
            </div>
          </div>
        </div>
      )}
  
  export default MemoBlock;