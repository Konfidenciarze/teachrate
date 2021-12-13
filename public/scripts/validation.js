function validatePassChange(){
			const haslo = document.getElementById('newPassword1').value
			const haslo2 = document.getElementById('newPassword2').value
			var RegCheck=0
			document.getElementById('ValidatePassInfo').innerHTML=''
			document.getElementById('ValidatePass2Info').innerHTML=''	
			document.getElementById('newPassword1').style.backgroundColor=''
			document.getElementById('newPassword2').style.backgroundColor=''
			if(haslo.includes(' '))
			{
				document.getElementById('ValidatePassInfo').innerHTML='Haslo nie może mieć spacji';
				document.getElementById('newPassword1').style.backgroundColor='#F26760'
				RegCheck=1
			}
			if(haslo!=haslo2)
			{
				document.getElementById('ValidatePass2Info').innerHTML='Hasła są różne';
				document.getElementById('newPassword1').style.backgroundColor='#F26760'
				document.getElementById('newPassword2').style.backgroundColor='#F26760'
				RegCheck=1
			}
			if(RegCheck==0)
			return true;
			
			return false;
}
function validateLogin()
{
		document.getElementById('ValidateLoginInfo').innerHTML=''
		document.getElementById('login').style.backgroundColor=''
		const login = document.getElementById('login').value 
		var loginregex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(login.includes(' '))
			{
				document.getElementById('ValidateLoginInfo').innerHTML='Adres e-mail nie może mieć spacji';
				document.getElementById('login').style.backgroundColor='#F26760'
				return false;
			}
		else if(!loginregex.test(login) )
			{
				document.getElementById('ValidateLoginInfo').innerHTML='Podano zle skonstruowany adres e-mail';
				document.getElementById('login').style.backgroundColor='#F26760'
				return false;
			}
		return true;	
}
function validateRegister()
{
	var RegCheck=0
	if(!validateLogin())
	RegCheck=1
	if(!validatePassChange())
	RegCheck=1

		if(RegCheck==0)
		return true;
			
		return false;
}