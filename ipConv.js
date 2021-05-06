const ins = document.querySelector("#in");
const out = document.querySelector("#out");
const msg = document.querySelector("#msgs");
let pole = document.getElementById("spr");
let poleK = document.getElementById("klasa");
let btn = document.getElementById("sprBtn");
const cls = {
    a: { from:"00000000", to:"01111110" },
    b: { from:"10000000", to:"10111111" },
    c: { from:"11000000", to:"11011111" },
    d: { from:"11100000", to:"11101111" },
    e: { from:"11110000", to:"11111111" }
}

let setMsg = (type, text) => {
	if (type == "info")
		msg.innerHTML = '<p>'+text+'</p>';
	if (type == "error")
		msg.innerHTML = '<p style="color: red">'+text+'</p>';
	if (type == "clean")
		msg.innerHTML = "";
}

let strPad = (len, text, sign="0") => {
	return sign.repeat(8-len) + text;
}

let checkClass = (toCheck)=>{
	var oct = (toCheck >>> 0).toString(2);
	for( let [key,val] of Object.entries(cls)){
		if( val.from <= oct && val.to >= oct){
			setMsg('info',"Klasa: "+key);
			break;
		}
	}
}

let detect = (e) => {
	let val = e.target.value;
	let oct = val.split(".");
	if (oct[0].length+oct[1].length+oct[2].length+oct[3].length !== 32) {
		dec2bin(val);
	} else {
		bin2dec(val);
	}
}

let dec2bin = (ip) => {
	let binOct = "";
	let oct = ip.split(".");
	let oLen = oct.length;
	if (oLen < 4)
		setMsg("error", "podano tylko "+oLen+" oktety");
	else
		setMsg("clean");

	for (i = 0; i < oLen; i++) {
		let digit = parseInt(oct[i]);
		(i===0) ? checkClass(digit) : null;
		binOct += (binOct === "" ? "" : "." );

		if (digit >= 0 && digit <= 255) {
			let bin = (digit >>> 0).toString(2);
			let bLen = bin.length;
			binOct += (bLen < 8) ? strPad(bLen, bin) : bin;
		} else {
			setMsg("error", "wartosc poza zakresem w oktescie "+i);
		}
	}

	out.textContent = binOct;
}

let bin2dec = (bin) => {
	let dec = "";
	let oct = bin.split(".");

	for (i = 0; i < oct.length; i++) {
		dec += (dec === "" ? "" : "." );
		dec += parseInt(oct[i], 2);
	}
	out.textContent = dec;
}

function spr() {
	console.log("dzialam");
	console.log(pole.value, poleK.value);

	let ip = pole.value;
	let klasa = poleK.value;
	let oct = ip.split(".");
	let oLen = oct.length;
	if (oLen < 4)
		setMsg("error", "podano tylko "+oLen+" oktety");
	else
		setMsg("clean");

	for (i = 0; i < oLen; i++) {
		let digit = parseInt(oct[i]);
		(i===0) ? checkClass(digit) : null;
	}
	console.log(msg.textContent.slice(7));

	if(msg.textContent.slice(7) === klasa) {
		setMsg("info", "Dobrze!");
	}
	else{
		setMsg("info", "Źle, spróbuj jeszcze raz :(");
	}
	



}

ins.addEventListener("focusout", detect, false);
btn.addEventListener('click', spr, false);
