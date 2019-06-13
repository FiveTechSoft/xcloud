function OpenFile()
{
   var input = document.getElementById( "myFile" );
   var reader;
   
   if( input.files )
   {
      reader = new FileReader();
     
      reader.addEventListener( 'load', function( e ) {
         editor.setValue( e.target.result, -1 ); } );
         
      reader.readAsBinaryString( input.files[ 0 ] ); 
   }
}   
  
function SendFile( cFileName )
{
   var formData = new FormData();
   var xhr = new XMLHttpRequest();
   var myblob = new Blob( [ editor.getValue() ], {
                type: 'text/plain' } );
  
   formData.append( "test", myblob, "test.prg" );
   xhr.onreadystatechange = function() { 
     if( this.readyState == XMLHttpRequest.DONE && this.status == 200 ) {
        alert( this.responseText );
    } 
   };
   xhr.open( "POST", 'https://www.fivetechsoft.com/xcloud/upload.php' );
   xhr.send( formData );
}
  
function Run()
{
   var o = new Object();
   
   o[ 'source' ] = editor.getValue();
   console.log( 'PARAM', o );
            
   $.post( "run.prg", o )
      .done( function( data ) { console.log( 'DONE', data ); $('#result').html( data ); } )
      .fail( function( data ) { console.log( 'ERROR', data ); } ); 
}
  
function MsgInfo( cMsg, cTitle )
{  
   var div1 = document.createElement( "div" );
   var div2 = document.createElement( "div" );
   var div3 = document.createElement( "div" );
   var div4 = document.createElement( "div" );
   var div5 = document.createElement( "div" );
   var div6 = document.createElement( "div" );
   var cAction;

   if( ! cTitle )
      cTitle = "Information";
   
   div1.className = "modal fade";
   div1.id = "msginfo";

   div2.className = "modal-dialog";
   div1.appendChild( div2 );

   div3.className = "modal-content";
   div2.appendChild( div3 );
   
   div4.className = "modal-header";
   div3.appendChild( div4 );
   div4.innerHTML = "<button type='button' class='close' data-dismiss='modal'>&times;</button>" +
                    "<h4 class='modal-title'>" + cTitle + "</h4>";

   div5.className = "modal-body";
   div3.appendChild( div5 );
   div5.innerHTML = cMsg;

   div6.className = "modal-footer";
   div3.appendChild( div6 );
   cAction = "document.getElementById('msginfo').remove();";
   div6.innerHTML = "<button type='button' class='btn btn-default' data-dismiss='modal' " + 
                    "onclick=" + cAction + ">Close</button>";

   document.body.appendChild( div1 );
   $('#msginfo').modal('show');  
}

function MsgGet( cMsg, cTitle )
{  
   var div1 = document.createElement( "div" );
   var div2 = document.createElement( "div" );
   var div3 = document.createElement( "div" );
   var div4 = document.createElement( "div" );
   var div5 = document.createElement( "div" );
   var div6 = document.createElement( "div" );
   var cAction;

   if( ! cTitle )
      cTitle = "Information";
   
   div1.className = "modal fade";
   div1.id = "msgget";

   div2.className = "modal-dialog";
   div1.appendChild( div2 );

   div3.className = "modal-content";
   div2.appendChild( div3 );
   
   div4.className = "modal-header";
   div3.appendChild( div4 );
   div4.innerHTML = "<button type='button' class='close' data-dismiss='modal'>&times;</button>" +
                    "<h4 class='modal-title'>" + cTitle + "</h4>";

   div5.className = "modal-body";
   div3.appendChild( div5 );
   div5.innerHTML = '<table class="table table-striped table-bordered"><tr style="background-color:#c0c0c0"><td>' + 
                    '<p align="right">' + cMsg + "</p></td><td><input type='text' id='get'>" + "</td></tr></table>";

   div6.className = "modal-footer";
   div3.appendChild( div6 );
   cAction = "document.getElementById('msgget').remove();";
   div6.innerHTML = "<button type='button' class='btn btn-default' data-dismiss='modal' style='width:90px'" + 
                    "onclick=" + cAction + ">Ok</button>" + 
                    "<button type='button' class='btn btn-default' data-dismiss='modal' style='width:90px'" + 
                    "onclick=" + cAction + ">Cancel</button>";

   document.body.appendChild( div1 );
   $('#msgget').modal('show');  
   $('#get').focus();
}

function Result( cMsg )
{  
   var div1 = document.createElement( "div" );

   div1.className = "modal fade";
   div1.id = "result";
   div1.innerHTML = cMsg;

   document.body.appendChild( div1 );
   $('#msginfo').modal('show');  
}

