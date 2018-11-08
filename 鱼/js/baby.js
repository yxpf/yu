var babyObj = function()
{
	this.x;
	this.y;
	this.angle;
	this.babyBoby = new Image();
	
	this.babyTailTimer = 0;
	this.babyTailCount = 0;
	
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;//图片持续时间
	
	this.babyBobyTimer = 0;
	this.babyBobyCount = 0;
}
babyObj.prototype.init = function()
{
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;	
	this.babyBoby.src ="src/babyFade0.png";
}
babyObj.prototype.draw = function()
{
	this.x = lerpDistance(mom.x,this.x,0.98);  //跟大鱼
	this.y = lerpDistance(mom.y,this.y,0.99);
	            //跟大鱼
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;
	
	this.angle = lerpAngle(beta,this.angle, 0.6);
	
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50)
	{
		this.babyTailCount =(this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}
	
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval)
	{
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;
		
		if(this.babyEyeCount == 0)
		{
			this.babyEyeInterval = Math.random() *1500 +2000;
		}
		else
		{
			this.babyEyeInterval =200;
		}
	}
	
	this.babyBobyTimer += deltaTime;
	if(this.babyBobyTimer > 5000)
	{
		this.babyBobyCount =(this.babyBobyCount + 1);
		this.babyBobyTimer += 5000;
		if(this.babyBobyCount > 19)
		{
			this.babyBobyCount = 19;
			data.gameOver=true;
		}
	}
	
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width * 0.5 + 23,-babyTail[babyTailCount].height * 0.5);
	var babyBobyCount =this.babyBobyCount;
	ctx1.drawImage(babyBoby[babyBobyCount],-babyBoby[babyBobyCount].width * 0.5,-babyBoby[babyBobyCount].height * 0.5);
	var babyEyeCount =this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width * 0.5,-babyEye[babyEyeCount].height * 0.5);
	ctx1.restore();
}
