$(document).ready(function()
{
	var started = false;
	var canvas  = $('canvas');
	var cheater = false;
	var pi2x    = Math.PI * 2;

	var userAgent = navigator.userAgent.toLowerCase();

	var isIE      = userAgent.indexOf('msie') != -1;
	var isIphone  = userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipad') != -1
	var isAndroid = userAgent.indexOf('android') != -1;

	if (!isIE)
	{
		canvas.css('-moz-border-radius',    '20px');
		canvas.css('-webkit-border-radius', '20px');
	}

	// In case you ever need to reset the score
	//localStorage.setItem('high', 0);

	if (typeof localStorage == 'undefined')
	{
		alert('Unfortunately, your browser sucks');
	}
	else
	{
		$('#high-score').html(localStorage.getItem('high') == null ? 0 : localStorage.getItem('high'));
	}

	if (canvas[0].getContext)
	{
		var context        = canvas[0].getContext('2d');
		var width          = canvas.width();
		var height         = canvas.height();
		var middle         = 35;
		var prevX          = (width / 2) - 6;
		var wallLeftX      = new Array();
		var wallLeftY      = new Array();
		var wallRightX     = new Array();
		var wallRightY     = new Array();
		var leftX          = 10;
		var rightX         = width - 10;
		var nextLeft       = leftX;
		var nextRight      = rightX;
		var previousPaddle = 'left';
		var nextPaddle     = 'center';
		var direction      = 'center';
		var index;
		var intervals;
		var min;
		var max;
		var turn;
		var speed;

		context.strokeStyle = '#000';
		context.lineWidth   = '2';
		context.lineCap     = 'round';
		context.lineJoin    = 'round';
		context.font        = "bold 22px monospace";
		context.fillText('Click to Start', 110, 250);

		var intervalId = '';
	}
	else
	{
		alert('Unfortunately, your browser sucks');
	}

	$('canvas').click(function()
	{
		if (started == false)
		{
			canvas.css('cursor', 'none');

			cheater = $('input:checked').length;

			wallLeftX  = new Array();
			wallLeftY  = new Array();
			wallRightX = new Array();
			wallRightY = new Array();
			rocks      = new Array();
			gators     = new Array();
			fireflies  = new Array();
			leftX      = 10;
			rightX     = width - 10;
			nextLeft   = leftX;
			nextRight  = rightX;

			interval  = 1;
			index     = 0;
			min       = 100;
			max       = 115;
			turn      = 0;
			speed     = 70;
			intervals = 0;
			direction = 'center';

			for (var i = 0; i <= height; i = i + 50)
			{
				wallLeftX[index] = leftX;
				wallLeftY[index] = i;

				wallRightX[index] = rightX;
				wallRightY[index] = i;

				nextLeft = leftX;
				leftX   += 7;

				nextRight = rightX;
				rightX   -= 7;

				rocks[index]     = null;
				gators[index]    = null;
				fireflies[index] = null;

				index++;
			}

			started = true;
			context.clearRect(0, 0, width, height);
			intervalId = setInterval(drawWalls, speed);
		}
	});

	$('canvas').mousemove(function(event)
	{
		if (started == true)
		{
			context.clearRect(prevX, middle, 49, 65);
			prevX = event.pageX - canvas.position().left - 25;
			drawKayak();
		}
	});

	function drawKayak()
	{
		// Kayak boundary box
		/*
		context.beginPath();
		context.moveTo(prevX + 19, middle);
		context.lineTo(prevX + 30, middle);
		context.lineTo(prevX + 30, middle + 65);
		context.lineTo(prevX + 19, middle + 65);
		context.lineTo(prevX + 19, middle);
		context.strokeStyle = '#900';
		context.stroke();
		*/

		context.beginPath();
		context.moveTo(prevX + 25, middle);
		context.quadraticCurveTo(prevX + 10, middle + 25, prevX + 25, middle + 65);
		context.quadraticCurveTo(prevX + 38, middle + 25, prevX + 25, middle);
		context.fillStyle = '#fc0';
		context.fill();

		context.beginPath();
		context.moveTo(prevX + 20, middle + 27);
		context.lineTo(prevX + 20, middle + 20);
		context.lineTo(prevX + 29, middle + 20);
		context.lineTo(prevX + 29, middle + 27);
		context.quadraticCurveTo(prevX + 25, middle + 35, prevX + 20, middle + 27);
		context.fillStyle = '#000';
		context.fill();

		context.beginPath();
		if (nextPaddle == 'left')
		{
			context.arc(prevX + 21, middle + 24, 3, 0, pi2x, false);
			context.arc(prevX + 28, middle + 26, 3, 0, pi2x, false);
		}
		else if (nextPaddle == 'right')
		{
			context.arc(prevX + 21, middle + 26, 3, 0, pi2x, false);
			context.arc(prevX + 28, middle + 24, 3, 0, pi2x, false);
		}
		else
		{
			context.arc(prevX + 21, middle + 24, 3, 0, pi2x, false);
			context.arc(prevX + 28, middle + 24, 3, 0, pi2x, false);
		}
		context.fillStyle = '#900';
		context.fill();

		context.beginPath();
		context.strokeStyle = '#333';
		if (nextPaddle == 'left')
		{
			context.moveTo(prevX, middle + 20);
			context.lineTo(prevX + 48, middle + 40);
			context.arc(prevX, middle + 20, 3, 0, pi2x, false);
			context.arc(prevX + 3, middle + 21, 3, 0, pi2x, false);
			context.arc(prevX + 6, middle + 22, 2, 0, pi2x, false);
			context.arc(prevX + 48, middle + 40, 3, 0, pi2x, false);
			context.arc(prevX + 45, middle + 39, 3, 0, pi2x, false);
			context.arc(prevX + 42, middle + 38, 2, 0, pi2x, false);
			previousPaddle = 'left';
			nextPaddle = 'center';
		}
		else if (nextPaddle == 'right')
		{
			context.moveTo(prevX, middle + 40);
			context.lineTo(prevX + 48, middle + 20);
			context.arc(prevX, middle + 40, 3, 0, pi2x, false);
			context.arc(prevX + 3, middle + 39, 3, 0, pi2x, false);
			context.arc(prevX + 6, middle + 38, 2, 0, pi2x, false);
			context.arc(prevX + 48, middle + 20, 3, 0, pi2x, false);
			context.arc(prevX + 45, middle + 21, 3, 0, pi2x, false);
			context.arc(prevX + 42, middle + 22, 2, 0, pi2x, false);
			previousPaddle = 'right';
			nextPaddle = 'center';
		}
		else
		{
			context.moveTo(prevX, middle + 30);
			context.lineTo(prevX + 48, middle + 30);
			context.arc(prevX, middle + 30, 3, 0, pi2x, false);
			context.arc(prevX + 3, middle + 30, 3, 0, pi2x, false);
			context.arc(prevX + 6, middle + 30, 2, 0, pi2x, false);
			context.arc(prevX + 48, middle + 30, 3, 0, pi2x, false);
			context.arc(prevX + 45, middle + 30, 3, 0, pi2x, false);
			context.arc(prevX + 42, middle + 30, 2, 0, pi2x, false);
			nextPaddle = (previousPaddle == 'left' ? 'right' : 'left');
			previousPaddle = 'center';
		}
		context.fillStyle = '#00c';
		context.stroke();
		context.fill();

		context.beginPath();
		context.arc(prevX + 24.5, middle + 24, 3, 0, pi2x, false);
		context.fillStyle = '#c90';
		context.fill();

		// COLLISION DETECTION!
		var kayakLeft   = prevX + 19;
		var kayakCenter = prevX + 24.5;
		var kayakRight  = prevX + 30;

		if ($('input:checked').length == 0 && (
			// Detect walls
			kayakLeft <= wallLeftX[1]
			|| kayakRight >= wallRightX[1]
			|| kayakLeft <= wallLeftX[2]
			|| kayakRight >= wallRightX[2]
			// Detect rocks
			|| (rocks[1] != null && ((kayakCenter >= rocks[1] - 8 && kayakCenter <= rocks[1] + 8)))
			|| (rocks[2] != null && ((kayakCenter >= rocks[2] - 8 && kayakCenter <= rocks[2] + 8)))
			// Detect gators
			|| (gators[1] != null && ((kayakCenter >= gators[1] - 10 && kayakCenter <= gators[1] + 10)))
			|| (gators[2] != null && ((kayakCenter >= gators[2] - 10 && kayakCenter <= gators[2] + 10)))
			// Detect fireflies
			|| (fireflies[1] != null && ((kayakCenter >= fireflies[1] - 20 && kayakCenter <= fireflies[1] + 20)))
			|| (fireflies[2] != null && ((kayakCenter >= fireflies[2] - 20 && kayakCenter <= fireflies[2] + 20)))
		))
		{
			started = false;
			clearInterval(intervalId);

			context.fillStyle = '#000';
			context.fillText('GAME OVER!', 145, 235);
			context.fillText('Click to Restart', 100, 255);
			
			canvas.css('cursor', 'pointer');
		}
	}

	function drawWalls()
	{
		context.clearRect(0, 0, width, height);

		for (var i = 0; i < 10; i++)
		{
			wallLeftX[i] = wallLeftX[i + 1];
			wallRightX[i] = wallRightX[i + 1];
			rocks[i] = rocks[i + 1];
			gators[i] = gators[i + 1];
			fireflies[i] = fireflies[i + 1];
		}

		wallLeftX[10] = (Math.random() * (max - min)) + min;
		wallRightX[10] = width - ((Math.random() * (max - min)) + min);
		rocks[i] = null;
		gators[i] = null;
		fireflies[i] = null;

		if (direction != 'center')
		{
			if (direction == 'left')
			{
				if (min + turn > 15)
				{
					turn -= 10;
				}
			}
			else
			{
				if (width - max + turn < 365)
				{
					turn += 10;
				}
			}
		}

		wallLeftX[10] += turn;
		wallRightX[10] += turn;

		// Draws Rocks
		for (var i in rocks)
		{
			if (rocks[i] != null)
			{
				context.beginPath();
				context.arc(rocks[i], i * 50, 8, 0, pi2x, false);
				context.fillStyle = '#666';
				context.fill();
			}
		}

		// Draws Gators
		for (var i in gators)
		{
			if (gators[i] != null)
			{
				var y = i * 50;
				context.beginPath();
				context.arc(gators[i], y, 10, 0, pi2x, false);
				context.arc(gators[i], y - 15, 8, 0, pi2x, false);
				context.moveTo(gators[i] - 10, y);
				context.lineTo(gators[i] - 8, y - 15);
				context.lineTo(gators[i] + 8, y - 15);
				context.lineTo(gators[i] + 10, y);
				context.lineTo(gators[i] - 10, y);
				context.fillStyle = '#060';
				context.fill();
				context.beginPath();
				context.moveTo(gators[i] - 3, y - 17);
				context.lineTo(gators[i] - 2, y - 19);
				context.moveTo(gators[i] + 3, y - 17);
				context.lineTo(gators[i] + 2, y - 19);
				context.moveTo(gators[i] - 3, y + 1);
				context.lineTo(gators[i] - 3, y - 3);
				context.moveTo(gators[i] + 3, y + 1);
				context.lineTo(gators[i] + 3, y - 3);
				context.moveTo(gators[i] - 4, y + 2);
				context.lineTo(gators[i] - 4, y - 3);
				context.moveTo(gators[i] + 4, y + 2);
				context.lineTo(gators[i] + 4, y - 3);
				context.strokeStyle = '#040';
				context.stroke();
				context.beginPath();
				context.moveTo(gators[i] - 3, y - 3);
				context.lineTo(gators[i] - 3, y - 4);
				context.moveTo(gators[i] + 3, y - 3);
				context.lineTo(gators[i] + 3, y - 4);
				context.strokeStyle = '#090';
				context.stroke();
			}
		}

		context.beginPath();

		if (isIE)
		{
			context.moveTo(0, 500);
			context.lineTo(0, 0);
		}
		else
		{
			context.moveTo(0, 485);
			context.lineTo(0, 15);
			context.arc(15, 15, 15, Math.PI, (Math.PI * 3) / 2, false);
			context.moveTo(15, 0);
		}

		context.lineTo(wallLeftX[0], wallLeftY[0]);
		for (var i in wallLeftX)
		{
			context.lineTo(wallLeftX[i], wallLeftY[i]);
		}

		if (isIE)
		{
			context.lineTo(0, 500);
		}
		else
		{
			context.lineTo(15, 500);
			context.arc(15, 485, 15, Math.PI / 2, Math.PI, false);
		}

		context.fillStyle = '#090';
		context.fill();

		context.beginPath();

		if (isIE)
		{
			context.moveTo(400, 500);
			context.lineTo(400, 0);
		}
		else
		{
			context.moveTo(400, 485);
			context.lineTo(400, 15);
			context.arc(385, 15, 15, pi2x, (Math.PI * 3) / 2, true);
			context.moveTo(385, 0);
		}

		context.lineTo(wallRightX[0], wallRightY[0]);
		for (var i in wallRightX)
		{
			context.lineTo(wallRightX[i], wallRightY[i]);
		}

		if (isIE)
		{
			context.lineTo(400, 500);
		}
		else
		{
			context.lineTo(385, 500);
			context.arc(385, 485, 15, Math.PI / 2, 0, true);
		}

		context.fill();

		drawKayak();

		// Draws fireflies
		for (var i in fireflies)
		{
			if (fireflies[i] != null)
			{
				context.beginPath();
				context.moveTo(fireflies[i], (i * 50) - 2);
				context.lineTo(fireflies[i], (i * 50) + 2);
				context.strokeStyle = '#3d2627';
				context.stroke();
				context.beginPath();
				context.moveTo(fireflies[i], (i * 50) + 1);
				context.lineTo(fireflies[i], (i * 50) + 2);
				context.strokeStyle = '#ff0';
				context.stroke();
				context.beginPath();
				context.arc(fireflies[i], i * 50, 20, 0, pi2x, false);
				context.fillStyle = 'rgba(255, 255, 0, ' + Math.random() + ')';
				context.fill();
			}
		}

		intervals++;

		if (intervals % 5 == 0)
		{
			direction = Math.random();
			if (direction < 0.4)
			{
				direction = 'left';
			}
			else if (direction > 0.6)
			{
				direction = 'right';
			}
			else
			{
				direction = 'center';
			}
		}

		if (intervals % 16 == 0)
		{
			rocks[10] = Math.floor(Math.random() * 400);
		}

		if (intervals % 25 == 0)
		{
			min += 0.5;
			max += 0.5;
		}

		if (intervals % 78 == 0)
		{
			gators[10] = Math.floor(Math.random() * 400);
		}

		if (intervals % 100 == 0)
		{
			speed -= 1;
			clearInterval(intervalId);
			intervalId = setInterval(drawWalls, speed);
		}

		if (intervals % 113 == 0)
		{
			fireflies[10] = Math.floor(Math.random() * 400);
		}

		$('#current-score').html(intervals);

		if ($('#high-score').html() < intervals && cheater == false)
		{
			$('#high-score').html(intervals);
			localStorage.setItem('high', intervals);
		}

	}
});
