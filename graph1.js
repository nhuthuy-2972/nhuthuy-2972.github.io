
//===========================================GRAPH===============================================
function Graph(noOfVertices) 
{ 
    this.noOfVertices = noOfVertices; 
    this.AdjList = new Map(); 
}
			 	
Graph.prototype.addVertex = function(v) 
{  
   	this.AdjList.set(v, []); 
} 

Graph.prototype.addEdge = function(v, w) 
{	 
	this.AdjList.get(v).push(w); 
	// if(undirect == true)
	// 	this.AdjList.get(w).push(v); 
} 

Graph.prototype.printGraph = function() 
{ 
	var get_keys = this.AdjList.keys(); 
	for (var i of get_keys) 
	{ 
		var get_values = this.AdjList.get(i); 
		var conc = ""; 
		for (var j of get_values) 
			conc += j + " "; 
		console.log(i + " -> " + conc); 
	} 
}	 

Graph.prototype.sortadj = function()
{
	var get_keys = this.AdjList.keys(); 
	for (var i of get_keys) 
	{ 
		this.AdjList.get(i).sort((a,b)=>{return a - b;});
	} 	
}

//============================================================================================
//duyet chieu rong queue//defaut
Graph.prototype.bfs = function(startingNode,resn,resl,message) 
{ 
	var visited = []; 
	for (var i = 1; i <= this.noOfVertices; i++) 
		visited[i] = false;

	console.log(visited); 

	var q = new Queue();
	q.enqueue(startingNode);  
	visited[startingNode] = true;
	var mes = "</br>QUEUE : " + q.printQueue()+"</br>======================</br>";
	message.push(mes);
	console.log("QUEUE : ",q.printQueue());
	console.log("======================");
	
	while (!q.isEmpty())
	{ 
		// get the element from the queue 
		var getQueueElement = q.dequeue(); 
		// passing the current vertex to callback funtion
		mes =  "Lay " + getQueueElement + " ra</br>";
		console.log("Lay ",getQueueElement," ra");
		mes += "Con Lai : "+q.printQueue() +"</br>";
		console.log("Con Lai : ",q.printQueue());
		mes += "Duyet " + getQueueElement + "</br>";
		console.log("Duyet ",getQueueElement);
		
		resn.push(getQueueElement-1);
		// get the adjacent list for current vertex 
		var get_List = this.AdjList.get(getQueueElement); 
		// loop through the list and add the element to the 
		// queue if it is not processed yet 
		var temp = [];
		for (var i in get_List)
		{ 
			var neigh = get_List[i];
					 
			if (!visited[neigh])
			{ 
				visited[neigh] = true;
				temp.push(neigh);
				q.enqueue(neigh); 
			} 
		}
		resl.push(temp);
		mes += "QUEUE: " + q.printQueue()+ "<br>======================</br>";
		message.push(mes);
		console.log("QUEUE: ",q.printQueue());
		console.log("======================");
	} 
}
//===========================================Hoan thanh=================================================
//duyet chieu sau stack
Graph.prototype.dreaph_first_search = function (startingNode,resn,resl,message)
{
	var visited = [],parent = [];

	for (var i = 1; i <= this.noOfVertices; i++) 
		{
			visited[i] = false;
			parent.push(0); 
		}
	
	var st = new Stack();
	st.push(startingNode);  
	var mes = "Stack : " + st.printStack() + "</br>======================</br>";
	message.push(mes);
	console.log("Stack : ",st.printStack());
	console.log("======================");
	
	while (!st.isEmpty())
	{	mes = "";
		var vert = st.pop();
		console.log("Lay ",vert," ra");
		mes = "Lay " + vert +" ra</br>";
		console.log("Con lai : ",st.printStack());
		mes += "Con lai : " + st.printStack() +"</br>";
		if(visited[vert] == true) 
		{
			mes+="======================</br>"
			message.push(mes);
			continue;
		}
		visited[vert] = true;
		resn.push(vert);
		resl.push(parent[vert-1]);
		console.log("Duyet : ",vert);
		mes += "Duyet : " + vert +"</br>";

		
		var get_List = this.AdjList.get(vert); 
		for (var i in get_List)
		{ 
			var neigh = get_List[i];		 
			if (!visited[neigh])
			{ 
				parent[neigh-1] = vert;
				st.push(neigh);
			} 
		}
		
		console.log("Stack : ",st.printStack());
		console.log("======================");
		mes += "Stack : " + st.printStack() + "</br>======================</br>";
		message.push(mes);
	}
}		

// bfs edited
// dfs stack edited
