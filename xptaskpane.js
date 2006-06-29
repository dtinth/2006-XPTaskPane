// JavaScript XP Task Pane by DtTvB -- http://dttvb.yi.org

function getWindowClientHeight() {
	if (window.innerHeight)
		return window.innerHeight;
	if (document.documentElement && document.documentElement.clientHeight)
		return document.documentElement.clientHeight;
	if (document.body.clientHeight)
		return document.body.clientHeight;
	return 0;
}

function getWindowScrollTop() {
	if (typeof(window.pageYOffset) != 'undefined')
		return window.pageYOffset
	if (document.documentElement && document.documentElement.scrollTop)
		return document.documentElement.scrollTop;
	if (document.body.scrollTop)
		return document.body.scrollTop;
	return 0;
}

// Set the padding of the document, so it will looks better.
document.body.style.paddingLeft = '236px';
document.body.style.marginLeft = '0px';

// Create the task pane and position it at top left.
var cdiv = document.createElement('div');
cdiv.style.background = '#6375D6 url(xtp-bg.gif) top left repeat-x';
cdiv.style.position = 'absolute';
cdiv.style.top = '0px';
cdiv.style.left = '0px';
cdiv.style.overflow = 'auto';
cdiv.style.width = '220px';
cdiv.style.textAlign = 'center';
document.body.appendChild (cdiv);

// Keep the pane at the top left of your screen.
if (!document.all)
	cdiv.style.position = 'fixed';
function poscdiv() {
	cdiv.style.height = getWindowClientHeight() + 'px';
	if (document.all)
		cdiv.style.top = getWindowScrollTop() + 'px';
}
setInterval (poscdiv, 5);

// Creates a window.
function XTPWindow(title, text) {
	var OF = [8, 0];
	var HE = [0, 0];
	var AP = 0;
	var ST = 0;
	var TimeOut = 0;

	// Create a container
	var cte = document.createElement('div');

	cte.style.width = '185px';
	cte.style.margin = '15px auto 0 auto';
	cte.style.position = 'relative';
	var btn = document.createElement('a');
	btn.className = 'xtpBtnUp';
	btn.href = '#';
	
	cte.appendChild (btn);
	var pe = document.createElement('table');
	pe.cellSpacing = 0;
	pe.cellPadding = 0;
	var beROW = pe.insertRow(0);
	var be = beROW.insertCell(0);
	var te = pe.insertRow(0).insertCell(0);
	te.className = 'xtpTitle';
	te.innerHTML = title;
	
	var bdv = document.createElement('div');
	bdv.style.overflow = 'hidden';
	bdv.style.height = '0px';
	bdv.style.textAlign = 'left';
	bdv.style.position = 'relative';
	var bdv2 = document.createElement('div');
	bdv2.style.position = 'relative';
	bdv2.className = 'xtpBody';
	// Changes the target.
	function updateAnimation(of, he) {
		OF = [Math.round(OF[0] + ((OF[1] - OF[0]) * (AP / 10))), of];
		HE = [Math.round(HE[0] + ((HE[1] - HE[0]) * (AP / 10))), he];
		AP = 0;
	}
	
	// Collapses the window.
	function collapse() {
		if (ST) return;
		ST = 1;
		btn.className = 'xtpBtnDn';
		updateAnimation (bdv2.offsetHeight * 0.7, 0);
		startAnimate ();
	}
	
	// Expands the window.
	function expand() {
		if (!ST) return;
		ST = 0;
		btn.className = 'xtpBtnUp';
		var forca = 0;
		if (AP > 9) {
			forca = 1;
		}
		updateAnimation (0, bdv2.offsetHeight);
		if (forca) {
			OF[0] = bdv2.offsetHeight - 3;
		}
		startAnimate ();
	} 
	
	// Occurs when the title has been clicked.
	function onTitleClick() {
		if (ST) {
			expand();
		} else {
			collapse();
		}
		return false;
	}
	
	// Sets the content's HTML and updates its height.
	function setInnerHTML(t) {
		bdv2.innerHTML = t;
		updateHeight ();
	}
	
	// Sets the title's HTML.
	function setTitleHTML(t) {
		te.innerHTML = t;
	}
	
	// Update it's height.
	function updateHeight() {
		if (ST) return;
		updateAnimation (0, bdv2.offsetHeight);
		startAnimate ();
	}
	
	// Start the animation if it hasn't start yet.
	function startAnimate() {
		clearTimeout (TimeOut);
		anime ();
	}
	
	// Controls animation.
	function anime() {
		if (AP < 10) {
			     if (AP < 0.2) AP += 0.1;
			else if (AP < 0.6) AP += 0.2;
			else if (AP < 1.8) AP += 0.4;
			else if (AP < 3) AP += 0.7;
			else if (AP > 9.7) AP += 0.1;
			else if (AP > 9.3) AP += 0.2;
			else if (AP > 8.1) AP += 0.4;
			else AP ++;
			if (AP > 10) {
				AP = 10;
			}
			var apz = AP / 10;
			var targH = Math.round(HE[0] + ((HE[1] - HE[0]) * apz));
			bdv.style.height = targH + 'px';
			bdv2.style.top = -(Math.round(OF[0] + ((OF[1] - OF[0]) * apz))) + 'px';
			TimeOut = setTimeout(anime, 12);
		}
	}
	
	// Hides the window.
	function hide() {
		cte.style.display = 'none';
	}
	
	// Shows the window.
	function show() {
		cte.style.display = 'block';
	}
	
	// Add events.
	te.onclick = onTitleClick;
	btn.onclick = onTitleClick;
	
	// Put everything on the page.
	bdv.appendChild (bdv2);
	be.appendChild (bdv);
	cte.appendChild (pe);
	cdiv.appendChild (cte);
	
	// Update text.
	setInnerHTML (text);
	OF[0] = bdv2.offsetHeight - 3;
	
	// Functions and members.
	this.setInnerHTML = setInnerHTML;
	this.setTitleHTML = setTitleHTML;
	this.bodyNode = bdv2;
	this.updateHeight = updateHeight;
	this.hide = hide;
	this.show = show;
	this.collapse = collapse;
	this.expand = expand;
}
