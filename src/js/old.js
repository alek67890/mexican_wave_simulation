
async function draw() {

    var canvas = await document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      
      for (let i = 0; 80>i; i++){
        for (let j = 0; 30>j; j++){
          if (Math.round(Math.random())==0){
            ctx.fillStyle = 'orange';
          }else{
            ctx.fillStyle = 'black';
          }
          ctx.fillRect(25*i,25*j,25,25);
         }
        }
    }
  }
  
  
  
  var x = 0;
  var y = 0;
  
  
  async function clear(ctx) {
  
  ctx.fillStyle = 'orange';
  for (let i = 0; 80>i; i++){
    for (let j = 0; 30>j; j++){
      ctx.fillRect(25*i,25*j,25,25);
      }
    }
  
  }
  
  
  async function get_canvas(){
  var canvas = await document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'orange';
    return ctx
  }
  
  
  }
  
  
  
  
  
  function loop_random(){
        draw();
        setTimeout(function(){ 
            loop_random();
            
         }, 100);
        
    // }
  }
  var ctxx 
  async function run(){
  draw();
  ctxx = await get_canvas();
  clear(ctxx);
  console.log(ctxx)
  
  // draw_point(ctxx, 2,3)
  window.addEventListener( "keydown", pe, false )
  gravity_loop()
  
  }
  
  run()
  
  async function draw_point(ctx, xx, yy) {
  
  ctx.fillStyle = 'black';
  ctx.fillRect(25*xx,25*yy,25,25);
  }
  
  
  
  const pe = (e) => {
  console.log("asdasd")
  console.log(e)
  clear(ctxx);
  
  
  if (e.key == "w"){
    y--;
  }
  if (e.key == "s"){
    if (y < 30 - 1 ) {
      y++
    }
  }
  if (e.key == "a"){
    x--;
  }
  if (e.key == "d"){
    x++;
  }
  
  
  draw_point(ctxx, x,y)
  }
  
  function gravity_loop(){
  clear(ctxx)
  if (y < 30 - 1 ) {
    y++
  }
  draw_point(ctxx, x,y)
  setTimeout(function(){ 
      gravity_loop();
      
   }, 100);
  
  // }
  }
  
  
  
  
  // window.addEventListener( "keypress", pe )
  
  