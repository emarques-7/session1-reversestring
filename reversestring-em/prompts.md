Usando Claude chatbot (claude.ai)

Propmt 1:

Eres experto desarrollador senior en javascript.

Tu tarea es crear una pequeña página en javascript que permita capturar una cadena de texto y con una acción en un botón, poder reversar esa cadena de texto y mostrarla luego en otra etiqueta de la página. Ejemplo si escribimos "AI4Devs" la salida debe ser: "sveD4IA".

El apartado visual es libre y debes crearlo en par de archivos script.js e index.html. Para el index.hml, debes basarte en el siguiente template base:

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reverse String</title>    
</head>
<body>
<script src="script.js"></script>
</body>
</html>
```


Adicionalmente, puedes agregar un botón que me permita copiar al portapapeles el texto resultante.


Propmt 2:

Ahora quiero agregarle un par de mejoras:

1- El botón de "Reverse" solo debe habilitarse cuando tengamos 3+ caracteres, de lo contrario, debe permanecer deshabilitado
2- Quiero que la cadena reversada se vaya mostrando en tiempo real al ir escribiendo el texto, sin depender exclusivamente del botón para reversarlo.

Ejecuta estos cambios en los mismos dos archivos de index.html y script.js
