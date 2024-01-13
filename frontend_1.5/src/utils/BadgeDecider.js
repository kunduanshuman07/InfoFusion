export const badgeDecider = (data) => {
    let totalSum = 0;
    const n = data.length;

    data.forEach((item, index) => {
        totalSum = totalSum + item.iqr;
    });

    const finalAverage = totalSum / n;
    if(finalAverage<10){
        return {category: 5, label: "Novice Explorer", finalAverage, hexColor: "#81099c"};
    }
    else if(finalAverage>=10 && finalAverage< 20){
        return {category: 5, label: "Curious Learner", finalAverage, hexColor: "#147333"};
    }
    else if(finalAverage>=20 && finalAverage<30){
        return {category: 5, label: "Inquisitive Mind", finalAverage, hexColor: "#9c5714"};
    }
    else if(finalAverage>=30 && finalAverage<40){
        return {category: 5, label: "Knowledge Navigator", finalAverage, hexColor: "#013973"};
    }
    else if(finalAverage>=40){
        return {category: 5, label: "Insightful Sage", finalAverage, hexColor: "#FFD700"};
    }
}
