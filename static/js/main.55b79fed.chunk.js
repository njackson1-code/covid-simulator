(this["webpackJsonplearn-react"]=this["webpackJsonplearn-react"]||[]).push([[0],{238:function(e,t,i){"use strict";i.r(t);var a=i(0),n=i.n(a),s=i(85),o=i.n(s),r=(i(92),i(93),i(94),i(7)),d=i(8),l=i(10),c=i(9),h=(i(29),n.a.Component,i(86)),u=i.n(h),m=function(e){Object(l.a)(i,e);var t=Object(c.a)(i);function i(e){var a;return Object(r.a)(this,i),(a=t.call(this,e)).sendData=function(){var e={};e.id=a.id,e.infected=a.infected,e.x=a.x,e.y=a.y,e.arrived=a.arrived,e.cough={},e.cough.occur=!0,e.cough.x=a.x,e.cough.y=a.x,e.recovered=a.recovered,a.props.parentCallback(e)},a.xGoal=a.props.meeting.x+2*Math.random()-1,a.yGoal=a.props.meeting.y+2*Math.random()-1,a.x=Math.floor(1+98*Math.random()),a.y=Math.floor(1+98*Math.random()),a.xStart=a.x,a.yStart=a.y,a.id=e.id,a.social=e.social,a.infected=e.infected,a.masks=e.masks,"a0"==a.id&&(a.infected=!0),a.state={date:new Date},a.allNodes=e.allNodes,a.arrived=!1,a.recovered=!1,a.first=!0,a.time=0,a.percent=0,a.cough=!1,a.infected&&(a.cough=!0),a.totalDistance=Math.abs(a.xGoal-a.xStart),a}return Object(d.a)(i,[{key:"convertTimeToX",value:function(e){var t=this.percent;return this.totalDistance*t+this.xStart}},{key:"distance",value:function(e,t){return Math.sqrt(Math.pow(this.xGoal-this.x,2)+Math.pow(this.yGoal-this.y,2))}},{key:"componentDidMount",value:function(){var e=this;this.updatePosition(),this.timerID=setInterval((function(){return e.updatePosition()}),50)}},{key:"getX",value:function(){return this.x}},{key:"infect",value:function(){var e=this;document.getElementById(this.id).style.backgroundColor="red",this.recoverTimer=setTimeout((function(){return e.recover()}),22500)}},{key:"recover",value:function(){document.getElementById(this.id).style.backgroundColor="#f8ed62",this.recovered=!0}},{key:"equation",value:function(e){return this.slope(this.xStart,this.yStart)*(e-this.xStart)+this.yStart}},{key:"slope",value:function(e,t){return(this.yGoal-t)/(this.xGoal-e)}},{key:"otherFunction",value:function(e){this.x=e}},{key:"updatePosition",value:function(){this.social=document.getElementById("sd").value/100,this.time+=50;document.getElementById(this.id);if(this.setState({date:new Date}),!this.arrived){if(this.x=this.convertTimeToX(this.time),this.y=this.equation(this.x),1!=this.infected||this.recovered||"red"!=document.getElementById(this.id).backgroundColor&&this.infect(),1==this.percent)return this.x=this.xGoal,this.y=this.yGoal,this.arrived=!0,this.sendData(),void(this.totalDistance=Math.abs(this.xGoal-this.xStart));this.sendData();var e=this;if(this.first){if(Math.random()<this.social){this.percent=1,this.xGoal=this.x,this.yGoal=this.y;var t=document.getElementById(this.id);return t.style.left=this.x+"%",void(t.style.top=this.y+"%")}var i=document.getElementById(this.id);i.style.left=this.x+"%",i.style.top=this.y+"%",i.velocity({left:this.xGoal+"%",top:this.yGoal+"%"},{duration:6500,progress:function(t,i,a,n,s){!function(e,t){e.percent=t}(e,i)}}),this.time=0}this.first=!1}}},{key:"componentDidUpdate",value:function(e){this.props.infected&&!this.infected&&(this.infected=this.props.infected,this.cough=!0),this.props.reset&&(this.arrived=!1,this.first=!0,this.xGoal=this.props.meeting.x+2*Math.random()-1,this.yGoal=this.props.meeting.y+2*Math.random()-1,this.xStart=this.x,this.yStart=this.y,this.arrived=!1,this.percent=0)}},{key:"render",value:function(){return this.masks?n.a.createElement("div",{id:this.id,className:"person"},n.a.createElement("img",{src:u.a})):n.a.createElement("div",{id:this.id,className:"person"})}}]),i}(n.a.Component),f=function(e){Object(l.a)(i,e);var t=Object(c.a)(i);function i(e){var a;Object(r.a)(this,i),(a=t.call(this,e)).callbackFunction=function(e){e.id in a.allNodes?!a.allNodes[e.id].arrived&&e.arrived&&(a.arrivedNodes=a.arrivedNodes+1):e.arrived&&(a.arrivedNodes=a.arrivedNodes+1),a.allNodes[e.id]=e,a.arrivedNodes==a.numOfNodes&&(a.reset=!0,a.arrivedNodes=0,a.shouldUpdate=!0),a.allSick=!1},a.justReset=!1,a.numOfNodes=e.numOfNodes,a.nodes=[],a.passNodes=[],a.allNodes={},a.reset=!1,a.change=!1,a.taco=0,e.masks?a.infectionRate=100:a.infectionRate=25,a.social=document.getElementById("sd").value/100,a.arrivedNodes=0,a.numOfMeetings=a.numOfNodes/4,a.meetings=[];for(var s=0;s<a.numOfMeetings;s++){var o=Math.floor(1+98*Math.random()),d=Math.floor(2+96*Math.random());a.meetings[s]={},a.meetings[s].x=o,a.meetings[s].y=d}a.done=!1,a.nodeMeeting={},a.interactionDuration={};for(var l=0;l<a.numOfNodes;l++){Math.random();var c="a"+l;a.nodes[l]=c,a.passNodes[l]=c;var h=Math.floor(Math.random()*a.numOfMeetings);a.nodeMeeting[c]=a.meetings[h],a.nodeMeeting[c].x+=1*Math.random()-.5,a.nodeMeeting[c].y+=1*Math.random()-.5,a.allNodes[c]={},a.interactionDuration={},a.allNodes[c].infected=!1}return a.nodes=a.nodes.map((function(t){return n.a.createElement(m,{masks:e.masks,infected:!1,social:a.social,recovered:!1,reset:!1,id:t,meeting:a.nodeMeeting[t],parentCallback:a.callbackFunction,key:t})})),a.nodes[0]=n.a.createElement(m,{masks:e.masks,infected:!0,social:a.social,id:"a0",recovered:!1,reset:!1,meeting:a.nodeMeeting.a0,parentCallback:a.callbackFunction,key:"a0"}),a.state={nodes:a.nodes},a}return Object(d.a)(i,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval((function(){return e.update()}),50)}},{key:"update",value:function(){this.shouldUpdate=!1,this.done=!1,this.justReset&&(this.shouldUpdate=!0,this.justReset=!1),this.checkCollision(),this.reset&&(this.RESET(),this.shouldUpdate=!0),this.shouldUpdate&&(this.updateComponents(),this.setState({nodes:this.nodes}),this.reset&&(this.reset=!1,this.justReset=!0))}},{key:"updateComponents",value:function(){for(var e=0;e<this.numOfNodes;e++){var t="a"+e;this.nodes[e]=n.a.createElement(m,{infected:this.allNodes[t].infected,recovered:this.allNodes[t].recovered,reset:this.reset,id:t,meeting:this.nodeMeeting[t],parentCallback:this.callbackFunction,key:t})}this.shouldUpdate=!1}},{key:"hardcode",value:function(){this.reset=!1}},{key:"distance",value:function(e,t){return Math.sqrt(Math.pow(this.allNodes[e].x-this.allNodes[t].x,2)+Math.pow(this.allNodes[e].y-this.allNodes[t].y,2))}},{key:"checkCollision",value:function(){for(var e=0,t=0;t<this.nodes.length;t++){for(var i=0;i<this.nodes.length;i++){var a=this.passNodes[t],n=this.passNodes[i];if(!(this.allNodes[a].recovered||this.allNodes[n].recovered||t==i||this.allNodes[a].infected&&this.allNodes[n].infected)&&(this.allNodes[a].infected||this.allNodes[n].infected)){var s=a;if(this.allNodes[n].infected||(s=n),this.distance(a,n)<2.5)this.interactionDuration[s]+=1,Math.random()<this.interactionDuration[s]/this.infectionRate&&(console.log("sick"),this.allNodes[s].infected=!0,this.shouldUpdate=!0);else this.interactionDuration[s]=0}}this.allNodes[this.passNodes[t]].infected&&(e+=1)}e==this.numOfNodes&&(this.allSick=!0)}},{key:"updateMeetings",value:function(){for(var e=0;e<this.nodes.length;e++){var t=this.passNodes[e];if(!this.allNodes[t].arrived){for(var i=0;i<this.nodes.length;i++)this.passNodes[i];return}}for(var a=0;a<this.numOfMeetings;a++){var n=Math.floor(1+98*Math.random()),s=Math.floor(2+96*Math.random());this.meetings[a]={},this.meetings[a].x=n,this.meetings[a].y=s}for(var o=0;o<this.nodes.length;o++){var r=this.passNodes[o];this.allNodes[r].arrived=!1}this.reset=!0}},{key:"RESET",value:function(){this.nodeMeeting={};for(var e=0;e<this.numOfMeetings;e++){var t=Math.floor(1+98*Math.random()),i=Math.floor(1+98*Math.random());this.meetings[e]={},this.meetings[e].x=t,this.meetings[e].y=i}for(var a=0;a<this.numOfNodes;a++){var n="a"+a;this.passNodes[a]=n;var s=Math.floor(Math.random()*this.numOfMeetings);this.nodeMeeting[n]=this.meetings[s]}console.log(this.nodeMeeting)}},{key:"render",value:function(){if(this.taco>=2&&!this.reset)for(var e=0;e<this.numOfNodes;e++)Math.random();if(this.taco=this.taco+1,this.change){this.change=!1;for(var t=0;t<this.numOfNodes;t++);}return this.reset&&(this.change=!0),this.allSick?n.a.createElement("div",null,"All Sick"):n.a.createElement("div",null,this.state.nodes)}}]),i}(n.a.Component),v=function(e){Object(l.a)(i,e);var t=Object(c.a)(i);function i(e){var a;return Object(r.a)(this,i),(a=t.call(this,e)).generate=function(e){"GenerateSimulation"==e.target.id&&(a.masks=document.getElementById("masks").checked,a.masks?a.masks=!0:a.masks=!1,a.numPeople=document.getElementById("numPeople").value,isNaN(a.numPeople)?alert("Please enter number of people for simulation"):(a.assigned=!0,a.numOfCreations++,a.setState({numOfCreations:a.numOfCreations})))},a.state={numOfCreations:0},a.numOfCreations=0,a.assigned=!1,a}return Object(d.a)(i,[{key:"componentDidMount",value:function(){this.assigned=!1;document.getElementById("GenerateSimulation");document.addEventListener("click",this.generate)}},{key:"render",value:function(){return this.assigned?n.a.createElement("div",{id:"graphArea"},n.a.createElement(f,{key:this.numOfCreations,numOfNodes:this.numPeople,masks:this.masks})):n.a.createElement("div",{id:"graphArea"})}}]),i}(n.a.Component);var p=function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"App"},n.a.createElement("div",{id:"title"},"Covid Visualizer"),n.a.createElement("div",{id:"topBox"},n.a.createElement("div",{id:"inputs"},n.a.createElement("div",{id:"people"},n.a.createElement("input",{id:"numPeople",placeholder:"Number of people"})),n.a.createElement("div",{id:"socialDistance"},n.a.createElement("input",{type:"range",placeholder:"Social Distancing",id:"sd",name:"cowbell",min:"0",max:"100"}),n.a.createElement("label",{for:"cowbell"},"Level of Social Distancing")),n.a.createElement("div",null,n.a.createElement("input",{id:"masks",type:"checkbox"}),n.a.createElement("label",null,"Masks?"))),n.a.createElement("div",{id:"generate"},n.a.createElement("button",{id:"GenerateSimulation"},"Generate Simulation"))),n.a.createElement(v,null),n.a.createElement("div",{id:"bottomBorder"},n.a.createElement("div",{id:"negativeCovid"},"Negative"),n.a.createElement("div",{id:"positiveCovid"},"Positive"),n.a.createElement("div",{id:"recoveredCovid"},"Recovered"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},86:function(e,t,i){e.exports=i.p+"static/media/coronavirus.a625a7c2.png"},87:function(e,t,i){e.exports=i(238)},92:function(e,t,i){},93:function(e,t,i){e.exports=i.p+"static/media/logo.5d5d9eef.svg"},94:function(e,t,i){}},[[87,1,2]]]);
//# sourceMappingURL=main.55b79fed.chunk.js.map