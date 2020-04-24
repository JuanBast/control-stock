export const prettyTimeStamp = (timestamp) => {
  var date = new Date(timestamp);

  var curr_date = date.getDate();
  var curr_month = date.getMonth();
  var curr_year = date.getFullYear();
  
  var curr_hour = date.getHours();
  var curr_minutes = date.getMinutes();
  var curr_seconds = date.getSeconds();

  return `${curr_date}-${curr_month}-${curr_year} ${curr_hour}:${curr_minutes}:${curr_seconds}`;
};
  
export const getRandomColor = () => {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }