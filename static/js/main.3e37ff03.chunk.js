(this["webpackJsonplearn-react"]=this["webpackJsonplearn-react"]||[]).push([[0],{238:function(e,t,i){"use strict";i.r(t);var n=i(0),a=i.n(n),s=i(85),o=i.n(s),r=(i(92),i(93),i(94),i(5)),d=i(6),l=i(8),c=i(7),h=(i(19),a.a.Component,i(86)),u=i.n(h),m=function(e){Object(l.a)(i,e);var t=Object(c.a)(i);function i(e){var n;return Object(r.a)(this,i),(n=t.call(this,e)).sendData=function(){var e={};e.id=n.id,e.infected=n.infected,e.x=n.x,e.y=n.y,e.arrived=n.arrived,e.cough={},e.cough.occur=!0,e.cough.x=n.x,e.cough.y=n.x,e.recovered=n.recovered,n.props.parentCallback(e)},n.xGoal=n.props.meeting.x+2*Math.random()-1,n.yGoal=n.props.meeting.y+2*Math.random()-1,n.x=Math.floor(1+98*Math.random()),n.y=Math.floor(1+98*Math.random()),n.xStart=n.x,n.yStart=n.y,n.id=e.id,n.social=e.social,n.infected=e.infected,n.masks=e.masks,"a0"==n.id&&(n.infected=!0),n.state={date:new Date},n.allNodes=e.allNodes,n.arrived=!1,n.recovered=!1,n.first=!0,n.time=0,n.percent=0,n.cough=!1,n.infected&&(n.cough=!0),n.totalDistance=Math.abs(n.xGoal-n.xStart),n}return Object(d.a)(i,[{key:"convertTimeToX",value:function(e){var t=this.percent;return this.totalDistance*t+this.xStart}},{key:"distance",value:function(e,t){return Math.sqrt(Math.pow(this.xGoal-this.x,2)+Math.pow(this.yGoal-this.y,2))}},{key:"componentDidMount",value:function(){var e=this;this.updatePosition(),this.timerID=setInterval((function(){return e.updatePosition()}),50)}},{key:"getX",value:function(){return this.x}},{key:"infect",value:function(){var e=this;document.getElementById(this.id).style.backgroundColor="red",this.recoverTimer=setTimeout((function(){return e.recover()}),22500)}},{key:"recover",value:function(){document.getElementById(this.id).style.backgroundColor="#f8ed62",this.recovered=!0}},{key:"equation",value:function(e){return this.slope(this.xStart,this.yStart)*(e-this.xStart)+this.yStart}},{key:"slope",value:function(e,t){return(this.yGoal-t)/(this.xGoal-e)}},{key:"otherFunction",value:function(e){this.x=e}},{key:"updatePosition",value:function(){if(this.social=document.getElementById("sd").value/100,this.time+=50,this.setState({date:new Date}),this.arrived)1!=this.infected||this.recovered||"red"!=document.getElementById(this.id).backgroundColor&&this.infect();else{if(this.x=this.convertTimeToX(this.time),this.y=this.equation(this.x),1!=this.infected||this.recovered||"red"!=document.getElementById(this.id).backgroundColor&&this.infect(),1==this.percent)return this.x=this.xGoal,this.y=this.yGoal,this.arrived=!0,this.sendData(),void(this.totalDistance=Math.abs(this.xGoal-this.xStart));this.sendData();var e=this;if(this.first){if(Math.random()<this.social){this.percent=1,this.xGoal=this.x,this.yGoal=this.y;var t=document.getElementById(this.id);return t.style.left=this.x+"%",void(t.style.top=this.y+"%")}var i=document.getElementById(this.id);i.style.left=this.x+"%",i.style.top=this.y+"%",i.velocity({left:this.xGoal+"%",top:this.yGoal+"%"},{duration:6500,progress:function(t,i,n,a,s){!function(e,t){e.percent=t}(e,i)}}),this.time=0}this.first=!1}}},{key:"componentDidUpdate",value:function(e){this.props.infected&&!this.infected&&(this.infected=this.props.infected,this.cough=!0),this.props.reset&&(this.arrived=!1,this.first=!0,this.xGoal=this.props.meeting.x+2*Math.random()-1,this.yGoal=this.props.meeting.y+2*Math.random()-1,this.xStart=this.x,this.yStart=this.y,this.arrived=!1,this.percent=0)}},{key:"render",value:function(){return this.masks?a.a.createElement("div",{id:this.id,className:"person"},a.a.createElement("img",{src:u.a})):a.a.createElement("div",{id:this.id,className:"person"})}}]),i}(a.a.Component),f=function(e){Object(l.a)(i,e);var t=Object(c.a)(i);function i(e){var n;return Object(r.a)(this,i),(n=t.call(this,e)).state={date:new Date},n.id=e.id,n.x=e.x,n.y=e.y,console.log("aqui"),n}return Object(d.a)(i,[{key:"componentDidMount",value:function(){this.update()}},{key:"update",value:function(){var e=document.getElementById(this.id);e.style.left=this.x+"%",e.style.top=this.y+"%",e.style.width="0px",e.style.height="0px",e.style.transition="1.5s",this.setState({date:new Date}),this.timerID=setTimeout((function(){e.style.width="40px",e.style.height="40px"}),50)}},{key:"render",value:function(){return a.a.createElement("div",{className:"transmit",id:this.id})}}]),i}(a.a.Component),v=function(e){Object(l.a)(i,e);var t=Object(c.a)(i);function i(e){var n;Object(r.a)(this,i),(n=t.call(this,e)).callbackFunction=function(e){e.id in n.allNodes?!n.allNodes[e.id].arrived&&e.arrived&&(n.arrivedNodes=n.arrivedNodes+1):e.arrived&&(n.arrivedNodes=n.arrivedNodes+1),n.allNodes[e.id]=e,n.arrivedNodes==n.numOfNodes&&(n.reset=!0,n.arrivedNodes=0,n.shouldUpdate=!0),n.allSick=!1},n.justReset=!1,n.numOfNodes=e.numOfNodes,n.nodes=[],n.passNodes=[],n.allNodes={},n.reset=!1,n.change=!1,n.taco=0,e.masks?n.infectionRate=100:n.infectionRate=25,n.social=document.getElementById("sd").value/100,n.arrivedNodes=0,n.numOfMeetings=n.numOfNodes/4,n.meetings=[];for(var s=0;s<n.numOfMeetings;s++){var o=Math.floor(1+98*Math.random()),d=Math.floor(2+96*Math.random());n.meetings[s]={},n.meetings[s].x=o,n.meetings[s].y=d}n.done=!1,n.nodeMeeting={},n.interactionDuration={};for(var l=0;l<n.numOfNodes;l++){Math.random();var c="a"+l;n.nodes[l]=c,n.passNodes[l]=c;var h=Math.floor(Math.random()*n.numOfMeetings);n.nodeMeeting[c]=n.meetings[h],n.nodeMeeting[c].x+=1*Math.random()-.5,n.nodeMeeting[c].y+=1*Math.random()-.5,n.allNodes[c]={},n.interactionDuration={},n.allNodes[c].infected=!1}return n.nodes=n.nodes.map((function(t){return a.a.createElement(m,{masks:e.masks,infected:!1,social:n.social,recovered:!1,reset:!1,id:t,meeting:n.nodeMeeting[t],parentCallback:n.callbackFunction,key:t})})),n.nodes[0]=a.a.createElement(m,{masks:e.masks,infected:!0,social:n.social,id:"a0",recovered:!1,reset:!1,meeting:n.nodeMeeting.a0,parentCallback:n.callbackFunction,key:"a0"}),n.state={nodes:n.nodes},n.transmissions=[],n}return Object(d.a)(i,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval((function(){return e.update()}),50)}},{key:"update",value:function(){this.shouldUpdate=!1,this.done=!1,this.justReset&&(this.shouldUpdate=!0,this.justReset=!1),this.checkCollision(),this.reset&&(this.RESET(),this.shouldUpdate=!0),this.shouldUpdate&&(this.updateComponents(),this.setState({nodes:this.nodes}),this.reset&&(this.reset=!1,this.justReset=!0))}},{key:"updateComponents",value:function(){for(var e=0;e<this.numOfNodes;e++){var t="a"+e;this.nodes[e]=a.a.createElement(m,{infected:this.allNodes[t].infected,recovered:this.allNodes[t].recovered,reset:this.reset,id:t,meeting:this.nodeMeeting[t],parentCallback:this.callbackFunction,key:t})}this.shouldUpdate=!1}},{key:"hardcode",value:function(){this.reset=!1}},{key:"distance",value:function(e,t){return Math.sqrt(Math.pow(this.allNodes[e].x-this.allNodes[t].x,2)+Math.pow(this.allNodes[e].y-this.allNodes[t].y,2))}},{key:"checkCollision",value:function(){for(var e=this,t=0,i=0;i<this.nodes.length;i++){for(var n=0;n<this.nodes.length;n++){var s=this.passNodes[i],o=this.passNodes[n];if(!(this.allNodes[s].recovered||this.allNodes[o].recovered||i==n||this.allNodes[s].infected&&this.allNodes[o].infected)&&(this.allNodes[s].infected||this.allNodes[o].infected)){var r=s;if(this.allNodes[o].infected||(r=o),this.distance(s,o)<2.5)this.interactionDuration[r]+=1,Math.random()<this.interactionDuration[r]/this.infectionRate&&function(){console.log("sick"),e.allNodes[r].infected=!0,e.shouldUpdate=!0;var t=e.transmissions.length;e.transmissions.push(a.a.createElement(f,{key:"tm"+r,id:"tm"+r,x:e.allNodes[r].x,y:e.allNodes[r].y})),setTimeout((function(){delete e.transmissions[t],e.setState({nodes:e.nodes}),console.log("Fade")}),1500)}();else this.interactionDuration[r]=0}}this.allNodes[this.passNodes[i]].infected&&(t+=1)}t==this.numOfNodes&&(this.allSick=!0)}},{key:"updateMeetings",value:function(){for(var e=0;e<this.nodes.length;e++){var t=this.passNodes[e];if(!this.allNodes[t].arrived){for(var i=0;i<this.nodes.length;i++)this.passNodes[i];return}}for(var n=0;n<this.numOfMeetings;n++){var a=Math.floor(1+98*Math.random()),s=Math.floor(2+96*Math.random());this.meetings[n]={},this.meetings[n].x=a,this.meetings[n].y=s}for(var o=0;o<this.nodes.length;o++){var r=this.passNodes[o];this.allNodes[r].arrived=!1}this.reset=!0}},{key:"RESET",value:function(){this.nodeMeeting={};for(var e=0;e<this.numOfMeetings;e++){var t=Math.floor(1+98*Math.random()),i=Math.floor(1+98*Math.random());this.meetings[e]={},this.meetings[e].x=t,this.meetings[e].y=i}for(var n=0;n<this.numOfNodes;n++){var a="a"+n;this.passNodes[n]=a;var s=Math.floor(Math.random()*this.numOfMeetings);this.nodeMeeting[a]=this.meetings[s]}console.log(this.nodeMeeting)}},{key:"render",value:function(){if(this.taco>=2&&!this.reset)for(var e=0;e<this.numOfNodes;e++)Math.random();if(this.taco=this.taco+1,this.change){this.change=!1;for(var t=0;t<this.numOfNodes;t++);}return this.reset&&(this.change=!0),console.log(this.state.nodes),console.log(this.transmissions),this.allSick?a.a.createElement("div",null,"All Sick"):a.a.createElement("div",null,a.a.createElement("div",null,this.state.nodes),a.a.createElement("div",null,this.transmissions))}}]),i}(a.a.Component),p=function(e){Object(l.a)(i,e);var t=Object(c.a)(i);function i(e){var n;return Object(r.a)(this,i),(n=t.call(this,e)).generate=function(e){"GenerateSimulation"==e.target.id&&(n.masks=document.getElementById("masks").checked,n.masks?n.masks=!0:n.masks=!1,n.numPeople=document.getElementById("numPeople").value,isNaN(n.numPeople)?alert("Please enter number of people for simulation"):(n.assigned=!0,n.numOfCreations++,n.setState({numOfCreations:n.numOfCreations})))},n.state={numOfCreations:0},n.numOfCreations=0,n.assigned=!1,n}return Object(d.a)(i,[{key:"componentDidMount",value:function(){this.assigned=!1;document.getElementById("GenerateSimulation");document.addEventListener("click",this.generate)}},{key:"render",value:function(){return this.assigned?a.a.createElement("div",{id:"graphArea"},a.a.createElement(v,{key:this.numOfCreations,numOfNodes:this.numPeople,masks:this.masks})):a.a.createElement("div",{id:"graphArea"})}}]),i}(a.a.Component);var g=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"App"},a.a.createElement("div",{id:"title"},"Covid Visualizer"),a.a.createElement("div",{id:"topBox"},a.a.createElement("div",{id:"inputs"},a.a.createElement("div",{id:"people"},a.a.createElement("input",{id:"numPeople",placeholder:"Number of people"})),a.a.createElement("div",{id:"socialDistance"},a.a.createElement("input",{type:"range",placeholder:"Social Distancing",id:"sd",name:"cowbell",min:"0",max:"100"}),a.a.createElement("label",{for:"cowbell"},"Level of Social Distancing")),a.a.createElement("div",null,a.a.createElement("input",{id:"masks",type:"checkbox"}),a.a.createElement("label",null,"Masks?"))),a.a.createElement("div",{id:"generate"},a.a.createElement("button",{id:"GenerateSimulation"},"Generate Simulation"))),a.a.createElement(p,null),a.a.createElement("div",{id:"bottomBorder"},a.a.createElement("div",{id:"negativeCovid"},"Negative"),a.a.createElement("div",{id:"positiveCovid"},"Positive"),a.a.createElement("div",{id:"recoveredCovid"},"Recovered"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},86:function(e,t,i){e.exports=i.p+"static/media/coronavirus.a625a7c2.png"},87:function(e,t,i){e.exports=i(238)},92:function(e,t,i){},93:function(e,t,i){e.exports=i.p+"static/media/logo.5d5d9eef.svg"},94:function(e,t,i){}},[[87,1,2]]]);
//# sourceMappingURL=main.3e37ff03.chunk.js.map