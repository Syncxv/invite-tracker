export const rawTransform = 'rotateX(-56.8319deg) skew(0deg, 1.8944deg) scale(0.8106, 0.81056)'

export const getRandomized = (y: number) =>
    `translate3d(0px, ${y}px, 0px)  rotateX(${generateRandomNumber(
        -50.99,
        -60.99
    )}deg) skew(0deg, ${generateRandomNumber(1.7, 1.9)}deg) scale(${generateRandomNumber(
        0.8,
        0.89
    )}, ${generateRandomNumber(0.8, 0.89)})`

export const generateRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min
