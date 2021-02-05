/*


mantive coisas da v1

adicionei requests propostos pela aula
* 
* v2 NEAT
* 2.5 minor improvements and features 
* refactored
* 
*/

//setters refatorado ,usando operador NOT
//tudo num objeto agora
setters = {	//Nao há necessidade de criar objeto pra tudo aqui , o intuito é a pratica
	debug_enabled : false,
	debug_url: false,
	set_debug : function() {
		this.debug_enabled = !this.debug_enabled;
		console.debug(this.debug_enabled)
	},
	set_urldebug: function(){
		this.debug_url = !this.debug_url; 
		console.debug(this.debug_url)
	},
	key_debug : 'xxxxxx-xxxxxx-xxxxxx-xxxxx-xxxxxx' ,
	uri_API : null,
	updateUrlQuery : function(){
		uri_API = simpleQueryString.parse(location.search);
	},
	runtime:[],
	//todo :low , adicionar uma funcao de limpar no display correspondente a esses dados
	//DONE fazer array de varios timings que achar relevant , depois dumpa tudo na div
		//main sinc
		//full (assinc along) -- fixed)
		

	url_src : "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=",
	url_src_usage :"https://pro-api.coinmarketcap.com/v1/key/info?&CMC_PRO_API_KEY="
			//PELA DOC infos de consumo da conta
}

/*FUNCOES GLOBAIS*/
function mensagem_fail(response_retorno)
{
	console.error("MENSAGEM ERROR FUNCTION");
	throw new Error("Deu certo não meu caro, confere isso " + response_retorno.status);
	//console.log(response_json);
}

function mensagem_good()
{
	console.log("msg good func()");
}

/** //CHAMO USAGE INFO GLOBALMENTE, INTENCIONAL
// DEPRECATED ; )
usage_info();
 * function usage_info()
{
	console.log("usage info stats");
	fetch(defines.url_src_usage+apikey.key)
 		.then((response) => {
                   if(false) return response.json();
                    return response.json(); // aqui que é o conteudo do fetch 
            })
            .then((relatorioDeUso) => {
            	console.log(relatorioDeUso);
            })
            // FEATURE :  painel que exibe msg do report sobre o data usage caso for o erro
            //eg passou a quota
            //quanto falta pra liberar
            //dados do plano
}
 * */


//function puxar(range,debug_enabled,debug_url)
function puxar(range)
{
	console.time('puxar_sinc');
	t0full = performance.now()//medir overall performance ,ver se há variancias negativas em algumas implementaçoes teste
	//testando 2 funcoes de measurement console.time e performance.now
	custom_parameters="&start=1 &limit=";
	console.log("selected range was " + range);
	console.log(" URL QUERY DUMP  >> " + uri_API.values);
	if(setters.debug_enabled === true)	{	
			console.log("DEBUG MODE ENABLED");
			console.log(setters.url_src);
			console.log("true key : "+ apikey.key);
			console.log("debug key : " + apikey.key_debug); // so i test the error handling
			console.log("url api key : " + uri_API.api);
		}

	if(setters.debug_url === true)	{
			console.log("mudando api key to debug one");
			setters.uri_API.api = setters.key_debug;
		}else{ 
				//if(uri_API.api.length > 2)//FAILSAFE CHECANDO TIPO???
				if(Object.keys(uri_API).length != 0)
				// por enquanto só checando se foi definido ao menos
				//todo checar se response foi valido da api, senao pedir a api no prompt 
				{
					console.log("parametro detectado na url,usando como base");
					console.log(typeof(uri_API));
					console.log(uri_API.length);
					console.log(uri_API.api);
				}
				else{
					console.log("nao encontrado parametros na url,asking user");//dbg
					uri_API.api = prompt("INSIRA SUA API, cuidado com seu ctrl-v");
				}					
			} 
	console.log("RUNNNING FETCH  for apikey " +uri_API.api); //debug purposes
	fetch(setters.url_src + uri_API.api + custom_parameters + range) // <- mudar de lugar a funcao timer final pois o assincrono nao é levado em conta #FIXED
                .then((response) => {
                    if(!response.ok) throw mensagem_fail(response);
                    return response.json(); // aqui que é o conteudo do fetch                    
            })
            .then((api) => {
            	console.log(api); // duvidas no porque desse api

            			var texto = "";
            			//pegar 10 criptomoedas e os nome key dela
            			let i=0;

            			//puxo em cima do meu range ao inves do padrao ,ja que implementei assim ne
            			//TODO
            			console.warn("count output to be deprecated");
            			while(i < range){
            				
            				//console.log("atualmente processing "  + (i+1) ); //human readable output



//grato SPOTHQ user pelos free icons 
//https://github.com/spothq/cryptocurrency-icons/ && 

//la tem um cripto ico generico pras que nao tem icon,usar if not found

let image = ("https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/icon/"+ api.data[i].symbol+".svg").toLowerCase(); // é case sensitive
  				/**
 				minha tentativa de por o ico automaticamente baseado na moeda
 				Alem do CORS tem o CORB pra incomodar

 				Cross-Origin Read Blocking (CORB) blocked cross-origin response
 				
 				UPDATE - MUDANDO PRA RAW.GITHUB RESOLVEU
 				**/

	    //           https://github.com/spothq/cryptocurrency-icons/blob/master/svg/icon/btc.svg"
							//texto = texto + '<div class="media"> <img src="coin.jpg" class="align-self-center mr-3" alt="coin" width="100" height="60"> <div class="media-body"> <h5 class="mt-2">${api.data[i].name}</h5> <p>${api.data[i].symbol}</p></div></div>'
					
						///CARA, ERA MALDITO U+0060 GRAVE ACCENT , NAO UM ASPAS SIMPLES, BEWARE@!
let imageFail="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/generic.svg";
//sinceramente nao sei porque funciona só com a fullUri no onerror

new Image().src = imageFail;
//+tentando preload 
//+adicionado lazy loading, performance ta melhor agora,
//TODO paginacao , nao é desejavel esse full range de moedas , resolve preocupacoes anteriores

				texto = texto + `  
                    <div class="media">
                        <img loading="lazy" src=${image} class="align-self-center mr-3" alt="aguarde" onerror=this.src="https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/color/generic.svg" width="100" height="60">
                        <div class="media-body">
                        <h5 class="mt-2">Coin ${i+1} ${api.data[i].name}</h5>
                        <p>${api.data[i].symbol}</p>
                        </div>
                    </div>
               
                    `; // novo onerror img src pra resolver o problema de nao achar alguns icones de umas moedas
                    //todo ver como encapsular melhor criacao dinamica de html em funcoes

                    document.getElementById("coins").innerHTML = texto;
          	i++;  
       	}
       	 		   t1full = performance.now();
			      
			       setters.runtime.push((parseFloat(t1full-t0full).toFixed(2))); //fixed to array form now ; )
	               setters.runtime.push ('ms (FULL async)'); // descriptor 
			       let linha=false;
			       			//for (var times in setters.runtime)
			       			for(let a=0;a< setters.runtime.length;a++){
			       					if(linha === true ){
				       					separar= '<br>';
				       					linha = !linha;
				       				}else{
				       					separar= '';
				       					linha= !linha;
				       				}
				       				document.getElementById('execTime').innerHTML += setters.runtime[a] + " " + separar;
				       				//minha intencao aqui é nao escrever  o main code duas vezes
				       			//alert("opora "+ a);
			}				       			
       }).catch((error) => {
                console.error(error.message);
                alert(error.message);
	});
       console.timeEnd('puxar_sinc'); 
       //console.warn("console.time() to be deprecated");
       t1main = performance.now();
       setters.runtime.push(parseFloat((t1main-t0full).toFixed(2)));
       setters.runtime.push ("ms (main)");
}

//SKETCH promisses CURSO
 /*fetch(defines.url_src + apikey.key)
                .then((response) => {
                    if(!response.ok) throw new Error('Erro ao executar a requisição, status ' + response.status);
                    return response.json();
            })
            .then((api) => {
            	console.log(api);
            })
            .catch((error) => {
                console.error(error.message);
            });
}*/
