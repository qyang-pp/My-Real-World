const weekList = ['日','一','二','三','四','五','六'];

export const timeFormat = (time) => {
  if(time.indexOf('星期') !== -1){
    return time;
  }
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const seconds=date.getSeconds();
  const currentweek = '星期' + weekList[date.getDay()];
  return `${year}/${month}/${day} ${hour}:${formatWithZoro(min)}:${formatWithZoro(seconds)} ${currentweek}`;
}

export const formatWithZoro = (num)=>{
  return num < 10 ? `0${num}` : num;
}

export const timeSort = (list)=>{
  return list.sort((a,b)=> a.time < b.time ? 1:-1);
}