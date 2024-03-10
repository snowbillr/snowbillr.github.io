class i{constructor(i,t){this.size=3,this.gridX=i,this.gridY=t,this.displayX=0,this.displayY=0,this.visible=!0}clone(){let t=new i(this.gridX,this.gridY);return t.displayX=this.displayX,t.displayY=this.displayY,t}render(i){this.visible&&(i.fillStyle="#ccc",i.fillRect(this.displayX,this.displayY,this.size,this.size))}}class t{constructor(i,t,s){this.pointDistance=i,this.resize(t,s)}resize(t,s){this.points=[],this.horizontalPointCount=Math.ceil(t/this.pointDistance),this.verticalPointCount=Math.ceil(s/this.pointDistance),this.xPadding=(t-(this.horizontalPointCount-1)*this.pointDistance)/2,this.yPadding=(s-(this.verticalPointCount-1)*this.pointDistance)/2;for(let t=0;t<this.horizontalPointCount;t++)for(let s=0;s<this.verticalPointCount;s++)this.points.push(new i(t,s))}update(){this.points.forEach(i=>{i.displayX=i.gridX*this.pointDistance+this.xPadding,i.displayY=i.gridY*this.pointDistance+this.yPadding})}render(i){this.points.forEach(t=>{t.render(i)})}selectVisibleAdjacentPoints(){let i=this.shuffleArray(this.points.filter(i=>i.visible))[0];if(null==i)return[null,null];let t=this.shuffleArray(this.selectVisibleCardinalPoints(i))[0];return[i,t]}selectVisibleCardinalPoints({gridX:i,gridY:t}){return[this.findPoint(i+1,t),this.findPoint(i-1,t),this.findPoint(i,t+1),this.findPoint(i,t-1)].filter(i=>null!=i).filter(i=>i.visible)}findPoint(i,t){return this.points.find(s=>s.gridX===i&&s.gridY===t)}// taken from https://stackoverflow.com/a/6274381/1950372
shuffleArray(i){for(let t=i.length-1;t>0;t--){let s=Math.floor(Math.random()*(t+1));[i[t],i[s]]=[i[s],i[t]]}return i}}class s{constructor(i,t,s){this.frameDuration=60,this.frame=0,this.isRunning=!0,this.callback=s,this.callbackCalled=!1,this.firstPoint=i.clone(),this.secondPoint=t.clone(),this.originalDisplayCoords={firstPoint:{displayX:i.displayX,displayY:i.displayY},secondPoint:{displayX:t.displayX,displayY:t.displayY}},this.xDistance=i.displayX-t.displayX,this.yDistance=i.displayY-t.displayY}ease(i,t,s,n){return-s/2*(Math.cos(Math.PI*i/n)-1)+t}update(){this.frame+=1,this.frame>this.frameDuration?(this.isRunning=!1,this.callbackCalled||(this.callback(this),this.callbackCalled=!0)):(this.firstPoint.displayX=this.ease(this.frame,this.originalDisplayCoords.firstPoint.displayX,-this.xDistance,this.frameDuration),this.firstPoint.displayY=this.ease(this.frame,this.originalDisplayCoords.firstPoint.displayY,-this.yDistance,this.frameDuration),this.secondPoint.displayX=this.ease(this.frame,this.originalDisplayCoords.secondPoint.displayX,this.xDistance,this.frameDuration),this.secondPoint.displayY=this.ease(this.frame,this.originalDisplayCoords.secondPoint.displayY,this.yDistance,this.frameDuration))}render(i){this.isRunning&&(this.firstPoint.render(i),this.secondPoint.render(i))}}class n{constructor(){this.backgroundCanvas=document.querySelector("#background-canvas"),this.ctx=this.backgroundCanvas.getContext("2d"),this.pointGrid=new t(100,this.ctx.canvas.clientWidth,this.ctx.canvas.clientHeight),this.pointSwapAnimations=[]}start(){this.addResizeListener(),this.resize(),this.startSpawnLoop(),requestAnimationFrame(()=>this.mainLoop())}addResizeListener(){window.addEventListener("resize",this.resize)}resize(){let i=window.innerWidth,t=window.innerHeight;this.backgroundCanvas.width=i,this.backgroundCanvas.height=t,this.pointGrid.resize(i,t)}startSpawnLoop(){setInterval(()=>{if(this.pointSwapAnimations.length>=5)return;let[i,t]=this.pointGrid.selectVisibleAdjacentPoints();null!=i&&null!=t&&(i.visible=!1,t.visible=!1,this.pointSwapAnimations.push(new s(i,t,s=>{i.visible=!0,t.visible=!0,this.pointSwapAnimations.splice(this.pointSwapAnimations.indexOf(s),1)})))},500)}mainLoop(){this.update(),this.render(),requestAnimationFrame(()=>this.mainLoop())}update(){this.pointGrid.update(),this.pointSwapAnimations.forEach(i=>i.update())}render(){this.clear(),this.pointGrid.render(this.ctx),this.pointSwapAnimations.forEach(i=>i.render(this.ctx))}clear(){this.ctx.fillStyle="#fff",this.ctx.fillRect(0,0,this.ctx.canvas.clientWidth,this.ctx.canvas.clientHeight)}}class e{print(){console.log(`
Thanks for checking out my website!

You can contact me at billnreed@gmail.com if you'd like to get in touch.
    `)}}function a(){let i=new n;i.start();let t=new e;t.print()}//# sourceMappingURL=index.620cad5f.js.map
"complete"===document.readyState||"interactive"===document.readyState?a():document.addEventListener("DOMContentLoaded",a);
//# sourceMappingURL=index.620cad5f.js.map