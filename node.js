function node(x,y,idv)
{
	this.x = x;
	this.y = y;
	this.radius = rect_size;
	this.chon = false;
	this.indexVertex = idv;
	
}
			

node.prototype.contains = function(x,y)
{
 	var d = (this.x - x)*(this.x - x) + (this.y - y)*(this.y - y);
 	var rr = this.radius*this.radius;
	//console.log("d = ",d,"rr = ",rr);
 	return d < rr;
}



function listnode()
{
 	this.item = [];
 	this.itemseleted = null;
 	this.indexselected = -1;
}

listnode.prototype.unselect = function()
{
 	for(let i = 0 ; i <this.item.length ; i++)
 	{
 		this.item[i].chon = false;
 	}
}

listnode.prototype.addnode = function(x,y,idv)
{
 	var newnode = new node(x,y,idv);
 	this.item.push(newnode);
}
			
listnode.prototype.selectat = function(x,y)
{
 	if(this.itemseleted)
 		this.itemseleted.chon = false;
 	this.itemseleted =null;
 	this.indexselected=-1;
 	for(let i = 0 ; i < this.item.length ; i++)
 	{
 		var nodepos = this.item[i];
 		if (nodepos.contains(x,y))
 		{
 		 	this.itemseleted = nodepos;
 			this.indexselected = i;
 			this.item[i].chon = true;
 			break;
 		}
 	}
}	

listnode.prototype.getItem = function(index)
{
	return this.item[index];
}

listnode.prototype.getSelected = function()
{
	return this.itemseleted;
}