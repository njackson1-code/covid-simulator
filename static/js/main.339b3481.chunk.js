(this["webpackJsonplearn-react"]=this["webpackJsonplearn-react"]||[]).push([[0],{240:function(e,t,i){"use strict";i.r(t);var a=i(0),s=i.n(a),n=i(85),o=i.n(n),r=(i(93),i(94),i(95),i(5)),l=i(6),d=i(8),c=i(7),h=(i(19),s.a.Component,i(86)),u=i.n(h),m=i(87),v=i.n(m),f=(i(239),function(e){Object(d.a)(i,e);var t=Object(c.a)(i);function i(e){var a;return Object(r.a)(this,i),(a=t.call(this,e)).sendData=function(){var e={};e.id=a.id,e.infected=a.infected,e.x=a.x,e.y=a.y,e.arrived=a.arrived,e.cough={},e.cough.occur=!0,e.cough.x=a.x,e.cough.y=a.x,e.recovered=a.recovered,a.arrived&&(e.percent=a.percent),a.props.parentCallback(e)},a.xGoal=a.props.meeting.x+2*Math.random()-1,a.yGoal=a.props.meeting.y+2*Math.random()-1,a.x=Math.floor(1+98*Math.random()),a.y=Math.floor(1+98*Math.random()),a.xStart=a.x,a.yStart=a.y,a.id=e.id,a.social=e.social,a.infected=e.infected,a.masks=e.masks,a.angel=!1,a.deathRate=.01,a.id==a.key+"a0"&&(a.infected=!0),a.state={date:new Date},a.allNodes=e.allNodes,a.arrived=!1,a.recovered=!1,a.first=!0,a.infex=!1,a.time=0,a.percent=0,a.cough=!1,a.infected&&(a.cough=!0),a.totalDistance=a.xGoal-a.xStart,a}return Object(l.a)(i,[{key:"convertTimeToX",value:function(e){var t=this.percent;return this.totalDistance*t+this.xStart}},{key:"distance",value:function(e,t){return Math.sqrt(Math.pow(this.xGoal-this.x,2)+Math.pow(this.yGoal-this.y,2))}},{key:"componentDidMount",value:function(){var e=this;this.updatePosition(),this.timerID=setInterval((function(){return e.updatePosition()}),50)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID),clearTimeout(this.recoverTimer)}},{key:"stopMovement",value:function(){clearInterval(this.timerID);var e=document.getElementById(this.id);this.angel||e.velocity("stop",!0)}},{key:"getX",value:function(){return this.x}},{key:"infect",value:function(){var e=this;this.infex=!0,document.getElementById(this.id).style.backgroundColor="red",console.log(this.id),this.recoverTimer=setTimeout((function(){return e.recover()}),22500),this.setState({date:new Date})}},{key:"recover",value:function(){if(!this.recovered){this.recovered=!0;var e="#f8ed62";Math.random()<=this.deathRate&&(this.angel=!0,e="white",this.floatingAngel()),document.getElementById(this.id).style.backgroundColor=e,this.setState({date:new Date})}}},{key:"floatingAngel",value:function(){this.yGoal=-200;var e=document.getElementById(this.id);this.arrived=!0,this.x=this.convertTimeToX(this.time),this.sendData(),e.velocity("stop",!0),e.velocity({left:this.x+"%",top:this.yGoal+"%"},{duration:12500})}},{key:"equation",value:function(e){return this.slope(this.xStart,this.yStart)*(e-this.xStart)+this.yStart}},{key:"slope",value:function(e,t){return(this.yGoal-t)/(this.xGoal-e)}},{key:"otherFunction",value:function(e){this.x=e}},{key:"updatePosition",value:function(){if(this.allSick)return this.stopMovement(),void(this.infected&&!this.recovered&&this.infect());if(this.social=document.getElementById("sd").value/100,this.time+=50,this.setState({date:new Date}),this.arrived)1!=this.infected||this.recovered||this.infex||this.infect();else{if(this.angel&&this.angel)return this.arrived=!0,void this.sendData();if(this.x=this.convertTimeToX(this.time),this.y=this.equation(this.x),"1a0"==this.id&&console.log(this.y),this.infected&&!this.recovered&&(1!=this.infected||this.recovered||this.infex||this.infect()),1==this.percent)return this.x=this.xGoal,this.y=this.yGoal,this.arrived=!0,void this.sendData();this.sendData();var e=this;if(this.first){var t=Math.random();if(this.id,t<this.social){this.percent=1,this.xGoal=this.x,this.yGoal=this.y;var i=document.getElementById(this.id);return i.style.left=this.x+"%",void(i.style.top=this.y+"%")}var a=document.getElementById(this.id);a.style.left=this.x+"%",a.style.top=this.y+"%",a.velocity({left:this.xGoal+"%",top:this.yGoal+"%"},{duration:6500,progress:function(t,i,a,s,n){!function(e,t){e.percent=t}(e,i)}}),this.percent=0}this.first=!1}}},{key:"componentDidUpdate",value:function(e){this.allSick=this.props.allSick,this.props.infected&&(this.infected=this.props.infected,this.cough=!0),this.props.reset&&(this.arrived=!1,this.first=!0,this.xGoal=this.props.meeting.x+2*Math.random()-1,this.yGoal=this.props.meeting.y+2*Math.random()-1,this.xStart=this.x,this.yStart=this.y,this.arrived=!1,this.percent=0,this.totalDistance=this.xGoal-this.xStart)}},{key:"render",value:function(){return this.angel?s.a.createElement("div",{id:this.id,className:"person"},s.a.createElement("img",{className:"angel",src:v.a})):this.masks?s.a.createElement("div",{id:this.id,className:"person"},s.a.createElement("img",{src:u.a})):s.a.createElement("div",{id:this.id,className:"person"})}}]),i}(s.a.Component)),p=function(e){Object(d.a)(i,e);var t=Object(c.a)(i);function i(e){var a;return Object(r.a)(this,i),(a=t.call(this,e)).state={date:new Date},a.id=e.id,a.x=e.x,a.y=e.y,a}return Object(l.a)(i,[{key:"componentDidMount",value:function(){this.update()}},{key:"update",value:function(){var e=document.getElementById(this.id);e.style.left=this.x+"%",e.style.top=this.y+"%",e.style.width="0px",e.style.height="0px",e.style.transition="1.5s",this.setState({date:new Date}),this.timerID=setTimeout((function(){e.style.width="40px",e.style.height="40px"}),50)}},{key:"render",value:function(){return s.a.createElement("div",{className:"transmit",id:this.id})}}]),i}(s.a.Component),y=function(e){Object(d.a)(i,e);var t=Object(c.a)(i);function i(e){var a;Object(r.a)(this,i),(a=t.call(this,e)).callbackFunction=function(e){"percent"in e&&(a.arrivedNodes=a.arrivedNodes+1),a.allNodes[e.id]=e,document.getElementById("title").innerHTML=a.arrivedNodes,a.arrivedNodes==a.numOfNodes&&(a.reset=!0,a.arrivedNodes=0,a.shouldUpdate=!0),a.allSick=!1},a.justReset=!1,a.numOfNodes=e.numOfNodes,a.nodes=[],a.passNodes=[],a.key=e.id,a.allNodes={},a.reset=!1,a.change=!1,a.taco=0,e.masks?a.infectionRate=200:a.infectionRate=75,a.social=document.getElementById("sd").value/100,a.arrivedNodes=0,a.numOfMeetings=a.numOfNodes/4,a.meetings=[];for(var n=0;n<a.numOfMeetings;n++){var o=Math.floor(1+98*Math.random()),l=Math.floor(2+96*Math.random());a.meetings[n]={},a.meetings[n].x=o,a.meetings[n].y=l}a.done=!1,a.nodeMeeting={},a.interactionDuration={};for(var d=0;d<a.numOfNodes;d++){Math.random();var c=a.key+"a"+d;a.nodes[d]=c,a.passNodes[d]=c;var h=Math.floor(Math.random()*a.numOfMeetings);a.nodeMeeting[c]=a.meetings[h],a.nodeMeeting[c].x+=1*Math.random()-.5,a.nodeMeeting[c].y+=1*Math.random()-.5,a.allNodes[c]={},a.interactionDuration={},a.allNodes[c].infected=!1}return a.nodes=a.nodes.map((function(t){return s.a.createElement(f,{allSick:!1,masks:e.masks,infected:!1,social:a.social,recovered:!1,reset:!1,id:t,meeting:a.nodeMeeting[t],parentCallback:a.callbackFunction,key:t})})),a.nodes[0]=s.a.createElement(f,{allSick:!1,masks:e.masks,infected:!0,social:a.social,id:a.key+"a0",recovered:!1,reset:!1,meeting:a.nodeMeeting[a.key+"a0"],parentCallback:a.callbackFunction,key:a.key+"a0"}),a.state={nodes:a.nodes},a.transmissions=[],a}return Object(l.a)(i,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval((function(){return e.update()}),50)}},{key:"componentDidUpdate",value:function(e){this.allSick=this.props.allSick}},{key:"update",value:function(){this.shouldUpdate=!1,this.done=!1,this.justReset&&(this.shouldUpdate=!0,this.justReset=!1),this.checkCollision(),this.reset&&(this.RESET(),this.shouldUpdate=!0),this.shouldUpdate&&(this.updateComponents(),this.setState({nodes:this.nodes}),this.reset&&(this.reset=!1,this.justReset=!0))}},{key:"updateComponents",value:function(){for(var e=0;e<this.numOfNodes;e++){var t=this.key+"a"+e;this.nodes[e]=s.a.createElement(f,{allSick:this.allSick,infected:this.allNodes[t].infected,recovered:this.allNodes[t].recovered,reset:this.reset,id:t,meeting:this.nodeMeeting[t],parentCallback:this.callbackFunction,key:t})}this.shouldUpdate=!1}},{key:"hardcode",value:function(){this.reset=!1}},{key:"distance",value:function(e,t){return Math.sqrt(Math.pow(this.allNodes[e].x-this.allNodes[t].x,2)+Math.pow(this.allNodes[e].y-this.allNodes[t].y,2))}},{key:"checkCollision",value:function(){for(var e=this,t=0,i=0,a=0,n=0;n<this.nodes.length;n++){for(var o=0;o<this.nodes.length;o++){var r=this.passNodes[n],l=this.passNodes[o];if(!(this.allNodes[r].recovered||this.allNodes[l].recovered||n==o||this.allNodes[r].infected&&this.allNodes[l].infected)&&(this.allNodes[r].infected||this.allNodes[l].infected)){var d=r;if(this.allNodes[l].infected||(d=l),this.distance(r,l)<2.5)this.interactionDuration[d]+=1,Math.random()<this.interactionDuration[d]/this.infectionRate&&function(){e.allNodes[d].infected=!0,e.shouldUpdate=!0;var t=e.transmissions.length;e.transmissions.push(s.a.createElement(p,{key:"tm"+d,id:"tm"+d,x:e.allNodes[d].x,y:e.allNodes[d].y})),setTimeout((function(){delete e.transmissions[t],e.setState({nodes:e.nodes})}),1500)}();else this.interactionDuration[d]=0}}this.allNodes[this.passNodes[n]].infected||this.allNodes[this.passNodes[n]].recovered||(i+=1),this.allNodes[this.passNodes[n]].infected&&!this.allNodes[this.passNodes[n]].recovered&&(t+=1),this.allNodes[this.passNodes[n]].recovered&&(a+=1)}t!=this.numOfNodes&&0!=i&&i+a!=this.numOfNodes||(this.allSick=!0,this.message="Immunity Reached. No one else to spread disease to.")}},{key:"updateMeetings",value:function(){for(var e=0;e<this.nodes.length;e++){var t=this.passNodes[e];if(!this.allNodes[t].arrived){for(var i=0;i<this.nodes.length;i++)this.passNodes[i];return}}for(var a=0;a<this.numOfMeetings;a++){var s=Math.floor(1+98*Math.random()),n=Math.floor(2+96*Math.random());this.meetings[a]={},this.meetings[a].x=s,this.meetings[a].y=n}for(var o=0;o<this.nodes.length;o++){var r=this.passNodes[o];this.allNodes[r].arrived=!1}this.reset=!0}},{key:"RESET",value:function(){this.nodeMeeting={};for(var e=0;e<this.numOfMeetings;e++){var t=Math.floor(1+98*Math.random()),i=Math.floor(1+98*Math.random());this.meetings[e]={},this.meetings[e].x=t,this.meetings[e].y=i}for(var a=0;a<this.numOfNodes;a++){var s=this.key+"a"+a;this.passNodes[a]=s;var n=Math.floor(Math.random()*this.numOfMeetings);this.nodeMeeting[s]=this.meetings[n]}}},{key:"render",value:function(){if(this.taco>=2&&!this.reset)for(var e=0;e<this.numOfNodes;e++)Math.random();if(this.taco=this.taco+1,this.change){this.change=!1;for(var t=0;t<this.numOfNodes;t++);}return this.reset&&(this.change=!0),this.allSick?(clearInterval(this.timerID),document.getElementById("overshadow").style.display="block",s.a.createElement(s.a.Fragment,null,this.allSick&&s.a.createElement("div",{id:"endmsg"},this.message),s.a.createElement("div",null,s.a.createElement("div",null,this.state.nodes),s.a.createElement("div",null,this.transmissions)))):s.a.createElement(s.a.Fragment,null,this.allSick&&s.a.createElement("div",{id:"endmsg"},this.message),s.a.createElement("div",null,s.a.createElement("div",null,this.state.nodes),s.a.createElement("div",null,this.transmissions)))}}]),i}(s.a.Component),g=function(e){Object(d.a)(i,e);var t=Object(c.a)(i);function i(e){var a;return Object(r.a)(this,i),(a=t.call(this,e)).generate=function(e){"ResetSimulation"!=e.target.id?"GenerateSimulation"!=e.target.id||a.clicked||(a.allSick=!1,a.clicked=!0,a.masks=document.getElementById("masks").checked,a.masks?a.masks=!0:a.masks=!1,a.numPeople=document.getElementById("numPeople").value,isNaN(a.numPeople)?alert("Please enter number of people for simulation"):(a.assigned=!0,a.numOfCreations++,a.setState({numOfCreations:a.numOfCreations}))):a.reset()},a.callbackFunction=function(e){a.numOfCreations=a.numOfCreations+1},a.state={numOfCreations:0},a.numOfCreations=0,a.assigned=!1,a.clicked=!1,a}return Object(l.a)(i,[{key:"componentDidMount",value:function(){this.assigned=!1;document.getElementById("GenerateSimulation");document.addEventListener("click",this.generate)}},{key:"reset",value:function(){this.clicked=!1,this.assigned=!1,document.getElementById("overshadow").style.display="none",this.allSick=!0,this.setState({numOfCreations:this.numOfCreations})}},{key:"render",value:function(){return this.assigned?s.a.createElement("div",{id:"graphArea"},s.a.createElement(y,{allSick:this.allSick,callbackFunction:this.callbackFunction,id:this.numOfCreations,key:this.numOfCreations,numOfNodes:this.numPeople,masks:this.masks})):s.a.createElement("div",{id:"graphArea"})}}]),i}(s.a.Component);var k=function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{id:"overshadow"}),s.a.createElement("div",{className:"App"},s.a.createElement("div",{id:"title"},"Covid Visualizer"),s.a.createElement("div",{id:"topBox"},s.a.createElement("div",{id:"inputs"},s.a.createElement("div",{id:"people"},s.a.createElement("input",{id:"numPeople",placeholder:"100"}),s.a.createElement("label",null,"Number of People")),s.a.createElement("div",{id:"socialDistance"},s.a.createElement("input",{type:"range",placeholder:"Social Distancing",id:"sd",name:"cowbell",min:"0",max:"100"}),s.a.createElement("label",{for:"cowbell"},"Level of Social Distancing")),s.a.createElement("div",null,s.a.createElement("input",{id:"masks",type:"checkbox"}),s.a.createElement("label",null,"Masks"))),s.a.createElement("div",{id:"generate"},s.a.createElement("button",{id:"GenerateSimulation"},"Generate Simulation")),s.a.createElement("div",{id:"reset"},s.a.createElement("button",{id:"ResetSimulation"},"Reset Simulation"))),s.a.createElement(g,null),s.a.createElement("div",{id:"bottomBorder"},s.a.createElement("div",{id:"negativeCovid"},"Negative"),s.a.createElement("div",{id:"positiveCovid"},"Positive"),s.a.createElement("div",{id:"recoveredCovid"},"Recovered"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},86:function(e,t,i){e.exports=i.p+"static/media/coronavirus.a625a7c2.png"},87:function(e,t,i){e.exports=i.p+"static/media/angel.db2b3117.png"},88:function(e,t,i){e.exports=i(240)},93:function(e,t,i){},94:function(e,t,i){e.exports=i.p+"static/media/logo.5d5d9eef.svg"},95:function(e,t,i){}},[[88,1,2]]]);
//# sourceMappingURL=main.339b3481.chunk.js.map