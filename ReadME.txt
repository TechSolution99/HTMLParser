This project doesn't require any external libraries.

-To run node application

node cli.js [src] [dst]

example:  node cli.js myprogram.html myprogram.txt



-To import in broswer

Please import the index.js javascript file and call htmlStringToObject function

Parameters:
arg1:
	Type : string
	html string data

Return value:
string: stringified data of parsed object

example: 

...
<textarea id="input_text"></textarea>
<textarea id="output_text"></textarea>
...
<script src="index.js" defer></script>
<script type="text/javascript">
  document.getElementById('input_text').addEventListener('input', (e) => {
    document.getElementById('output_text').innerHTML = htmlStringToObject(e.target.value)
  })
</script>

Please refer index.html file.


