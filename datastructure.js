//===========================================STACK===============================================
function Stack()
{ 
	this.items = [];  
}

Stack.prototype.isEmpty = function() 
{ 
	return this.items.length == 0; 
}

Stack.prototype.push = function(element) 
{ 
	this.items.push(element); 
} 
 

Stack.prototype.pop =  function() 
{ 
	if (this.isEmpty()) 
		return "Underflow"; 
	return this.items.pop(); 
} 
 
Stack.prototype.peek = function() 
{ 
	return this.items[this.items.length - 1]; 
} 


Stack.prototype.printStack = function() 
{ 
	var str = ""; 
	for (var i = 0; i < this.items.length; i++) 
		str += this.items[i] + " "; 
	return str; 
} 
//===========================================QUEUE===============================================
function Queue() 
{ 
	this.items = []; 
}			

Queue.prototype.isEmpty = function() 
{ 
	return this.items.length == 0; 
} 

Queue.prototype.enqueue = function(element) 
{	 
	this.items.push(element); 
} 

Queue.prototype.dequeue = function() 
{ 
	if(this.isEmpty()) 
	return "Underflow"; 
	return this.items.shift(); 
} 

Queue.prototype.front = function() 
{ 
	if(this.isEmpty()) 
	return "No elements in Queue"; 
	return this.items[0]; 
}


Queue.prototype.printQueue = function() 
{ 
	var str = ""; 
	for(var i = this.items.length - 1; i >= 0; i--) 
		str += this.items[i] +" "; 
	return str; 
} 

Queue.prototype.getqueue = function()
{
	var list = [];
	for(var i = this.items.length - 1; i >= 0; i--) 
		list.push(this.items[i]); 
	return list;	
}
Queue.prototype.has = function(item)
{
	for(var i = this.items.length - 1; i >= 0; i--) 
		if(this.items[i] == item)
			return true;

	return false;
}

