(function(context, element){
"use strict";
    context.gibberish = {
        ignore: ["script","style"],
        blitz:function(el){
            var value = [],
                currentVal = el.nodeValue,
                l = currentVal.length,
                i = 0;
            for (;i < l; i++ ){
                value.push( gibberish.replaceChar(currentVal.charCodeAt(i)) );
            }
            el.nodeValue = value.join('');
        },
        isIn:function(n, arr){
            arr = arr || [];
            var i = 0,
                l = arr.length;
            for(;i<l;i++){
                if (arr[i] === n){
                    return true;
                }
            }
            return false;
        },
        replaceChar:function(code){
            var chr,
                v = [97,101,105,111,117],
                V = [65, 69, 73, 79, 85],
                keep = [88, 90, 100, 115, 116, 120, 122],//keep X Z d s t x z
                is = gibberish.isIn,
                rn = gibberish.randNo;
            if (is(code, v)){
                chr =  String.fromCharCode( v[rn(0, 4)] );
            } else if (is(code, V)){
                chr =  String.fromCharCode( V[rn(0, 4)] );
            } else if (is(code, keep)){
                chr = String.fromCharCode( code );
            } else if (code >= 48 && code <= 57){// numeric
                chr =  String.fromCharCode( rn(48, 57) );
            } else if (code >= 65 && code <= 89){// upper case (not Z)
                chr =  String.fromCharCode( rn(65, 89, V.concat([88]) ) ); // remove X
            } else if (code >= 97 && code <= 121){// lowercase (not z)
                chr =  String.fromCharCode( rn(97, 121, v.concat([120])) );// remove x 
            } else {// preserve extended chars, punctuation etc...
                chr = String.fromCharCode( code );
            }
            return chr;
        },
        randNo:function(min, max, blacklist){
            max++;// using Math.floor
            blacklist = blacklist || [];
            var n,i=0,maxAttempts=99,is = gibberish.isIn;
            do {
                i++;
                n = Math.floor(Math.random()*(max-min)+min);
            } while (blacklist.length && is(n, blacklist) && i < maxAttempts);
            return n;
        },
        go:function(el){
            if (gibberish.ignore.indexOf(el.nodeName) >= 0){
                return;
            }
            if (el.childNodes.length > 0) {
                for (var i = 0, l = el.childNodes.length; i<l ; i++) {
                    gibberish.go(el.childNodes[i]);
                }
            }
            if (el.nodeType === Node.TEXT_NODE && !!el.nodeValue) {
                gibberish.blitz(el);
            }
        }
    };
    if (!!element){
        gibberish.go( element );
    }


    
})( window );    
