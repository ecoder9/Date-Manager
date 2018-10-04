function _date() 
{
	this.inc 	= 
				{
					sec:1000,	// 1000 ms = 1 sec
					min:60,		// 60 sec = 1 min
					hr:60,		// 60 min = 1 hr
					day:24,		// 24 hr = 1 day
					wk:7		// 7 days = 1 week
				},
				
	this.ms		=	
				{
					second	:	this.inc.sec,	
					minute	:	this.inc.sec * this.inc.min,		
					hour	:	this.inc.sec * this.inc.min * this.inc.hr,		
					day		:	this.inc.sec * this.inc.min * this.inc.hr * this.inc.day,
					week	: 	this.inc.sec * this.inc.min * this.inc.hr * this.inc.day * this.inc.wk,
				}
	
	this.weekday 	=
				[
					"Sunday",
					"Monday",
					"Tuesday",
					"Wednesday",
					"Thursday",
					"Friday",
					"Saturday"
				]
	
	// DATE TIME FORMATS
	this.stc 	= function(d)			// STANDARD TIME CLOCK
				{ 
					return new Date(d).toLocaleString('en-US', { hour12: true }).replace(",","")
				}
	this.mtc 	= function(d)			// MILITARY TIME CLOCK	
				{ 
					return [this.date(d),this.time(d)].join(" ");
				}
	
	// FORMATS
	this.time 	= function(d)			// HOURS MINUTES SECONDS
				{ 
					return [this.d2(d.getHours()),this.d2(d.getMinutes()),this.d2(d.getSeconds())].join(":");
				}
	this.date 	= function(d)			// MONTH DAY YEAR
				{ 
					return [this.d2(d.getMonth()+1),this.d2(d.getDate()),d.getFullYear()].join("/");
				}
	this.local 	= function(d)			// LOCAL TIME STRING
				{ 
					return new Date(d).toLocaleString(); 
				}
	this.timestamp 	= function(d)		// TIME STAMP
				{ 
					return new Date(d).getTime(); 
				}
	
	// TIME ZONE REFERENCE
	this.dst 	= function(d)			// DAYLIGHT SAVINGS TIME	
				{ 
					return (this.isDstObserved(d)) ? 1 : 0; 
				}
	this.gmt 	= function(n)			// GREENWICH MEAN TIME
				{ 
					return (!isNaN(n))?[this.operator(n),this.d2(n.toString().replace("+", "").replace("-","")),":00"].join("") : {error: "NaN"} 
				}
	this.tz 	= function(n)			// TIME ZONE NUMBER
				{ 
					return this.gmt(n).substring(0,3).replace("0","");
				}
	this.timezoneOffset = function(d)	// RETURN TIME ZONE WITHOUT DST ADJUSTMENT
				{
					var jan = new Date(new Date(d).getFullYear(), 0, 1),
						jul = new Date(new Date(d).getFullYear(), 6, 1);
					return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());	
				}
	this.isDstObserved = function(d)	// RETURN BOOLEAN IF DST IS ACTIVE
				{
					return new Date(d).getTimezoneOffset() < this.timezoneOffset(new Date(d));
				}
				
	// DATE INFORMATION RETRIEVAL
	this.getDayName	= function(d)		// GET DAY NAME
				{
					return this.weekday[new Date(d).getDay()];
				}
	this.getWeek = function(d)			// GET WEEK NUMBER
				{
					var fw = new Date(new Date(d).getFullYear(), 0, 1);
					return Math.ceil((((new Date(d) - fw) / 86400000) + fw.getDay() + 1) / 7);
				}

	// CALCULATIONS
	this.offset = function(d,o)			// CALCULATE TIME OFFSET IN SECONDS
				{ 
					return new Date(new Date(d).getTime()+o); 
				}
	this.daysInYear	= function(year)	// DAYS IN YEAR
				{
					return this.isLeapYear(year) ? 366 : 365;
				}
	this.daysInMonth = function(m,y)	// DAYS IN MONTH
				{
					return new Date(y,m, 0).getDate();
				}
	this.diff	= function(d1,d2,inc)	// GET NUMBER OF DAYS BETWEEN 
				{
					var diff = Math.abs(this.timestamp(d2)-this.timestamp(d1))
					switch(inc)
					{
						case "ms":
							return dif;
						break;
						case "sec":
							return diff / this.ms.second;
						break;
						case "min":
							return diff / this.ms.minute;
						break;
						case "hr":
							return diff / this.ms.hour;
						break;
						case "day":
							return diff / this.ms.day;
						break;
						case "wk":
							return diff / this.ms.week;
						break;
						case "yr":
							return diff / this.ms.day * this.daysInYear(new Date(d1).getFullYear());
						break;
					}
					
				}
	
	// SHORTCUTS
	this.d2 		= function(n)	// TWO DIGIT NUMBER	
				{ 
					return ["0",n].join("").slice(-2);
				}
	this.isLeapYear	= function(year) 
				{
					return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
				}
	this.operator 	= function(n)	// NUMERIC OPERATOR
				{ 
					return (n.toString().indexOf("-") > -1) ? "-" : "+";
				}
	// DATA MANIPULATION
	this.obj 	= function(d)	// RETURN DATE TIME OBJECT IN MTC
				{ 
					return {year: d.getFullYear(),month: d.getMonth()+1, day: d.getDate(), hour: d.getHours(), minute: d.getMinutes(), second: d.getSeconds()} 
				}
	
	
}
	