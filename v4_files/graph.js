//===========================================QUEUE===============================================
			class Queue 
			{ 
			 
				constructor() 
				{ 
					this.items = []; 
				} 
						
				enqueue(element) 
				{	 
					this.items.push(element); 
				} 

				dequeue() 
				{ 
					if(this.isEmpty()) 
						return "Underflow"; 
					return this.items.shift(); 
				} 

				front() 
				{ 
					if(this.isEmpty()) 
						return "No elements in Queue"; 
					return this.items[0]; 
				}

				isEmpty() 
				{ 
					return this.items.length == 0; 
				} 

				printQueue() 
				{ 
					var str = ""; 
					for(var i = this.items.length - 1; i >= 0; i--) 
						str += this.items[i] +" "; 
					return str; 
				} 

				getqueue()
				{
					var list = [];
					for(var i = this.items.length - 1; i >= 0; i--) 
						list.push(this.items[i]); 
					return list;	
				}
			} 

			//===========================================GRAPH===============================================
			class Graph 
			{ 
		    	// defining vertex array and 
		    	// adjacent list 
			    constructor(noOfVertices) 
			    { 
			        this.noOfVertices = noOfVertices; 
			        this.AdjList = new Map(); 
			    } 
		  
			 	addVertex(v) 
				{  
			    	this.AdjList.set(v, []); 
				} 

				addEdge(v, w) 
				{	 
					this.AdjList.get(v).push(w); 
					// if(undirect == true)
					// 	this.AdjList.get(w).push(v); 
				} 

				printGraph() 
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

			    sortadj()
			    {
					var get_keys = this.AdjList.keys(); 
					for (var i of get_keys) 
					{ 
						 this.AdjList.get(i).sort((a,b)=>{return a - b;});
					} 	
			    }

				bfs(startingNode,resn,resl,resque) 
				{ 
					var visited = []; 
					for (var i = 0; i < this.noOfVertices; i++) 
						visited[i] = false; 

					var q = new Queue(); 

					visited[startingNode] = true; 
					q.enqueue(startingNode); 
					console.log("QUEUE : ",q.printQueue());
					resque.push(q.getqueue());
					//console.log(q.getqueue());
					while (!q.isEmpty())
					{ 
						// get the element from the queue 
						var getQueueElement = q.dequeue(); 
						// passing the current vertex to callback funtion 
						console.log("Lay ",getQueueElement," ra");
						console.log("Con Lai : ",q.printQueue());
						console.log("Duyet ",getQueueElement);
						console.log("================================");
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
						console.log("QUEUE: ",q.printQueue());
						resque.push(q.getqueue()); 
						//console.log(q.getqueue());
					} 
				}

				dfs(startingNode,resn,resl) 
				{ 
					var visited = []; 
					for (var i = 0; i < this.noOfVertices; i++) 
						visited[i] = false; 

					this.DFSUtil(startingNode, visited,resn,resl); 
				} 


				DFSUtil(vert, visited,resn,resl) 
				{ 
					visited[vert] = true;
					resn.push(vert-1); 
					console.log(vert); 	
					//console.log(resn);
					//console.log(list.item[vert-1]);
					var get_neighbours = this.AdjList.get(vert); 
					var temp = [];
					for (var i in get_neighbours) 
					{ 
						var get_elem = get_neighbours[i]; 
						
						if (!visited[get_elem]) 
							{	
								var l = new line(list.item[vert-1],list.item[get_elem-1]);
								resl.push(l);
								this.DFSUtil(get_elem, visited,resn,resl);
											
							}
					}

					
				} 
			}
