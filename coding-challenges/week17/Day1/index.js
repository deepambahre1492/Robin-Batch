function answer(total_lambs) {
   let count = 1;
   let next_count = 1;
   let total = 0;
   let lucky_generous = 0;
   while (total + next_count <= total_lambs) {
     total += count;
     lucky_generous += 1;
     count *= 2;
     next_count = parseInt(count / 2) + parseInt(count / 4);
   }
   let fibo1 = 1;
   let fibo2 = 1;
   total = 0;
   let lucky_stingy = 0;
   while (total + fibo1 <= total_lambs) {
     lucky_stingy += 1;
     total += fibo1;
     fibo1, fibo2 = fibo2, fibo1 + fibo2;
   }
   return lucky_stingy - lucky_generous;
 }
 console.log(answer(8));
 console.log(answer(109));
 console.log(answer(250));