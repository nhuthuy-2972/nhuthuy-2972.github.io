function loaddata(e)
{
	clear(true);
	var file = this.files[0];
	console.log(file);
	//console.log(e.file[0]);
	var reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function(evt) 
	{
		var data = JSON.parse(evt.target.result);
		undirect = data.undirect;

		//console.log(data);
		for(var i = 0 ; i < data.arrnode.length; i++)
		{
			list.addnode(data.arrnode[i].x,data.arrnode[i].y,data.arrnode[i].indexVertex);
		}
		
		for(var i = 0 ; i < data.arrline.length; i++)
		{
			listl.addline(list.item[data.arrline[i].source.indexVertex-1],list.item[data.arrline[i].destination.indexVertex-1]);
		}

		draw(color.node_fill_selected,color.node_stroke_selected,color.index_stroke_selected,color.line_stroke_selected);
 	}
}

function savedata(link)
{
	//console.log(undirect);
	var data = JSON.stringify({undirect : undirect, arrnode : list.item,arrline : listl.lines});
	//console.log(data);
  	var blob = new Blob([data], {type: "octet/stream"});
    var url  = URL.createObjectURL(blob);
    var a = link;
    a.download    = "filename.json";
    a.href        = url;
}

//cho phep ve line
function endrawline()
{
 	isdrawline =true;
	isdrawpoint = false;
}

//cho phep ve node
function endrawnode()
{
	isdrawpoint = true;
}

//khong cho ve
function undraw()
{
	isdrawline=false;
	isdrawpoint = false;
}	

//Chon 1 line
function selectedline(e)
{
	var x = e.pageX - cnv.offsetLeft;
	var y = e.pageY - cnv.offsetTop;
	var point = {x:x,y:y};
	if(undirect)
	{
		if(listl.lineselected)
		{
		 	listl.lines[listl.indexlinesl].chon = false;
		 	listl.lines[listl.indexlinesl+1].chon =  false;
		 	//isselectline = false;
		}
		listl.lineselected = null;
		listl.indexlinesl = -1;
		for (let i = 0 ; i < listl.lines.length ; i++)
		{
		 	if (listl.lines[i].contains(point))
		 	{
		 		listl.lineselected = listl.lines[i];
		 		listl.lines[i].chon = true;
		 		listl.lines[i+1].chon = true;
		 		listl.indexlinesl = i;
		 		//isselectline = true;
		 		break;
		 	} 
		}
	}
	else{
		if(listl.lineselected)
		{
		 	listl.lineselected.chon = false;
		}
		listl.lineselected = null;
		listl.indexlinesl = -1;
		for (let i = 0 ; i < listl.lines.length ; i++)
		{
		 	if (listl.lines[i].contains(point))
		 	{
		 		listl.lineselected = listl.lines[i];
		 		listl.lines[i].chon = true;
		 		listl.indexlinesl = i;
		 		break;
		 	} 
		}
	}
	//console.log("xxx");
	draw(color.node_fill_selected,color.node_stroke_selected,color.index_stroke_selected,color.line_stroke_selected);
}

//nhan nut chuot 
function onmousedown(e)
{
 	var x = e.pageX - cnv.offsetLeft;
 	var y = e.pageY - cnv.offsetTop;
 	list.selectat(x,y);
 	moving = true;
 	//isdrawline = true;
 	//console.log(list.itemseleted);
 	if(!list.itemseleted && isdrawpoint == true)
 	{
 		var idv = list.item.length + 1;
 		list.addnode(x,y,idv);
 		//ad.add(list.item[idv-1]);
 		moving = false;
 		isdrawline = false;
 	}
 	
 	draw(color.node_fill_selected,color.node_stroke_selected,color.index_stroke_selected,color.line_stroke_selected);
}

//di chuyen chuot
function onmousemove(e)
{
 	var x = e.pageX - cnv.offsetLeft;
 	var y = e.pageY - cnv.offsetTop;
 	//document.getElementById("mp").innerHTML = "Mouse Position: (" + x +" : " + y +")";

 	if(moving==true && list.itemseleted&&isdrawline==false)
 	{
  		var x = e.pageX - cnv.offsetLeft;
 		var y = e.pageY - cnv.offsetTop;
 		list.itemseleted.x = x ;
 		list.itemseleted.y = y ;
 		draw(color.node_fill_selected,color.node_stroke_selected,color.index_stroke_selected,color.line_stroke_selected);
 	}
}

//tha nut  chuot 
function onmouseup(e)
{
 	if(list.itemseleted && isdrawline)
 	{	
 		//console.log("=====",list.itemseleted,isdrawline);
 		var indexnode1 = list.indexselected;
 		//console.log(indexnode1);
 		var x = e.pageX - cnv.offsetLeft;
 		var y = e.pageY - cnv.offsetTop;
 		list.selectat(x,y);
 		var node1 = list.item[indexnode1];
 		
 		if(list.indexselected != -1 & node1 !== list.itemseleted)
 		{
 			var node2 = list.itemseleted;
 			//list.item[indexnode1].addedge(node2);
 			//list.item[list.indexselected].addedge(node1);
 			//ad.added(node1,node2);
 			listl.addline(node1,node2);
 			if(undirect)
 				listl.addline(node2,node1);
 			drawline(listl.lines[listl.lines.length-1]);
 			//drawarrow(listl.lines[listl.lines.length-1]);
 		}
 	}
 
 	moving =false;
 }
//xoa 1 node

function clear1node()
{
 	if(list.itemseleted)
 	{
 		var node = list.itemseleted;
 		for(let i = 0 ; i < listl.lines.length ; i++)
 		{
 			if(listl.lines[i].source === node || listl.lines[i].destination === node)
 			{
 				listl.lines.splice(i,1);
 				i--;
 			}
 		}

 		list.item.splice(list.indexselected,1);
 		list.itemseleted = null;
 		list.indexselected = -1;

 		for (let i = 0 ; i < list.item.length ; i++)
 			list.item[i].indexVertex = i + 1;
 	}
 	
 		draw(color.node_fill_selected,color.node_stroke_selected,color.index_stroke_selected,color.line_stroke_selected);
}

//xoa graph(clearlist == true -> xoa du lieu)
function clear(clearlist)
{
 	c.clearRect(0,0,cnv.width,cnv.height);
 	if(clearlist)
 	{
 		list.item = [];
 		list.itemseleted = null;
 		list.indexselected = -1;
 		listl.lines = [];
 		listl.selectedline = null;
 		listl.indexlinesl = -1;
 	}
}

//ve graph
function draw(color_fill_node_selected,color_stroke_node_selected,color_index_selected,color_line_selected)
{
	clear();
	for(let i = list.item.length - 1; i >= 0 ; i--)
	{
		drawnode(list.item[i],color_fill_node_selected,color_stroke_node_selected);
		drawindexvertex(list.item[i],color_index_selected);
	}

	for(let i = listl.lines.length - 1 ; i >= 0 ; i--)
	{
		var l = listl.lines[i];
		drawline(l,color_line_selected);
	}
	//console.log("yyy");
}

//ve 1 node
function drawnode(node,color_fill_selected,color_stroke_selected)
{
	c.save();
	c.beginPath();
	c.arc(node.x,node.y,node.radius, 0, 2*Math.PI,false);
	c.lineWidth = line_width_arc;
	
	if(node.chon == true)
	{
		c.strokeStyle = color_stroke_selected;
		c.fillStyle = color_fill_selected;
		c.fill();
		c.stroke();
		c.closePath();
		c.restore();
	}else
	{
		c.stroke();
		c.closePath();
		c.restore();
	}
}

//ve so thu tu node
function drawindexvertex(node,color_selected)
{
	c.save();
	c.beginPath();
	if(node.chon == true)
	{
		c.strokeStyle=color_selected;
	}
	c.lineWidth = line_width_index;
	c.font = indexverFront;
	c.textAlign = 'center';
	var hindex = c.measureText("v").width/2;
	c.strokeText(node.indexVertex,node.x,node.y+hindex,node.radius*2);
	c.closePath();
	c.restore();
}

//====================ve line and arrow=========================================================
function laygocgiua2node(diemDau , diemCuoi)
{	
	var dx = diemCuoi.x - diemDau.x;
		  		var dy = diemCuoi.y - diemDau.y;
		 		return Math.atan2(dy,dx);
}

function laytoadotrenduongnode(node1,node2,radius)
{
	var angle = laygocgiua2node(node1,node2);
	var x = radius*Math.cos(angle) + node1.x;
	var y = radius*Math.sin(angle) + node1.y;
	return {x : x,
			y : y};
}

//ve line
function drawline(line,color_selected)
{
	var node1 = line.source;
	var node2 = line.destination;
	var p1 = laytoadotrenduongnode(node1,node2,node1.radius);
	var p2 = laytoadotrenduongnode(node2,node1,node2.radius);

	c.save();
	c.beginPath();
	c.lineWidth = line_width_line;
	c.moveTo(p1.x,p1.y);
	c.lineTo(p2.x,p2.y);
	
	if(line.chon == true)
	{
		c.strokeStyle = color_selected;	
	}
	
	c.stroke();
	c.closePath();
	c.restore();

	if(undirect == false)
		drawarrow(line);
}

//ve muoi ten
function drawarrow(line)
{
	var node1 = line.source;
	var node2 = line.destination;
	var p1 = laytoadotrenduongnode(node1,node2,node1.radius);
	var p2 = laytoadotrenduongnode(node2,node1,node2.radius+arattribute.w);
	var ang = laygocgiua2node(p1,p2);

	c.save();
	c.fillStyle = "black";
	c.translate(p2.x,p2.y);
	c.rotate(ang);
	c.beginPath();
	c.moveTo(0,0);
	c.lineTo(0,-arattribute.h);
	c.lineTo(arattribute.w,0);
	c.lineTo(0,arattribute.h);
	c.closePath();
	// /c.stroke();
	c.fill();
	c.restore();
}

//xoa 1 line
function clear1line()
{
	if(listl.lineselected && undirect == true)
	{
		listl.lines.splice(listl.indexlinesl,2);
		//listl.lines.splice(listl.indexlinesl,1);
		listl.lineselected = null;
		listl.indexlinesl = -1;
	}
	else if (listl.lineselected && undirect == false)
	{
		listl.lines.splice(listl.indexlinesl,1);
		listl.lineselected = null;
		listl.indexlinesl = -1;	
	}	
	draw(color.node_fill_selected,color.node_stroke_selected,color.index_stroke_selected,color.line_stroke_selected);
}

//============================================================================================
//kiem tra co huong hay vo huong
//xoa du lieu da ton tai
function checkdir ()
{

	console.log("hehehe");
	if(this.checked)
	{
		clear(true);
		undirect = false;
		}
	else
	{
		clear(true);
		undirect = true;
	}
}


//Thay doi mau 	
function changecolor(result,resultl,mes)
{
	var i = 0;
	var messagesemlemt = document.getElementById("messages");
	messagesemlemt.innerHTML = mes[0];
	var si = setInterval(function()
	{
		//soure
		list.item[result[i]].chon = true;
		var idv = list.item[result[i]].indexVertex;
		for(let k = 0 ; k < resultl[i].length ; k++)
		{

			for(let j = 0 ; j < listl.lines.length ; j++)
			{	
				if((listl.lines[j].source.indexVertex == idv && listl.lines[j].destination.indexVertex == resultl[i][k]) 
				|| (listl.lines[j].source.indexVertex == resultl[i][k] && listl.lines[j].destination.indexVertex == idv ))
					{
						//console.log(listl.lines[j]);
						listl.lines[j].chon = true;
					}

			}

		}
		messagesemlemt.innerHTML += mes[i+1];
		draw(color.node_fill_traversal,color.node_stroke_traversal,color.index_stroke_traversal,color.line_stroke_traversal);
		//list.item[i].chon = false;
		i++;
		if (i == result.length)
		{
			//document.getElementById("q").innerHTML = resque[i];
			clearInterval(si);
			// clearInterval(st);
		}
	}, 2500);//setInterval
	
	
}

//defaut
function breadthfirstseach(start)
			{
				var res = [];
				var resl = [];
				var resque = [];
				var novertex = list.item.length;

				var g = new Graph(novertex);

				for (let i = 0 ; i < list.item.length ; i++)
				{
					g.addVertex(list.item[i].indexVertex);
				}

				for(let j = 0 ; j < listl.lines.length ; j+=1)
				{
					var src = listl.lines[j].source.indexVertex;
					var des = listl.lines[j].destination.indexVertex;
					g.addEdge(src,des);
				}

				g.printGraph();
				g.sortadj();
				g.printGraph();
				console.log("BFS");
				g.bfs(start,res,resl,resque);
				console.log(res);
				console.log(resl);
				console.log(resque);
				changecolor(res,resl,resque);
				//return {resnode : res, resline : resl};
			}


function changecolordfsstack(result,resultl,mes)
{
	//console.log(resultl);
	var i = 0;
	var messagesemlemt = document.getElementById("messages");
	messagesemlemt.innerHTML = mes[0];
	
	var si = setInterval(function()
	{

		if(i < result.length)
			list.item[result[i]-1].chon = true;

		if(i < result.length - 1)
		{	

			for(let j = 0 ; j < listl.lines.length ; j++)
			{	
				if((listl.lines[j].source.indexVertex == list.item[result[i+1]-1].indexVertex && listl.lines[j].destination.indexVertex == resultl[i+1])
				|| (listl.lines[j].source.indexVertex == resultl[i+1] && listl.lines[j].destination.indexVertex == list.item[result[i+1]-1].indexVertex ))
				{
					listl.lines[j].chon = true;
				}

			}
		}

		messagesemlemt.innerHTML += mes[i+1];
		draw(color.node_fill_traversal,color.node_stroke_traversal,color.index_stroke_traversal,color.line_stroke_traversal);
		i++;
		if (i == mes.length -1)
		{
			clearInterval(si);
			//return ;
		}
	}, 2000);//setInterval
}

function deapthfirstseachstack(start)
{
	var res = [];
	var resl = [];
	var mes = [];
	var novertex = list.item.length;

	var g = new Graph(novertex);

	for (let i = 0 ; i < list.item.length ; i++)
	{
		g.addVertex(list.item[i].indexVertex);
	}

	for(let j = 0 ; j < listl.lines.length ; j+=1)
	{
		var src = listl.lines[j].source.indexVertex;
		var des = listl.lines[j].destination.indexVertex;
		g.addEdge(src,des);
	}

	g.printGraph();
	g.sortadj();
	g.printGraph();
	console.log("DFS");
	//g.dfs(start,res,resl);
	g.dreaph_first_search(start,res,resl,mes);
	console.log(res);
	console.log(resl);
	console.log(mes);
	changecolordfsstack(res,resl,mes);
}

function resetgraph()
{ 
	for(let i = 0 ; i < list.item.length ; i++)
	{
		//console.log(list.item[i].chon);
		list.item[i].chon = false;
	}
	for(let j = 0 ; j < listl.lines.length ; j++)
	{
		listl.lines[j].chon = false;
	}
	document.getElementById("messages").innerHTML="";	
	draw(color.node_fill_selected,color.node_stroke_selected,color.index_stroke_selected,color.line_stroke_selected);
}

function closedialog()
{
	console.log("ffff");
	document.getElementById("ifdfs").style.display= "none";
	document.getElementById("ifbfs").style.display= "none";
	document.getElementById("ifmna").style.display= "none";
}