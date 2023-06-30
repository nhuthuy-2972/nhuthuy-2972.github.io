
function line(src,des)
{
 	this.source = src;
 	this.destination = des;
 	this.chon = false;
	}
line.prototype.equals = function(l)
{
  	return (this.source === l.source)&&(this.destination === l.destination);
}

line.prototype.contains = function(point)
{
	//neu mouse bang source hoac destination thoat
 	if((point.x == this.source.x && point.y == this.source.y) || (point.x == this.destination.x && point.y == this.destination.y)) return false;
 	var ds = Math.sqrt((this.source.x - point.x)*(this.source.x - point.x) + (this.source.y - point.y)*(this.source.y - point.y));
 	var dd = Math.sqrt((point.x - this.destination.x )*(point.x-this.destination.x) + (point.y - this.destination.y)*(point.y-this.destination.y));
 	var d = Math.sqrt((this.source.x - this.destination.x)*(this.source.x - this.destination.x) + (this.source.y - this.destination.y)*(this.source.y - this.destination.y));
 	// console.log(ds);
	// console.log(dd);
 	// console.log(d);
 	// console.log(d - (ds + dd));
 	return (ds + dd) - d <= 0.09;
}



function listline()
{
 	this.lines =[];
 	this.lineselected = null;
 	this.indexlinesl = -1;
}

listline.prototype.addline = function(src,des)
{
	var l = new line(src,des);
 	for(let i = 0 ; i < this.lines.length ; i++)
 	{
 		if(this.lines[i].equals(l))
 			return;
 	}
 	this.lines.push(l); 	
}