// Konfiguracja pól oraz wezłów (ID>zmiennych)
const ins = document.querySelector("#in");
const out = document.querySelector("#out");
const msg = document.querySelector("#msgs");
const cls = {
	a: {from:"00000000", to:"01111110"},
	b: {form:"10000000", to:"10111111"},
	c: {from:"11100000", to:"11011111"},
	d: {from:"11100000", to:"11101111"},
	e: {form:"11110000", to:"11111111"}
}; //zakres klas

let setMsg = (type, text="") =>{
	if(type==='clear')
		msg.innerHTML = "";
	if(type==="error")
		msg.innerHTML = '<p style="color: red">'+text+'</p>';
	if (type =="info")
		msg.innerHTML = "<p>"+text+"</p>";
}
//Usuelnienie brakujacych znakow dla formatu
let strPad = (len, text,sign="0") => {
	return sign.repeat(8-len)+""+text;
}

let checkClass = (toCheck) =>{
	var oct = (toCheck >>> 0).toString(2);
	for (let [key,val] of Object.entries(cls)){
		if(val.from <= oct && val.to >= oct){
			setMsg("info","Klasa: "+key);
			break;
		}
	}
}

//detekcja formatu adresu: dec2bin / bin2dec
let detect = (e) => {
	let val = e.target.value;
	let oct = val.split('.');
	if(oct[0].length+oct[1].length+oct[2].length+oct[3].length !== 32){
		dec2bin(val);
	} else {
		bin2dec(val);
	}
}


//konwersja decimal>binary
let dec2bin = (ip) => {
	let binOct = "";
	let oct = ip.split(".");
	let oLen = oct.length;
	if(oLen<4)
			setMsg("error", "podano tylko "+oLen+" oktety");
	else
		setMsg("clear");
	for(i=0; i<oLen; i++){
		var digit = parseInt(oct[i]);
		(i===0) ? checkClass(digit) : null;
		binOct += (binOct === "" ? "" : "." );
		if( digit >= 0 && digit <= 255){
			let bin = (digit >>> 0).toString(2);
			let bLen = bin.length;
			binOct += (bLen < 8) ? strPad(bLen, bin) : bin;
		}else
			setMsg("error", "Wartosc poza zakresem w oktecie" +i);
		
	}
	//bin = (ip >>> 0).toString(2);
	out.textContent = binOct;
}
//konwersja binary>decimal
let bin2dec = (bin) => {
		let dec = "";
	let oct = bin.split(".");

	for (i = 0; i < oct.length; i++) {
		dec += (dec === "" ? "" : "." );
		dec += parseInt(oct[i], 2);
	}
	out.textContent = dec;
}

//nasłuch zdarzeń
ins.addEventListener('focusout', detect,false);