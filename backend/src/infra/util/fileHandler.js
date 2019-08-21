
module.exports ={
    extract(contents){
        let arr = contents.toString().split('\n')
        for(var i=0; i<arr.length; i++) {
            if(arr[i] == '\r') {
                arr.splice(i, 1);
            }
        }
        return arr
    }
}