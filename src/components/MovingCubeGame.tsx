
import { useState, useEffect, useRef } from 'react';

export const MovingCubeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [focused, setFocused] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [coins, setCoins] = useState<{ x: number; y: number; size: number }[]>([]);
  const [score, setScore] = useState(0);

  const canvasWidth = 500;
  const canvasHeight = 500;
  const cubeSize = 50;
  const coinSize = 20;

  const generateRandomCoins = (numCoins: number) => {
    const coins: { x: number; y: number; size: number }[] = [];
    for (let i = 0; i < numCoins; i++) {
      coins.push({
        x: Math.random() * (canvasWidth - coinSize),
        y: Math.random() * (canvasHeight - coinSize),
        size: coinSize,
      });
    }
    return coins;
  };

  const checkCollision = (coin: { x: number; y: number; size: number }) => {
    return (
      position.x < coin.x + coin.size &&
      position.x + cubeSize > coin.x &&
      position.y < coin.y + coin.size &&
      position.y + cubeSize > coin.y
    );
  };

  const resetGame = () => {
    setPosition({ x: 50, y: 50 });
    setScore(0); setCoins(generateRandomCoins(5));
  };

  useEffect(() => {
    setCoins(generateRandomCoins(5));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!focused) return;

      let newPosition = { ...position };
      if (score !== 5) {
        switch (event.key) {
          case 'ArrowUp':
            newPosition.y = Math.max(-2, newPosition.y - 10);
            break;
          case 'ArrowDown':
            newPosition.y = Math.min(canvasHeight - cubeSize, newPosition.y + 8);
            break;
          case 'ArrowLeft':
            newPosition.x = Math.max(-2, newPosition.x - 10); break;
          case 'ArrowRight':
            newPosition.x = Math.min(canvasWidth - cubeSize, newPosition.x + 8); break;
          default:
            break;
        }
      }


      for (let i = 0; i < coins.length; i++) {
        if (checkCollision(coins[i])) {

          setCoins((prevCoins) => prevCoins.filter((_, index) => index !== i));
          setScore((prevScore) => prevScore + 1);
          break;
        }
      }

      setPosition(newPosition);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focused, position, coins]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'blue';
        ctx.fillRect(position.x, position.y, cubeSize, cubeSize);

        ctx.fillStyle = 'gold';
        coins.forEach((coin) => {
          ctx.beginPath();
          ctx.arc(coin.x + coin.size / 2, coin.y + coin.size / 2, coin.size / 2, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 30);

        if (score === 5) {
          ctx.fillStyle = 'white';
          ctx.font = '20px Arial';
          ctx.fillText('You Win!!!', 200, 30)

        }
      }
    }
  }, [position, coins, score]);

  useEffect(() => {
    if (focused) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [focused]);

  return (
    <div className="relative mb-18">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="border border-amber-50"
      />
      {score === 5 && (
        <button
          onClick={resetGame}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

