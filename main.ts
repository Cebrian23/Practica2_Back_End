const developerJokes = [
  "¿Por qué los desarrolladores odian la naturaleza? Porque tiene demasiados bugs.",
  "Un SQL entra en un bar, se acerca a dos mesas y pregunta: '¿Puedo unirme?'",
  "¡He terminado mi código a tiempo! – Nadie, nunca.", "Si no funciona, añade más `console.log()`.",
  "¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, es un problema de hardware.",
  "No me asusto fácilmente... excepto cuando veo código sin `;` al final.",
  "Los desarrolladores no envejecen, solo se depuran.",
  "El único lugar donde puedes escapar de una excepción es en Java.",
  "Frontend sin diseño es como un backend sin lógica.",
  "¿Por qué los programadores prefieren el té? Porque en Java no hay café.",
  "Hay 10 tipos de personas en el mundo: las que entienden binario y las que no.",
  "Siempre prueba tu código... excepto cuando funciona.",
  "Tu código no está roto, solo es 'funcionalidad no documentada'.",
  "En qué se parecen los programadores y los gatos? En que odian mojarse y no pueden dejar de jugar con cosas que no deberían.",
  "Mi código funciona... hasta que lo toco de nuevo.",
  "¿Por qué los desarrolladores odian la luz del sol? Porque depuran en la oscuridad.",
  "Cuando crees que has eliminado todos los bugs, aparece el 'bug final'.",
  "Git es como un horóscopo: nunca entiendes los conflictos.",
  "Un desarrollador sin bugs es como un unicornio, no existe.",
  "En mi máquina funciona... pero no en producción."
  ];

  const handler = (req: Request): Response => {
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;
    const searchParams = url.searchParams;
    
    if(method === "GET"){
      if(path === "/jokes"){
        let indice = Number(searchParams.get("indice"));

        console.log(developerJokes.length-1);

        if(!indice){
          indice = Math.abs((Math.round((Math.random()*100)%developerJokes.length-1)));
          console.log(indice);
          return new Response(JSON.stringify(developerJokes[indice]),{status: 200});
        }
        else{
          console.log(indice);
          if(indice >= developerJokes.length){
            return new Response("Sin coincidencias",{status: 400})
          }
          else{
            return new Response(JSON.stringify(developerJokes[indice]),{status:200});
          }
        }
      }
      else if(path === "/calcular"){
        const valor1 = Number(searchParams.get("valor1"));
        const valor2 = Number(searchParams.get("valor2"));
        const op = searchParams.get("op");
        let resultado;

        if(valor2 === 0 && op === "division"){
          return new Response("No se puede dividir entre 0", {status: 400} );
        }

        if(!valor1 || !valor2 || !op){
          return new Response("Bad Request", {status: 404} );
        }
        else {
          if(op === "suma"){
            resultado = valor1+valor2;
            return new Response(`La suma entre ${valor1} y ${valor2} es igual a ${resultado}`, {status: 200} );
          }
          else if(op === "resta"){
            resultado = valor1-valor2;
            return new Response(`La resta entre ${valor1} y ${valor2} es igual a ${resultado}`, {status: 200} );
          }
          else if(op === "multiplicacion"){
            resultado = valor1*valor2;
            return new Response(`La multiplicacion entre ${valor1} y ${valor2} es igual a ${resultado}`, {status: 200} );
          }
          else if(op === "division"){
            resultado = valor1/valor2;
            return new Response(`La division entre ${valor1} y ${valor2} es igual a ${resultado}`, {status: 200} );
          }
        }
      }
      else if(path.startsWith("/reverso")){
        const frase=path.split("/").at(2);
        
        if(!frase || frase === ""){
          return new Response("Bad Request", {status: 400} );
        }
        else{
          const inverso = frase.replaceAll("%20"," ")
                               .split("")
                               .reduce(((p,acc:string)=>acc+=p),"");
          
          if(searchParams.get("detalles")){
            return new Response(`{"reverso": "${inverso}", "longitud": ${inverso.length} }`, { status: 200} );
          }

          return new Response(JSON.stringify(inverso), {status: 200})
        }
      }
    }

    return new Response("Endpoint Not Found", {status: 404});
  }

Deno.serve( {port:3000}, handler);