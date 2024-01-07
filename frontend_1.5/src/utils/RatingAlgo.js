export const ratingAlgorithm = (easyCount, mediumCount, hardCount, miscCount, score, incEasy, incMedium, incHard, incMisc) =>{
    console.log(easyCount, mediumCount, hardCount, miscCount, score, incEasy, incMedium, incHard, incMisc)
    const weightedPosScore = easyCount*0.5 + mediumCount*0.75 + hardCount*1 + miscCount*1.5;
    const weightedNegScore = incEasy*0.5+incMedium*0.75+incHard*1+incMisc*1.5;
    const weightedScore = weightedPosScore - weightedNegScore;
    const totalScore = weightedScore*4 + score;
    console.log("Total Score", totalScore);
    return totalScore; 
}