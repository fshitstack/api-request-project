/*

VERSAO 1
NOTA REMOVER CREDENCIAIS ANTES DO PUSH
-DONE

ALTERNATIVA :  USAR PROMPT()

-usei variaveis pras urls , melhorou a 'readabilidade'
-separei as funcoes das promisses
FEATURES no console
	mostra valores do /map com  um range especificado
	mostra dados de uso da conta

	usei funcoes do jquery

BUILD : PASS




time tracking foi feito, foram $$ horas gastas nesse projeto ,
grande parte artigos sobre consumos de API,bootstrap ,documentacao e funcionamento de promisses JS
tentei fazer isso o mais independente possivel sem copiar exemplos prontos 
no maximo foi relendo codigos antigos


&convert=USD"
 credits_left	

data.usage.current_day



*/

const apikey = {
		key: prompt("COLE SUA API_KEY , CUIDADO COM SEU CTRL-V"),
		key_debug : 'xxxxxx-xxxxxx-xxxxxx-xxxxx-xxxxxx'  //nao tava lembrando que se separa valores com virgula
	};

var opts = {
	debug_enabled : false,
	debug_url: false
}

//setters
function set_debug()
{
	//inverter. se verdadeiro muda pra falso ,se falso muda pra verdadeiro
	//RESOLVEU O PROBLEMA , USEI COM ONCHANGE NO HTML
	if (opts.debug_enabled === true)
	{
		opts.debug_enabled =false;
	}else{
		opts.debug_enabled = true;
	}
}
//nota:  REFATORAR

function set_urldebug()
{
	if(opts.debug_url === true)
	{
		opts.debug_url = false;
	}else{
		opts.debug_url  = true;
	}
}

defines = {
		url_src : "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=",
		//PELA DOC infos de consumo da conta
		url_src_usage :"https://pro-api.coinmarketcap.com/v1/key/info?&CMC_PRO_API_KEY="
	}

/*FEATURE : fazer um full featured dashboard pra consumir essas infos
ETA 3 meses
PRIORIDADE LOW

FEATURE : UM FORM DE VALOR CUSTOM COM SANITY CHECK PRA VALORES ALTERNATIVO DO OPTIONS LIST
 */

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

function usage_info()
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

//CHAMO USAGE INFO GLOBALMENTE, INTENCIONAL
usage_info();


function puxar(range,debug_enabled,debug_url)
{

	//debug_enabled = opts.debug_enabled;
	//debug_url = opts.debug_url;
	custom_parameters="&start=1 &limit=";
	console.log("selected range was " + range);
	if (opts.debug_enabled=== true)	{	
			console.log("DEBUG MODE ENABLED");
			console.log(defines.url_src);
			console.log("true key : "+ apikey.key);
			console.log("debug key : " + apikey.key_debug); // so i test the error handling
		}

	if(opts.debug_url === true)	{
			console.log("mudando api key to debug one");
			api = apikey.key_debug;
		}else
			{ 
				api = apikey.key;
			} 
		

	console.log("RUNNNING FETCH  for apikey " + api); //debug purposes

      fetch(defines.url_src + api + custom_parameters + range)
                .then((response) => {
                    if(!response.ok) throw mensagem_fail(response);
                    return response.json(); // aqui que é o conteudo do fetch 
            })
            .then((api) => {
            	console.log(api); // duvidas no porque desse api
            })
            .catch((error) => {
                console.error(error.message);
            });


}

//SKETCH
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