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
   xhr.open( "POST", 'upload.prg' );
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

function RunCode( cCode )
{
   var o = new Object();
   var cResult;
   
   o[ 'source' ] = atob( cCode );
   console.log( 'PARAM', o );
            
   $.post( "run.prg", o )
      .done( function( data ) { console.log( 'DONE', data ); $('#memo').html( data ); } )
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
   div2.style.marginTop = "300px";
   div2.style.boxShadow = "10px 10px 10px darkslategrey";
   div1.appendChild( div2 );

   div3.className = "modal-content";
   div2.appendChild( div3 );
   
   div4.className = "modal-header";
   div3.appendChild( div4 );
   div4.innerHTML = "<h4 class='modal-title'>" + cTitle + "</h4>" + 
                    "<button type='button' class='close' data-dismiss='modal'>&times;</button>";

   div5.className = "modal-body";
   div3.appendChild( div5 );
   div5.innerHTML = cMsg;

   div6.className = "modal-footer";
   div3.appendChild( div6 );
   cAction = "document.getElementById('msginfo').remove();";
   div6.innerHTML = "<button type='button' class='btn btn-primary' data-dismiss='modal' " + 
                    "onclick=" + cAction + ">Close</button>";

   document.body.appendChild( div1 );
   $('#msginfo').draggable();     
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
   div2.style.marginTop = "300px";
   div2.style.boxShadow = "10px 10px 10px darkslategrey";
   div1.appendChild( div2 );

   div3.className = "modal-content";
   div2.appendChild( div3 );
   
   div4.className = "modal-header";
   div3.appendChild( div4 );
   div4.innerHTML = "<h4 class='modal-title'>" + cTitle + "</h4>" + 
                    "<button type='button' class='close' data-dismiss='modal'>&times;</button>";

   div5.className = "modal-body";
   div3.appendChild( div5 );
   div5.innerHTML = '<table class="table table-striped"><tr><td>' + 
                    '<p align="right">' + cMsg + "</p></td><td><input type='text' id='get'>" + "</td></tr></table>";

   div6.className = "modal-footer";
   div3.appendChild( div6 );
   cAction = "document.getElementById('msgget').remove();";
   div6.innerHTML = "<button type='button' class='btn btn-primary' data-dismiss='modal' style='width:90px'" + 
                    "onclick=" + cAction + ">Ok</button>" + 
                    "<button type='button' class='btn btn-primary' data-dismiss='modal' style='width:90px'" + 
                    "onclick=" + cAction + ">Cancel</button>";

   document.body.appendChild( div1 );
   $('#msgget').modal('show');  
   $('#get').focus();
}

function MsgYesNo( cMsg, cTitle, cOnYes )
{  
   var div1 = document.createElement( "div" );
   var div2 = document.createElement( "div" );
   var div3 = document.createElement( "div" );
   var div4 = document.createElement( "div" );
   var div5 = document.createElement( "div" );
   var div6 = document.createElement( "div" );
   var cAction;
            
   if( ! cTitle )
      cTitle = "Please select";
               
   div1.className = "modal fade";
   div1.id = "msgyesno";
            
   div2.className = "modal-dialog";
   div2.style.marginTop = "300px";
   div2.style.boxShadow = "10px 10px 10px darkslategrey";
   div1.appendChild( div2 );
            
   div3.className = "modal-content";
   div2.appendChild( div3 );
               
   div4.className = "modal-header";
   div3.appendChild( div4 );
   div4.innerHTML = "<h4 class='modal-title'>" + cTitle + "</h4>" +  
                    "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
            
   div5.className = "modal-body";
   div3.appendChild( div5 );
   div5.innerHTML = cMsg;
            
   div6.className = "modal-footer";
   div3.appendChild( div6 );
   cAction = "document.getElementById('msgyesno').remove();";
   div6.innerHTML = "<button type='button' class='btn btn-primary' data-dismiss='modal' " + 
                    "onclick=" + cAction + ";" + cOnYes + ' style="width:100px;">Yes</button>' + 
                    "<button type='button' class='btn btn-primary' data-dismiss='modal' " + 
                    "onclick=" + cAction + ' style="width:100px;">No</button>';
            
   document.body.appendChild( div1 );
   $('#msgyesno').draggable();
   $('#msgyesno').modal('show');
}

function MsgMemo( cMsg, cTitle )
{  
   var div1 = document.createElement( "div" );
   var div2 = document.createElement( "div" );
   var div3 = document.createElement( "div" );
   var div4 = document.createElement( "div" );
   var div5 = document.createElement( "div" );
   var div6 = document.createElement( "div" );
   var cAction;

   if( ! cTitle )
      cTitle = "Memo";
   
   div1.className = "modal fade";
   div1.id = "msgmemo";

   div2.className = "modal-dialog";
   div2.style.marginTop = "150px";
   div2.style.marginLeft = "500px";
   div2.style.boxShadow = "10px 10px 10px darkslategrey";
   div1.appendChild( div2 );

   div3.className = "modal-content";
   div3.style.width = "1000px";
   div2.appendChild( div3 );
   
   div4.className = "modal-header";
   div3.appendChild( div4 );
   div4.innerHTML = "<h4 class='modal-title'>" + cTitle + "</h4>" + 
                    "<button type='button' class='close' data-dismiss='modal'>&times;</button>";

   div5.className = "modal-body";
   div3.appendChild( div5 );
   div5.innerHTML = '<textarea id="memo" rows="15" cols="118" style="margin-left:0px;">' + cMsg + '</textarea>';

   div6.className = "modal-footer";
   div3.appendChild( div6 );
   cAction = "document.getElementById('msgmemo').remove();";
   div6.innerHTML = "<button type='button' class='btn btn-primary' data-dismiss='modal' " + 
                    "onclick=" + cAction + ">Close</button>";

   div2.style.width = "1000px";
   
   document.body.appendChild( div1 );
   $('#msgmemo').draggable();
   $('#msgmemo').modal('show');  
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

