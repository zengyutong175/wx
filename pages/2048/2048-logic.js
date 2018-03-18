let score = 0;
//游戏开始随机生成两个
function randomValue(arr){
  let prevX,prevY;
  let count = 0;
  while(count <= 1){

    let value = Math.random() * 4 > 2 ? 4 : 2;
    let x = parseInt(Math.random() * 4);
    let y = parseInt(Math.random() * 4);
    if (prevX === x && prevY === y ){
          continue;
    }else{
        count += 1;
        arr[x][y] = value;
        prevX = x;
        prevY = y;
    }
  }
   return arr;
}
//每回合随机生成一个
function round(arr){
  while(true){
      let x = parseInt(Math.random() * 4);
      let y = parseInt(Math.random() * 4);
      if (arr[x][y] === '' ){
        arr[x][y] = 2;
        return arr;
      }
  }
}
// 判断游戏是否结束
function gameover(arr){
  // 判断上下左右是否有相同
  for(let j=0;j<arr.length;j++){
    for(let i=0;i<arr.length;i++){
      if (arr[j][i] === '' || arr[j][i] === arr[j][i + 1] || arr[j][i] === arr[j][i - 1] || (arr[j + 1] && arr[j][i] === arr[j + 1][i]) || (arr[j - 1] && arr[j][i] === arr[j - 1][i] ) ){
        return false;         //游戏没结束
      }
    }
  } 
  return true;  //游戏结束了
}
// 向右合并
function rightMerge(data){
  for(let j = 0;j < data.length ; j++){
    for (let i = data[j].length - 1; i >= 0; i--) {
      if (data[j][i] === data[j][i - 1] && data[j][i] !== '' ){    //相邻能合并
            data[j][i] = data[j][i] * 2; 
            let num = this.data.score;   //加分
            this.setData({
              score: num + data[j][i]
            })
            data[j][i - 1] = '';
            let del = data[j].splice(i - 1, 1);  //移到尾部     
            data[j].unshift(del[0]);
            rightMerge.call(this,data);
      } else if (data[j][i] !== data[j][i - 1] && data[j][i] === '' && i !== 0){   //不能合并切为零向右移
            [ data[j][i], data[j][i - 1] ] = [ data[j][i - 1],data[j][i] ];    //交换位置
            rightMerge.call(this,data);
      }
    }
  }
  return data;
}

// 向左合并
function leftMerge(data){
  for (let j = 0; j < data.length; j++) {
    for (let i=0;i<data[j].length;i++) {
      if (data[j][i] === data[j][i + 1] && data[j][i] !== '') {  //相邻能合并
        data[j][i] = data[j][i] * 2;
        let num = this.data.score;   //加分
        this.setData({
          score: num + data[j][i]
        })
        data[j][i + 1] = '';
        let del = data[j].splice(i+1,1);  //移到尾部
        data[j].push(del[0]);
        leftMerge.call(this,data);
      } else if (data[j][i] !== data[j][i + 1] && data[j][i] === '' && i !== data[j].length-1){
        [data[j][i], data[j][i + 1]] = [data[j][i + 1], data[j][i]];    //交换位置
        leftMerge.call(this,data);
      }
    }
  }
  return data;
}

// 向上合并
function topMerge(data){
    let copydata = [[],[],[],[]];
    let resultdata = [[],[],[],[]];
    for(let j=0;j<data.length;j++){          //复制数组并颠倒位置
        for(let i=0;i<data[j].length;i++){
          copydata[i][j] = data[j][i];
        }
    }
    copydata = leftMerge.call(this,copydata);
    for(let m=0;m<data.length;m++){       //交换回来
      for(let n=0;n<data[m].length;n++){
        resultdata[m][n] = copydata[n][m];
      }
    }
    return resultdata;
}

// 向下合并
function downMerge(data){
  let copydata = [[], [], [], []];
  let resultdata = [[], [], [], []];
  for (let j = 0; j < data.length; j++) {          //复制数组并颠倒位置
    for (let i = 0; i < data[j].length; i++) {
      copydata[i][j] = data[j][i];
    }
  }
  copydata = rightMerge.call(this,copydata);
  for (let m = 0; m < data.length; m++) {       //交换回来
    for (let n = 0; n < data[m].length; n++) {
      resultdata[m][n] = copydata[n][m];
    }
  }
  console.log(resultdata)
  return resultdata;
}

module.exports = {
  rightMerge,
  leftMerge,
  topMerge,
  downMerge,
  randomValue,
  round,
  gameover
}